import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useAuth } from '@clerk/clerk-react'
import { useProgressStore } from './stores/useProgressStore'
import { loadProgress } from './services/progressApi'

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
// progress from D1 and merge it into the local Zustand store so progress
// is consistent across devices.
function HydrateProgress() {
  const { isSignedIn, getToken } = useAuth()
  const hydrateFromServer = useProgressStore((s) => s.hydrateFromServer)

  useEffect(() => {
    if (!isSignedIn) return
    getToken()
      .then(async (token) => {
        if (!token) return
        const data = await loadProgress(token)
        hydrateFromServer(data)
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
