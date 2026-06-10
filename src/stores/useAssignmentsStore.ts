import { create } from 'zustand'
import type { Assignment } from '../types'
import {
  fetchAssignments,
  createAssignment as apiCreate,
  deleteAssignment as apiDelete,
} from '../services/progressApi'

// ─────────────────────────────────────────────────────────────────────────────
// useAssignmentsStore — teacher's assignments (Teacher Dashboard). Loaded for
// all classes at once; the UI filters by the selected class.
// ─────────────────────────────────────────────────────────────────────────────

interface AssignmentsState {
  assignments: Assignment[]
  isLoading: boolean
  error: string | null
  load: (token: string) => Promise<void>
  create: (
    token: string,
    data: {
      classId: string
      contentType: Assignment['contentType']
      contentKey: string
      title: string
      dueDate?: string | null
    },
  ) => Promise<void>
  remove: (token: string, id: string) => Promise<void>
}

export const useAssignmentsStore = create<AssignmentsState>((set, get) => ({
  assignments: [],
  isLoading: false,
  error: null,

  load: async (token) => {
    set({ isLoading: true, error: null })
    try {
      set({ assignments: await fetchAssignments(token), isLoading: false })
    } catch (e) {
      set({ error: String(e), isLoading: false })
    }
  },

  create: async (token, data) => {
    const a = await apiCreate(token, data)
    set({ assignments: [a, ...get().assignments] })
  },

  remove: async (token, id) => {
    await apiDelete(token, id)
    set({ assignments: get().assignments.filter((a) => a.id !== id) })
  },
}))
