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
// GET  /api/classes  — teacher-only: all classes, each with its member user ids.
// POST /api/classes  — teacher-only: create a class { name }.
//
// Default policy (locked with the user): all teachers see all classes; each
// class records its creating teacher so we can scope per-teacher later.
// ─────────────────────────────────────────────────────────────────────────────

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  const teacher = await verifyTeacher(token, env.CLERK_SECRET_KEY)
  if (!teacher) return json({ error: 'Forbidden' }, 403)

  try {
    const [classesRes, membersRes] = await Promise.all([
      env.DB.prepare('SELECT id, name, teacher_user_id, created_at FROM classes ORDER BY name').all<Record<string, unknown>>(),
      env.DB.prepare('SELECT class_id, user_id FROM class_members').all<Record<string, unknown>>(),
    ])

    const membersByClass: Record<string, string[]> = {}
    for (const m of membersRes.results ?? []) {
      const cid = String(m.class_id)
      ;(membersByClass[cid] ??= []).push(String(m.user_id))
    }

    const classes = (classesRes.results ?? []).map((c) => ({
      id:        c.id,
      name:      c.name,
      teacherId: c.teacher_user_id,
      createdAt: c.created_at,
      memberIds: membersByClass[String(c.id)] ?? [],
    }))

    return json({ classes })
  } catch (err) {
    console.error('[classes GET] DB error:', err)
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
  const name = typeof b.name === 'string' ? b.name.trim().slice(0, 100) : ''
  if (!name) return json({ error: 'A class name is required' }, 400)

  try {
    const id = crypto.randomUUID()
    await env.DB.prepare(
      'INSERT INTO classes (id, name, teacher_user_id) VALUES (?, ?, ?)',
    )
      .bind(id, name, teacher.sub)
      .run()
    return json({ id, name, teacherId: teacher.sub, memberIds: [] }, 201)
  } catch (err) {
    console.error('[classes POST] DB error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}
