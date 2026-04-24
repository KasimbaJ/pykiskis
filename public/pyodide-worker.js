/* eslint-disable no-undef */

// CDN base — used for lock file, stdlib, and packages (all via fetch(), safe under COEP:credentialless)
const CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.4/full/'

let pyodide = null

// SharedArrayBuffer refs for interactive stdin (only set when crossOriginIsolated)
let syncArray = null  // Int32Array(1)  — 0 = worker waiting, 1 = input ready
let dataArray = null  // Uint8Array(4+65536) — bytes 0-3: length (Int32LE), bytes 4+: UTF-8 text

const _dec = new TextDecoder()

// Accumulated stdout text for the current run
let _out = ''

// ─────────────────────────────────────────────────────────────────────────────
// Pyodide loading
// ─────────────────────────────────────────────────────────────────────────────

async function loadPyodideRuntime() {
  self.postMessage({ type: 'progress', message: 'Downloading Python runtime…', pct: 5 })

  // Load the local copy of pyodide.js (avoids importScripts() to CDN under COEP)
  importScripts('/pyodide/pyodide.js')

  self.postMessage({ type: 'progress', message: 'Starting Python engine…', pct: 35 })

  pyodide = await loadPyodide({
    indexURL:   '/pyodide/',               // pyodide.asm.wasm served same-origin
    lockFileURL: `${CDN}pyodide-lock.json`, // fetched via fetch() — fine under COEP:credentialless
    stdLibURL:   `${CDN}python_stdlib.zip`, // fetched via fetch() — fine under COEP:credentialless
    stderr(msg) {
      const line = msg.trim()
      if (!line) return
      if (line.startsWith('Loading ')) {
        self.postMessage({ type: 'progress', message: line, pct: 65 })
      }
    },
    stdout() {},
  })

  self.postMessage({ type: 'progress', message: 'Finalising Python environment…', pct: 90 })
  self.postMessage({ type: 'ready' })
}

loadPyodideRuntime().catch((err) => {
  self.postMessage({ type: 'error', error: `Failed to load Python: ${err.message}` })
})

// ─────────────────────────────────────────────────────────────────────────────
// Package auto-loading
// ─────────────────────────────────────────────────────────────────────────────

async function loadRequiredPackages(code) {
  const toLoad = []
  if (code.includes('import pandas')    || code.includes('from pandas'))    toLoad.push('pandas')
  if (code.includes('import numpy')     || code.includes('from numpy'))     toLoad.push('numpy')
  if (code.includes('scikit-learn')     || code.includes('from sklearn')    || code.includes('import sklearn')) toLoad.push('scikit-learn')
  if (code.includes('from scipy')       || code.includes('import scipy'))   toLoad.push('scipy')
  if (code.includes('import matplotlib')|| code.includes('from matplotlib')) toLoad.push('matplotlib')
  if (code.includes('import sqlite3')   || code.includes('from sqlite3'))   toLoad.push('sqlite3')
  if (toLoad.length > 0) {
    for (const pkg of toLoad) {
      self.postMessage({ type: 'progress', message: `Loading ${pkg}…`, pct: 75 })
    }
    await pyodide.loadPackage(toLoad)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Message handler
// ─────────────────────────────────────────────────────────────────────────────

self.onmessage = async function (event) {
  const { type, code, inputValues, syncBuffer, dataBuffer } = event.data
  if (type !== 'run' || !pyodide) return

  // Store shared buffers for this run (null means fallback/mock mode)
  syncArray = syncBuffer ? new Int32Array(syncBuffer)  : null
  dataArray = dataBuffer ? new Uint8Array(dataBuffer)  : null

  // ── Redirect stdout/stderr via Pyodide's JS-level hooks ──────────────────
  _out = ''
  pyodide.setStdout({ write(buf) { _out += _dec.decode(buf); return buf.length } })
  pyodide.setStderr({ write(buf) { return buf.length } })   // suppress stderr noise

  // ── Expose a blocking input helper for interactive mode ─────────────────
  // We SIDESTEP pyodide.setStdin entirely and instead override Python's
  // input() at the Python level (see runPython below).  The Python override
  // calls this JS function via Pyodide's js interop.  We never attach to
  // sys.stdin, so Emscripten's stdin fd never runs — no EIO surface.
  if (syncArray) {
    self._pykBlockingInput = function () {
      // Split accumulated output at the last newline so the UI shows
      // previously-printed lines separately from the current prompt line.
      const lastNL = _out.lastIndexOf('\n')
      const partialOutput = lastNL >= 0 ? _out.slice(0, lastNL + 1) : ''
      const prompt       = lastNL >= 0 ? _out.slice(lastNL + 1)    : _out

      // Ask the main thread to show the input box.
      self.postMessage({ type: 'input_request', prompt, partialOutput })

      // Block this worker thread until the main thread writes to the shared
      // buffer.  Poll every 200 ms so keyboard interrupts can be detected.
      while (true) {
        const result = Atomics.wait(syncArray, 0, 0, 200)
        if (result !== 'timed-out') break
        try { pyodide.checkInterrupt() } catch (e) { throw e }
      }

      // Read what the user typed from the shared data buffer.
      const length = new Int32Array(dataArray.buffer, 0, 1)[0]
      const text   = _dec.decode(dataArray.subarray(4, 4 + length)) // e.g. "John\n"

      // Echo the typed text so the final output looks like a real terminal.
      _out += text

      // Reset sync flag so the next input() call blocks correctly.
      Atomics.store(syncArray, 0, 0)

      // Return the line WITH trailing '\n' — our Python wrapper strips it.
      return text
    }
  } else {
    self._pykBlockingInput = null
  }

  // ── Run user code ─────────────────────────────────────────────────────────
  try {
    await loadRequiredPackages(code)

    if (syncArray) {
      // Interactive mode — override input() at the Python level.  The
      // override calls our JS helper `_pykBlockingInput` via the `js`
      // module, which blocks the worker until the main thread provides
      // the user's text.  We never touch sys.stdin, so Emscripten's
      // stdin plumbing cannot raise EIO.
      pyodide.runPython(`
import builtins as _bi, sys, js as _js

def _pyk_input(prompt=''):
    if prompt:
        sys.stdout.write(str(prompt))
        sys.stdout.flush()
    raw = _js._pykBlockingInput()
    # Pyodide auto-converts JS strings to Python str, but be defensive.
    if not isinstance(raw, str):
        raw = str(raw)
    if raw.endswith('\\r\\n'):
        return raw[:-2]
    if raw.endswith('\\n'):
        return raw[:-1]
    return raw

exec(${JSON.stringify(code)}, {'__builtins__': _bi, 'input': _pyk_input})
`)
    } else {
      // Fallback mode: mock input() with pre-supplied values
      const inputs = JSON.stringify(inputValues && inputValues.length > 0 ? inputValues : [])
      pyodide.runPython(`
import builtins as _bi, sys

_iv = ${inputs}
_ii = 0

def _mock_input(prompt=''):
    global _ii
    if prompt:
        sys.stdout.write(str(prompt))
    if _ii < len(_iv):
        v = _iv[_ii]; _ii += 1
        return v
    return ''

exec(${JSON.stringify(code)}, {'__builtins__': _bi, 'input': _mock_input})
`)
    }

    self.postMessage({ type: 'result', output: _out, error: null })
  } catch (err) {
    const errorMsg = err?.message || err?.type || String(err)
    self.postMessage({ type: 'result', output: _out, error: errorMsg })
  }
}
