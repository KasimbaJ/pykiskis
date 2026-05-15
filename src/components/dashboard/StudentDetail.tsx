import { ArrowLeft, Check, X, Clock, BookOpen, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { StudentProgress } from '../../types'
import { levels } from '../../data/levels/index'
import { chapters, countAllBasicsLessons } from '../../data/basics/index'

interface Props {
  student: StudentProgress;
  onBack: () => void;
}

export default function StudentDetail({ student, onBack }: Props) {
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all students
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-1">
          {student.studentName}
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 mt-2">
          <span>
            Phase levels:{' '}
            <strong className="text-slate-800">
              {Object.values(student.levels).filter((l) => l.completed).length}
              /{levels.length}
            </strong>
          </span>
          <span>
            Basics lessons:{' '}
            <strong className="text-indigo-700">
              {student.basics?.completedLessons ?? 0}/{countAllBasicsLessons()}
            </strong>
          </span>
          <span>
            Current streak:{' '}
            <strong className="text-orange-500">{student.currentStreak}</strong>
          </span>
          <span>
            Best streak:{' '}
            <strong className="text-yellow-600">{student.bestStreak}</strong>
          </span>
        </div>
      </div>

      {/* Progress-test scores */}
      {student.basics && Object.keys(student.basics.testScores).length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-indigo-600" />
            Progress Test Scores
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => {
              const key = `introduction.progress-test-${n}.test`
              const score = student.basics?.testScores[key]
              return (
                <li
                  key={n}
                  className="rounded-lg border border-slate-200 p-3 text-center"
                >
                  <p className="text-xs text-slate-500 mb-1">Test {n}</p>
                  {score != null ? (
                    <p className="text-lg font-bold text-indigo-700">
                      {score}/10
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">Not taken</p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Basics chapter progress */}
      {student.basics && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Python Basics
          </h3>
          <ul className="space-y-2">
            {chapters.map((ch) => {
              const total = ch.modules.reduce((s, m) => s + m.lessons.length, 0)
              if (total === 0) return null
              // We don't have per-chapter detail in the StudentProgress payload yet,
              // so display total only and overall counter at top.
              return (
                <li
                  key={ch.id}
                  className="flex items-center justify-between text-sm border-b border-slate-100 last:border-0 pb-1"
                >
                  <span className="text-slate-700">
                    Ch {ch.id} · {ch.title}
                  </span>
                  <span className="text-slate-500 tabular-nums">{total} lessons</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <h3 className="text-base font-semibold text-slate-800 mb-3">Phase Levels</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {levels.map((level) => {
          const progress = student.levels[level.id]
          const isCompleted = progress?.completed === true

          return (
            <div
              key={level.id}
              className={`rounded-lg border p-4 ${
                isCompleted
                  ? 'border-green-300 bg-green-50'
                  : progress
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Level {level.id}
                </span>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : progress ? (
                  <Clock className="w-4 h-4 text-yellow-600" />
                ) : (
                  <X className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <h4 className="font-medium text-slate-800 text-sm">
                {level.title}
              </h4>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Attempts: {progress?.attempts ?? 0}</span>
                {isCompleted && progress?.completedAt && (
                  <span>
                    {new Date(progress.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate(`/level/${level.id}`)}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Test this level
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
