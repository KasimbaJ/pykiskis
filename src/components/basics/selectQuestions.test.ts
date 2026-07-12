import { describe, it, expect } from 'vitest'
import { selectQuestions } from './selectQuestions'
import type { ProgressTestLesson, ProgressTestQuestion } from '../../types/basics'

// Minimal synthetic banks: each question's id starts with the bank letter, so
// we can count how many came from each bank.
function bank(letter: string, n: number): ProgressTestQuestion[] {
  return Array.from(
    { length: n },
    (_, i) =>
      ({
        id: `${letter}${i}`,
        qType: 'mcq',
        prompt: 'q',
        options: [
          { id: 'a', text: 'a' },
          { id: 'b', text: 'b' },
        ],
        correctOptionId: 'a',
        explanation: '',
      }) as ProgressTestQuestion,
  )
}

function lesson(presentCount: number, banks: ProgressTestQuestion[][]): ProgressTestLesson {
  return {
    slug: 'test',
    title: 'T',
    type: 'progress-test',
    intro: '',
    passingScore: 7,
    presentCount,
    questionBanks: banks,
  } as ProgressTestLesson
}

describe('selectQuestions', () => {
  it('draws exactly presentCount when it divides evenly (15 across 3 banks)', () => {
    const l = lesson(15, [bank('A', 30), bank('B', 30), bank('C', 30)])
    expect(selectQuestions(l)).toHaveLength(15)
  })

  it('draws EXACTLY 20 across 3 banks (the Chapter 2 final) — remainder spread, not floored to 18', () => {
    const l = lesson(20, [bank('A', 30), bank('B', 30), bank('C', 30)])
    // Re-roll several times: the count must always be exactly 20.
    for (let r = 0; r < 25; r++) expect(selectQuestions(l)).toHaveLength(20)
  })

  it('a single-bank module test draws exactly presentCount (10)', () => {
    expect(selectQuestions(lesson(10, [bank('A', 30)]))).toHaveLength(10)
  })

  it('balances the per-bank share (20/3 → each bank gives 6 or 7)', () => {
    const drawn = selectQuestions(lesson(20, [bank('A', 30), bank('B', 30), bank('C', 30)]))
    const counts: Record<string, number> = { A: 0, B: 0, C: 0 }
    for (const d of drawn) counts[d.question.id[0]]++
    for (const k of ['A', 'B', 'C']) {
      expect(counts[k]).toBeGreaterThanOrEqual(6)
      expect(counts[k]).toBeLessThanOrEqual(7)
    }
  })

  it('tags each drawn question with the index of its source bank', () => {
    const drawn = selectQuestions(lesson(20, [bank('A', 30), bank('B', 30), bank('C', 30)]))
    const letterToIndex: Record<string, number> = { A: 0, B: 1, C: 2 }
    for (const d of drawn) {
      expect(d.bankIndex).toBe(letterToIndex[d.question.id[0]])
    }
  })

  it('never repeats a question within one draw', () => {
    const drawn = selectQuestions(lesson(20, [bank('A', 30), bank('B', 30), bank('C', 30)]))
    expect(new Set(drawn.map((d) => d.question.id)).size).toBe(drawn.length)
  })

  it('a bank smaller than its share contributes only what it has', () => {
    expect(selectQuestions(lesson(10, [bank('A', 4)]))).toHaveLength(4)
  })
})
