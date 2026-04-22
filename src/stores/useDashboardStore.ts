import { create } from 'zustand'
import type { StudentProgress } from '../types'
import { fetchStudents } from '../services/progressApi'

interface DashboardState {
  students: StudentProgress[]
  selectedStudent: string | null
  isLoading: boolean
  error: string | null

  loadStudents: (token: string) => Promise<void>
  setSelectedStudent: (name: string | null) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
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

  setSelectedStudent: (name) => set({ selectedStudent: name }),
}))
