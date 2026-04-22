import type { ExecutionResult } from '../types'

// ── SharedArrayBuffer layout (64 KB total) ─────────────────────────────────────
//  Bytes  0– 3 : Int32  control flag  (0 = worker waiting, 1 = input ready)
//  Bytes  4– 7 : Int32  payload length in bytes
//  Bytes  8–+  : Uint8  UTF-8 encoded input string (up to 65 528 bytes)
const BUF_SIZE = 4 + 4 + 65_528

let sharedBuffer: SharedArrayBuffer | null = null
let controlArr:   Int32Array  | null = null
let dataLenArr:   Int32Array  | null = null
let dataArr:      Uint8Array  | null = null

function ensureSharedBuffer() {
  if (sharedBuffer) return
  if (typeof SharedArrayBuffer === 'undefined') return
  // crossOriginIsolated is required for SharedArrayBuffer + Atomics
  if (!self.crossOriginIsolated) return
  sharedBuffer = new SharedArrayBuffer(BUF_SIZE)
  controlArr   = new Int32Array(sharedBuffer, 0, 1)
  dataLenArr   = new Int32Array(sharedBuffer, 4, 1)
  dataArr      = new Uint8Array(sharedBuffer, 8)
}

/** Write a student's typed value into the shared buffer and wake the worker. */
export function provideInput(value: string): void {
  if (!controlArr || !dataLenArr || !dataArr) return
  const encoded = new TextEncoder().encode(value)
  const slice   = encoded.slice(0, BUF_SIZE - 8)
  dataArr.set(slice)
  Atomics.store(dataLenArr, 0, slice.length)
  Atomics.store(controlArr, 0, 1)
  Atomics.notify(controlArr, 0)
}

// ── Worker singleton ────────────────────────────────────────────────────────────
let worker:             Worker   | null = null
let isReady                             = false
let onReadyCallbacks:   (() => void)[]                              = []
let onProgressCallbacks: ((message: string, pct: number) => void)[] = []
let onInputRequestCb:   ((prompt: string, partialOutput: string) => void) | null = null

/** Register a callback that fires whenever Python calls input(). */
export function setInputRequestHandler(
  cb: ((prompt: string, partialOutput: string) => void) | null,
): void {
  onInputRequestCb = cb
}

export function initPythonRunner(): void {
  if (worker) return

  worker = new Worker('/pyodide-worker.js')
  worker.onmessage = (event) => {
    const { type } = event.data
    if (type === 'ready') {
      isReady = true
      onReadyCallbacks.forEach((cb) => cb())
      onReadyCallbacks = []
    } else if (type === 'progress') {
      onProgressCallbacks.forEach((cb) => cb(event.data.message, event.data.pct))
    }
    // input_request is handled per-run inside runPython below
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

// ── runPython ───────────────────────────────────────────────────────────────────

export function runPython(
  code:        string,
  inputValues: string[] = [],
  timeoutMs  = 30_000,
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    if (!worker || !isReady) {
      resolve({ output: '', error: 'Python is still loading...', timedOut: false })
      return
    }

    ensureSharedBuffer()

    // Reset the timeout each time the worker asks for input (gives the student
    // timeoutMs to type before the run is killed).
    let timeout: ReturnType<typeof setTimeout>
    const scheduleTimeout = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        worker!.terminate()
        worker = null
        isReady = false
        onInputRequestCb = null
        initPythonRunner()
        resolve({ output: '', error: 'Execution timed out. Check for infinite loops.', timedOut: true })
      }, timeoutMs)
    }
    scheduleTimeout()

    const handler = (event: MessageEvent) => {
      const { type } = event.data

      if (type === 'result') {
        clearTimeout(timeout)
        worker!.removeEventListener('message', handler)
        resolve({
          output:   event.data.output,
          error:    event.data.error,
          timedOut: false,
        })
      } else if (type === 'input_request') {
        // Reset timeout — user now has a fresh window to type
        scheduleTimeout()
        onInputRequestCb?.(event.data.prompt ?? '', event.data.partialOutput ?? '')
      }
    }

    worker.addEventListener('message', handler)
    worker.postMessage({ type: 'run', code, inputValues, sharedBuffer })
  })
}
