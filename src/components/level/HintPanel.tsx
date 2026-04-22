import { Lightbulb, ChevronRight } from 'lucide-react'
import { useEditorStore } from '../../stores/useEditorStore'
import type { Level } from '../../types'

interface Props {
  level: Level
}

export default function HintPanel({ level }: Props) {
  const { showHints, toggleHints, currentHintIndex, showNextHint } = useEditorStore()

  if (!showHints) {
    return (
      <button
        onClick={toggleHints}
        className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 transition-colors"
      >
        <Lightbulb className="w-4 h-4" />
        Need a hint?
      </button>
    )
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">Hints</span>
        </div>
        <button
          onClick={toggleHints}
          className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
        >
          Hide
        </button>
      </div>
      <div className="space-y-2">
        {level.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{hint}</span>
          </div>
        ))}
      </div>
      {currentHintIndex < 2 && (
        <button
          onClick={showNextHint}
          className="mt-3 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 font-medium"
        >
          Show next hint ({currentHintIndex + 1}/3)
        </button>
      )}
    </div>
  )
}
