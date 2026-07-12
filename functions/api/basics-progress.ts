import { verifyClerkToken } from '../_auth'
import { gradeProgressTest, type SubmittedAnswer } from '../lib/gradeProgressTest'
import { PROGRESS_TEST_KEY } from '../lib/progressTestKey.generated'

interface Env {
  DB: D1Database
  CLERK_SECRET_KEY: string
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// ─── POST body validation ────────────────────────────────────────────────────

interface BasicsBody {
  lessonId:       string
  completed:      boolean
  attempts:       number
  visitedAt:      string | null
  bestCode:       string | null
  selectedOption: string | null
  /** Raw progress-test answers, graded server-side (null for other lessons). */
  answers:        SubmittedAnswer[] | null
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T[\d:.Z+-]+)?$/
// Format: chapter.module.lesson — letters, digits, hyphen.  Length capped.
const LESSON_ID_RE = /^[a-z0-9-]+\.[a-z0-9-]+\.[a-z0-9-]+$/
const MAX_LESSON_ID_LEN = 200
const MAX_CODE_BYTES    = 10_000
const MAX_OPTION_LEN    = 64
const MAX_ANSWERS       = 50      // a Final Test draws 20; 50 is generous headroom
const MAX_ANSWER_LEN    = 500
const MAX_QID_LEN       = 64

function parseAnswers(raw: unknown): SubmittedAnswer[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_ANSWERS) return null
  const out: SubmittedAnswer[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') return null
    const a = item as Record<string, unknown>
    if (
      typeof a.bankIndex !== 'number' || !Number.isInteger(a.bankIndex) || a.bankIndex < 0 ||
      typeof a.questionId !== 'string' || a.questionId.length === 0 || a.questionId.length > MAX_QID_LEN ||
      typeof a.answer !== 'string' || a.answer.length > MAX_ANSWER_LEN
    ) return null
    out.push({ bankIndex: a.bankIndex, questionId: a.questionId, answer: a.answer })
  }
  return out
}

function validateBody(raw: unknown): BasicsBody | null {
  if (!raw || typeof raw !== 'object') return null
  const b = raw as Record<string, unknown>

  const lessonId =
    typeof b.lessonId === 'string' &&
    b.lessonId.length <= MAX_LESSON_ID_LEN &&
    LESSON_ID_RE.test(b.lessonId)
      ? b.lessonId
      : null
  if (!lessonId) return null

  const completed = Boolean(b.completed)

  const attempts =
    typeof b.attempts === 'number' && b.attempts >= 0
      ? Math.floor(b.attempts)
      : 0

  const visitedAt =
    typeof b.visitedAt === 'string' && ISO_DATE_RE.test(b.visitedAt)
      ? b.visitedAt
      : null

  const bestCode =
    typeof b.bestCode === 'string' ? b.bestCode.slice(0, MAX_CODE_BYTES) : null

  const selectedOption =
    typeof b.selectedOption === 'string'
      ? b.selectedOption.slice(0, MAX_OPTION_LEN)
      : null

  // Progress-test answers, graded server-side.  A client-supplied score is
  // intentionally NOT read here — best_score is derived only from these answers.
  const answers = parseAnswers(b.answers)

  return { lessonId, completed, attempts, visitedAt, bestCode, selectedOption, answers }
}

// ─── GET /api/basics-progress ────────────────────────────────────────────────

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  if (!token) return json({ error: 'Unauthorized' }, 401)

  const payload = await verifyClerkToken(token)
  if (!payload) return json({ error: 'Unauthorized' }, 401)

  try {
    const rows = await env.DB.prepare(
      'SELECT lesson_id, completed, attempts, visited_at, best_code, selected_option, best_score ' +
        'FROM lesson_progress WHERE user_id = ?',
    )
      .bind(payload.sub)
      .all<Record<string, unknown>>()

    const lessons = (rows.results ?? []).map((r) => ({
      lessonId:       r.lesson_id,
      completed:      Boolean(r.completed),
      attempts:       r.attempts ?? 0,
      visitedAt:      r.visited_at      ?? null,
      bestCode:       r.best_code       ?? null,
      selectedOption: r.selected_option ?? null,
      bestScore:      r.best_score      ?? null,
    }))

    return json({ lessons })
  } catch (err) {
    console.error('[basics-progress GET] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}

// ─── POST /api/basics-progress — upsert one lesson row ───────────────────────

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  if (!token) return json({ error: 'Unauthorized' }, 401)

  const payload = await verifyClerkToken(token)
  if (!payload) return json({ error: 'Unauthorized' }, 401)

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const body = validateBody(raw)
  if (!body) return json({ error: 'Invalid request body' }, 400)

  // best_score is server-authoritative: it is ONLY ever set by grading the
  // learner's submitted answers against the compiled answer key.  A lesson id
  // that isn't a known progress test, or a submission without answers, stores
  // NULL — a client cannot forge a score by POSTing a number.
  const lessonKey = PROGRESS_TEST_KEY[body.lessonId]
  const computedScore =
    lessonKey && body.answers ? gradeProgressTest(lessonKey, body.answers) : null

  try {
    // For progress-tests we keep the MAX score across retakes — the UPDATE
    // branch only overwrites best_score if the incoming value is higher (or
    // the column was NULL).
    await env.DB.prepare(`
      INSERT INTO lesson_progress
        (user_id, lesson_id, completed, attempts, visited_at, best_code, selected_option, best_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (user_id, lesson_id) DO UPDATE SET
        completed       = excluded.completed,
        attempts        = excluded.attempts,
        visited_at      = excluded.visited_at,
        best_code       = excluded.best_code,
        selected_option = excluded.selected_option,
        best_score      = CASE
          WHEN excluded.best_score IS NULL THEN best_score
          WHEN best_score IS NULL          THEN excluded.best_score
          WHEN excluded.best_score > best_score THEN excluded.best_score
          ELSE best_score
        END
    `)
      .bind(
        payload.sub,
        body.lessonId,
        body.completed ? 1 : 0,
        body.attempts,
        body.visitedAt,
        body.bestCode,
        body.selectedOption,
        computedScore,
      )
      .run()

    return json({ ok: true, score: computedScore })
  } catch (err) {
    console.error('[basics-progress] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
