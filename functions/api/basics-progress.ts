import { verifyClerkToken } from '../_auth'

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
  bestScore:      number | null
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T[\d:.Z+-]+)?$/
// Format: chapter.module.lesson — letters, digits, hyphen.  Length capped.
const LESSON_ID_RE = /^[a-z0-9-]+\.[a-z0-9-]+\.[a-z0-9-]+$/
const MAX_LESSON_ID_LEN = 200
const MAX_CODE_BYTES    = 10_000
const MAX_OPTION_LEN    = 64

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

  // bestScore: 0-10 integer, or null if not a progress-test submission
  const bestScore =
    typeof b.bestScore === 'number' && b.bestScore >= 0 && b.bestScore <= 10
      ? Math.floor(b.bestScore)
      : null

  return { lessonId, completed, attempts, visitedAt, bestCode, selectedOption, bestScore }
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
        body.bestScore,
      )
      .run()

    return json({ ok: true })
  } catch (err) {
    console.error('[basics-progress] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
