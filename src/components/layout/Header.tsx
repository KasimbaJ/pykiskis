import { Link } from 'react-router-dom'
import { Code2, Flame, LayoutDashboard, Terminal, Moon, Sun } from 'lucide-react'
import { UserButton } from '@clerk/clerk-react'
import { useProgressStore } from '../../stores/useProgressStore'
import { useThemeStore } from '../../stores/useThemeStore'
import { levels } from '../../data/levels/index'

export default function Header() {
  const { studentName, currentStreak, getCompletedCount } = useProgressStore()
  const { isDark, toggle } = useThemeStore()
  const completed = getCompletedCount()
  const total = levels.length
  const progress = (completed / total) * 100

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Code2 className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-slate-800 dark:text-white">Pykiškis</span>
        </Link>

        <div className="hidden sm:flex items-center gap-4 flex-1 mx-8">
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {completed}/{total}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1 text-orange-500">
              <Flame className="w-5 h-5" />
              <span className="font-semibold text-sm">{currentStreak}</span>
            </div>
          )}

          {studentName && (
            <span className="hidden sm:block text-sm text-slate-600 dark:text-slate-300">
              {studentName}
            </span>
          )}

          <button
            onClick={toggle}
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            to="/playground"
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Python Playground"
          >
            <Terminal className="w-5 h-5" />
          </Link>

          <Link
            to="/dashboard"
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Teacher Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>

          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </header>
  )
}
