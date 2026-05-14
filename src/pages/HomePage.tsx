import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, Search, Sparkles, X } from 'lucide-react'
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

        {/* Python Basics — chapter-based parallel track */}
        <Link
          to="/basics"
          className="group block mb-6 rounded-xl border-2 border-indigo-300 dark:border-indigo-700 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 p-5 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-indigo-600 p-2 text-white shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <Sparkles className="w-3 h-3" />
                    New
                  </span>
                  <h2 className="font-bold text-slate-800 dark:text-white">
                    Python Basics Learning Path
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  A friendly, chapter-based course. Read short lessons, run examples,
                  and build small projects. 7 chapters from Introduction to Projects.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
          </div>
        </Link>

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
