/* eslint-disable no-undef */
let pyodide = null

async function loadPyodideRuntime() {
  // Stage 1 — script fetch
  self.postMessage({ type: 'progress', message: 'Downloading Python runtime…', pct: 5 })
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.4/full/pyodide.js')

  // Stage 2 — WASM init + Python boot
  self.postMessage({ type: 'progress', message: 'Starting Python engine…', pct: 35 })

  pyodide = await loadPyodide({
    // Intercept Pyodide's own loading messages (emitted to stderr during init)
    stderr: (msg) => {
      const line = msg.trim()
      if (!line) return
      if (line.startsWith('Loading ')) {
        // e.g. "Loading pyodide_py.tar.bz2…"
        self.postMessage({ type: 'progress', message: line, pct: 65 })
      }
    },
    stdout: () => {}, // suppress
  })

  // Stage 3 — finishing touches
  self.postMessage({ type: 'progress', message: 'Finalising Python environment…', pct: 90 })
  self.postMessage({ type: 'ready' })
}

loadPyodideRuntime().catch((err) => {
  self.postMessage({ type: 'error', error: `Failed to load Python: ${err.message}` })
})

async function loadRequiredPackages(code) {
  const toLoad = []
  if (code.includes('import pandas') || code.includes('from pandas')) toLoad.push('pandas')
  if (code.includes('import numpy') || code.includes('from numpy')) toLoad.push('numpy')
  if (code.includes('scikit-learn') || code.includes('from sklearn') || code.includes('import sklearn')) toLoad.push('scikit-learn')
  if (code.includes('from scipy') || code.includes('import scipy')) toLoad.push('scipy')
  if (code.includes('import matplotlib') || code.includes('from matplotlib')) toLoad.push('matplotlib')
  if (code.includes('import sqlite3') || code.includes('from sqlite3')) toLoad.push('sqlite3')
  if (toLoad.length > 0) {
    // Emit progress for each package being loaded
    for (const pkg of toLoad) {
      self.postMessage({ type: 'progress', message: `Loading ${pkg}…`, pct: 75 })
    }
    await pyodide.loadPackage(toLoad)
  }
}

self.onmessage = async function (event) {
  const { type, code, inputValues } = event.data

  if (type !== 'run' || !pyodide) return

  try {
    await loadRequiredPackages(code)

    // Redirect stdout/stderr
    pyodide.runPython(`
import sys, io, builtins
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`)

    // Mock input() via the builtins module so it works in any exec namespace
    const inputs = JSON.stringify(inputValues && inputValues.length > 0 ? inputValues : [])
    pyodide.runPython(`
_input_values = ${inputs}
_input_index = 0
def _mock_input(prompt=""):
    global _input_index
    if _input_index < len(_input_values):
        val = _input_values[_input_index]
        _input_index += 1
        return val
    return ""
builtins.input = _mock_input
`)

    // Run user code in an isolated namespace so globals don't bleed between runs
    pyodide.runPython(`
exec(${JSON.stringify(code)}, {'__builtins__': builtins})
`)

    const stdout = pyodide.runPython('sys.stdout.getvalue()')

    self.postMessage({
      type: 'result',
      output: stdout,
      error: null, // stderr warnings must not block validation
    })
  } catch (err) {
    // Actual Python exception — capture any partial stdout printed before the crash
    let partialOutput = ''
    try { partialOutput = pyodide.runPython('sys.stdout.getvalue()') } catch (_) {}
    // Use err.type for PythonError objects (Pyodide wraps Python exceptions this way)
    const errorMsg = err?.message || err?.type || String(err)
    self.postMessage({
      type: 'result',
      output: partialOutput,
      error: errorMsg,
    })
  }
}
