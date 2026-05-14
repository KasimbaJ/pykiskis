import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { Play, Loader2, Send, RotateCcw, Check } from 'lucide-react'
import { usePyodide } from '../../hooks/usePyodide'
import { runPython } from '../../services/pythonRunner'
import type { ExerciseLesson } from '../../types/basics'
import { renderInline } from './inline'

// Local copy of the output normaliser — keeps ExerciseView self-contained and
// avoids dragging the Level-shaped outputValidator API across module boundaries.
function normalize(text: string): string {
  return text.replace(/\r\n/g, '\n').trimEnd()
}

function validateLessonOutput(lesson: ExerciseLesson, actualOutput: string): boolean {
  const expected = normalize(lesson.expectedOutput)
  const actual   = normalize(actualOutput)
  switch (lesson.validationMode) {
    case 'exact':    return actual === expected
    case 'contains': return actual.includes(expected)
    case 'regex': {
      try { return new RegExp(expected).test(actual) }
      catch { return false }
    }
  }
}

interface Props {
  lesson: ExerciseLesson
  initialCode?: string
  alreadyCompleted?: boolean
  /** Called when the learner submits correct code. */
  onCorrect?: (code: string) => void
  /** Called on every submit attempt regardless of correctness. */
  onAttempt?: () => void
}

// ─────────────────────────────────────────────────────────────────────────────
// ExerciseView — an inline mini code-editor with Run + Submit.
//
// Mirrors the LevelPage editor flow but operates on its own local state so
// every lesson page is independent.  Reuses `runPython` from the shared
// Pyodide worker and `validateOutput` from the existing validator.
//
// validateOutput expects a Level shape, so we synthesise a minimal one from
// the lesson fields it actually reads.
// ─────────────────────────────────────────────────────────────────────────────

export default function ExerciseView({
  lesson,
  initialCode,
  alreadyCompleted,
  onCorrect,
  onAttempt,
}: Props) {
  const { isLoading: pyodideLoading, progress } = usePyodide()
  const [code, setCode] = useState(initialCode ?? lesson.starterCode)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [completedNow, setCompletedNow] = useState(false)

  // Reset editor when the lesson changes (navigation between exercises).
  useEffect(() => {
    setCode(initialCode ?? lesson.starterCode)
    setOutput(null)
    setError(null)
    setCompletedNow(false)
  }, [lesson.slug, initialCode, lesson.starterCode])

  const reset = () => {
    setCode(lesson.starterCode)
    setOutput(null)
    setError(null)
  }

  const validate = (result: { output: string; error: string | null }): boolean => {
    if (result.error) return false
    return validateLessonOutput(lesson, result.output)
  }

  const run = async () => {
    if (isRunning || pyodideLoading) return
    setIsRunning(true)
    setError(null)
    setOutput('')
    const result = await runPython(code, lesson.inputValues ?? [], {
      interactive: !(lesson.inputValues && lesson.inputValues.length > 0),
    })
    setIsRunning(false)
    setOutput(result.output)
    if (result.error) setError(result.error)
  }

  const submit = async () => {
    if (isRunning || pyodideLoading) return
    setIsRunning(true)
    setError(null)
    setOutput('')
    onAttempt?.()
    const result = await runPython(code, lesson.inputValues ?? [], { interactive: false })
    setIsRunning(false)
    setOutput(result.output)
    if (result.error) {
      setError(result.error)
      return
    }
    if (validate(result)) {
      setCompletedNow(true)
      onCorrect?.(code)
    }
  }

  const isComplete = alreadyCompleted || completedNow

  return (
    <div className="space-y-4">
      {/* Problem description */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 space-y-3">
        <h3 className="font-semibold text-slate-800 dark:text-white">Problem</h3>
        {lesson.problemDescription
          .split(/\n\n+/)
          .map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {renderInline(para)}
            </p>
          ))}
        {lesson.remember && lesson.remember.length > 0 && (
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-1.5">Remember:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-200">
              {lesson.remember.map((r, i) => (
                <li key={i}>{renderInline(r)}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Expected Output
          </p>
          <pre className="text-sm font-mono whitespace-pre-wrap break-words rounded bg-slate-900 text-slate-100 p-2">
            {lesson.expectedOutput}
          </pre>
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-lg overflow-hidden border border-slate-700">
        <div className="bg-slate-800 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400 text-sm ml-2">main.py</span>
        </div>
        <CodeMirror
          value={code}
          onChange={setCode}
          extensions={[python()]}
          theme={oneDark}
          height="220px"
          basicSetup={{ lineNumbers: true, foldGutter: false, tabSize: 4 }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={run}
          disabled={isRunning || pyodideLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          Run
        </button>
        <button
          onClick={submit}
          disabled={isRunning || pyodideLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Check Code
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        {pyodideLoading && (
          <span className="self-center text-xs text-slate-500 dark:text-slate-400">
            Loading Python… {progress.pct}%
          </span>
        )}
      </div>

      {/* Output */}
      {(output !== null || error) && (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 font-mono text-sm">
          <div className="px-3 py-1.5 border-b border-slate-700/60 text-[10px] uppercase tracking-wider text-slate-400">
            Output
          </div>
          <pre className="px-3 py-2 whitespace-pre-wrap break-words min-h-[2rem]">
            {output}
            {error && (
              <span className="text-rose-400">{output ? '\n' : ''}{error}</span>
            )}
          </pre>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 rounded-lg border-l-4 border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-900 dark:text-emerald-200">
          <Check className="w-4 h-4 flex-shrink-0 text-emerald-500" />
          <span>Nice work — exercise complete.</span>
        </div>
      )}
    </div>
  )
}
