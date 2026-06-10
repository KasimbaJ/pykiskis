import { verifyTeacher } from '../_auth'

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

const toIds = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 500) : []

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/class-members  — teacher-only: add/remove students in a class.
// Body: { classId: string, add?: string[], remove?: string[] }  (Clerk user ids)
// ─────────────────────────────────────────────────────────────────────────────

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  const teacher = await verifyTeacher(token, env.CLERK_SECRET_KEY)
  if (!teacher) return json({ error: 'Forbidden' }, 403)

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const b = (raw ?? {}) as Record<string, unknown>
  const classId = typeof b.classId === 'string' ? b.classId : ''
  if (!classId) return json({ error: 'classId is required' }, 400)
  const add = toIds(b.add)
  const remove = toIds(b.remove)

  try {
    // Guard: the class must exist.
    const cls = await env.DB.prepare('SELECT id FROM classes WHERE id = ?').bind(classId).first()
    if (!cls) return json({ error: 'Class not found' }, 404)

    const stmts = []
    for (const uid of add) {
      stmts.push(
        env.DB.prepare(
          'INSERT OR IGNORE INTO class_members (class_id, user_id) VALUES (?, ?)',
        ).bind(classId, uid),
      )
    }
    for (const uid of remove) {
      stmts.push(
        env.DB.prepare(
          'DELETE FROM class_members WHERE class_id = ? AND user_id = ?',
        ).bind(classId, uid),
      )
    }
    if (stmts.length) await env.DB.batch(stmts)

    const membersRes = await env.DB.prepare(
      'SELECT user_id FROM class_members WHERE class_id = ?',
    )
      .bind(classId)
      .all<{ user_id: string }>()
    const memberIds = (membersRes.results ?? []).map((m) => m.user_id)

    return json({ classId, memberIds })
  } catch (err) {
    console.error('[class-members POST] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
