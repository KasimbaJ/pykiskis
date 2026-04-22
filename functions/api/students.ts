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

// GET /api/students  —  teacher-only: all students with their level progress
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('Authorization')?.slice(7)
  if (!token) return json({ error: 'Unauthorized' }, 401)

  const payload = await verifyClerkToken(token)
  if (!payload) return json({ error: 'Unauthorized' }, 401)

  // Verify teacher role via Clerk REST API
  const clerkRes = await fetch(`https://api.clerk.com/v1/users/${payload.sub}`, {
    headers: { Authorization: `Bearer ${env.CLERK_SECRET_KEY}` },
  })
  if (!clerkRes.ok) return json({ error: 'Unauthorized' }, 401)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clerkUser = (await clerkRes.json()) as any
  if (clerkUser.public_metadata?.role !== 'teacher') {
    return json({ error: 'Forbidden' }, 403)
  }

  // Fetch all students and all completed levels in two queries
  const [studentsResult, progressResult] = await Promise.all([
    env.DB.prepare('SELECT * FROM students ORDER BY updated_at DESC').all(),
    env.DB.prepare('SELECT * FROM level_progress WHERE completed = 1').all(),
  ])

  // Group level rows by user_id
  type LevelRow = {
    user_id: string; level_id: number; attempts: number
    completed_at: string | null; best_code: string | null
  }
  const byUser: Record<string, LevelRow[]> = {}
  for (const row of progressResult.results as LevelRow[]) {
    ;(byUser[row.user_id] ??= []).push(row)
  }

  // Shape to match the frontend StudentProgress type
  type StudentRow = {
    user_id: string; name: string; current_streak: number
    best_streak: number; last_active_at: string | null
  }
  const students = (studentsResult.results as StudentRow[]).map((s) => ({
    studentName: s.name || '(unnamed)',
    currentStreak: s.current_streak,
    bestStreak: s.best_streak,
    lastActiveAt: s.last_active_at ?? '',
    levels: Object.fromEntries(
      (byUser[s.user_id] ?? []).map((p) => [
        p.level_id,
        {
          completed: true,
          attempts: p.attempts,
          completedAt: p.completed_at ?? undefined,
          bestCode: p.best_code ?? undefined,
        },
      ]),
    ),
  }))

  return json(students)
}
