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
// GET /api/my-assignments — the signed-in STUDENT's own assignments.
//
// Returns the assignments for every class the caller belongs to, each annotated
// with the caller's own completion (done + score), derived from their
// lesson_progress / level_progress.  Any authenticated user (not teacher-gated)
// and only ever the caller's own data.
// ─────────────────────────────────────────────────────────────────────────────

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  if (!token) return json({ error: 'Unauthorized' }, 401)
  const payload = await verifyClerkToken(token)
  if (!payload) return json({ error: 'Unauthorized' }, 401)
  const userId = payload.sub

  try {
    const memberRes = await env.DB.prepare(
      'SELECT class_id FROM class_members WHERE user_id = ?',
    )
      .bind(userId)
      .all<{ class_id: string }>()
    const classIds = (memberRes.results ?? []).map((r) => r.class_id)
    if (classIds.length === 0) return json({ assignments: [] })

    const placeholders = classIds.map(() => '?').join(',')
    const [aRes, lessonRes, levelRes] = await Promise.all([
      env.DB.prepare(
        `SELECT id, class_id, content_type, content_key, title, due_date FROM assignments WHERE class_id IN (${placeholders}) ORDER BY due_date IS NULL, due_date`,
      )
        .bind(...classIds)
        .all<Record<string, unknown>>(),
      env.DB.prepare(
        'SELECT lesson_id, completed, best_score FROM lesson_progress WHERE user_id = ?',
      )
        .bind(userId)
        .all<{ lesson_id: string; completed: number; best_score: number | null }>(),
      env.DB.prepare('SELECT level_id, completed FROM level_progress WHERE user_id = ?')
        .bind(userId)
        .all<{ level_id: number; completed: number }>(),
    ])

    const lessonById = new Map<string, { completed: number; best_score: number | null }>()
    for (const r of lessonRes.results ?? []) lessonById.set(r.lesson_id, r)
    const levelDone = new Set<string>()
    for (const r of levelRes.results ?? []) if (r.completed) levelDone.add(String(r.level_id))

    const assignments = (aRes.results ?? []).map((a) => {
      const contentType = String(a.content_type)
      const contentKey = String(a.content_key)
      let done = false
      let score: number | null = null
      if (contentType === 'level') {
        done = levelDone.has(contentKey)
      } else {
        const row = lessonById.get(contentKey)
        done = !!row && (row.completed === 1 || row.best_score != null)
        score = row?.best_score ?? null
      }
      return {
        id:          a.id,
        classId:     a.class_id,
        contentType,
        contentKey,
        title:       a.title,
        dueDate:     a.due_date ?? null,
        done,
        score,
      }
    })

    return json({ assignments })
  } catch (err) {
    console.error('[my-assignments GET] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
