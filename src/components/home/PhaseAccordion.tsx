import { useState } from 'react'
import { ChevronDown, ChevronUp, Lock } from 'lucide-react'
import type { PhaseInfo, Level } from '../../types'
import LevelCard from '../level/LevelCard'
import { useProgressStore } from '../../stores/useProgressStore'

const phaseColors: Record<number, { bg: string; border: string; text: string; badge: string }> = {
  1: { bg: 'bg-green-50 dark:bg-slate-800',  border: 'border-green-300 dark:border-green-700',  text: 'text-green-800 dark:text-green-400',  badge: 'bg-green-600' },
  2: { bg: 'bg-blue-50 dark:bg-slate-800',   border: 'border-blue-300 dark:border-blue-700',   text: 'text-blue-800 dark:text-blue-400',   badge: 'bg-blue-600' },
  3: { bg: 'bg-purple-50 dark:bg-slate-800', border: 'border-purple-300 dark:border-purple-700', text: 'text-purple-800 dark:text-purple-400', badge: 'bg-purple-600' },
  4: { bg: 'bg-orange-50 dark:bg-slate-800', border: 'border-orange-300 dark:border-orange-700', text: 'text-orange-800 dark:text-orange-400', badge: 'bg-orange-600' },
  5: { bg: 'bg-red-50 dark:bg-slate-800',    border: 'border-red-300 dark:border-red-700',    text: 'text-red-800 dark:text-red-400',    badge: 'bg-red-600' },
}

interface Props {
  phase: PhaseInfo
  levels: Level[]
  isUnlocked: boolean
  defaultOpen?: boolean
}

export default function PhaseAccordion({ phase, levels, isUnlocked, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const { levels: progress, isLevelUnlocked } = useProgressStore()
  const colors = phaseColors[phase.id]

  const completedCount = levels.filter((l) => progress[l.id]?.completed).length
  const progressPct = levels.length > 0 ? (completedCount / levels.length) * 100 : 0

  return (
    <div className={`rounded-xl border-2 ${colors.border} overflow-hidden mb-4`}>
      {/* Phase Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-6 py-4 ${colors.bg} hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold text-white px-2.5 py-1 rounded-lg ${colors.badge}`}>
            Phase {phase.id}
          </span>
          <div className="text-left">
            <h2 className={`font-bold text-lg ${colors.text}`}>{phase.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{phase.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 bg-white/60 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${colors.badge} transition-all duration-500`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${colors.text}`}>
              {completedCount}/{levels.length}
            </span>
          </div>

          {!isUnlocked && <Lock className="w-5 h-5 text-slate-400" />}
          {isOpen
            ? <ChevronUp className={`w-5 h-5 ${colors.text}`} />
            : <ChevronDown className={`w-5 h-5 ${colors.text}`} />}
        </div>
      </button>

      {/* Level Grid */}
      {isOpen && (
        <div className="p-4 bg-white dark:bg-slate-900">
          {!isUnlocked && (
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Complete 80% of the previous phase to unlock this phase.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {levels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                isUnlocked={isUnlocked && isLevelUnlocked(level.id)}
                isCompleted={progress[level.id]?.completed === true}
                phaseColor={colors.badge}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
