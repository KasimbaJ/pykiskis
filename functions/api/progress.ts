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

// ── Input validation ───────────────────────────────────────────
interface ProgressBody {
  name: string
  currentStreak: number
  bestStreak: number
  lastActiveAt: string | null
  lastStreakDate: string | null
  levelId: number
  completed: boolean
  attempts: number
  completedAt: string | null
  bestCode: string | null
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T[\d:.Z+\-]+)?$/
const MAX_CODE_BYTES = 10_000
const MAX_LEVEL_ID = 100

function validateBody(raw: unknown): ProgressBody | null {
  if (!raw || typeof raw !== 'object') return null
  const b = raw as Record<string, unknown>

  // levelId: required, integer 1–100
  const levelId = typeof b.levelId === 'number' ? Math.floor(b.levelId) : null
  if (levelId === null || levelId < 1 || levelId > MAX_LEVEL_ID) return null

  const name =
    typeof b.name === 'string' ? b.name.slice(0, 200) : ''

  const currentStreak =
    typeof b.currentStreak === 'number' && b.currentStreak >= 0
      ? Math.floor(b.currentStreak)
      : 0

  const bestStreak =
    typeof b.bestStreak === 'number' && b.bestStreak >= 0
      ? Math.floor(b.bestStreak)
      : 0

  const lastActiveAt =
    typeof b.lastActiveAt === 'string' && ISO_DATE_RE.test(b.lastActiveAt)
      ? b.lastActiveAt
      : null

  const lastStreakDate =
    typeof b.lastStreakDate === 'string' && ISO_DATE_RE.test(b.lastStreakDate)
      ? b.lastStreakDate
      : null

  const completed = Boolean(b.completed)

  const attempts =
    typeof b.attempts === 'number' && b.attempts >= 1
      ? Math.floor(b.attempts)
      : 1

  const completedAt =
    typeof b.completedAt === 'string' && ISO_DATE_RE.test(b.completedAt)
      ? b.completedAt
      : null

  const bestCode =
    typeof b.bestCode === 'string'
      ? b.bestCode.slice(0, MAX_CODE_BYTES)
      : null

  return {
    name,
    currentStreak,
    bestStreak,
    lastActiveAt,
    lastStreakDate,
    levelId,
    completed,
    attempts,
    completedAt,
    bestCode,
  }
}

// ── GET /api/progress — load student's own progress ────────────
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  if (!token) return json({ error: 'Unauthorized' }, 401)

  const payload = await verifyClerkToken(token)
  if (!payload) return json({ error: 'Unauthorized' }, 401)

  const userId = payload.sub

  try {
    const [studentRow, levelRows] = await Promise.all([
      env.DB.prepare('SELECT * FROM students WHERE user_id = ?')
        .bind(userId)
        .first<Record<string, unknown>>(),
      env.DB.prepare('SELECT * FROM level_progress WHERE user_id = ?')
        .bind(userId)
        .all<Record<string, unknown>>(),
    ])

    if (!studentRow) {
      return json({ student: null, levels: [] })
    }

    const levels = (levelRows.results ?? []).map((r) => ({
      levelId:     r.level_id,
      completed:   Boolean(r.completed),
      attempts:    r.attempts ?? 0,
      completedAt: r.completed_at ?? null,
      bestCode:    r.best_code   ?? null,
    }))

    return json({
      student: {
        name:           studentRow.name          ?? '',
        currentStreak:  studentRow.current_streak  ?? 0,
        bestStreak:     studentRow.best_streak     ?? 0,
        lastActiveAt:   studentRow.last_active_at  ?? null,
        lastStreakDate: studentRow.last_streak_date ?? null,
      },
      levels,
    })
  } catch (err) {
    console.error('[progress GET] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}

// ── POST /api/progress — save one completed level + student meta
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  if (!token) return json({ error: 'Unauthorized' }, 401)

  const payload = await verifyClerkToken(token)
  if (!payload) return json({ error: 'Unauthorized' }, 401)

  const userId = payload.sub

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const body = validateBody(raw)
  if (!body) return json({ error: 'Invalid request body' }, 400)

  try {
    await env.DB.batch([
      // Upsert student row
      env.DB.prepare(`
        INSERT INTO students
          (user_id, name, current_streak, best_streak, last_active_at, last_streak_date, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT (user_id) DO UPDATE SET
          name             = excluded.name,
          current_streak   = excluded.current_streak,
          best_streak      = excluded.best_streak,
          last_active_at   = excluded.last_active_at,
          last_streak_date = excluded.last_streak_date,
          updated_at       = datetime('now')
      `).bind(
        userId,
        body.name,
        body.currentStreak,
        body.bestStreak,
        body.lastActiveAt,
        body.lastStreakDate,
      ),
      // Upsert level row
      env.DB.prepare(`
        INSERT INTO level_progress
          (user_id, level_id, completed, attempts, completed_at, best_code)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT (user_id, level_id) DO UPDATE SET
          completed    = excluded.completed,
          attempts     = excluded.attempts,
          completed_at = excluded.completed_at,
          best_code    = excluded.best_code
      `).bind(
        userId,
        body.levelId,
        body.completed ? 1 : 0,
        body.attempts,
        body.completedAt,
        body.bestCode,
      ),
    ])

    return json({ ok: true })
  } catch (err) {
    console.error('[progress] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
