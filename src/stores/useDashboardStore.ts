import { create } from 'zustand'
import type { StudentProgress } from '../types'
import { fetchStudents, deleteStudent } from '../services/progressApi'

interface DashboardState {
  students: StudentProgress[]
  selectedStudent: string | null
  isLoading: boolean
  error: string | null

  loadStudents: (token: string) => Promise<void>
  removeStudent: (token: string, userId: string) => Promise<void>
  setSelectedStudent: (name: string | null) => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  students: [],
  selectedStudent: null,
  isLoading: false,
  error: null,

  loadStudents: async (token) => {
    set({ isLoading: true, error: null })
    try {
      const students = await fetchStudents(token)
      set({ students, isLoading: false })
    } catch (err) {
      set({ error: String(err), isLoading: false })
    }
  },

  removeStudent: async (token, userId) => {
    // Optimistically drop the row; restore it if the request fails.
    const prev = get().students
    set({
      students: prev.filter((s) => s.userId !== userId),
      selectedStudent: null,
    })
    try {
      await deleteStudent(token, userId)
    } catch (err) {
      set({ students: prev, error: String(err) })
    }
  },

  setSelectedStudent: (name) => set({ selectedStudent: name }),
}))
