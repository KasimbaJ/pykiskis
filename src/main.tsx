/* eslint-disable react-refresh/only-export-components --
   This is the application entry point, not a component module — the lazy()
   route wrappers below are intentional and don't affect fast-refresh. */
import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'

const HomePage         = lazy(() => import('./pages/HomePage'))
const LevelPage        = lazy(() => import('./pages/LevelPage'))
const DashboardPage    = lazy(() => import('./pages/DashboardPage'))
const PlaygroundPage   = lazy(() => import('./pages/PlaygroundPage'))
const SignInPage       = lazy(() => import('./pages/SignInPage'))
const SignUpPage       = lazy(() => import('./pages/SignUpPage'))
const BasicsHomePage   = lazy(() => import('./pages/BasicsHomePage'))
const ChapterPage      = lazy(() => import('./pages/ChapterPage'))
const LessonPage       = lazy(() => import('./pages/LessonPage'))

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')

const router = createBrowserRouter([
  { path: '/sign-in/*', element: <SignInPage /> },
  { path: '/sign-up/*', element: <SignUpPage /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,                   element: <HomePage /> },
      { path: 'level/:levelId',        element: <LevelPage /> },
      { path: 'dashboard',             element: <DashboardPage /> },
      { path: 'playground',            element: <PlaygroundPage /> },

      // Python Basics Learning Path — chapter-based parallel track.
      { path: 'basics',                                                  element: <BasicsHomePage /> },
      { path: 'basics/:chapterSlug',                                     element: <ChapterPage /> },
      { path: 'basics/:chapterSlug/:moduleSlug/:lessonSlug',             element: <LessonPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/sign-in"
        >
          <RouterProvider router={router} />
        </ClerkProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
