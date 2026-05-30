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
// Code visualizer — trace harness
//
// Runs the snippet under sys.settrace, capturing a snapshot at every executed
// user-code line: the line number, each user frame's locals (serialized to
// JSON-safe values with depth/size caps), and stdout so far.  Returns the steps
// as a JSON string in the Python global `_PYK_TRACE_JSON`.  Bounded by a step
// cap so loops can't blow up memory.  input() is mocked from inputValues.
// ─────────────────────────────────────────────────────────────────────────────

function buildTraceHarness(code, inputsJson) {
  return `
import sys as _sys, io as _io, json as _json, math as _math, traceback as _tb

_MAX_STEPS = 1000
_MAX_DEPTH = 4
_MAX_ITEMS = 100
_MAX_REPR = 200

def _pyk_cap(r):
    return r if len(r) <= _MAX_REPR else r[:_MAX_REPR] + "…"

def _pyk_ser(v, depth=0, seen=None):
    if seen is None: seen = set()
    t = type(v).__name__
    if v is None or v is True or v is False:
        return {"kind": "primitive", "pytype": t, "value": v}
    if isinstance(v, int):
        return {"kind": "primitive", "pytype": "int", "value": v}
    if isinstance(v, float):
        if not _math.isfinite(v):
            return {"kind": "object", "pytype": "float", "repr": repr(v)}
        return {"kind": "primitive", "pytype": "float", "value": v}
    if isinstance(v, str):
        return {"kind": "primitive", "pytype": "str", "value": _pyk_cap(v)}
    _vid = id(v)
    if _vid in seen or depth >= _MAX_DEPTH:
        return {"kind": "object", "pytype": t, "repr": _pyk_cap(repr(v))}
    if isinstance(v, (list, tuple, set, frozenset)):
        _seen = seen | {_vid}
        items = []; trunc = False
        for i, x in enumerate(v):
            if i >= _MAX_ITEMS: trunc = True; break
            items.append(_pyk_ser(x, depth + 1, _seen))
        return {"kind": "sequence", "pytype": t, "items": items, "truncated": trunc}
    if isinstance(v, dict):
        _seen = seen | {_vid}
        entries = []; trunc = False
        for i, (k, val) in enumerate(v.items()):
            if i >= _MAX_ITEMS: trunc = True; break
            entries.append([_pyk_ser(k, depth + 1, _seen), _pyk_ser(val, depth + 1, _seen)])
        return {"kind": "dict", "pytype": "dict", "entries": entries, "truncated": trunc}
    return {"kind": "object", "pytype": t, "repr": _pyk_cap(repr(v))}

_pyk_steps = []
_pyk_trunc = [False]
_pyk_out = _io.StringIO()
_pyk_skip = {"__builtins__", "__name__", "__doc__", "__loader__", "__spec__",
             "__package__", "__file__", "input"}

def _pyk_snapshot(frame, event):
    if len(_pyk_steps) >= _MAX_STEPS:
        _pyk_trunc[0] = True
        return
    chain = []
    f = frame
    while f is not None:
        if f.f_code.co_filename == "<student>":
            chain.append(f)
        f = f.f_back
    chain.reverse()
    frames = []
    for fr in chain:
        loc = []
        for name, val in list(fr.f_locals.items()):
            if name in _pyk_skip or name.startswith("__"):
                continue
            try:
                loc.append({"name": name, "value": _pyk_ser(val)})
            except Exception:
                loc.append({"name": name, "value": {"kind": "object", "pytype": "?", "repr": "<unserializable>"}})
        nm = fr.f_code.co_name
        frames.append({"name": "Global" if nm == "<module>" else nm, "locals": loc})
    _pyk_steps.append({"line": frame.f_lineno, "event": event,
                       "stdout": _pyk_out.getvalue(), "frames": frames})

def _pyk_tracer(frame, event, arg):
    if frame.f_code.co_filename != "<student>":
        return None
    if event in ("line", "return", "exception"):
        _pyk_snapshot(frame, event)
    return _pyk_tracer

_pyk_iv = ${inputsJson}
_pyk_ii = [0]
def _pyk_input(prompt=""):
    if prompt:
        _pyk_out.write(str(prompt))
    v = ""
    if _pyk_ii[0] < len(_pyk_iv):
        v = _pyk_iv[_pyk_ii[0]]; _pyk_ii[0] += 1
    _pyk_out.write(str(v) + "\\n")
    return v

_pyk_error = None
_pyk_g = {"__name__": "__main__", "__builtins__": __builtins__, "input": _pyk_input}
_pyk_real_stdout = _sys.stdout
try:
    _pyk_code = compile(${JSON.stringify(code)}, "<student>", "exec")
    _sys.stdout = _pyk_out
    _sys.settrace(_pyk_tracer)
    try:
        exec(_pyk_code, _pyk_g)
    finally:
        _sys.settrace(None)
        _sys.stdout = _pyk_real_stdout
except Exception as _e:
    _sys.settrace(None)
    _sys.stdout = _pyk_real_stdout
    _pyk_error = "".join(_tb.format_exception_only(type(_e), _e)).strip()

_PYK_TRACE_JSON = _json.dumps({"steps": _pyk_steps, "error": _pyk_error, "truncated": _pyk_trunc[0]})
`
}

async function runTrace(code, inputValues) {
  try {
    await loadRequiredPackages(code)
    // Trace captures stdout into its own Python StringIO; keep the JS-level
    // hooks quiet so nothing leaks to the run console.
    pyodide.setStdout({ write(buf) { return buf.length } })
    pyodide.setStderr({ write(buf) { return buf.length } })

    const inputs = JSON.stringify(inputValues && inputValues.length > 0 ? inputValues : [])
    pyodide.runPython(buildTraceHarness(code, inputs))
    const resultJson = pyodide.globals.get('_PYK_TRACE_JSON')
    const parsed = JSON.parse(resultJson)
    self.postMessage({
      type: 'trace_result',
      steps: parsed.steps,
      error: parsed.error,
      truncated: parsed.truncated,
    })
  } catch (err) {
    const errorMsg = err?.message || err?.type || String(err)
    self.postMessage({ type: 'trace_result', steps: [], error: errorMsg, truncated: false })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Message handler
// ─────────────────────────────────────────────────────────────────────────────

self.onmessage = async function (event) {
  const { type, code, inputValues, syncBuffer, dataBuffer, echoInput } = event.data
  if (!pyodide) return

  // ── Code visualizer: trace execution and return per-line steps ───────────
  if (type === 'trace') {
    await runTrace(code, inputValues)
    return
  }

  if (type !== 'run') return

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
      // TextDecoder.decode() rejects views backed by SharedArrayBuffer,
      // so copy the bytes into a fresh (non-shared) Uint8Array first —
      // `new Uint8Array(typedArray)` always allocates a regular ArrayBuffer.
      const length = new Int32Array(dataArray.buffer, 0, 1)[0]
      const bytes  = new Uint8Array(dataArray.subarray(4, 4 + length))
      const text   = _dec.decode(bytes) // e.g. "John\n"

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
      // Fallback mode: mock input() with pre-supplied values.
      //
      // Two sub-modes, controlled by echoInput:
      //  • echoInput = false (grading): the mock does NOT echo the prompt.
      //    The captured stdout is exactly the program's print() output, so
      //    exact-match validation works against a clean expected output.
      //  • echoInput = true (theory demos): the mock echoes "prompt + value"
      //    to stdout so the demo reads like a real terminal transcript.
      const inputs = JSON.stringify(inputValues && inputValues.length > 0 ? inputValues : [])
      const echo = echoInput ? 'True' : 'False'
      pyodide.runPython(`
import builtins as _bi, sys

_iv = ${inputs}
_ii = 0
_echo = ${echo}

def _mock_input(prompt=''):
    global _ii
    v = ''
    if _ii < len(_iv):
        v = _iv[_ii]; _ii += 1
    if _echo:
        sys.stdout.write(str(prompt) + str(v) + '\\n')
    return v

exec(${JSON.stringify(code)}, {'__builtins__': _bi, 'input': _mock_input})
`)
    }

    self.postMessage({ type: 'result', output: _out, error: null })
  } catch (err) {
    const errorMsg = err?.message || err?.type || String(err)
    self.postMessage({ type: 'result', output: _out, error: errorMsg })
  }
}
