import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { CalendarClock, Check, ChevronRight, ClipboardList } from 'lucide-react'
import type { MyAssignment } from '../../types'
import { fetchMyAssignments } from '../../services/progressApi'

// ─────────────────────────────────────────────────────────────────────────────
// MyAssignments — the signed-in student's assigned work (from their classes),
// with due dates, done/overdue status, and a deep link into each item.
// Renders nothing while loading or when the student has no assignments, so the
// home page is unchanged for students without classes.
// ─────────────────────────────────────────────────────────────────────────────

/** Deep link for an assignment's content. */
function linkFor(a: MyAssignment): string {
  if (a.contentType === 'level') return `/level/${a.contentKey}`
  // lesson / test keys are composite: chapter.module.lesson
  const [chapter, module, lesson] = a.contentKey.split('.')
  return `/basics/${chapter}/${module}/${lesson}`
}

export default function MyAssignments() {
  const { getToken } = useAuth()
  const [assignments, setAssignments] = useState<MyAssignment[]>([])

  useEffect(() => {
    let cancelled = false
    getToken()
      .then(async (token) => {
        if (!token) return
        const list = await fetchMyAssignments(token)
        if (!cancelled) setAssignments(list)
      })
      .catch(() => {}) // panel is optional — fail silently
    return () => { cancelled = true }
  }, [getToken])

  if (assignments.length === 0) return null

  const today = new Date().toISOString().slice(0, 10)
  const open = assignments.filter((a) => !a.done)
  const done = assignments.filter((a) => a.done)

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
      <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white mb-3">
        <ClipboardList className="w-5 h-5 text-indigo-600" />
        My assignments
        {open.length > 0 && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
            {open.length} to do
          </span>
        )}
      </h2>

      <ul className="space-y-2">
        {[...open, ...done].map((a) => {
          const overdue = !a.done && a.dueDate != null && a.dueDate < today
          return (
            <li key={a.id}>
              <Link
                to={linkFor(a)}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2.5 hover:border-indigo-400 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {a.done ? (
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  ) : (
                    <span className={`shrink-0 w-6 h-6 rounded-full border-2 ${overdue ? 'border-rose-400' : 'border-slate-300 dark:border-slate-600'}`} />
                  )}
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${a.done ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                      {a.title}
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${overdue ? 'text-rose-600 font-medium' : 'text-slate-400 dark:text-slate-500'}`}>
                      <CalendarClock className="w-3 h-3" />
                      {a.dueDate ? `Due ${a.dueDate}${overdue ? ' · overdue' : ''}` : 'No due date'}
                      {a.done && a.score != null && <span className="ml-1 text-emerald-600 no-underline">· {a.score}/10</span>}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
