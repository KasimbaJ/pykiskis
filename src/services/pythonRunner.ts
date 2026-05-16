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

/**
 * Resolves the currently-in-flight runPython promise early.
 * Set at the start of each runPython call; cleared on result, timeout, or stop.
 */
let _resolveCurrentRun: ((result: ExecutionResult) => void) | null = null

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

/**
 * Immediately terminate the running Python worker.
 * Resolves the in-flight runPython promise with stopped: true so callers
 * can skip scoring / error display.  A fresh worker is spawned right away so
 * the user can run code again with minimal delay (Pyodide reloads from cache).
 */
export function stopPython(): void {
  if (!worker) return

  clearTimeout(undefined)               // clearTimeout(undefined) is a no-op; real timer is below
  _rescheduleTimeout = null

  const resolve = _resolveCurrentRun
  _resolveCurrentRun = null
  _inputRequestHandler = null

  worker.terminate()
  worker  = null
  isReady = false

  resolve?.({ output: '', error: null, timedOut: false, stopped: true })

  // Spawn replacement immediately — assets are cached so this is fast
  initPythonRunner()
}

// ─────────────────────────────────────────────────────────────────────────────
// runPython
// ─────────────────────────────────────────────────────────────────────────────

interface RunOptions {
  /**
   * When true (default) and crossOriginIsolated, use the interactive
   * SharedArrayBuffer path so real Python input() prompts work.
   * Pass false for Submit runs where we need deterministic, pre-supplied
   * inputValues for consistent output validation.
   */
  interactive?: boolean
  /** Milliseconds before the run is force-killed (default 30 000). */
  timeoutMs?: number
  /**
   * Non-interactive only.  When true, the mock input() echoes
   * "prompt + value" to stdout so a theory demo reads like a real terminal.
   * Leave false (default) for grading so captured output stays clean.
   */
  echoInput?: boolean
}

export function runPython(
  code:        string,
  inputValues: string[] = [],
  opts:        RunOptions = {},
): Promise<ExecutionResult> {
  const { interactive = true, timeoutMs = 30_000, echoInput = false } = opts

  return new Promise((resolve) => {
    if (!worker || !isReady) {
      resolve({ output: '', error: 'Python is still loading…', timedOut: false })
      return
    }

    // Store so stopPython() can resolve early
    _resolveCurrentRun = resolve

    // ── Timeout management ────────────────────────────────────────────────
    let timeout: ReturnType<typeof setTimeout>

    const scheduleTimeout = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        _resolveCurrentRun = null
        _rescheduleTimeout = null
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
        _resolveCurrentRun = null
        _rescheduleTimeout = null
        clearTimeout(timeout)
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
    // Interactive mode: pass SABs so the worker can block on input().
    // Non-interactive (Submit): pass null — worker uses mock input instead.
    const useInteractive = interactive && !!syncBuffer
    worker.postMessage({
      type: 'run',
      code,
      inputValues,
      echoInput,
      syncBuffer: useInteractive ? syncBuffer : null,
      dataBuffer: useInteractive ? dataSAB    : null,
    })
  })
}
