import { describe, it, expect } from 'vitest'
import {
  chapters,
  getChapterBySlug,
  lessonKey,
  flattenChapter,
  countChapterLessons,
  isLessonUnlocked,
  adjacentLessons,
  progressTestsByChapter,
} from './index'

const CH2 = 'decision-making-loops'

describe('lessonKey', () => {
  it('joins chapter.module.lesson with dots', () => {
    expect(lessonKey('a', 'b', 'c')).toBe('a.b.c')
  })
})

describe('flattenChapter / countChapterLessons', () => {
  it('count equals the flattened lesson list length', () => {
    for (const ch of chapters) {
      expect(countChapterLessons(ch)).toBe(flattenChapter(ch).length)
    }
  })

  it('every flattened entry knows the chapter total', () => {
    const ch = getChapterBySlug(CH2)!
    const flat = flattenChapter(ch)
    expect(flat.length).toBeGreaterThan(0)
    for (const loc of flat) expect(loc.total).toBe(flat.length)
  })
})

describe('isLessonUnlocked (gating)', () => {
  const ch = getChapterBySlug(CH2)!
  const flat = flattenChapter(ch)

  it('always unlocks the very first lesson of a chapter', () => {
    const first = flat[0]
    expect(
      isLessonUnlocked(ch.slug, first.module.slug, first.lesson.slug, () => false),
    ).toBe(true)
  })

  it('locks the second lesson until its predecessor is complete', () => {
    const second = flat[1]
    const prevKey = lessonKey(ch.slug, flat[0].module.slug, flat[0].lesson.slug)
    // predecessor incomplete -> locked
    expect(
      isLessonUnlocked(ch.slug, second.module.slug, second.lesson.slug, () => false),
    ).toBe(false)
    // predecessor complete -> unlocked
    expect(
      isLessonUnlocked(ch.slug, second.module.slug, second.lesson.slug, (k) => k === prevKey),
    ).toBe(true)
  })

  it('always unlocks progress-test lessons, even with nothing completed', () => {
    const pt = flat.find((l) => l.lesson.type === 'progress-test')
    expect(pt).toBeDefined()
    expect(
      isLessonUnlocked(ch.slug, pt!.module.slug, pt!.lesson.slug, () => false),
    ).toBe(true)
  })
})

describe('adjacentLessons', () => {
  it('links neighbours within a chapter', () => {
    const ch = getChapterBySlug(CH2)!
    const flat = flattenChapter(ch)
    const mid = flat[1]
    const { prev, current, next } = adjacentLessons(ch.slug, mid.module.slug, mid.lesson.slug)
    expect(current?.lesson.slug).toBe(mid.lesson.slug)
    expect(prev?.lesson.slug).toBe(flat[0].lesson.slug)
    expect(next?.lesson.slug).toBe(flat[2].lesson.slug)
  })

  it('has no prev for the first lesson', () => {
    const ch = getChapterBySlug(CH2)!
    const flat = flattenChapter(ch)
    const { prev } = adjacentLessons(ch.slug, flat[0].module.slug, flat[0].lesson.slug)
    expect(prev).toBeUndefined()
  })
})

describe('progressTestsByChapter (teacher dashboard)', () => {
  const groups = progressTestsByChapter()

  it('includes content chapters that have progress tests', () => {
    const ids = groups.map((g) => g.chapterId)
    expect(ids).toContain(2) // Decision Making & Loops
    expect(ids).toContain(5) // Data Types
  })

  it('omits project chapters (no progress-test lessons)', () => {
    const ids = groups.map((g) => g.chapterId)
    expect(ids).not.toContain(3) // Projects
    expect(ids).not.toContain(7) // Projects
  })

  it('every group has at least one test with a well-formed key', () => {
    expect(groups.length).toBeGreaterThan(0)
    for (const g of groups) {
      expect(g.tests.length).toBeGreaterThan(0)
      for (const t of g.tests) {
        expect(t.key.split('.')).toHaveLength(3)
        expect(t.label.length).toBeGreaterThan(0)
      }
    }
  })
})
