import { describe, it, expect } from 'vitest'
import { localize, DEFAULT_LANG, LANGS } from './i18n'

describe('localize', () => {
  it('passes a plain string through unchanged (untranslated content)', () => {
    expect(localize('Hello', 'lt')).toBe('Hello')
    expect(localize('Hello', 'en')).toBe('Hello')
  })

  it('returns the chosen language from a translated map', () => {
    const v = { en: 'Hello', lt: 'Sveiki' }
    expect(localize(v, 'en')).toBe('Hello')
    expect(localize(v, 'lt')).toBe('Sveiki')
  })

  it('falls back to English when the chosen language is missing', () => {
    expect(localize({ en: 'Hello' }, 'lt')).toBe('Hello')
  })

  it('falls back to any available translation when English is missing', () => {
    expect(localize({ lt: 'Sveiki' }, 'en')).toBe('Sveiki')
  })

  it('returns an empty string for an empty map', () => {
    expect(localize({}, 'en')).toBe('')
  })
})

describe('language config', () => {
  it('defaults to English', () => {
    expect(DEFAULT_LANG).toBe('en')
  })

  it('offers exactly EN and LT', () => {
    expect(LANGS.map((l) => l.code)).toEqual(['en', 'lt'])
  })
})
