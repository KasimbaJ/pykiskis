import { BookOpen } from 'lucide-react'
import type { Level } from '../../types'

interface Props {
  level: Level
}

export default function LevelInstructions({ level }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <span className="text-xs font-semibold text-blue-600 uppercase">
          Level {level.id}
        </span>
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{level.title}</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{level.description}</p>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Your Task</h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">{level.task}</p>
      </div>
      <div className="mt-4 bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Expected Output
        </h3>
        <pre className="text-sm text-slate-600 dark:text-slate-400 font-mono whitespace-pre-wrap">
          {level.expectedOutput}
        </pre>
      </div>
    </div>
  )
}
