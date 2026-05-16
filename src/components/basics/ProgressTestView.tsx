import { useMemo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { Check, X, Trophy, RotateCcw, Send, Loader2 } from 'lucide-react'
import type {
  ProgressTestLesson,
  ProgressTestQuestion,
  MCQQuestion,
  PredictOutputQuestion,
  FillInBlankQuestion,
} from '../../types/basics'
import { renderInline } from './inline'

// ─────────────────────────────────────────────────────────────────────────────
// ProgressTestView — multi-question checkpoint scored out of 10.
//
// Each attempt presents a fresh random draw from the lesson's question bank(s)
// — 10 for a module test, 20 for the Final Test.  All questions show at once;
// the learner answers each then hits "Submit Test".  Score appears with
// per-question feedback.  "Retake" re-rolls the draw and resets answers but
// keeps the bestScore in the parent store.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  lesson: ProgressTestLesson
  bestScore?: number
  /** Called when the learner submits (score is 0-totalQuestions). */
  onSubmit?: (score: number) => void
}

type Answer = string  // option id for mcq, raw text for predict-output / fill-in-blank

function normalize(text: string): string {
  return text.replace(/\r\n/g, '\n').trimEnd()
}

function isCorrect(q: ProgressTestQuestion, answer: Answer | undefined): boolean {
  if (answer == null) return false
  switch (q.qType) {
    case 'mcq':
      return answer === q.correctOptionId
    case 'predict-output':
      return normalize(answer) === normalize(q.expectedOutput)
    case 'fill-in-blank':
      return q.acceptedAnswers
        .map((a) => a.trim().toLowerCase())
        .includes(answer.trim().toLowerCase())
  }
}

// ── Question selection ───────────────────────────────────────────────────────

/** Fisher–Yates shuffle — returns a new array, leaves the input untouched. */
function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Draw the questions for one attempt: an even share from each bank — 10/1 for
 * a module test, 20/4 for the Final Test — then shuffle the combined set so
 * the banks are interleaved rather than grouped.
 */
function selectQuestions(lesson: ProgressTestLesson): ProgressTestQuestion[] {
  const banks = lesson.questionBanks
  const perBank = Math.floor(lesson.presentCount / banks.length)
  return shuffle(banks.flatMap((bank) => shuffle(bank).slice(0, perBank)))
}

export default function ProgressTestView({ lesson, bestScore, onSubmit }: Props) {
  // A fresh random draw from the bank(s) — re-rolled on Retake.
  const [questions, setQuestions] = useState<ProgressTestQuestion[]>(
    () => selectQuestions(lesson),
  )
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Note: LessonPage gives this component a `key` so it fully remounts when
  // the learner navigates to a different test — no reset effect needed.

  const total = questions.length

  const correct = useMemo(
    () => questions.filter((q) => isCorrect(q, answers[q.id])).length,
    [questions, answers],
  )
  // Every test is graded out of 10, however many questions are shown.
  const score10 = Math.round((correct / total) * 10)

  const allAnswered = questions.every((q) => {
    const v = answers[q.id]
    return v != null && String(v).trim() !== ''
  })

  const submit = () => {
    if (!allAnswered || submitting) return
    setSubmitting(true)
    // tiny delay so the button briefly shows the loading spinner — feels like grading
    setTimeout(() => {
      setSubmitted(true)
      setShowResults(true)
      setSubmitting(false)
      onSubmit?.(score10)
    }, 250)
  }

  const retake = () => {
    setQuestions(selectQuestions(lesson))
    setAnswers({})
    setSubmitted(false)
    setShowResults(false)
  }

  return (
    <div className="space-y-6">
      {/* Intro / score banner */}
      <div className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">Progress Test</h3>
          </div>
          {bestScore != null && (
            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
              Best: <strong>{bestScore}/10</strong>
            </span>
          )}
        </div>
        <p className="text-sm text-indigo-900 dark:text-indigo-200">{renderInline(lesson.intro)}</p>
        <p className="text-xs mt-2 text-indigo-700 dark:text-indigo-300">
          {total} questions · graded out of 10 · suggested passing score {lesson.passingScore}/10 · unlimited retakes
        </p>
      </div>

      {/* Questions */}
      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li
            key={q.id}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4"
          >
            <div className="flex items-start gap-2 mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                Q{i + 1}.
              </span>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {renderInline(q.prompt)}
                </p>
              </div>
              {showResults && (
                <ResultBadge correct={isCorrect(q, answers[q.id])} />
              )}
            </div>

            <QuestionInput
              question={q}
              answer={answers[q.id]}
              disabled={submitted}
              onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
            />

            {showResults && (
              <ExplanationBlock
                question={q}
                answer={answers[q.id]}
              />
            )}
          </li>
        ))}
      </ol>

      {/* Submit / Retake */}
      <div className="sticky bottom-16 sm:bottom-20 z-10 flex items-center justify-between gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 shadow-lg">
        {!submitted ? (
          <>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {Object.keys(answers).filter((k) => answers[k] != null && String(answers[k]).trim() !== '').length}
              /{total} answered
            </span>
            <button
              onClick={submit}
              disabled={!allAnswered || submitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit Test
            </button>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {correct} / {total} correct · Score:{' '}
                <span className="text-indigo-600">{score10} / 10</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {score10 >= lesson.passingScore
                  ? "Nice work — that's a pass!"
                  : 'Retake the test to improve your grade.'}
              </p>
            </div>
            <button
              onClick={retake}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4" />
              Retake
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Per-type question input ──────────────────────────────────────────────────

function QuestionInput({
  question, answer, disabled, onChange,
}: {
  question: ProgressTestQuestion
  answer: Answer | undefined
  disabled: boolean
  onChange: (v: Answer) => void
}) {
  switch (question.qType) {
    case 'mcq':     return <MCQInput          q={question} answer={answer} disabled={disabled} onChange={onChange} />
    case 'predict-output': return <PredictOutputInput q={question} answer={answer} disabled={disabled} onChange={onChange} />
    case 'fill-in-blank':  return <FillInBlankInput   q={question} answer={answer} disabled={disabled} onChange={onChange} />
  }
}

function MCQInput({
  q, answer, disabled, onChange,
}: {
  q: MCQQuestion
  answer: Answer | undefined
  disabled: boolean
  onChange: (v: Answer) => void
}) {
  return (
    <ul className="space-y-1.5">
      {q.options.map((opt) => {
        const selected = answer === opt.id
        return (
          <li key={opt.id}>
            <label
              className={[
                'flex items-center gap-3 rounded-md border-2 px-3 py-2 cursor-pointer text-sm transition-colors',
                selected
                  ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800',
                disabled && 'cursor-not-allowed opacity-90',
              ].filter(Boolean).join(' ')}
            >
              <input
                type="radio"
                name={q.id}
                value={opt.id}
                checked={selected}
                disabled={disabled}
                onChange={() => onChange(opt.id)}
                className="accent-indigo-600"
              />
              <span className="text-slate-700 dark:text-slate-200">{renderInline(opt.text)}</span>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

function PredictOutputInput({
  q, answer, disabled, onChange,
}: {
  q: PredictOutputQuestion
  answer: Answer | undefined
  disabled: boolean
  onChange: (v: Answer) => void
}) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg overflow-hidden border border-slate-700">
        <CodeMirror
          value={q.code}
          extensions={[python(), EditorView.editable.of(false)]}
          theme={oneDark}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: false,
            foldGutter: false,
            tabSize: 4,
            highlightActiveLine: false,
          }}
        />
      </div>
      <label className="block">
        <span className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
          Predict the output:
        </span>
        <textarea
          rows={2}
          value={answer ?? ''}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type the exact output here…"
          className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-90 disabled:cursor-not-allowed"
        />
      </label>
    </div>
  )
}

function FillInBlankInput({
  q, answer, disabled, onChange,
}: {
  q: FillInBlankQuestion
  answer: Answer | undefined
  disabled: boolean
  onChange: (v: Answer) => void
}) {
  return (
    <div>
      <input
        type="text"
        value={answer ?? ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your answer…"
        className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-90 disabled:cursor-not-allowed"
      />
      {q.hint && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hint: {q.hint}</p>
      )}
    </div>
  )
}

// ── Result badges + explanations ─────────────────────────────────────────────

function ResultBadge({ correct }: { correct: boolean }) {
  return correct ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
      <Check className="w-3 h-3" /> Correct
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
      <X className="w-3 h-3" /> Wrong
    </span>
  )
}

function ExplanationBlock({
  question, answer,
}: {
  question: ProgressTestQuestion
  answer: Answer | undefined
}) {
  const correct = isCorrect(question, answer)
  let correctText: string | null = null
  switch (question.qType) {
    case 'mcq':
      correctText = question.options.find((o) => o.id === question.correctOptionId)?.text ?? null
      break
    case 'predict-output':
      correctText = question.expectedOutput
      break
    case 'fill-in-blank':
      correctText = question.acceptedAnswers[0]
      break
  }

  return (
    <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-2">
      {!correct && correctText != null && (
        <p>
          <strong>Correct answer:</strong>{' '}
          {question.qType === 'predict-output' ? (
            <code className="font-mono">{correctText}</code>
          ) : (
            renderInline(correctText)
          )}
        </p>
      )}
      {question.explanation && (
        <p>{renderInline(question.explanation)}</p>
      )}
    </div>
  )
}
