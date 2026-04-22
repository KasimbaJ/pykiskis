/* eslint-disable no-undef */
let pyodide = null

async function loadPyodideRuntime() {
  self.postMessage({ type: 'progress', message: 'Downloading Python runtime…', pct: 5 })
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.4/full/pyodide.js')

  self.postMessage({ type: 'progress', message: 'Starting Python engine…', pct: 35 })
  pyodide = await loadPyodide({
    stderr: (msg) => {
      const line = msg.trim()
      if (!line) return
      if (line.startsWith('Loading ')) {
        self.postMessage({ type: 'progress', message: line, pct: 65 })
      }
    },
    stdout: () => {},
  })

  self.postMessage({ type: 'progress', message: 'Finalising Python environment…', pct: 90 })
  self.postMessage({ type: 'ready' })
}

loadPyodideRuntime().catch((err) => {
  self.postMessage({ type: 'error', error: `Failed to load Python: ${err.message}` })
})

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

self.onmessage = async function (event) {
  const { type, code, inputValues, sharedBuffer } = event.data
  if (type !== 'run' || !pyodide) return

  // ── Accumulate stdout lines so we can send partial output with each input request ──
  const outputChunks = []

  // ── Wire up _pyk_write (called from Python stdout) ────────────────────────────────
  self._pyk_write = function (s) {
    outputChunks.push(String(s))
  }

  // ── Wire up _pyk_input (called from Python input()) ───────────────────────────────
  if (sharedBuffer) {
    // ✅ CrossOriginIsolated: real blocking input via Atomics
    const controlArr = new Int32Array(sharedBuffer, 0, 1)  // [0] = 0 waiting / 1 ready
    const dataLenArr = new Int32Array(sharedBuffer, 4, 1)  // [0] = byte length
    const dataArr    = new Uint8Array(sharedBuffer, 8)     // UTF-8 payload

    self._pyk_input = function (prompt) {
      const promptStr  = String(prompt || '')
      const partialOut = outputChunks.join('')
      // Reset flag then notify main thread
      Atomics.store(controlArr, 0, 0)
      self.postMessage({ type: 'input_request', prompt: promptStr, partialOutput: partialOut })
      // Block this Web Worker thread until the main thread writes input
      Atomics.wait(controlArr, 0, 0)
      // Read the response
      const len   = Atomics.load(dataLenArr, 0)
      const bytes = dataArr.slice(0, len)
      return new TextDecoder().decode(bytes)
    }
  } else {
    // ⚠️ Fallback: pre-supplied input values (no COEP / old browser)
    let idx = 0
    const vals = Array.isArray(inputValues) ? inputValues : []
    self._pyk_input = function () {
      return idx < vals.length ? vals[idx++] : ''
    }
  }

  try {
    await loadRequiredPackages(code)

    // Redirect stdout to our streaming writer; suppress stderr warnings
    pyodide.runPython(`
import sys, builtins, js

class _JsWriter:
    def write(self, s):
        js._pyk_write(str(s))
        return len(s) if s else 0
    def flush(self):
        pass

class _NoopWriter:
    def write(self, s): return len(s) if s else 0
    def flush(self): pass

sys.stdout = _JsWriter()
sys.stderr = _NoopWriter()

def _input(prompt=""):
    val = str(js._pyk_input(str(prompt)))
    # Echo prompt + typed value to stdout so it appears in the final transcript
    js._pyk_write(str(prompt) + val + "\\n")
    return val

builtins.input = _input
`)

    // Run user code in an isolated namespace
    pyodide.runPython(`exec(${JSON.stringify(code)}, {'__builtins__': __import__('builtins')})`)

    self.postMessage({
      type: 'result',
      output: outputChunks.join(''),
      error: null,
    })
  } catch (err) {
    const errorMsg = err?.message || err?.type || String(err)
    self.postMessage({
      type: 'result',
      output: outputChunks.join(''),
      error: errorMsg,
    })
  }
}
