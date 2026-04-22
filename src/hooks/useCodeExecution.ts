import { useCallback } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useEditorStore } from '../stores/useEditorStore'
import { useProgressStore } from '../stores/useProgressStore'
import { runPython } from '../services/pythonRunner'
import { validateOutput, validateTheoryAnswer } from '../services/outputValidator'
import { syncLevelCompletion } from '../services/progressApi'
import type { Level } from '../types'

export function useCodeExecution(level: Level) {
  const { getToken } = useAuth()
  const { code, setOutput, setError, setIsRunning, setFeedbackType, setShowSolution } =
    useEditorStore()
  const { completeLevel, recordAttempt, breakStreak } = useProgressStore()

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

    const result = await runPython(code, level.inputValues ?? [])
    setOutput(result.output)
    setIsRunning(false)

    if (result.error) setError(result.error)
  }, [code, level, setOutput, setError, setIsRunning, setFeedbackType])

  const submit = useCallback(async () => {
    setIsRunning(true)
    setOutput('')
    setError(null)
    setFeedbackType(null)
    setShowSolution(false)

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
        breakStreak()
        setFeedbackType('error')
        setShowSolution(true)
      }
      return
    }

    // Code mode: execute in Pyodide then validate output
    const result = await runPython(code, level.inputValues ?? [])
    setOutput(result.output)
    setIsRunning(false)

    if (result.error) {
      setError(result.error)
      recordAttempt(level.id)
      breakStreak()
      setFeedbackType('error')
      setShowSolution(true)
      return
    }

    const isCorrect = validateOutput(level, result.output)

    if (isCorrect) {
      completeLevel(level.id, code)
      setFeedbackType('success')
      syncToD1(level.id, code)
    } else {
      recordAttempt(level.id)
      breakStreak()
      setFeedbackType('error')
      setShowSolution(true)
    }
  }, [
    code,
    level,
    setOutput,
    setError,
    setIsRunning,
    setFeedbackType,
    setShowSolution,
    completeLevel,
    recordAttempt,
    breakStreak,
    syncToD1,
  ])

  return { execute, submit }
}
