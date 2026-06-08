import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_LANG, type Lang } from '../i18n'

// ─────────────────────────────────────────────────────────────────────────────
// useLangStore — the learner's chosen content/UI language, persisted to
// localStorage (mirrors useThemeStore).  Default is English; untranslated
// content falls back to English via localize().
// ─────────────────────────────────────────────────────────────────────────────

interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: DEFAULT_LANG,
      setLang: (lang) => set({ lang }),
    }),
    { name: 'pykiskis_lang' },
  ),
)
