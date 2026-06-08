// ─────────────────────────────────────────────────────────────────────────────
// i18n — language types + a backward-compatible localized-string model.
//
// `LocalizedString` is either a plain string (not yet translated / same in all
// languages — keeps existing content valid and untouched) or a per-language
// map.  `localize()` resolves it to the chosen language, falling back to English
// and then to any available translation.  Only PROSE is localized — Python code,
// expected output, and answer keys stay language-neutral.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'lt'

/** Display labels for the language switch. */
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'lt', label: 'LT' },
]

export const DEFAULT_LANG: Lang = 'en'

/** A string that may be translated.  Plain string = same in all languages. */
export type LocalizedString = string | Partial<Record<Lang, string>>

/** Resolve a LocalizedString for display: chosen lang → English → any. */
export function localize(value: LocalizedString, lang: Lang): string {
  if (typeof value === 'string') return value
  return (
    value[lang] ??
    value.en ??
    Object.values(value).find((v): v is string => typeof v === 'string') ??
    ''
  )
}
