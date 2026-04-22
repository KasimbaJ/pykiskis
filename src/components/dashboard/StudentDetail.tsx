import { ArrowLeft, Check, X, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { StudentProgress } from '../../types'
import { levels } from '../../data/levels/index'

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
        <div className="flex gap-6 text-sm text-slate-500 mt-2">
          <span>
            Completed:{' '}
            <strong className="text-slate-800">
              {Object.values(student.levels).filter((l) => l.completed).length}
              /{levels.length}
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
