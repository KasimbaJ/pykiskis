import { create } from 'zustand'
import type { Class } from '../types'
import {
  fetchClasses,
  createClass as apiCreateClass,
  updateClassMembers,
} from '../services/progressApi'

// ─────────────────────────────────────────────────────────────────────────────
// useClassesStore — teacher's classes (Teacher Dashboard). Loaded on demand;
// mutations re-sync from the server response so the UI stays consistent.
// ─────────────────────────────────────────────────────────────────────────────

interface ClassesState {
  classes: Class[]
  isLoading: boolean
  error: string | null
  load: (token: string) => Promise<void>
  create: (token: string, name: string) => Promise<void>
  setMembers: (
    token: string,
    classId: string,
    changes: { add?: string[]; remove?: string[] },
  ) => Promise<void>
}

const byName = (a: Class, b: Class) => a.name.localeCompare(b.name)

export const useClassesStore = create<ClassesState>((set, get) => ({
  classes: [],
  isLoading: false,
  error: null,

  load: async (token) => {
    set({ isLoading: true, error: null })
    try {
      set({ classes: (await fetchClasses(token)).sort(byName), isLoading: false })
    } catch (e) {
      set({ error: String(e), isLoading: false })
    }
  },

  create: async (token, name) => {
    const cls = await apiCreateClass(token, name)
    set({ classes: [...get().classes, cls].sort(byName) })
  },

  setMembers: async (token, classId, changes) => {
    const memberIds = await updateClassMembers(token, classId, changes)
    set({
      classes: get().classes.map((c) => (c.id === classId ? { ...c, memberIds } : c)),
    })
  },
}))
