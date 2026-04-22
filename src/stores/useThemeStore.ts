import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggle: () => {
        const isDark = !get().isDark
        document.documentElement.classList.toggle('dark', isDark)
        set({ isDark })
      },
    }),
    {
      name: 'pykiskis_theme',
      onRehydrateStorage: () => (state) => {
        if (state?.isDark) document.documentElement.classList.add('dark')
      },
    },
  ),
)
