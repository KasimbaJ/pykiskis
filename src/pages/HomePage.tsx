import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react'
import Header from '../components/layout/Header'
import { chapters, flattenChapter, lessonKey } from '../data/basics/index'
import { useBasicsStore } from '../stores/useBasicsStore'

// The landing page funnels learners into the Python Basics course.  The
// original 100-level "challenge" path is kept, but tucked behind a single
// low-prominence link to /levels.
export default function HomePage() {
  const lessons = useBasicsStore((s) => s.lessons)

  // The whole Basics track in course order, used to compute the smart CTA:
  // a brand-new learner gets "Start Chapter 1", a returning one gets
  // "Continue" deep-linked to their next unfinished lesson.
  const allLessons = chapters.flatMap(flattenChapter)
  const completedCount = allLessons.filter(
    (loc) => lessons[lessonKey(loc.chapter.slug, loc.module.slug, loc.lesson.slug)]?.completed,
  ).length
  const nextLesson = allLessons.find(
    (loc) => !lessons[lessonKey(loc.chapter.slug, loc.module.slug, loc.lesson.slug)]?.completed,
  )

  const started = completedCount > 0
  const ctaLabel = !started
    ? 'Start Chapter 1'
    : nextLesson
      ? 'Continue learning'
      : 'Review the basics'
  const ctaTo = nextLesson
    ? `/basics/${nextLesson.chapter.slug}/${nextLesson.module.slug}/${nextLesson.lesson.slug}`
    : '/basics'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero — Python Basics is where everyone starts */}
        <section className="rounded-2xl border-2 border-indigo-300 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-lg bg-indigo-600 p-2 text-white shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Start here
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
            Python Basics Learning Path
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
            A friendly, chapter-based course covering Python from the ground up — read
            short lessons, run real code in your browser, and build small projects.
          </p>

          {started && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              You have completed{' '}
              <strong className="text-indigo-700 dark:text-indigo-300">{completedCount}</strong> of{' '}
              {allLessons.length} lessons.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/basics"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:underline"
            >
              View all chapters
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Low-prominence link to the original 100-level challenge path */}
        <Link
          to="/levels"
          className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Looking for the 100-level challenge path?
          <ChevronRight className="w-4 h-4" />
        </Link>
      </main>
    </div>
  )
}
