import { Download, Trophy, Users } from 'lucide-react'
import type { StudentProgress } from '../../types'
import { progressTestsByChapter } from '../../data/basics/index'

interface Props {
  students: StudentProgress[]
}

// One CSV field, quoted only if it contains a comma, quote, or newline.
function csvField(s: string): string {
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

// Score → cell colour (suggested passing score is 7/10).
function scoreClass(score: number): string {
  if (score >= 7) return 'text-emerald-700'
  if (score >= 4) return 'text-amber-600'
  return 'text-rose-600'
}

export default function ClassScoresTable({ students }: Props) {
  const groups = progressTestsByChapter()
  const cols = groups.flatMap((g) => g.tests)

  const avgOf = (s: StudentProgress): number | null => {
    const taken = cols
      .map((c) => s.basics?.testScores[c.key])
      .filter((v): v is number => v != null)
    return taken.length ? taken.reduce((a, b) => a + b, 0) / taken.length : null
  }

  const downloadCsv = () => {
    const header = ['Student', ...cols.map((c) => c.label), 'Average']
    const rows = students.map((s) => {
      const cells = cols.map((c) => {
        const v = s.basics?.testScores[c.key]
        return v != null ? String(v) : ''
      })
      const avg = avgOf(s)
      return [s.studentName, ...cells, avg != null ? avg.toFixed(1) : '']
    })
    const csv = [header, ...rows].map((r) => r.map(csvField).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pykiskis-scores-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-600 mb-1">No Students Yet</h3>
        <p className="text-slate-400 text-sm">Scores will appear here once students take a test.</p>
      </div>
    )
  }

  if (cols.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-600 mb-1">No Tests Yet</h3>
        <p className="text-slate-400 text-sm">Progress tests will appear here as chapters are published.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-slate-500">
          Best score per test, out of 10. <span className="text-slate-400">— = not taken.</span>
        </p>
        <button
          onClick={downloadCsv}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
        >
          <Download className="w-4 h-4" />
          Download CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {/* Chapter group headers */}
            <tr className="bg-slate-50 border-b border-slate-200">
              <th
                rowSpan={2}
                className="sticky left-0 z-10 bg-slate-50 text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase"
              >
                Student
              </th>
              {groups.map((g) => (
                <th
                  key={g.chapterId}
                  colSpan={g.tests.length}
                  className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase border-l border-slate-200"
                >
                  Ch {g.chapterId} · {g.chapterTitle}
                </th>
              ))}
              <th
                rowSpan={2}
                className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase border-l border-slate-200"
              >
                Average
              </th>
            </tr>
            {/* Test labels */}
            <tr className="bg-slate-50 border-b border-slate-200">
              {cols.map((c) => (
                <th key={c.key} className="text-center px-3 py-2 text-[11px] font-medium text-slate-500 border-l border-slate-100 whitespace-nowrap">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const avg = avgOf(s)
              return (
                <tr key={s.studentName} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-4 py-2.5 font-medium text-slate-800 whitespace-nowrap">
                    {s.studentName}
                  </td>
                  {cols.map((c) => {
                    const v = s.basics?.testScores[c.key]
                    return (
                      <td key={c.key} className="text-center px-3 py-2.5 border-l border-slate-100 tabular-nums">
                        {v != null ? (
                          <span className={`font-semibold ${scoreClass(v)}`}>{v}/10</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    )
                  })}
                  <td className="text-center px-3 py-2.5 border-l border-slate-200 tabular-nums">
                    {avg != null ? (
                      <span className={`font-semibold ${scoreClass(avg)}`}>{avg.toFixed(1)}</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
