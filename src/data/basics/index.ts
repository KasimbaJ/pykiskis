import type { Chapter, Module, Lesson } from '../../types/basics'
import { ch1 } from './ch1-introduction'
import { ch2 } from './ch2-decision-making-loops'
import { ch3 } from './ch3-projects'
import { ch4 } from './ch4-functions'
import { ch5 } from './ch5-data-types'
import { ch6 } from './ch6-completing-basics'
import { ch7 } from './ch7-projects'

/** All chapters in display order. */
export const chapters: Chapter[] = [ch1, ch2, ch3, ch4, ch5, ch6, ch7]

// ─── Lookups ─────────────────────────────────────────────────────────────────

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug)
}

export function getModuleBySlug(
  chapterSlug: string,
  moduleSlug: string,
): Module | undefined {
  return getChapterBySlug(chapterSlug)?.modules.find((m) => m.slug === moduleSlug)
}

export function getLessonBySlug(
  chapterSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getModuleBySlug(chapterSlug, moduleSlug)?.lessons.find(
    (l) => l.slug === lessonSlug,
  )
}

// ─── Composite key used in the progress store ────────────────────────────────

/** Build the canonical lesson key: `${chapter}.${module}.${lesson}`. */
export function lessonKey(
  chapterSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): string {
  return `${chapterSlug}.${moduleSlug}.${lessonSlug}`
}

// ─── Counts ──────────────────────────────────────────────────────────────────

/** Total number of lessons in a chapter (sum across all modules). */
export function countChapterLessons(chapter: Chapter): number {
  return chapter.modules.reduce((sum, m) => sum + m.lessons.length, 0)
}

/** Sum across the entire Basics track — handy for the header progress pill. */
export function countAllBasicsLessons(): number {
  return chapters.reduce((sum, c) => sum + countChapterLessons(c), 0)
}

// ─── Navigation helpers (for Prev / Next buttons inside a lesson) ────────────

export interface LessonLocation {
  chapter: Chapter
  module: Module
  lesson: Lesson
  /** Index of the lesson within the chapter's flattened lesson list. */
  index: number
  /** Total lessons in the chapter. */
  total: number
}

/** Flatten a chapter's modules to a single sequence of lessons. */
export function flattenChapter(chapter: Chapter): LessonLocation[] {
  const flat: LessonLocation[] = []
  for (const mod of chapter.modules) {
    for (const lesson of mod.lessons) {
      flat.push({
        chapter,
        module: mod,
        lesson,
        index: flat.length,
        total: 0, // patched below
      })
    }
  }
  // Patch in the total so each entry knows the chapter size.
  flat.forEach((loc) => {
    loc.total = flat.length
  })
  return flat
}

/** Return the previous / next lesson in the same chapter, if any. */
export function adjacentLessons(
  chapterSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): { prev?: LessonLocation; next?: LessonLocation; current?: LessonLocation } {
  const chapter = getChapterBySlug(chapterSlug)
  if (!chapter) return {}
  const flat = flattenChapter(chapter)
  const i = flat.findIndex(
    (loc) =>
      loc.module.slug === moduleSlug && loc.lesson.slug === lessonSlug,
  )
  if (i === -1) return {}
  return {
    prev:    i > 0                ? flat[i - 1] : undefined,
    current: flat[i],
    next:    i < flat.length - 1  ? flat[i + 1] : undefined,
  }
}

// ─── Unlock gating ───────────────────────────────────────────────────────────

/**
 * Is this lesson unlocked?  Rules:
 *   1. The very first lesson of every chapter is always unlocked (so a learner
 *      can start any chapter at will once the chapter itself is open).
 *   2. Otherwise the previous lesson in the same chapter must be completed.
 *
 * Chapter-level gating (e.g. "complete 80% of chapter N to start N+1") is
 * applied at the ChapterPage / BasicsHomePage level, not here.
 */
export function isLessonUnlocked(
  chapterSlug: string,
  moduleSlug: string,
  lessonSlug: string,
  isLessonComplete: (key: string) => boolean,
): boolean {
  const chapter = getChapterBySlug(chapterSlug)
  if (!chapter) return false
  const flat = flattenChapter(chapter)
  const i = flat.findIndex(
    (loc) => loc.module.slug === moduleSlug && loc.lesson.slug === lessonSlug,
  )
  if (i <= 0) return true  // not found is permissive; first lesson always unlocked
  const prev = flat[i - 1]
  return isLessonComplete(lessonKey(chapter.slug, prev.module.slug, prev.lesson.slug))
}

/** Return all lesson keys in a chapter in display order. */
export function chapterLessonKeys(chapter: Chapter): string[] {
  return flattenChapter(chapter).map((loc) =>
    lessonKey(chapter.slug, loc.module.slug, loc.lesson.slug),
  )
}

/** Return all lesson keys in a single module. */
export function moduleLessonKeys(chapterSlug: string, module: Module): string[] {
  return module.lessons.map((l) => lessonKey(chapterSlug, module.slug, l.slug))
}
