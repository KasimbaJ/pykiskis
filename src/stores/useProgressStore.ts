import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LevelProgress } from '../types'
import { getLevelById, getLevelsByPhase } from '../data/levels/index'

interface ProgressState {
  studentName: string;
  levels: Record<number, LevelProgress>;
  currentStreak: number;
  bestStreak: number;
  lastActiveAt: string;
  lastStreakDate: string;

  setStudentName: (name: string) => void;
  completeLevel: (levelId: number, code: string) => void;
  recordAttempt: (levelId: number) => void;
  resetLevel: (levelId: number) => void;
  resetAllProgress: () => void;
  isLevelUnlocked: (levelId: number) => boolean;
  getCompletedCount: () => number;
  getPhaseProgress: (phase: number) => { completed: number; total: number };
  breakStreak: () => void;
}

/** Returns YYYY-MM-DD in the user's local timezone (not UTC). */
function localDateStr(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      studentName: '',
      levels: {},
      currentStreak: 0,
      bestStreak: 0,
      lastActiveAt: new Date().toISOString(),
      lastStreakDate: '',

      setStudentName: (name) => set({ studentName: name }),

      completeLevel: (levelId, code) => {
        const state = get()
        const existing = state.levels[levelId]
        if (existing?.completed) return

        // Daily streak: one increment per calendar day (local timezone)
        const todayStr = localDateStr()
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = localDateStr(yesterday)

        let newStreak: number
        let newLastStreakDate: string
        if (state.lastStreakDate === todayStr) {
          // Already earned streak today — don't double-count
          newStreak = state.currentStreak
          newLastStreakDate = state.lastStreakDate
        } else if (state.lastStreakDate === yesterdayStr) {
          // Active yesterday — continue streak
          newStreak = state.currentStreak + 1
          newLastStreakDate = todayStr
        } else {
          // Gap in activity — start fresh
          newStreak = 1
          newLastStreakDate = todayStr
        }

        set({
          levels: {
            ...state.levels,
            [levelId]: {
              completed: true,
              attempts: (existing?.attempts ?? 0) + 1,
              completedAt: new Date().toISOString(),
              bestCode: code,
            },
          },
          currentStreak: newStreak,
          bestStreak: Math.max(newStreak, state.bestStreak),
          lastActiveAt: new Date().toISOString(),
          lastStreakDate: newLastStreakDate,
        })
      },

      recordAttempt: (levelId) => {
        const state = get()
        const existing = state.levels[levelId]
        set({
          levels: {
            ...state.levels,
            [levelId]: {
              completed: existing?.completed ?? false,
              attempts: (existing?.attempts ?? 0) + 1,
              completedAt: existing?.completedAt,
              bestCode: existing?.bestCode,
            },
          },
          lastActiveAt: new Date().toISOString(),
        })
      },

      breakStreak: () => set({ currentStreak: 0, lastStreakDate: '' }),

      resetLevel: (levelId) => {
        const state = get()
        const newLevels = { ...state.levels }
        delete newLevels[levelId]
        set({ levels: newLevels })
      },

      resetAllProgress: () =>
        set({
          levels: {},
          currentStreak: 0,
          bestStreak: 0,
        }),

      isLevelUnlocked: (levelId) => {
        if (levelId === 1) return true
        const state = get()
        const level = getLevelById(levelId)
        if (!level) return false

        const prevLevel = getLevelById(levelId - 1)

        // First level of a new phase: require 80% of previous phase completed
        if (prevLevel && prevLevel.phase !== level.phase) {
          const prevPhaseLevels = getLevelsByPhase(prevLevel.phase)
          const completedInPrevPhase = prevPhaseLevels.filter(
            (l) => state.levels[l.id]?.completed
          ).length
          return completedInPrevPhase >= Math.ceil(prevPhaseLevels.length * 0.8)
        }

        // Within same phase: just need previous level complete
        return state.levels[levelId - 1]?.completed === true
      },

      getCompletedCount: () => {
        const state = get()
        return Object.values(state.levels).filter((l) => l.completed).length
      },

      getPhaseProgress: (phase) => {
        const state = get()
        const phaseLevels = getLevelsByPhase(phase)
        const completed = phaseLevels.filter(
          (l) => state.levels[l.id]?.completed
        ).length
        return { completed, total: phaseLevels.length }
      },
    }),
    {
      name: 'pykiskis_progress',
    }
  )
)
