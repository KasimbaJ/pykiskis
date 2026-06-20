/* eslint-disable react-refresh/only-export-components --
   This is the application entry point, not a component module — the lazy()
   route wrappers below are intentional and don't affect fast-refresh. */
import { StrictMode, Suspense, lazy, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import RouteError from './components/RouteError'

// A failed dynamic import is almost always a STALE CHUNK after a new deploy: the
// browser holds an old index.html that references a hashed filename (e.g.
// HomePage-DE8G-cjL.js) that no longer exists. Reload ONCE to fetch the fresh
// index.html + new chunk names; a sessionStorage guard prevents a reload loop if
// the chunk is genuinely broken.
const RELOAD_GUARD = 'pyk-chunk-reloaded'
function lazyWithReload<T extends ComponentType<any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      const mod = await factory()
      sessionStorage.removeItem(RELOAD_GUARD) // loaded fine — reset the guard
      return mod
    } catch (err) {
      if (!sessionStorage.getItem(RELOAD_GUARD)) {
        sessionStorage.setItem(RELOAD_GUARD, '1')
        window.location.reload()
        return await new Promise<{ default: T }>(() => {}) // hang until reload
      }
      throw err // already reloaded once; let the route errorElement show
    }
  })
}

const HomePage         = lazyWithReload(() => import('./pages/HomePage'))
const LevelsPage       = lazyWithReload(() => import('./pages/LevelsPage'))
const LevelPage        = lazyWithReload(() => import('./pages/LevelPage'))
const DashboardPage    = lazyWithReload(() => import('./pages/DashboardPage'))
const PlaygroundPage   = lazyWithReload(() => import('./pages/PlaygroundPage'))
const SignInPage       = lazyWithReload(() => import('./pages/SignInPage'))
const SignUpPage       = lazyWithReload(() => import('./pages/SignUpPage'))
const BasicsHomePage   = lazyWithReload(() => import('./pages/BasicsHomePage'))
const ChapterPage      = lazyWithReload(() => import('./pages/ChapterPage'))
const LessonPage       = lazyWithReload(() => import('./pages/LessonPage'))

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')

const router = createBrowserRouter([
  { path: '/sign-in/*', element: <SignInPage />, errorElement: <RouteError /> },
  { path: '/sign-up/*', element: <SignUpPage />, errorElement: <RouteError /> },
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true,                   element: <HomePage /> },
      { path: 'levels',                element: <LevelsPage /> },
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
