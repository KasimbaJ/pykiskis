import type { ExecutionResult } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// Worker + readiness state
// ─────────────────────────────────────────────────────────────────────────────

let worker: Worker | null = null
let isReady  = false
let onReadyCallbacks:    (() => void)[]                              = []
let onProgressCallbacks: ((message: string, pct: number) => void)[] = []

// ─────────────────────────────────────────────────────────────────────────────
// SharedArrayBuffer setup  (requires crossOriginIsolated)
// ─────────────────────────────────────────────────────────────────────────────

/** Sync flag: 0 = worker waiting, 1 = input is ready */
let syncBuffer: SharedArrayBuffer | null = null
let syncArray:  Int32Array         | null = null

/** Data buffer: bytes 0-3 = length (Int32LE), bytes 4+ = UTF-8 text */
let dataSAB:   SharedArrayBuffer | null = null
let dataArray: Uint8Array        | null = null

function initSharedBuffers(): void {
  if (!crossOriginIsolated) return          // SAB requires cross-origin isolation
  if (syncBuffer) return                    // already initialised
  syncBuffer = new SharedArrayBuffer(4)
  syncArray  = new Int32Array(syncBuffer)
  dataSAB    = new SharedArrayBuffer(4 + 65_536) // 4-byte length prefix + 64 KB text
  dataArray  = new Uint8Array(dataSAB)
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive input state
// ─────────────────────────────────────────────────────────────────────────────

/** Called by useCodeExecution to show the input dialog in the UI */
let _inputRequestHandler: ((prompt: string, partialOutput: string) => void) | null = null

/** Called by runPython to reschedule the execution timeout after user provides input */
let _rescheduleTimeout: (() => void) | null = null

// ─────────────────────────────────────────────────────────────────────────────
// Exported API
// ─────────────────────────────────────────────────────────────────────────────

export function initPythonRunner(): void {
  if (worker) return

  initSharedBuffers()

  worker = new Worker('/pyodide-worker.js')
  worker.onmessage = (event) => {
    if (event.data.type === 'ready') {
      isReady = true
      onReadyCallbacks.forEach((cb) => cb())
      onReadyCallbacks = []
    } else if (event.data.type === 'progress') {
      onProgressCallbacks.forEach((cb) => cb(event.data.message, event.data.pct))
    }
  }
}

export function isPythonReady(): boolean { return isReady }

export function onPythonReady(callback: () => void): void {
  if (isReady) callback()
  else onReadyCallbacks.push(callback)
}

export function onPythonProgress(
  callback: (message: string, pct: number) => void,
): () => void {
  onProgressCallbacks.push(callback)
  return () => { onProgressCallbacks = onProgressCallbacks.filter((cb) => cb !== callback) }
}

/**
 * Register a callback that fires whenever Python calls input().
 * The callback receives the prompt string and the partial stdout so far.
 * Pass null to unregister (called after runPython resolves).
 */
export function setInputRequestHandler(
  cb: ((prompt: string, partialOutput: string) => void) | null,
): void {
  _inputRequestHandler = cb
}

/**
 * Write the user's typed value into the shared data buffer and wake the worker.
 * No-op if SharedArrayBuffer is unavailable (crossOriginIsolated is false).
 */
export function provideInput(value: string): void {
  if (!syncArray || !dataArray) return

  const encoded    = new TextEncoder().encode(value + '\n')
  const lengthView = new Int32Array(dataArray.buffer, 0, 1)
  lengthView[0]    = encoded.length
  dataArray.set(encoded, 4)

  // Wake the worker — it is blocked in Atomics.wait(syncArray, 0, 0)
  Atomics.store(syncArray, 0, 1)
  Atomics.notify(syncArray, 0)

  // Restart the execution timeout so a slow typist doesn't kill the run
  _rescheduleTimeout?.()
}

// ─────────────────────────────────────────────────────────────────────────────
// runPython
// ─────────────────────────────────────────────────────────────────────────────

export function runPython(
  code:        string,
  inputValues: string[] = [],
  timeoutMs  = 30_000,
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    if (!worker || !isReady) {
      resolve({ output: '', error: 'Python is still loading…', timedOut: false })
      return
    }

    // ── Timeout management ────────────────────────────────────────────────
    let timeout: ReturnType<typeof setTimeout>

    const scheduleTimeout = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        worker!.terminate()
        worker  = null
        isReady = false
        initPythonRunner()
        resolve({ output: '', error: 'Execution timed out. Check for infinite loops.', timedOut: true })
      }, timeoutMs)
    }
    scheduleTimeout()

    // Expose so provideInput() can restart the clock after user responds
    _rescheduleTimeout = scheduleTimeout

    // ── Message handler for this run ──────────────────────────────────────
    const handler = (event: MessageEvent) => {
      if (event.data.type === 'result') {
        clearTimeout(timeout)
        _rescheduleTimeout = null
        worker!.removeEventListener('message', handler)
        resolve({
          output:   event.data.output,
          error:    event.data.error,
          timedOut: false,
        })
      } else if (event.data.type === 'input_request') {
        // Worker is blocked in Atomics.wait() — suspend the timeout while
        // the user is typing so a slow typist doesn't trigger the timeout
        clearTimeout(timeout)
        _inputRequestHandler?.(
          event.data.prompt        ?? '',
          event.data.partialOutput ?? '',
        )
      }
    }

    worker.addEventListener('message', handler)

    // ── Dispatch to worker ────────────────────────────────────────────────
    // Pass SharedArrayBuffers when available (interactive mode),
    // otherwise null (fallback: pre-supplied inputValues used instead)
    worker.postMessage({
      type: 'run',
      code,
      inputValues,
      syncBuffer: syncBuffer ?? null,
      dataBuffer: dataSAB    ?? null,
    })
  })
}
