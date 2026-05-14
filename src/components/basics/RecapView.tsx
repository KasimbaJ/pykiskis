import { BadgeCheck, ArrowRight } from 'lucide-react'
import type { RecapLesson } from '../../types/basics'
import { renderInline } from './inline'

interface Props {
  lesson: RecapLesson
  /** Optional context shown at the bottom — populated from the page. */
  moduleTitle?: string
  /** Total / completed within this module so the recap can show progress. */
  moduleProgress?: { completed: number; total: number }
}

// ─────────────────────────────────────────────────────────────────────────────
// RecapView — the "Congrats, you finished module X" celebration screen.
// ─────────────────────────────────────────────────────────────────────────────

export default function RecapView({ lesson, moduleTitle, moduleProgress }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-900 p-8 text-center">
        <BadgeCheck className="w-14 h-14 mx-auto text-emerald-500 mb-3" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {lesson.congratsTitle} 🎉
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          {renderInline(lesson.summary)}
        </p>
      </div>

      {moduleTitle && moduleProgress && (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            You have completed{' '}
            <strong className="text-slate-900 dark:text-white">
              {moduleProgress.completed}/{moduleProgress.total}
            </strong>{' '}
            lessons of <strong className="text-slate-900 dark:text-white">{moduleTitle}</strong>.
          </p>
        </div>
      )}

      {lesson.nextModuleTitle && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm">
            Next up <ArrowRight className="w-4 h-4" /> {lesson.nextModuleTitle}
          </div>
        </div>
      )}
    </div>
  )
}
