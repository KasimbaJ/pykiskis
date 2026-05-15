import { Users, ChevronRight, Flame, Trophy, BookOpen } from 'lucide-react'
import type { StudentProgress } from '../../types'
import { levels } from '../../data/levels/index'
import { countAllBasicsLessons } from '../../data/basics/index'

interface Props {
  students: StudentProgress[];
  onSelectStudent: (name: string) => void;
}

export default function StudentTable({ students, onSelectStudent }: Props) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-600 mb-1">
          No Students Yet
        </h3>
        <p className="text-slate-400 text-sm">
          Student progress will appear here once they start learning.
        </p>
      </div>
    )
  }

  const basicsTotal = countAllBasicsLessons()

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
      <table className="w-full min-w-[760px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Student
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Phase Levels
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Basics
              </span>
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Streak
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Best
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Last Active
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const completedCount = Object.values(student.levels).filter(
              (l) => l.completed,
            ).length
            const basicsCompleted = student.basics?.completedLessons ?? 0
            const testScores = Object.values(student.basics?.testScores ?? {})
            const avgTestScore =
              testScores.length > 0
                ? testScores.reduce((a, b) => a + b, 0) / testScores.length
                : null

            return (
              <tr
                key={student.studentName}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onSelectStudent(student.studentName)}
              >
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-800">
                    {student.studentName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{
                          width: `${(completedCount / levels.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-500 tabular-nums">
                      {completedCount}/{levels.length}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{
                          width: `${basicsTotal > 0 ? (basicsCompleted / basicsTotal) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-500 tabular-nums">
                      {basicsCompleted}/{basicsTotal}
                    </span>
                    {avgTestScore != null && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700"
                        title="Average progress-test score (out of 10)"
                      >
                        {avgTestScore.toFixed(1)}/10
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">{student.currentStreak}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">{student.bestStreak}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {student.lastActiveAt
                    ? new Date(student.lastActiveAt).toLocaleDateString()
                    : '—'}
                </td>
                <td className="px-6 py-4">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
