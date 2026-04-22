import { useState, useEffect } from 'react'
import { initPythonRunner, onPythonReady, onPythonProgress } from '../services/pythonRunner'

export interface PyodideProgress {
  message: string
  pct: number
}

export function usePyodide() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState<PyodideProgress>({
    message: 'Preparing Python environment…',
    pct: 0,
  })

  useEffect(() => {
    initPythonRunner()

    const unsubscribe = onPythonProgress((message, pct) => {
      setProgress({ message, pct })
    })

    onPythonReady(() => {
      setProgress({ message: 'Python ready!', pct: 100 })
      // Small delay so the user sees 100% before the bar disappears
      setTimeout(() => setIsLoading(false), 400)
    })

    return unsubscribe
  }, [])

  return { isLoading, progress }
}
