import { useCallback } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useEditorStore } from '../stores/useEditorStore'
import { useProgressStore } from '../stores/useProgressStore'
import { runPython, setInputRequestHandler } from '../services/pythonRunner'
import { validateOutput, validateTheoryAnswer } from '../services/outputValidator'
import { syncLevelCompletion } from '../services/progressApi'
import type { Level } from '../types'

// ── Error cleaning ────────────────────────────────────────────────────────────
/**
 * Strip Pyodide/CPython internal frames from a Python traceback so students
 * only see lines that reference their own code.
 */
function cleanPythonError(raw: string): string {
  if (!raw) return raw
  const lines = raw.split('\n')
  const output: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Keep "Traceback…" header as-is
    if (line.startsWith('Traceback (most recent call last):')) {
      output.push(line)
      i++
      continue
    }

    // Frame entry — skip Pyodide / CPython internal files
    if (line.startsWith('  File ')) {
      const isInternal =
        /\/lib\/python/.test(line) ||
        /site-packages\/pyodide/.test(line) ||
        /_bootstrap/.test(line) ||
        /importlib/.test(line) ||
        /\/pyodide\//.test(line)

      if (isInternal) {
        // Skip frame header + any indented source-snippet lines below it
        i++
        while (i < lines.length && lines[i].startsWith('    ')) i++
        continue
      }
    }

    output.push(line)
    i++
  }

  // Remove trailing blank lines
  while (output.length && output[output.length - 1].trim() === '') output.pop()

  return output.join('\n')
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useCodeExecution(level: Level) {
  const { getToken } = useAuth()
  const {
    code, setOutput, setError, setIsRunning,
    setFeedbackType, setShowSolution, setPendingInput,
  } = useEditorStore()
  const { completeLevel, recordAttempt } = useProgressStore()

  // Fire-and-forget D1 sync after a successful submission
  const syncToD1 = useCallback(
    (levelId: number, code: string) => {
      getToken()
        .then((token) => {
          if (!token) return
          const s = useProgressStore.getState()
          const lp = s.levels[levelId]
          return syncLevelCompletion(token, {
            name: s.studentName,
            currentStreak: s.currentStreak,
            bestStreak: s.bestStreak,
            lastActiveAt: s.lastActiveAt,
            lastStreakDate: s.lastStreakDate,
            levelId,
            completed: true,
            attempts: lp?.attempts ?? 1,
            completedAt: lp?.completedAt,
            bestCode: code,
          })
        })
        .catch(console.error)
    },
    [getToken],
  )

  const execute = useCallback(async () => {
    if (level.levelMode === 'theory') return
    setIsRunning(true)
    setOutput('')
    setError(null)
    setFeedbackType(null)
    setPendingInput(null)

    // Register input handler so Python's input() shows a prompt in the output panel
    setInputRequestHandler((prompt, partialOutput) => {
      setPendingInput({ prompt, partialOutput })
    })

    const result = await runPython(code, level.inputValues ?? [])

    setInputRequestHandler(null)
    setPendingInput(null)
    setOutput(result.output)
    setIsRunning(false)

    if (result.stopped) return  // user pressed Stop — nothing to display
    if (result.error) setError(cleanPythonError(result.error))
  }, [code, level, setOutput, setError, setIsRunning, setFeedbackType, setPendingInput])

  const submit = useCallback(async () => {
    setIsRunning(true)
    setOutput('')
    setError(null)
    setFeedbackType(null)
    setShowSolution(false)
    setPendingInput(null)

    // Theory mode: validate code text directly, no Pyodide
    if (level.levelMode === 'theory') {
      const isCorrect = validateTheoryAnswer(level, code)
      setIsRunning(false)
      if (isCorrect) {
        completeLevel(level.id, code)
        setFeedbackType('success')
        syncToD1(level.id, code)
      } else {
        recordAttempt(level.id)
        setFeedbackType('error')
        // Reveal solution only after 3 failed attempts
        const attempts = useProgressStore.getState().levels[level.id]?.attempts ?? 1
        if (attempts >= 3) setShowSolution(true)
      }
      return
    }

    // Code mode: execute in Pyodide then validate output.
    // Submit uses non-interactive mode so pre-supplied inputValues are used
    // deterministically — the graded output is always consistent.
    setInputRequestHandler((prompt, partialOutput) => {
      setPendingInput({ prompt, partialOutput })
    })

    const result = await runPython(code, level.inputValues ?? [], { interactive: false })

    setInputRequestHandler(null)
    setPendingInput(null)
    setOutput(result.output)
    setIsRunning(false)

    if (result.stopped) return  // user pressed Stop — skip scoring entirely

    if (result.error) {
      setError(cleanPythonError(result.error))
      recordAttempt(level.id)
      setFeedbackType('error')
      const attempts = useProgressStore.getState().levels[level.id]?.attempts ?? 1
      if (attempts >= 3) setShowSolution(true)
      return
    }

    const isCorrect = validateOutput(level, result.output)

    if (isCorrect) {
      completeLevel(level.id, code)
      setFeedbackType('success')
      syncToD1(level.id, code)
    } else {
      recordAttempt(level.id)
      setFeedbackType('error')
      const attempts = useProgressStore.getState().levels[level.id]?.attempts ?? 1
      if (attempts >= 3) setShowSolution(true)
    }
  }, [
    code, level,
    setOutput, setError, setIsRunning, setFeedbackType, setShowSolution,
    setPendingInput, completeLevel, recordAttempt, syncToD1,
  ])

  return { execute, submit }
}
