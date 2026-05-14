import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, CircleCheck, CircleDashed, ChevronRight } from 'lucide-react'
import Header from '../components/layout/Header'
import { getChapterBySlug } from '../data/basics/index'

export default function ChapterPage() {
  const { chapterSlug } = useParams<{ chapterSlug: string }>()
  const chapter = chapterSlug ? getChapterBySlug(chapterSlug) : undefined

  if (!chapter) return <Navigate to="/basics" replace />

  const moduleCount = chapter.modules.length
  const populatedModules = chapter.modules.filter((m) => m.lessons.length > 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/basics"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to chapters
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
          Modules
        </h2>

        {moduleCount === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-8 text-center">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-slate-500 dark:text-slate-400">
              This chapter is coming soon.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {chapter.modules.map((mod, i) => {
              const ready = mod.lessons.length > 0
              const firstLesson = mod.lessons[0]
              const linkTarget = ready && firstLesson
                ? `/basics/${chapter.slug}/${mod.slug}/${firstLesson.slug}`
                : null

              const Inner = (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {ready ? (
                      <CircleDashed className="w-5 h-5 text-slate-400" />
                    ) : (
                      <CircleCheck className="w-5 h-5 text-slate-300 dark:text-slate-600" />
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
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {ready
                      ? `${mod.lessons.length} lesson${mod.lessons.length === 1 ? '' : 's'}`
                      : 'Coming soon'}
                    {ready && <ChevronRight className="inline w-4 h-4 ml-1" />}
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

        {populatedModules.length > 0 && populatedModules.length < moduleCount && (
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 text-center">
            More modules will be added soon.
          </p>
        )}
      </main>
    </div>
  )
}
