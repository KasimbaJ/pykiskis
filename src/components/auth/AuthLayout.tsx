import type { ReactNode } from 'react'
import { Code2, Play, BookOpen, Sparkles, Rocket, Trophy } from 'lucide-react'

interface Props {
  /** "signin" or "signup" — toggles the small copy difference above the form. */
  mode: 'signin' | 'signup'
  /** The Clerk widget. */
  children: ReactNode
}

// ─────────────────────────────────────────────────────────────────────────────
// AuthLayout — shared layout for /sign-in and /sign-up.
//
// Two-column on desktop: marketing hero on the left, Clerk form on the right.
// Stacks to a single column on mobile with the form on top.  The hero gives
// new visitors a clear sense of what the app does in the few seconds before
// they decide whether to create an account.
// ─────────────────────────────────────────────────────────────────────────────

export default function AuthLayout({ mode, children }: Props) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-violet-300/30 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="px-6 py-4 sm:px-10 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">Pykiškis</span>
          </div>
          <a
            href={mode === 'signin' ? '/sign-up' : '/sign-in'}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            {mode === 'signin' ? 'Need an account? ' : 'Already have an account? '}
            <span className="text-blue-600 underline-offset-2 hover:underline">
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </span>
          </a>
        </header>

        {/* Main content */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 max-w-7xl w-full mx-auto px-6 sm:px-10 pb-12">
          {/* Hero column */}
          <section className="order-2 lg:order-1 flex flex-col justify-center max-w-xl">
            <div className="inline-flex self-start items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Learn Python in your browser
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              From <span className="text-blue-600">Hello, World</span>
              <br />
              to your first <span className="text-indigo-600">project.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              A friendly, browser-based Python course. Read short lessons, run
              real code instantly, build small projects, and track your streak —
              no setup required.
            </p>

            {/* Feature pills */}
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Feature
                icon={<BookOpen className="w-4 h-4" />}
                title="100+ guided levels"
                description="Bite-sized lessons that build on each other."
              />
              <Feature
                icon={<Play className="w-4 h-4" />}
                title="Real Python, in the browser"
                description="Powered by Pyodide — no install."
              />
              <Feature
                icon={<Trophy className="w-4 h-4" />}
                title="Progress tests & streaks"
                description="Track grades and stay consistent."
              />
              <Feature
                icon={<Rocket className="w-4 h-4" />}
                title="Build mini projects"
                description="Apply what you learn straight away."
              />
            </ul>

            {/* Terminal preview */}
            <div className="mt-8 hidden sm:block">
              <TerminalPreview />
            </div>
          </section>

          {/* Auth column — keep the widget centered within its column at all
              viewport widths so it visually balances the hero on the left. */}
          <section className="order-1 lg:order-2 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                {mode === 'signin'
                  ? 'Sign in to pick up where you left off.'
                  : 'Free forever. No credit card needed.'}
              </p>
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-slate-200 p-1">
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

// ── Feature pill ─────────────────────────────────────────────────────────────

function Feature({
  icon, title, description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl bg-white/70 backdrop-blur-sm ring-1 ring-slate-200 px-4 py-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </li>
  )
}

// ── Decorative terminal mock ─────────────────────────────────────────────────

function TerminalPreview() {
  return (
    <div className="rounded-xl overflow-hidden ring-1 ring-slate-300 shadow-lg bg-slate-900">
      {/* Title bar */}
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs text-slate-400 font-mono">main.py</span>
      </div>
      <pre className="px-4 py-3 text-sm font-mono leading-relaxed text-slate-100">
        <span className="text-slate-500"># Your first Python program</span>{'\n'}
        <span className="text-purple-400">print</span>
        <span className="text-slate-300">(</span>
        <span className="text-emerald-300">&quot;Hello, World!&quot;</span>
        <span className="text-slate-300">)</span>{'\n'}
        <span className="text-purple-400">name</span>
        <span className="text-slate-300"> = </span>
        <span className="text-purple-400">input</span>
        <span className="text-slate-300">(</span>
        <span className="text-emerald-300">&quot;What&apos;s your name? &quot;</span>
        <span className="text-slate-300">)</span>{'\n'}
        <span className="text-purple-400">print</span>
        <span className="text-slate-300">(</span>
        <span className="text-purple-400">f</span>
        <span className="text-emerald-300">&quot;Welcome, &#123;</span>
        <span className="text-slate-300">name</span>
        <span className="text-emerald-300">&#125;!&quot;</span>
        <span className="text-slate-300">)</span>
      </pre>
      <div className="border-t border-slate-700 bg-slate-950/60 px-4 py-2.5 text-xs font-mono">
        <span className="text-slate-500">▸ output</span>
        {'\n'}
        <span className="text-slate-300">Hello, World!</span>
        {'\n'}
        <span className="text-slate-300">Welcome, Pykiškis!</span>
        <span className="inline-block w-2 h-3.5 bg-slate-300 ml-0.5 align-text-bottom animate-pulse" />
      </div>
    </div>
  )
}
