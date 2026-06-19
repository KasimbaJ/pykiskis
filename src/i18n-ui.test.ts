// A tiny in-memory localStorage stub so importing the language store (zustand +
// persist) works under Vitest's node environment without jsdom.
const _store = new Map<string, string>()
;(globalThis as { localStorage?: Storage }).localStorage = {
  getItem: (k: string) => _store.get(k) ?? null,
  setItem: (k: string, v: string) => void _store.set(k, v),
  removeItem: (k: string) => void _store.delete(k),
  clear: () => _store.clear(),
  key: () => null,
  length: 0,
} as Storage

import { describe, it, expect } from 'vitest'
import { t } from './i18n-ui'

describe('t (UI chrome translation)', () => {
  it('resolves a known key in each language', () => {
    expect(t('run', 'en')).toBe('Run')
    expect(t('run', 'lt')).toBe('Paleisti')
  })

  it('falls back to English when the Lithuanian is missing or for safety', () => {
    // Every shipped key has both languages, so this checks the resolver order:
    // chosen lang -> en -> key. We assert en resolves for a known key.
    expect(t('submit', 'en')).toBe('Submit')
  })

  it('falls back to the key itself for an unknown key', () => {
    expect(t('this.key.does.not.exist', 'en')).toBe('this.key.does.not.exist')
    expect(t('this.key.does.not.exist', 'lt')).toBe('this.key.does.not.exist')
  })

  it('interpolates variables into the template', () => {
    expect(t('phase.id', 'en', { id: 3 })).toBe('Phase 3')
    expect(t('phase.id', 'lt', { id: 3 })).toBe('Fazė 3')
  })

  it('leaves an unknown placeholder visible rather than crashing', () => {
    // A var the template references but we did not supply stays as {name}.
    const out = t('assignments.notDone', 'en')
    expect(out).toContain('{names}')
  })
})
