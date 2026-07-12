import { describe, it, expect } from 'vitest'
import {
  gradeProgressTest,
  isSpecCorrect,
  type LessonKey,
  type SubmittedAnswer,
} from './gradeProgressTest'
import { PROGRESS_TEST_KEY } from './progressTestKey.generated'

// A synthetic 10-question, single-bank lesson covering all three question types.
const key: LessonKey = {
  drawCount: 10,
  banks: [
    {
      q1: { t: 'mcq', c: 'b' },
      q2: { t: 'mcq', c: 'a' },
      q3: { t: 'po', e: '5\n' },
      q4: { t: 'po', e: 'hello' },
      q5: { t: 'fib', a: ['print', 'print()'] },
      q6: { t: 'mcq', c: 'c' },
      q7: { t: 'mcq', c: 'a' },
      q8: { t: 'po', e: '42' },
      q9: { t: 'fib', a: ['len'] },
      q10: { t: 'mcq', c: 'd' },
    },
  ],
}

function answer(id: string, a: string): SubmittedAnswer {
  return { bankIndex: 0, questionId: id, answer: a }
}

const allCorrect: SubmittedAnswer[] = [
  answer('q1', 'b'),
  answer('q2', 'a'),
  answer('q3', '5'), // trailing newline is normalised away
  answer('q4', 'hello'),
  answer('q5', 'PRINT'), // fill-in-blank is case-insensitive
  answer('q6', 'c'),
  answer('q7', 'a'),
  answer('q8', '42'),
  answer('q9', 'len'),
  answer('q10', 'd'),
]

describe('isSpecCorrect', () => {
  it('mcq matches the correct option id only', () => {
    expect(isSpecCorrect({ t: 'mcq', c: 'b' }, 'b')).toBe(true)
    expect(isSpecCorrect({ t: 'mcq', c: 'b' }, 'a')).toBe(false)
  })
  it('predict-output normalises CRLF and trailing whitespace', () => {
    expect(isSpecCorrect({ t: 'po', e: '5\n' }, '5')).toBe(true)
    expect(isSpecCorrect({ t: 'po', e: 'a\nb' }, 'a\r\nb  ')).toBe(true)
    expect(isSpecCorrect({ t: 'po', e: '5' }, '6')).toBe(false)
  })
  it('fill-in-blank is trimmed and case-insensitive', () => {
    expect(isSpecCorrect({ t: 'fib', a: ['print'] }, '  Print ')).toBe(true)
    expect(isSpecCorrect({ t: 'fib', a: ['print'] }, 'printf')).toBe(false)
  })
})

describe('gradeProgressTest', () => {
  it('scores a perfect submission 10/10', () => {
    expect(gradeProgressTest(key, allCorrect)).toBe(10)
  })

  it('scores half-right as 5', () => {
    const half = allCorrect.map((a, i) =>
      i < 5 ? a : { ...a, answer: '<<wrong>>' },
    )
    expect(gradeProgressTest(key, half)).toBe(5)
  })

  it('does NOT let one correct answer forge a perfect score', () => {
    // The forgery this replaces: submitting a single correct answer must score
    // 1/10 (rounded), not 10 — the denominator is the fixed drawCount.
    expect(gradeProgressTest(key, [answer('q1', 'b')])).toBe(1)
  })

  it('ignores duplicate submissions of the same question', () => {
    const dupes = Array.from({ length: 10 }, () => answer('q1', 'b'))
    expect(gradeProgressTest(key, dupes)).toBe(1)
  })

  it('ignores unknown question ids and bank indexes', () => {
    expect(gradeProgressTest(key, [answer('does-not-exist', 'b')])).toBe(0)
    expect(
      gradeProgressTest(key, [{ bankIndex: 9, questionId: 'q1', answer: 'b' }]),
    ).toBe(0)
  })

  it('returns 0 for an empty submission', () => {
    expect(gradeProgressTest(key, [])).toBe(0)
  })
})

describe('generated answer key', () => {
  it('contains progress-test lessons with well-formed specs', () => {
    const ids = Object.keys(PROGRESS_TEST_KEY)
    expect(ids.length).toBeGreaterThan(0)
    for (const id of ids) {
      const lesson = PROGRESS_TEST_KEY[id]
      expect(lesson.drawCount).toBeGreaterThan(0)
      expect(lesson.banks.length).toBeGreaterThan(0)
      for (const bank of lesson.banks) {
        for (const q of Object.values(bank)) {
          expect(['mcq', 'po', 'fib']).toContain(q.t)
        }
      }
    }
  })
})
