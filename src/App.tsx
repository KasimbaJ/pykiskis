import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useAuth } from '@clerk/clerk-react'
import { useProgressStore } from './stores/useProgressStore'
import { useBasicsStore } from './stores/useBasicsStore'
import { loadProgress, loadBasicsProgress } from './services/progressApi'

// Keeps the Zustand studentName in sync with whoever is signed in via Clerk
function SyncClerkUser() {
  const { user } = useUser()
  const setStudentName = useProgressStore((s) => s.setStudentName)
  useEffect(() => {
    if (user?.fullName) setStudentName(user.fullName)
    else if (user?.firstName) setStudentName(user.firstName)
  }, [user?.fullName, user?.firstName, setStudentName])
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
