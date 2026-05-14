import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress, ServerBasicsProgress } from '../types/basics'
import { useProgressStore } from './useProgressStore'

// ─────────────────────────────────────────────────────────────────────────────
// useBasicsStore — separate Zustand slice for lesson progress on the Python
// Basics chapter-based track.
//
// Kept independent from useProgressStore so:
//   • The numeric levelId space (1–100) and the composite lesson-key space
//     never collide.
//   • Existing 5-phase code paths don't need to change.
//
// Both stores persist to the same localStorage origin but under different
// keys: 'pykiskis_progress' (phases) and 'pykiskis_basics' (this store).
//
// The streak counter lives in useProgressStore — completing a lesson here
// piggybacks on the phase store's daily-activity logic by recording activity
// without affecting level data.
// ─────────────────────────────────────────────────────────────────────────────

interface BasicsState {
  /** Keyed by `${chapter.slug}.${module.slug}.${lesson.slug}`. */
  lessons: Record<string, LessonProgress>

  /** Mark a lesson complete (idempotent — already-complete lessons untouched). */
  completeLesson: (
    lessonKey: string,
    payload?: { code?: string; option?: string },
  ) => void

  /** Record an attempt without marking complete (used by exercise / quiz wrong answers). */
  recordLessonAttempt: (
    lessonKey: string,
    payload?: { code?: string; option?: string },
  ) => void

  /** Mark a lesson as visited (used by theory/recap lessons on first view). */
  markLessonVisited: (lessonKey: string) => void

  /** Merge server-side progress into local state (called once on sign-in). */
  hydrateBasicsFromServer: (data: ServerBasicsProgress) => void

  /** Has this lesson been completed? */
  isLessonComplete: (lessonKey: string) => boolean

  /** Count of completed lessons within a chapter, given the chapter's lesson keys. */
  getCompletedCount: (lessonKeys: string[]) => number
}

/**
 * Bumps the shared daily streak in useProgressStore.
 *
 * Mirrors the streak logic in useProgressStore.completeLevel — but we don't
 * import that function because we don't want to mark a level. We just want to
 * register activity for today.
 */
function bumpDailyStreak() {
  const phase = useProgressStore.getState()
  const today = localDateStr()
  const yesterday = (() => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return localDateStr(d)
  })()

  let newStreak: number
  let newLastStreakDate: string
  if (phase.lastStreakDate === today) {
    return  // already counted today
  } else if (phase.lastStreakDate === yesterday) {
    newStreak = phase.currentStreak + 1
    newLastStreakDate = today
  } else {
    newStreak = 1
    newLastStreakDate = today
  }
  useProgressStore.setState({
    currentStreak: newStreak,
    bestStreak:    Math.max(newStreak, phase.bestStreak),
    lastActiveAt:  new Date().toISOString(),
    lastStreakDate: newLastStreakDate,
  })
}

function localDateStr(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const useBasicsStore = create<BasicsState>()(
  persist(
    (set, get) => ({
      lessons: {},

      completeLesson: (lessonKey, payload) => {
        const state = get()
        const existing = state.lessons[lessonKey]
        if (existing?.completed) return

        bumpDailyStreak()

        set({
          lessons: {
            ...state.lessons,
            [lessonKey]: {
              completed:      true,
              attempts:       (existing?.attempts ?? 0) + 1,
              visitedAt:      existing?.visitedAt ?? new Date().toISOString(),
              bestCode:       payload?.code   ?? existing?.bestCode,
              selectedOption: payload?.option ?? existing?.selectedOption,
            },
          },
        })
      },

      recordLessonAttempt: (lessonKey, payload) => {
        const state = get()
        const existing = state.lessons[lessonKey]
        set({
          lessons: {
            ...state.lessons,
            [lessonKey]: {
              completed:      existing?.completed ?? false,
              attempts:       (existing?.attempts ?? 0) + 1,
              visitedAt:      existing?.visitedAt ?? new Date().toISOString(),
              bestCode:       payload?.code   ?? existing?.bestCode,
              selectedOption: payload?.option ?? existing?.selectedOption,
            },
          },
        })
      },

      markLessonVisited: (lessonKey) => {
        const state = get()
        const existing = state.lessons[lessonKey]
        if (existing) return  // already visited (or completed)
        set({
          lessons: {
            ...state.lessons,
            [lessonKey]: {
              completed: false,
              attempts:  0,
              visitedAt: new Date().toISOString(),
            },
          },
        })
      },

      hydrateBasicsFromServer: (data) => {
        const state = get()
        const merged = { ...state.lessons }
        for (const lp of data.lessons) {
          const local = state.lessons[lp.lessonId]
          if (!local) {
            merged[lp.lessonId] = {
              completed:      lp.completed,
              attempts:       lp.attempts,
              visitedAt:      lp.visitedAt      ?? undefined,
              bestCode:       lp.bestCode       ?? undefined,
              selectedOption: lp.selectedOption ?? undefined,
            }
          } else if (lp.completed && !local.completed) {
            // Server knows this is complete — promote it locally.
            merged[lp.lessonId] = {
              completed:      true,
              attempts:       Math.max(lp.attempts, local.attempts),
              visitedAt:      local.visitedAt ?? lp.visitedAt ?? undefined,
              bestCode:       lp.bestCode ?? local.bestCode,
              selectedOption: lp.selectedOption ?? local.selectedOption,
            }
          }
          // Otherwise local already complete or both incomplete — keep local.
        }
        set({ lessons: merged })
      },

      isLessonComplete: (lessonKey) => get().lessons[lessonKey]?.completed === true,

      getCompletedCount: (lessonKeys) =>
        lessonKeys.filter((k) => get().lessons[k]?.completed).length,
    }),
    { name: 'pykiskis_basics' },
  ),
)
