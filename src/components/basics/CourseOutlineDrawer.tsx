import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { X, ChevronDown, CircleCheck, CircleDashed } from 'lucide-react'
import type { Chapter, Module } from '../../types/basics'
import { lessonKey, moduleLessonKeys } from '../../data/basics/index'
import { useBasicsStore } from '../../stores/useBasicsStore'

interface Props {
  chapter: Chapter
  /** Currently expanded module slug (defaults to the active lesson's module). */
  open: boolean
  onClose: () => void
}

// ─────────────────────────────────────────────────────────────────────────────
// CourseOutlineDrawer — slide-out navigation showing every module in the
// chapter and every lesson within the currently expanded module.
// ─────────────────────────────────────────────────────────────────────────────

export default function CourseOutlineDrawer({ chapter, open, onClose }: Props) {
  const { moduleSlug, lessonSlug } = useParams<{
    moduleSlug?: string
    lessonSlug?: string
  }>()
  const lessons = useBasicsStore((s) => s.lessons)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <button
        aria-label="Close outline"
        onClick={onClose}
        className="flex-1 bg-slate-900/40"
      />

      {/* Panel */}
      <aside className="w-full sm:max-w-sm bg-white dark:bg-slate-900 shadow-xl overflow-y-auto border-l border-slate-200 dark:border-slate-700">
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Course Outline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ch {chapter.id} · {chapter.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="px-2 py-3 space-y-1">
          {chapter.modules.map((mod, i) => {
            const isActive = mod.slug === moduleSlug
            const lessonKeys = moduleLessonKeys(chapter.slug, mod)
            const completedInModule = lessonKeys.filter(
              (k) => lessons[k]?.completed,
            ).length

            return (
              <ModuleSection
                key={mod.slug}
                module={mod}
                index={i}
                chapterSlug={chapter.slug}
                activeLessonSlug={isActive ? lessonSlug : undefined}
                completed={completedInModule}
                total={mod.lessons.length}
                defaultOpen={isActive}
              />
            )
          })}
        </ul>
      </aside>
    </div>
  )
}

function ModuleSection({
  module: mod,
  index,
  chapterSlug,
  activeLessonSlug,
  completed,
  total,
  defaultOpen,
}: {
  module: Module
  index: number
  chapterSlug: string
  activeLessonSlug?: string
  completed: number
  total: number
  defaultOpen: boolean
}) {
  const lessons = useBasicsStore((s) => s.lessons)

  return (
    <li className="rounded-lg overflow-hidden">
      <details open={defaultOpen} className="group">
        <summary className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer select-none rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 list-none">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-0 -rotate-90 shrink-0" />
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
              {index + 1}. {mod.title}
            </span>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
            {total === 0 ? 'soon' : `${completed}/${total}`}
          </span>
        </summary>

        {mod.lessons.length === 0 ? (
          <p className="px-9 py-2 text-xs text-slate-400 dark:text-slate-500 italic">
            Coming soon
          </p>
        ) : (
          <ul className="ml-3 mt-1 mb-1 border-l border-slate-200 dark:border-slate-700 pl-2 space-y-0.5">
            {mod.lessons.map((lesson) => {
              const key = lessonKey(chapterSlug, mod.slug, lesson.slug)
              const isCompleted = lessons[key]?.completed
              const isActive = lesson.slug === activeLessonSlug
              return (
                <li key={lesson.slug}>
                  <Link
                    to={`/basics/${chapterSlug}/${mod.slug}/${lesson.slug}`}
                    className={[
                      'flex items-center gap-2 text-sm px-2 py-1.5 rounded',
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
                    ].join(' ')}
                  >
                    {isCompleted ? (
                      <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <CircleDashed className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-400 shrink-0">
                      {lesson.type}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </details>
    </li>
  )
}

