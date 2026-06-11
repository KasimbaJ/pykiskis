import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Plus, Trash2, Loader2, CalendarClock, ClipboardList } from 'lucide-react'
import type { StudentProgress } from '../../types'
import { useAssignmentsStore } from '../../stores/useAssignmentsStore'
import { progressTestsByChapter } from '../../data/basics/index'
import { useT } from '../../i18n-ui'

interface Props {
  classId: string
  /** The class's member students (with their test scores). */
  students: StudentProgress[]
}

// Assignable tests, flattened from the course data (one picker, small list).
const TEST_OPTIONS = progressTestsByChapter().flatMap((g) =>
  g.tests.map((t) => ({ key: t.key, label: `Ch ${g.chapterId} · ${t.label}` })),
)

function scoreClass(score: number): string {
  if (score >= 7) return 'text-emerald-700'
  if (score >= 4) return 'text-amber-600'
  return 'text-rose-600'
}

export default function ClassAssignments({ classId, students }: Props) {
  const t = useT()
  const { getToken } = useAuth()
  const all = useAssignmentsStore((s) => s.assignments)
  const create = useAssignmentsStore((s) => s.create)
  const remove = useAssignmentsStore((s) => s.remove)
  const assignments = all.filter((a) => a.classId === classId)

  const [testKey, setTestKey] = useState(TEST_OPTIONS[0]?.key ?? '')
  const [dueDate, setDueDate] = useState('')
  const [busy, setBusy] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const add = async () => {
    const opt = TEST_OPTIONS.find((o) => o.key === testKey)
    if (!opt || busy) return
    setBusy(true)
    try {
      const token = await getToken()
      if (token)
        await create(token, {
          classId,
          contentType: 'test',
          contentKey: testKey,
          title: opt.label,
          dueDate: dueDate || null,
        })
      setDueDate('')
    } finally {
      setBusy(false)
    }
  }

  const del = async (id: string) => {
    const token = await getToken()
    if (token) await remove(token, id)
  }

  return (
    <div className="space-y-4">
      {/* Create an assignment */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-blue-600" /> {t('assignments.assignTest')}
        </h3>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-xs text-slate-500">
            {t('assignments.testLabel')}
            <select
              value={testKey}
              onChange={(e) => setTestKey(e.target.value)}
              className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TEST_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-500">
            {t('assignments.dueDate')}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            onClick={add}
            disabled={busy || !testKey}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {t('assign')}
          </button>
        </div>
      </div>

      {/* Existing assignments + completion */}
      {assignments.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <ClipboardList className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <p className="text-slate-400 text-sm">{t('assignments.noAssignments')}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {assignments.map((a) => {
            const scores = students
              .map((s) => s.basics?.testScores[a.contentKey])
              .filter((v): v is number => v != null)
            const done = scores.length
            const total = students.length
            const avg = done ? scores.reduce((x, y) => x + y, 0) / done : null
            const notDone = students.filter((s) => s.basics?.testScores[a.contentKey] == null)
            const overdue = a.dueDate != null && a.dueDate < today && done < total

            return (
              <li key={a.id} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">{a.title}</p>
                    <p className={`text-xs mt-0.5 flex items-center gap-1 ${overdue ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
                      <CalendarClock className="w-3.5 h-3.5" />
                      {a.dueDate
                        ? (overdue ? t('assignments.dueOverdue', { date: a.dueDate }) : t('assignments.due', { date: a.dueDate }))
                        : t('assignments.noDueDate')}
                    </p>
                  </div>
                  <button
                    onClick={() => del(a.id)}
                    className="text-slate-300 hover:text-rose-500"
                    title={t('assignments.remove')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="text-slate-600">
                    {t('assignments.completed', { done, total })}
                  </span>
                  {avg != null && (
                    <span className="text-slate-600">
                      <strong className={scoreClass(avg)}>{t('assignments.avg', { avg: avg.toFixed(1) })}</strong>
                    </span>
                  )}
                  {/* progress bar */}
                  <span className="flex-1 min-w-[4rem] max-w-[12rem] h-2 rounded-full bg-slate-200 overflow-hidden">
                    <span
                      className="block h-full bg-blue-600 rounded-full"
                      style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                    />
                  </span>
                </div>

                {notDone.length > 0 && (
                  <p className="mt-2 text-xs text-slate-400">
                    {t('assignments.notDone', { names: notDone.map((s) => s.studentName).join(', ') })}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
