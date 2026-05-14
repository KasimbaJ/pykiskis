import { Link } from 'react-router-dom'
import { BookOpen, Sparkles, ChevronRight } from 'lucide-react'
import Header from '../components/layout/Header'
import { chapters, countChapterLessons } from '../data/basics/index'

// Tailwind colour map for the chapter cards.  Mirrors the phase palette so the
// two tracks feel visually consistent.
const colorMap: Record<string, { ring: string; bg: string; badge: string; title: string }> = {
  indigo:  { ring: 'border-indigo-300 dark:border-indigo-700',  bg: 'bg-indigo-50 dark:bg-slate-800',  badge: 'bg-indigo-600',  title: 'text-indigo-800 dark:text-indigo-300' },
  sky:     { ring: 'border-sky-300 dark:border-sky-700',        bg: 'bg-sky-50 dark:bg-slate-800',     badge: 'bg-sky-600',     title: 'text-sky-800 dark:text-sky-300' },
  amber:   { ring: 'border-amber-300 dark:border-amber-700',    bg: 'bg-amber-50 dark:bg-slate-800',   badge: 'bg-amber-600',   title: 'text-amber-800 dark:text-amber-300' },
  emerald: { ring: 'border-emerald-300 dark:border-emerald-700', bg: 'bg-emerald-50 dark:bg-slate-800', badge: 'bg-emerald-600', title: 'text-emerald-800 dark:text-emerald-300' },
  violet:  { ring: 'border-violet-300 dark:border-violet-700',  bg: 'bg-violet-50 dark:bg-slate-800',  badge: 'bg-violet-600',  title: 'text-violet-800 dark:text-violet-300' },
  rose:    { ring: 'border-rose-300 dark:border-rose-700',      bg: 'bg-rose-50 dark:bg-slate-800',    badge: 'bg-rose-600',    title: 'text-rose-800 dark:text-rose-300' },
}

export default function BasicsHomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-7 h-7 text-indigo-600" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Python Basics Learning Path
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            A friendly, chapter-based course covering Python from the ground up.
            Read short lessons, run examples in the browser, and build small projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((chapter) => {
            const colors = colorMap[chapter.color] ?? colorMap.indigo
            const lessonCount = countChapterLessons(chapter)
            return (
              <Link
                key={chapter.id}
                to={`/basics/${chapter.slug}`}
                className={`rounded-xl border-2 ${colors.ring} ${colors.bg} p-5 hover:shadow-lg transition-all flex flex-col gap-2`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold text-white px-2 py-1 rounded ${colors.badge}`}>
                    Ch {chapter.id}
                  </span>
                  {chapter.featured && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      FEATURED
                    </span>
                  )}
                </div>

                <h2 className={`text-lg font-bold ${colors.title}`}>{chapter.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{chapter.subtitle}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lessonCount === 0 ? 'Coming soon' : `${lessonCount} lesson${lessonCount === 1 ? '' : 's'}`}
                </p>

                <div className="mt-auto pt-2 flex items-center justify-end text-sm font-medium text-slate-500 dark:text-slate-300">
                  Open chapter
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
