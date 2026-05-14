import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from '../components/layout/Header'
import { adjacentLessons, getChapterBySlug, getLessonBySlug } from '../data/basics/index'
import type { Lesson } from '../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// LessonPage — currently a placeholder shell.
//
// The four lesson-type renderers (theory / quiz / exercise / recap) and the
// inline RunnableBlock component will land in Phase B.  For now this page just
// confirms routing works end-to-end and renders a temporary "Coming soon"
// view for whatever lesson the URL points to.
// ─────────────────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { chapterSlug, moduleSlug, lessonSlug } = useParams<{
    chapterSlug: string
    moduleSlug: string
    lessonSlug: string
  }>()

  if (!chapterSlug || !moduleSlug || !lessonSlug)
    return <Navigate to="/basics" replace />

  const chapter = getChapterBySlug(chapterSlug)
  const lesson = getLessonBySlug(chapterSlug, moduleSlug, lessonSlug)
  if (!chapter || !lesson) return <Navigate to={`/basics/${chapterSlug}`} replace />

  const { prev, next, current } = adjacentLessons(chapterSlug, moduleSlug, lessonSlug)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <Link
          to={`/basics/${chapterSlug}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {chapter.title}
        </Link>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
          {lesson.title}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
          Ch {chapter.id} · {chapter.title} · {lesson.type}
        </p>

        <LessonPlaceholder lesson={lesson} />
      </main>

      {/* Footer nav — Prev / progress dots / Next */}
      <nav className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {prev ? (
            <Link
              to={`/basics/${chapterSlug}/${prev.module.slug}/${prev.lesson.slug}`}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Link>
          ) : (
            <span />
          )}

          {current && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {current.index + 1} / {current.total}
            </span>
          )}

          {next ? (
            <Link
              to={`/basics/${chapterSlug}/${next.module.slug}/${next.lesson.slug}`}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </div>
  )
}

function LessonPlaceholder({ lesson }: { lesson: Lesson }) {
  // Theory placeholder — render the paragraph blocks we already have.
  if (lesson.type === 'theory' && lesson.blocks.length > 0) {
    return (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {lesson.blocks.map((block, i) => {
          if (block.kind === 'paragraph')
            return (
              <p key={i} className="text-slate-700 dark:text-slate-200">
                {block.text}
              </p>
            )
          return (
            <p key={i} className="text-slate-400 italic">
              [{block.kind} block — rendering arrives in Phase B]
            </p>
          )
        })}
      </article>
    )
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-8 text-center bg-white dark:bg-slate-800/60">
      <p className="text-slate-500 dark:text-slate-400">
        This <span className="font-mono text-sm">{lesson.type}</span> lesson will render
        once Phase B (lesson-type renderers) lands.
      </p>
    </div>
  )
}
