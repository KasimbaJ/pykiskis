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

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/student-register
//
// Idempotently ensures the signed-in Clerk user has a row in the D1 `students`
// table.  Called by SyncClerkUser as soon as the client knows the learner's
// display name — this way new students show up on the Teacher Dashboard
// immediately, instead of only after they complete their first level.
//
// Body: { name: string }
//
// Behaviour:
//   • Inserts a new row with name + zero streaks if none exists.
//   • Updates only the name if a row already exists (preserves streak data
//     and last_active_at since this isn't an activity event).
// ─────────────────────────────────────────────────────────────────────────────

interface RegisterBody {
  name: string
}

function validate(raw: unknown): RegisterBody | null {
  if (!raw || typeof raw !== 'object') return null
  const b = raw as Record<string, unknown>
  if (typeof b.name !== 'string') return null
  const name = b.name.slice(0, 200).trim()
  if (!name) return null
  return { name }
}

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

  const body = validate(raw)
  if (!body) return json({ error: 'Invalid request body' }, 400)

  try {
    await env.DB.prepare(`
      INSERT INTO students
        (user_id, name, current_streak, best_streak, last_active_at, last_streak_date, updated_at)
      VALUES (?, ?, 0, 0, NULL, NULL, datetime('now'))
      ON CONFLICT (user_id) DO UPDATE SET
        name       = excluded.name,
        updated_at = datetime('now')
    `)
      .bind(payload.sub, body.name)
      .run()

    return json({ ok: true })
  } catch (err) {
    console.error('[student-register] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
