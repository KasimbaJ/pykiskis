import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { ArrowLeft, ArrowRight, Check, Lock, List } from 'lucide-react'
import Header from '../components/layout/Header'
import TheoryView from '../components/basics/TheoryView'
import QuizView from '../components/basics/QuizView'
import ExerciseView from '../components/basics/ExerciseView'
import RecapView from '../components/basics/RecapView'
import ProgressTestView from '../components/basics/ProgressTestView'
import CourseOutlineDrawer from '../components/basics/CourseOutlineDrawer'
import {
  adjacentLessons,
  chapterLessonKeys,
  getChapterBySlug,
  getLessonBySlug,
  getModuleBySlug,
  isLessonUnlocked,
  lessonKey,
  moduleLessonKeys,
} from '../data/basics/index'
import { useBasicsStore } from '../stores/useBasicsStore'
import { syncLessonProgress } from '../services/progressApi'

// ─────────────────────────────────────────────────────────────────────────────
// LessonPage — renders a single lesson of any of the four types and handles
// progress (mark complete, sync to D1, unlock gating, prev/next navigation,
// course outline drawer).
// ─────────────────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const { chapterSlug, moduleSlug, lessonSlug } = useParams<{
    chapterSlug: string
    moduleSlug:  string
    lessonSlug:  string
  }>()

  // ── 1. Look up the chapter / module / lesson ────────────────────────────────
  if (!chapterSlug || !moduleSlug || !lessonSlug)
    return <Navigate to="/basics" replace />

  const chapter = getChapterBySlug(chapterSlug)
  const module  = getModuleBySlug(chapterSlug, moduleSlug)
  const lesson  = getLessonBySlug(chapterSlug, moduleSlug, lessonSlug)
  if (!chapter || !module || !lesson)
    return <Navigate to={`/basics/${chapterSlug}`} replace />

  const key = lessonKey(chapter.slug, module.slug, lesson.slug)

  // ── 2. Store hookups ────────────────────────────────────────────────────────
  const lessons                 = useBasicsStore((s) => s.lessons)
  const completeLesson          = useBasicsStore((s) => s.completeLesson)
  const markLessonVisited       = useBasicsStore((s) => s.markLessonVisited)
  const recordLessonAttempt     = useBasicsStore((s) => s.recordLessonAttempt)
  const submitProgressTestScore = useBasicsStore((s) => s.submitProgressTestScore)
  const isLessonComplete        = useBasicsStore((s) => s.isLessonComplete)

  const lessonState = lessons[key]
  const completed = lessonState?.completed === true

  // ── 3. Unlock gating ────────────────────────────────────────────────────────
  const unlocked = useMemo(
    () => isLessonUnlocked(chapter.slug, module.slug, lesson.slug, isLessonComplete),
    [chapter.slug, module.slug, lesson.slug, isLessonComplete, lessons],
  )

  // ── 4. Navigation context (prev / next + position) ──────────────────────────
  const { prev, next, current } = adjacentLessons(
    chapter.slug,
    module.slug,
    lesson.slug,
  )

  // ── 5. Course-Outline drawer state ──────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false)

  // ── 6. Mark lesson as visited on first view ─────────────────────────────────
  useEffect(() => {
    if (unlocked) markLessonVisited(key)
  }, [key, unlocked, markLessonVisited])

  // ── 7. Fire-and-forget D1 sync on any local mutation ────────────────────────
  const syncToD1 = useCallback(
    (extra?: { code?: string; option?: string; score?: number }) => {
      getToken()
        .then(async (token) => {
          if (!token) return
          const lp = useBasicsStore.getState().lessons[key]
          if (!lp) return
          await syncLessonProgress(token, {
            lessonId:       key,
            completed:      lp.completed,
            attempts:       lp.attempts,
            visitedAt:      lp.visitedAt ?? new Date().toISOString(),
            bestCode:       extra?.code   ?? lp.bestCode       ?? null,
            selectedOption: extra?.option ?? lp.selectedOption ?? null,
            bestScore:      extra?.score  ?? lp.bestScore      ?? null,
          })
        })
        .catch(console.error)
    },
    [getToken, key],
  )

  // ── 8. Mark complete + sync helper ──────────────────────────────────────────
  const markComplete = useCallback(
    (payload?: { code?: string; option?: string }) => {
      if (completed) return
      completeLesson(key, payload)
      syncToD1(payload)
    },
    [completed, completeLesson, key, syncToD1],
  )

  // Progress-test submissions: separate from markComplete because they always
  // mark complete (no skip) but can be retaken to improve bestScore.
  const onTestSubmit = useCallback(
    (score: number) => {
      submitProgressTestScore(key, score)
      syncToD1({ score })
    },
    [submitProgressTestScore, key, syncToD1],
  )

  // ── 9. Locked screen ────────────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <Lock className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Lesson locked
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Finish the previous lesson to unlock this one.
          </p>
          <Link to={`/basics/${chapter.slug}`} className="text-indigo-600 hover:underline">
            Back to {chapter.title}
          </Link>
        </main>
      </div>
    )
  }

  // ── 10. Next-button handler ─────────────────────────────────────────────────
  const onNext = () => {
    // For theory & recap lessons, advancing means the learner has read them.
    if (!completed && (lesson.type === 'theory' || lesson.type === 'recap')) {
      markComplete()
    }
    if (next) {
      navigate(`/basics/${chapter.slug}/${next.module.slug}/${next.lesson.slug}`)
    } else {
      navigate(`/basics/${chapter.slug}`)
    }
  }

  // ── 11. Per-type lesson content ─────────────────────────────────────────────
  const body = (() => {
    switch (lesson.type) {
      case 'theory':
        return <TheoryView lesson={lesson} />
      case 'quiz':
        return (
          <QuizView
            lesson={lesson}
            initialSelection={lessonState?.selectedOption}
            onAttempt={(option) => recordLessonAttempt(key, { option })}
            onCorrect={(option) => markComplete({ option })}
          />
        )
      case 'exercise':
        return (
          <ExerciseView
            lesson={lesson}
            initialCode={lessonState?.bestCode}
            alreadyCompleted={completed}
            onAttempt={() => recordLessonAttempt(key)}
            onCorrect={(code) => markComplete({ code })}
          />
        )
      case 'recap': {
        const moduleKeys = moduleLessonKeys(chapter.slug, module)
        const moduleProgress = {
          completed: moduleKeys.filter((k) => lessons[k]?.completed).length,
          total:     moduleKeys.length,
        }
        return (
          <RecapView
            lesson={lesson}
            moduleTitle={module.title}
            moduleProgress={moduleProgress}
          />
        )
      }
      case 'progress-test':
        return (
          <ProgressTestView
            lesson={lesson}
            bestScore={lessonState?.bestScore}
            onSubmit={onTestSubmit}
          />
        )
    }
  })()

  // ── 12. Chapter-wide progress count for the footer dot ──────────────────────
  const allKeys = chapterLessonKeys(chapter)
  const chapterCompleted = allKeys.filter((k) => lessons[k]?.completed).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />

      {/* Sub-header: Back / Course Outline button / Chapter progress */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-[57px] sm:top-[61px] z-30">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <Link
            to={`/basics/${chapter.slug}`}
            className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {chapter.title}
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <List className="w-3.5 h-3.5" />
            Course Outline
          </button>

          <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
            {chapterCompleted}/{allKeys.length}
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {module.title} · {lesson.type}
          </p>
          {completed && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
              <Check className="w-3 h-3" /> Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          {lesson.title}
        </h1>

        {body}
      </main>

      {/* Footer nav — Prev / progress dots / Next */}
      <nav className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {prev ? (
            <Link
              to={`/basics/${chapter.slug}/${prev.module.slug}/${prev.lesson.slug}`}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Link>
          ) : (
            <span className="w-[88px]" />
          )}

          {current && (
            <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
              {current.index + 1} / {current.total}
            </span>
          )}

          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {next ? 'Next' : 'Finish'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <CourseOutlineDrawer
        chapter={chapter}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}
