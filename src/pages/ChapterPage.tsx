import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, CircleCheck, CircleDashed, ChevronRight, Lock } from 'lucide-react'
import Header from '../components/layout/Header'
import { getChapterBySlug, moduleLessonKeys } from '../data/basics/index'
import { useBasicsStore } from '../stores/useBasicsStore'
import type { Module } from '../types/basics'
import { useT } from '../i18n-ui'

// A module is a progress-test checkpoint (vs. a content module) when all of its
// lessons are progress tests.  These are always open, mirroring isLessonUnlocked.
const isTestModule = (m: Module) =>
  m.lessons.length > 0 && m.lessons.every((l) => l.type === 'progress-test')

export default function ChapterPage() {
  const t = useT()
  const { chapterSlug } = useParams<{ chapterSlug: string }>()
  const chapter = chapterSlug ? getChapterBySlug(chapterSlug) : undefined

  const lessons = useBasicsStore((s) => s.lessons)

  if (!chapter) return <Navigate to="/basics" replace />

  const moduleCount = chapter.modules.length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/basics"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('chapter.backToChapters')}
        </Link>

        <div className="flex items-start gap-3 mb-2">
          <span className="text-xs font-bold text-white px-2 py-1 rounded bg-indigo-600 mt-1">
            Ch {chapter.id}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              {chapter.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{chapter.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mt-4 mb-8">{chapter.description}</p>

        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
          {t('chapter.modules')}
        </h2>

        {moduleCount === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-8 text-center">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-slate-500 dark:text-slate-400">
              {t('chapter.comingSoon')}
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {chapter.modules.map((mod, i) => {
              const lessonCount = mod.lessons.length
              const ready = lessonCount > 0

              // Progress-test modules are always open (assessments the teacher
              // assigns on their own schedule).  Content modules unlock when the
              // previous *content* module is complete — test modules are skipped
              // so they neither block nor unlock the content chain.
              const prevPopulated = chapter.modules
                .slice(0, i)
                .filter((m) => m.lessons.length > 0 && !isTestModule(m))
              const previousModule = prevPopulated[prevPopulated.length - 1]
              const previousKeys   = previousModule ? moduleLessonKeys(chapter.slug, previousModule) : []
              const previousDone   = previousKeys.length === 0 || previousKeys.every((k) => lessons[k]?.completed)
              const unlocked       = ready && (isTestModule(mod) || previousDone)

              const keys = ready ? moduleLessonKeys(chapter.slug, mod) : []
              const completedCount = keys.filter((k) => lessons[k]?.completed).length
              const moduleComplete = ready && completedCount === lessonCount
              const firstLesson    = mod.lessons[0]
              const linkTarget     = unlocked && firstLesson
                ? `/basics/${chapter.slug}/${mod.slug}/${firstLesson.slug}`
                : null

              const Inner = (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {!ready ? (
                      <CircleDashed className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    ) : moduleComplete ? (
                      <CircleCheck className="w-5 h-5 text-emerald-500" />
                    ) : !unlocked ? (
                      <Lock className="w-5 h-5 text-slate-400" />
                    ) : (
                      <CircleDashed className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {i + 1}. {mod.title}
                      </p>
                      {mod.summary && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">{mod.summary}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center">
                    {!ready
                      ? t('comingSoon')
                      : !unlocked
                        ? t('locked')
                        : t('chapter.lessonsCount', { completed: completedCount, total: lessonCount })}
                    {linkTarget && <ChevronRight className="inline w-4 h-4 ml-1" />}
                  </span>
                </div>
              )

              return linkTarget ? (
                <li key={mod.slug}>
                  <Link
                    to={linkTarget}
                    className="block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-400 hover:shadow-sm transition"
                  >
                    {Inner}
                  </Link>
                </li>
              ) : (
                <li
                  key={mod.slug}
                  className="block bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-not-allowed opacity-70"
                >
                  {Inner}
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
