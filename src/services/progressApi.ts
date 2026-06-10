import type { StudentProgress, ServerProgress, Class } from '../types'
import type { ServerBasicsProgress } from '../types/basics'

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

/**
 * Idempotently register the signed-in user in the D1 `students` table so
 * they show up on the Teacher Dashboard immediately — before they complete
 * their first level.  Safe to call repeatedly; the server upserts.
 */
export async function registerStudent(token: string, name: string): Promise<void> {
  await fetch('/api/student-register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
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

// ─── Classes (Teacher Dashboard) ─────────────────────────────────────────────

export async function fetchClasses(token: string): Promise<Class[]> {
  const res = await fetch('/api/classes', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to fetch classes: ${res.status}`)
  const data = (await res.json()) as { classes: Class[] }
  return data.classes
}

export async function createClass(token: string, name: string): Promise<Class> {
  const res = await fetch('/api/classes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error(`Failed to create class: ${res.status}`)
  return res.json() as Promise<Class>
}

/** Add and/or remove students from a class; returns the updated member ids. */
export async function updateClassMembers(
  token: string,
  classId: string,
  changes: { add?: string[]; remove?: string[] },
): Promise<string[]> {
  const res = await fetch('/api/class-members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ classId, ...changes }),
  })
  if (!res.ok) throw new Error(`Failed to update members: ${res.status}`)
  const data = (await res.json()) as { memberIds: string[] }
  return data.memberIds
}

// ─── Python Basics Learning Path ─────────────────────────────────────────────

/** Load all lesson progress for the signed-in user (chapter-based track). */
export async function loadBasicsProgress(token: string): Promise<ServerBasicsProgress> {
  const res = await fetch('/api/basics-progress', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to load basics progress: ${res.status}`)
  return res.json() as Promise<ServerBasicsProgress>
}

/** Upsert a single lesson's progress row on D1. */
export async function syncLessonProgress(
  token: string,
  data: {
    lessonId:       string
    completed:      boolean
    attempts:       number
    visitedAt:      string | null
    bestCode:       string | null
    selectedOption: string | null
    bestScore:      number | null
  },
): Promise<void> {
  await fetch('/api/basics-progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}
