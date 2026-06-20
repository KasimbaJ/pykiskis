import type { ProgressTestLesson, ProgressTestQuestion } from '../../types/basics'

/** Fisher–Yates shuffle — returns a new array, leaves the input untouched. */
export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Draw the questions for one attempt: as even a share from each bank as
 * possible, totalling exactly `presentCount`. When the count does not divide
 * evenly across the banks, the leftover is spread one-per-bank (e.g. 20 across
 * 3 banks → 7 + 7 + 6). The combined set is then shuffled so the banks are
 * interleaved rather than grouped. (A bank with fewer questions than its share
 * simply contributes all it has.)
 */
export function selectQuestions(lesson: ProgressTestLesson): ProgressTestQuestion[] {
  const banks = lesson.questionBanks
  const base = Math.floor(lesson.presentCount / banks.length)
  const remainder = lesson.presentCount % banks.length
  return shuffle(
    banks.flatMap((bank, i) =>
      shuffle(bank).slice(0, base + (i < remainder ? 1 : 0)),
    ),
  )
}
