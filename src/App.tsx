import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useAuth } from '@clerk/clerk-react'
import { useProgressStore } from './stores/useProgressStore'
import { useBasicsStore } from './stores/useBasicsStore'
import { loadProgress, loadBasicsProgress, registerStudent } from './services/progressApi'

// Keeps the Zustand studentName in sync with whoever is signed in via Clerk,
// AND idempotently registers the student in D1 (so they appear on the Teacher
// Dashboard before completing their first level).
function SyncClerkUser() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const setStudentName = useProgressStore((s) => s.setStudentName)

  // Fall back through Clerk's identity fields so every account yields a
  // non-empty name — a student who signed up with only a username (no first
  // or last name) would otherwise sync a blank name and show as "(unnamed)"
  // on the Teacher Dashboard.
  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    ''

  useEffect(() => {
    if (!displayName) return
    setStudentName(displayName)

    // Fire-and-forget D1 registration.  Idempotent: server upserts.
    getToken()
      .then((token) => {
        if (!token) return
        return registerStudent(token, displayName)
      })
      .catch((e) => console.error('[register] failed:', e))
  }, [displayName, getToken, setStudentName])

  return null
}

// On sign-in (or reload while signed in): first make sure the localStorage
// progress cache belongs to THIS user — school computers are shared, so
// claimForUser wipes it if a different student used the browser last — then
// pull the student's own progress from D1 and merge it into the stores.
function HydrateProgress() {
  const { isSignedIn, userId, getToken } = useAuth()
  const claimProgressForUser    = useProgressStore((s) => s.claimForUser)
  const claimBasicsForUser      = useBasicsStore((s) => s.claimForUser)
  const hydrateFromServer       = useProgressStore((s) => s.hydrateFromServer)
  const hydrateBasicsFromServer = useBasicsStore((s) => s.hydrateBasicsFromServer)

  useEffect(() => {
    if (!isSignedIn || !userId) return

    // localStorage is shared by every account on this browser.  Claim it for
    // the signed-in user first: if a different student used it last, their
    // cached levels / streak / lessons are wiped so they aren't inherited.
    claimProgressForUser(userId)
    claimBasicsForUser(userId)

    getToken()
      .then(async (token) => {
        if (!token) return
        const [phaseData, basicsData] = await Promise.all([
          loadProgress(token).catch((e) => {
            console.error('[hydrate] phase progress failed:', e)
            return null
          }),
          loadBasicsProgress(token).catch((e) => {
            console.error('[hydrate] basics progress failed:', e)
            return null
          }),
        ])
        if (phaseData)  hydrateFromServer(phaseData)
        if (basicsData) hydrateBasicsFromServer(basicsData)
      })
      .catch(console.error)
  }, [isSignedIn, userId]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <SignedIn>
        <SyncClerkUser />
        <HydrateProgress />
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
