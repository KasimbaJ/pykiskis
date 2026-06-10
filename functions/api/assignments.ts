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

// ─────────────────────────────────────────────────────────────────────────────
// /api/assignments — teacher-only.
//   GET    ?classId=…   list assignments (all, or for one class)
//   POST   { classId, contentType, contentKey, title, dueDate? }   create
//   DELETE ?id=…        delete one
//
// Completion is derived client-side from the per-student progress the dashboard
// already loads — assignments are just "what + when", not a second source of
// completion truth.
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_TYPES = new Set(['lesson', 'test', 'level'])

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  const teacher = await verifyTeacher(token, env.CLERK_SECRET_KEY)
  if (!teacher) return json({ error: 'Forbidden' }, 403)

  const classId = new URL(request.url).searchParams.get('classId')

  try {
    const stmt = classId
      ? env.DB.prepare(
          'SELECT id, class_id, content_type, content_key, title, due_date, created_at FROM assignments WHERE class_id = ? ORDER BY created_at DESC',
        ).bind(classId)
      : env.DB.prepare(
          'SELECT id, class_id, content_type, content_key, title, due_date, created_at FROM assignments ORDER BY created_at DESC',
        )
    const res = await stmt.all<Record<string, unknown>>()
    const assignments = (res.results ?? []).map((a) => ({
      id:          a.id,
      classId:     a.class_id,
      contentType: a.content_type,
      contentKey:  a.content_key,
      title:       a.title,
      dueDate:     a.due_date ?? null,
      createdAt:   a.created_at,
    }))
    return json({ assignments })
  } catch (err) {
    console.error('[assignments GET] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}

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
  const contentType = typeof b.contentType === 'string' ? b.contentType : ''
  const contentKey = typeof b.contentKey === 'string' ? b.contentKey : ''
  const title = typeof b.title === 'string' ? b.title.trim().slice(0, 150) : ''
  const dueDate =
    typeof b.dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(b.dueDate) ? b.dueDate : null

  if (!classId || !contentKey || !title || !CONTENT_TYPES.has(contentType)) {
    return json({ error: 'Invalid request body' }, 400)
  }

  try {
    const cls = await env.DB.prepare('SELECT id FROM classes WHERE id = ?').bind(classId).first()
    if (!cls) return json({ error: 'Class not found' }, 404)

    const id = crypto.randomUUID()
    await env.DB.prepare(
      'INSERT INTO assignments (id, class_id, content_type, content_key, title, due_date, teacher_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    )
      .bind(id, classId, contentType, contentKey, title, dueDate, teacher.sub)
      .run()
    return json({ id, classId, contentType, contentKey, title, dueDate, createdAt: new Date().toISOString() }, 201)
  } catch (err) {
    console.error('[assignments POST] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  const teacher = await verifyTeacher(token, env.CLERK_SECRET_KEY)
  if (!teacher) return json({ error: 'Forbidden' }, 403)

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return json({ error: 'id is required' }, 400)

  try {
    await env.DB.prepare('DELETE FROM assignments WHERE id = ?').bind(id).run()
    return json({ ok: true })
  } catch (err) {
    console.error('[assignments DELETE] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
