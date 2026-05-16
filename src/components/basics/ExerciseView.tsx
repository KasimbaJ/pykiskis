import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import {
  Play, Loader2, Send, RotateCcw, Check,
  CheckCircle2, XCircle, ArrowRight,
} from 'lucide-react'
import { usePyodide } from '../../hooks/usePyodide'
import { runPython } from '../../services/pythonRunner'
import { cleanPythonError } from '../../services/pythonError'
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
  /** Feedback shown after a Check Code submission. null = no modal. */
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)

  // Note: LessonPage gives this component a `key` so it fully remounts when
  // the learner navigates to a different lesson — no reset effect needed.

  const reset = () => {
    setCode(lesson.starterCode)
    setOutput(null)
    setError(null)
    setFeedback(null)
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
      echoInput: true,
    })
    setIsRunning(false)
    setOutput(result.output)
    if (result.error) setError(cleanPythonError(result.error))
  }

  const submit = async () => {
    if (isRunning || pyodideLoading) return
    setIsRunning(true)
    setError(null)
    setOutput('')
    setFeedback(null)
    onAttempt?.()
    const result = await runPython(code, lesson.inputValues ?? [], { interactive: false })
    setIsRunning(false)
    setOutput(result.output)

    if (result.error) {
      // Python raised an error — definitely not a pass.
      setError(cleanPythonError(result.error))
      setFeedback('error')
      return
    }
    if (validate(result)) {
      setCompletedNow(true)
      setFeedback('success')
      onCorrect?.(code)
    } else {
      // Ran fine but output doesn't match the expected output.
      setFeedback('error')
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

      {/* Feedback modal — shown after every Check Code submission */}
      {feedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="text-center mb-3">
              {feedback === 'success' ? (
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              ) : (
                <XCircle className="w-14 h-14 text-rose-500 mx-auto" />
              )}
            </div>
            <h2
              className={`text-2xl font-bold text-center mb-2 ${
                feedback === 'success' ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {feedback === 'success' ? 'Correct!' : 'Not Quite Right'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-center mb-4">
              {feedback === 'success'
                ? 'Great work — your output matches. Hit Next to continue.'
                : error
                  ? 'Your code raised an error. Check the Output panel and try again.'
                  : "Your output doesn't match the expected output yet. Compare them below and try again."}
            </p>

            {/* Wrong-but-ran: show expected vs actual for comparison */}
            {feedback === 'error' && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Expected
                  </p>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-words rounded bg-slate-900 text-emerald-300 p-2 min-h-[3rem]">
                    {lesson.expectedOutput}
                  </pre>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Your output
                  </p>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-words rounded bg-slate-900 text-rose-300 p-2 min-h-[3rem]">
                    {output || '(no output)'}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              {feedback === 'success' ? (
                <button
                  onClick={() => setFeedback(null)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setFeedback(null)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Keep Trying
                  </button>
                  <button
                    onClick={() => { setFeedback(null); reset() }}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Code
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
