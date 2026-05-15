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

  const displayName = user?.fullName || user?.firstName || ''

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

// On first sign-in (or page reload while signed in), pull the student's
// progress from D1 and merge it into the local Zustand stores so progress
// is consistent across devices.  Runs the phase-level GET and the basics
// GET in parallel.
function HydrateProgress() {
  const { isSignedIn, getToken } = useAuth()
  const hydrateFromServer       = useProgressStore((s) => s.hydrateFromServer)
  const hydrateBasicsFromServer = useBasicsStore((s) => s.hydrateBasicsFromServer)

  useEffect(() => {
    if (!isSignedIn) return
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
  }, [isSignedIn]) // eslint-disable-line react-hooks/exhaustive-deps

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
