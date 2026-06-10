import { useMemo, useState } from 'react'
import { Download, Trophy, Users, ChevronUp, ChevronDown } from 'lucide-react'
import type { StudentProgress } from '../../types'
import { progressTestsByChapter } from '../../data/basics/index'
import { t } from '../../i18n'
import { useLangStore } from '../../stores/useLangStore'

interface Props {
  students: StudentProgress[]
}

// Sort key: a test lesson key, 'name', 'avg', or null (original order).
type SortCol = string | 'name' | 'avg' | null
interface SortState { col: SortCol; dir: 'asc' | 'desc' }

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

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  if (!active) return null
  return dir === 'asc' ? (
    <ChevronUp className="inline w-3 h-3 ml-0.5" />
  ) : (
    <ChevronDown className="inline w-3 h-3 ml-0.5" />
  )
}

export default function ClassScoresTable({ students }: Props) {
  const lang = useLangStore((s) => s.lang)
  const groups = progressTestsByChapter()
  const cols = useMemo(() => groups.flatMap((g) => g.tests), [groups])
  const [sort, setSort] = useState<SortState>({ col: null, dir: 'asc' })

  const avgOf = useMemo(() => {
    return (s: StudentProgress): number | null => {
      const taken = cols
        .map((c) => s.basics?.testScores[c.key])
        .filter((v): v is number => v != null)
      return taken.length ? taken.reduce((a, b) => a + b, 0) / taken.length : null
    }
  }, [cols])

  // Sort: nulls (not taken) always sink to the bottom.
  const sorted = useMemo(() => {
    if (!sort.col) return students
    const num = (a: number | null, b: number | null) => {
      if (a == null && b == null) return 0
      if (a == null) return 1
      if (b == null) return -1
      return sort.dir === 'asc' ? a - b : b - a
    }
    const arr = [...students]
    arr.sort((s1, s2) => {
      if (sort.col === 'name') {
        const r = s1.studentName.localeCompare(s2.studentName)
        return sort.dir === 'asc' ? r : -r
      }
      const v1 = sort.col === 'avg' ? avgOf(s1) : s1.basics?.testScores[sort.col as string] ?? null
      const v2 = sort.col === 'avg' ? avgOf(s2) : s2.basics?.testScores[sort.col as string] ?? null
      return num(v1, v2)
    })
    return arr
  }, [students, sort, avgOf])

  const onSort = (col: SortCol) =>
    setSort((prev) =>
      prev.col === col
        ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: col === 'name' ? 'asc' : 'desc' }, // scores default high→low
    )

  // Per-column class average + how many students have taken it.
  const colStats = useMemo(
    () =>
      cols.map((c) => {
        const vals = students
          .map((s) => s.basics?.testScores[c.key])
          .filter((v): v is number => v != null)
        return {
          key: c.key,
          avg: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null,
          taken: vals.length,
        }
      }),
    [cols, students],
  )
  const classAvg = useMemo(() => {
    const all = students.map(avgOf).filter((v): v is number => v != null)
    return all.length ? all.reduce((a, b) => a + b, 0) / all.length : null
  }, [students, avgOf])

  const downloadCsv = () => {
    const header = ['Student', ...cols.map((c) => c.label), 'Average']
    const rows = sorted.map((s) => {
      const cells = cols.map((c) => {
        const v = s.basics?.testScores[c.key]
        return v != null ? String(v) : ''
      })
      const avg = avgOf(s)
      return [s.studentName, ...cells, avg != null ? avg.toFixed(1) : '']
    })
    const footer = ['Class average', ...colStats.map((c) => (c.avg != null ? c.avg.toFixed(1) : '')),
      classAvg != null ? classAvg.toFixed(1) : '']
    const csv = [header, ...rows, footer].map((r) => r.map(csvField).join(',')).join('\n')
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
        <h3 className="text-lg font-semibold text-slate-600 mb-1">{t('scores.noStudents', lang)}</h3>
        <p className="text-slate-400 text-sm">{t('scores.noStudentsDesc', lang)}</p>
      </div>
    )
  }

  if (cols.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-600 mb-1">{t('scores.noTests', lang)}</h3>
        <p className="text-slate-400 text-sm">{t('scores.noTestsDesc', lang)}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-slate-500">{t('scores.hint', lang)}</p>
        <button
          onClick={downloadCsv}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
        >
          <Download className="w-4 h-4" />
          {t('scores.downloadCsv', lang)}
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
                <button onClick={() => onSort('name')} className="uppercase hover:text-slate-700">
                  Student <SortIcon active={sort.col === 'name'} dir={sort.dir} />
                </button>
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
                <button onClick={() => onSort('avg')} className="uppercase hover:text-slate-700">
                  {t('scores.average', lang)} <SortIcon active={sort.col === 'avg'} dir={sort.dir} />
                </button>
              </th>
            </tr>
            {/* Test labels (sortable) */}
            <tr className="bg-slate-50 border-b border-slate-200">
              {cols.map((c) => (
                <th key={c.key} className="text-center px-3 py-2 text-[11px] font-medium text-slate-500 border-l border-slate-100 whitespace-nowrap">
                  <button onClick={() => onSort(c.key)} className="hover:text-slate-700">
                    {c.label} <SortIcon active={sort.col === c.key} dir={sort.dir} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => {
              const avg = avgOf(s)
              return (
                <tr key={s.studentName} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-4 py-2.5 font-medium text-slate-800 whitespace-nowrap">
                    {s.studentName}
                  </td>
                  {cols.map((c) => {
                    const v = s.basics?.testScores[c.key]
                    return (
                      <td
                        key={c.key}
                        className={`text-center px-3 py-2.5 border-l border-slate-100 tabular-nums ${
                          v == null ? 'bg-amber-50/50' : ''
                        }`}
                      >
                        {v != null ? (
                          <span className={`font-semibold ${scoreClass(v)}`}>{v}/10</span>
                        ) : (
                          <span className="text-amber-400" title={t('scores.notTaken', lang)}>—</span>
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
          <tfoot>
            <tr className="bg-slate-50 border-t-2 border-slate-200">
              <td className="sticky left-0 z-10 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">
                {t('scores.classAvg', lang)}
              </td>
              {colStats.map((c) => (
                <td key={c.key} className="text-center px-3 py-2 border-l border-slate-100 tabular-nums">
                  {c.avg != null ? (
                    <span className={`font-semibold ${scoreClass(c.avg)}`}>{c.avg.toFixed(1)}</span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                  <div className="text-[10px] font-normal text-slate-400">
                    {t('scores.taken', lang, { taken: c.taken, total: students.length })}
                  </div>
                </td>
              ))}
              <td className="text-center px-3 py-2 border-l border-slate-200 tabular-nums">
                {classAvg != null ? (
                  <span className={`font-semibold ${scoreClass(classAvg)}`}>{classAvg.toFixed(1)}</span>
                ) : (
                  <span className="text-slate-300">—</span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
