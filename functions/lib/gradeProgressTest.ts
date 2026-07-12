// ─────────────────────────────────────────────────────────────────────────────
// Server-authoritative grading for Python Basics progress tests.
//
// The browser draws a random set of questions from the lesson's banks and lets
// the learner answer them, but the SCORE that reaches the teacher dashboard is
// computed HERE, on the server, from the learner's raw answers — never trusted
// from the client.  This closes the "POST bestScore: 10" forgery hole: a score
// can only be produced by answers that actually grade correctly against the
// compiled answer key (functions/lib/progressTestKey.generated.ts).
//
// The answer key is generated at build time from the same content the client
// renders (see gen-test-key.ts); a CI guard fails if it drifts.
// ─────────────────────────────────────────────────────────────────────────────

/** One question's gradeable spec, compiled from the content. */
export type QuestionSpec =
  | { t: 'mcq'; c: string }          // correct option id
  | { t: 'po'; e: string }           // predict-output: expected output
  | { t: 'fib'; a: string[] }        // fill-in-blank: accepted answers

/** One progress-test lesson's key: the draw size and per-bank specs. */
export interface LessonKey {
  /** Denominator for scoring: min(presentCount, total questions available). */
  drawCount: number
  /** One record per bank, keyed by question id. */
  banks: Record<string, QuestionSpec>[]
}

/** The whole key, indexed by `${chapter}.${module}.${lesson}` lesson id. */
export type ProgressTestKey = Record<string, LessonKey>

/** One answer as submitted by the client. */
export interface SubmittedAnswer {
  bankIndex: number
  questionId: string
  answer: string
}

/** Mirror of the client's normalize() in ProgressTestView — keep in sync. */
function normalize(text: string): string {
  return text.replace(/\r\n/g, '\n').trimEnd()
}

/** Grade one answer against its spec. Mirrors the client's isCorrect(). */
export function isSpecCorrect(spec: QuestionSpec, answer: string): boolean {
  switch (spec.t) {
    case 'mcq':
      return answer === spec.c
    case 'po':
      return normalize(answer) === normalize(spec.e)
    case 'fib':
      return spec.a
        .map((a) => a.trim().toLowerCase())
        .includes(answer.trim().toLowerCase())
  }
}

/**
 * Grade a full submission → a score out of 10.
 *
 * The denominator is the lesson's fixed `drawCount`, NOT the number of answers
 * submitted — so a client can't score 10/10 by submitting a single correct
 * answer.  Duplicate (bankIndex, questionId) pairs are counted once, and the
 * correct tally is clamped to drawCount.
 */
export function gradeProgressTest(key: LessonKey, answers: SubmittedAnswer[]): number {
  if (key.drawCount <= 0) return 0

  const seen = new Set<string>()
  let correct = 0

  for (const a of answers) {
    const dedupeKey = `${a.bankIndex}:${a.questionId}`
    if (seen.has(dedupeKey)) continue
    seen.add(dedupeKey)

    const bank = key.banks[a.bankIndex]
    const spec = bank ? bank[a.questionId] : undefined
    if (spec && isSpecCorrect(spec, a.answer)) correct++
  }

  if (correct > key.drawCount) correct = key.drawCount
  return Math.round((correct / key.drawCount) * 10)
}
