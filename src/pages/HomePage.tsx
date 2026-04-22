import { useState } from 'react'
import { Search, X } from 'lucide-react'
import Header from '../components/layout/Header'
import PhaseAccordion from '../components/home/PhaseAccordion'
import LevelCard from '../components/level/LevelCard'
import { getLevelsByPhase, levels } from '../data/levels/index'
import { phases } from '../data/phases'
import { useProgressStore } from '../stores/useProgressStore'

function isPhaseUnlocked(
  phaseId: number,
  getPhaseProgress: (p: number) => { completed: number; total: number },
): boolean {
  if (phaseId === 1) return true
  const prev = getPhaseProgress(phaseId - 1)
  return prev.completed >= Math.ceil(prev.total * 0.8)
}

export default function HomePage() {
  const { getPhaseProgress, isLevelUnlocked, levels: progress } = useProgressStore()
  const [search, setSearch] = useState('')

  const defaultOpenPhase =
    phases.find((p) => {
      const prog = getPhaseProgress(p.id)
      return prog.completed < prog.total
    })?.id ?? 1

  const query = search.trim().toLowerCase()
  const searchResults = query
    ? levels.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.concept.toLowerCase().includes(query) ||
          String(l.id) === query,
      )
    : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Python Learning Path
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            100 levels across 5 phases — from Hello World to Professional Portfolio.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search levels by title, concept or number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search results OR phase accordions */}
        {searchResults ? (
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {searchResults.length} level{searchResults.length !== 1 ? 's' : ''} found
            </p>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map((level) => (
                  <LevelCard
                    key={level.id}
                    level={level}
                    isUnlocked={isLevelUnlocked(level.id)}
                    isCompleted={progress[level.id]?.completed === true}
                  />
                ))}
              </div>
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-center py-16">
                No levels match "{search}".
              </p>
            )}
          </div>
        ) : (
          phases.map((phase) => {
            const phaseLevels = getLevelsByPhase(phase.id)
            const unlocked = isPhaseUnlocked(phase.id, getPhaseProgress)
            return (
              <PhaseAccordion
                key={phase.id}
                phase={phase}
                levels={phaseLevels}
                isUnlocked={unlocked}
                defaultOpen={phase.id === defaultOpenPhase}
              />
            )
          })
        )}
      </main>
    </div>
  )
}
