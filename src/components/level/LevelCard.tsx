import { Link } from 'react-router-dom'
import { Lock, Check, BookOpen } from 'lucide-react'
import type { Level } from '../../types'

interface LevelCardProps {
  level: Level
  isUnlocked: boolean
  isCompleted: boolean
}

export default function LevelCard({ level, isUnlocked, isCompleted }: LevelCardProps) {
  const baseClasses =
    'relative rounded-xl p-4 border-2 transition-all duration-200 text-left'

  if (!isUnlocked) {
    return (
      <div className={`${baseClasses} border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-60 cursor-not-allowed`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Level {level.id}</span>
          <Lock className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-400 dark:text-slate-500 text-sm">{level.title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{level.concept}</p>
      </div>
    )
  }

  return (
    <Link
      to={`/level/${level.id}`}
      className={`${baseClasses} no-underline block ${
        isCompleted
          ? 'border-green-400 dark:border-green-700 bg-green-50 dark:bg-green-900/20 hover:border-green-500 hover:shadow-md'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
          Level {level.id}
        </span>
        <div className="flex items-center gap-1">
          {level.levelMode === 'theory' && (
            <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
              <BookOpen className="w-3 h-3" /> Theory
            </span>
          )}
          {isCompleted && (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>
      <h3 className={`font-semibold text-sm ${isCompleted ? 'text-green-800 dark:text-green-300' : 'text-slate-800 dark:text-slate-100'}`}>
        {level.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{level.concept}</p>
    </Link>
  )
}
