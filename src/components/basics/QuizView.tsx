import { useState } from 'react'
import { Check, X, Lightbulb } from 'lucide-react'
import type { QuizLesson } from '../../types/basics'
import { renderInline } from './inline'

interface Props {
  lesson: QuizLesson
  initialSelection?: string
  /** Called when the learner gets the answer right (used by the page to mark completion). */
  onCorrect?: (optionId: string) => void
  /** Called on every answer attempt, regardless of correctness. */
  onAttempt?: (optionId: string) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// QuizView — single-question multiple choice with immediate feedback.
//
// Lesson completion happens the first time the user picks the correct option.
// Wrong answers are flagged but don't lock the lesson out — the learner can
// keep trying until they get it right (and we keep the lesson "incomplete"
// in that state).
// ─────────────────────────────────────────────────────────────────────────────

export default function QuizView({
  lesson,
  initialSelection,
  onCorrect,
  onAttempt,
}: Props) {
  const [selected, setSelected] = useState<string | undefined>(initialSelection)
  const [revealed, setRevealed] = useState(!!initialSelection)

  const pick = (optionId: string) => {
    if (revealed && selected === lesson.correctOptionId) return // already correct, lock
    setSelected(optionId)
    setRevealed(true)
    onAttempt?.(optionId)
    if (optionId === lesson.correctOptionId) onCorrect?.(optionId)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white leading-snug">
        {renderInline(lesson.question)}
      </h3>

      <ul className="space-y-2">
        {lesson.options.map((opt) => {
          const isSelected = selected === opt.id
          const isCorrect = opt.id === lesson.correctOptionId
          const showCorrect = revealed && isCorrect
          const showWrong = revealed && isSelected && !isCorrect

          return (
            <li key={opt.id}>
              <button
                onClick={() => pick(opt.id)}
                disabled={revealed && selected === lesson.correctOptionId}
                className={[
                  'w-full flex items-center gap-3 text-left rounded-lg border-2 px-4 py-3 transition-colors',
                  showCorrect && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                  showWrong   && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                  !showCorrect && !showWrong && 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800',
                  revealed && selected === lesson.correctOptionId && 'cursor-default',
                ].filter(Boolean).join(' ')}
              >
                <span
                  className={[
                    'inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-semibold',
                    showCorrect ? 'bg-emerald-500 text-white' :
                    showWrong   ? 'bg-rose-500 text-white' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
                  ].join(' ')}
                >
                  {showCorrect ? <Check className="w-4 h-4" /> :
                   showWrong   ? <X className="w-4 h-4" /> :
                   opt.id.toUpperCase()}
                </span>
                <span className="text-slate-700 dark:text-slate-200">{renderInline(opt.text)}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {revealed && (
        <div className="flex gap-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
          <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
          <p>{renderInline(lesson.explanation)}</p>
        </div>
      )}
    </div>
  )
}
