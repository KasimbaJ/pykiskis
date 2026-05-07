import type { StudentProgress, ServerProgress } from '../types'

export async function syncLevelCompletion(
  token: string,
  data: {
    name: string
    currentStreak: number
    bestStreak: number
    lastActiveAt: string
    lastStreakDate: string
    levelId: number
    completed: boolean
    attempts: number
    completedAt: string | undefined
    bestCode: string
  },
): Promise<void> {
  await fetch('/api/progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

/** Load the signed-in student's own progress from D1. */
export async function loadProgress(token: string): Promise<ServerProgress> {
  const res = await fetch('/api/progress', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to load progress: ${res.status}`)
  return res.json() as Promise<ServerProgress>
}

export async function fetchStudents(token: string): Promise<StudentProgress[]> {
  const res = await fetch('/api/students', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to fetch students: ${res.status}`)
  return res.json()
}
