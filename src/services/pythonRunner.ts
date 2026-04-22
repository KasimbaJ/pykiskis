import type { ExecutionResult } from '../types'

let worker: Worker | null = null
let isReady = false
let onReadyCallbacks: (() => void)[] = []
let onProgressCallbacks: ((message: string, pct: number) => void)[] = []

export function initPythonRunner(): void {
  if (worker) return

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

export function isPythonReady(): boolean {
  return isReady
}

export function onPythonReady(callback: () => void): void {
  if (isReady) {
    callback()
  } else {
    onReadyCallbacks.push(callback)
  }
}

export function onPythonProgress(
  callback: (message: string, pct: number) => void
): () => void {
  onProgressCallbacks.push(callback)
  // Return cleanup function so callers can unsubscribe
  return () => {
    onProgressCallbacks = onProgressCallbacks.filter((cb) => cb !== callback)
  }
}

export function runPython(
  code: string,
  inputValues: string[] = [],
  timeoutMs = 15000
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    if (!worker || !isReady) {
      resolve({ output: '', error: 'Python is still loading...', timedOut: false })
      return
    }

    const timeout = setTimeout(() => {
      worker!.terminate()
      worker = null
      isReady = false
      initPythonRunner()
      resolve({ output: '', error: 'Execution timed out. Check for infinite loops.', timedOut: true })
    }, timeoutMs)

    const handler = (event: MessageEvent) => {
      if (event.data.type === 'result') {
        clearTimeout(timeout)
        worker!.removeEventListener('message', handler)
        resolve({
          output: event.data.output,
          error: event.data.error,
          timedOut: false,
        })
      }
    }

    worker.addEventListener('message', handler)
    worker.postMessage({ type: 'run', code, inputValues })
  })
}
