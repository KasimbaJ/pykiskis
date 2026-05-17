import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LevelProgress, ServerProgress } from '../types'
import { getLevelById, getLevelsByPhase } from '../data/levels/index'

interface ProgressState {
  studentName: string;
  levels: Record<number, LevelProgress>;
  currentStreak: number;
  bestStreak: number;
  lastActiveAt: string;
  lastStreakDate: string;
  /** Clerk user id that owns the locally-cached progress (see claimForUser). */
  ownerId: string;

  setStudentName: (name: string) => void;
  completeLevel: (levelId: number, code: string) => void;
  recordAttempt: (levelId: number) => void;
  resetLevel: (levelId: number) => void;
  resetAllProgress: () => void;
  isLevelUnlocked: (levelId: number) => boolean;
  getCompletedCount: () => number;
  getPhaseProgress: (phase: number) => { completed: number; total: number };
  breakStreak: () => void;
  /** Merge server-side progress into local state (called once on sign-in). */
  hydrateFromServer: (data: ServerProgress) => void;
  /**
   * Claim the locally-cached progress for the signed-in user.  If the cache
   * belongs to a different user (school computers are shared), it is wiped
   * first so the new user starts clean and loads their own record from D1.
   */
  claimForUser: (userId: string) => void;
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
      ownerId: '',

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

      hydrateFromServer: (data) => {
        const state = get()

        // Build a levels map from the server response
        const serverLevels: Record<number, LevelProgress> = {}
        for (const lp of data.levels) {
          serverLevels[lp.levelId] = {
            completed:   lp.completed,
            attempts:    lp.attempts,
            completedAt: lp.completedAt  ?? undefined,
            bestCode:    lp.bestCode     ?? undefined,
          }
        }

        // Merge: favour the "more complete" record so neither device regresses.
        // Server wins for levels it knows are complete; local wins otherwise.
        const merged = { ...state.levels }
        for (const [id, serverLp] of Object.entries(serverLevels)) {
          const levelId = Number(id)
          const localLp = state.levels[levelId]
          if (!localLp) {
            merged[levelId] = serverLp
          } else if (serverLp.completed && !localLp.completed) {
            merged[levelId] = {
              completed:   true,
              attempts:    Math.max(serverLp.attempts, localLp.attempts),
              completedAt: serverLp.completedAt,
              bestCode:    serverLp.bestCode ?? localLp.bestCode,
            }
          }
          // Local already complete — keep local (may be ahead of server)
        }

        const update: Partial<ProgressState> = { levels: merged }

        if (data.student) {
          const { name, currentStreak, bestStreak, lastActiveAt, lastStreakDate } = data.student
          // Only fill name if not already set locally (Clerk sync handles this,
          // but may not have fired yet on first load)
          if (name && !state.studentName) update.studentName = name
          // Take the higher streak so a device that hasn't synced doesn't regress
          if (currentStreak > state.currentStreak) update.currentStreak = currentStreak
          if (bestStreak    > state.bestStreak)    update.bestStreak    = bestStreak
          if (lastActiveAt)   update.lastActiveAt  = lastActiveAt
          if (lastStreakDate && !state.lastStreakDate) update.lastStreakDate = lastStreakDate
        }

        set(update)
      },

      claimForUser: (userId) => {
        if (get().ownerId === userId) return
        // A different student is signing in on this shared browser — wipe the
        // cached progress so they can't inherit it.  Their own record is
        // loaded from D1 by hydrateFromServer right after.  studentName is
        // left to SyncClerkUser, which sets it from Clerk on every sign-in.
        set({
          ownerId: userId,
          levels: {},
          currentStreak: 0,
          bestStreak: 0,
          lastActiveAt: new Date().toISOString(),
          lastStreakDate: '',
        })
      },

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
