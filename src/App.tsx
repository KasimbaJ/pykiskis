import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react'
import { useProgressStore } from './stores/useProgressStore'

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

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <SignedIn>
        <SyncClerkUser />
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
