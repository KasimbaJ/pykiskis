import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw, ShieldAlert, Loader2 } from 'lucide-react'
import { useUser, useAuth } from '@clerk/clerk-react'
import StudentTable from '../components/dashboard/StudentTable'
import ClassScoresTable from '../components/dashboard/ClassScoresTable'
import StudentDetail from '../components/dashboard/StudentDetail'
import { useDashboardStore } from '../stores/useDashboardStore'
import { t } from '../i18n'
import { useLangStore } from '../stores/useLangStore'

export default function DashboardPage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const isTeacher = user?.publicMetadata?.role === 'teacher'

  const { students, selectedStudent, isLoading, error, loadStudents, setSelectedStudent } =
    useDashboardStore()
  const lang = useLangStore((s) => s.lang)

  const [view, setView] = useState<'overview' | 'scores'>('overview')

  const refresh = () =>
    getToken()
      .then((token) => { if (token) loadStudents(token) })
      .catch(console.error)

  useEffect(() => {
    if (isTeacher) refresh()
  }, [isTeacher]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isTeacher) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{t('dashboard.accessOnly', lang)}</h1>
          <p className="text-slate-500 mb-6 text-sm">
            {t('dashboard.restricted', lang)}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> {t('dashboard.backToLearning', lang)}
          </Link>
        </div>
      </div>
    )
  }

  const student = students.find((s) => s.studentName === selectedStudent)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> {t('dashboard.home', lang)}
            </Link>
            <h1 className="text-lg font-bold text-slate-800">{t('dashboard.title', lang)}</h1>
          </div>
          <button
            onClick={refresh}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {isLoading && !students.length && (
          <div className="flex items-center justify-center py-24 text-slate-400 gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('dashboard.loading', lang)}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-6">
            {t('dashboard.error', lang, { error: error ?? '' })}
          </div>
        )}

        {!isLoading && !error && student ? (
          <StudentDetail student={student} onBack={() => setSelectedStudent(null)} />
        ) : !isLoading && !error ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{t('dashboard.progress', lang)}</h2>
              <p className="text-slate-500 text-sm mt-1">
                {students.length === 1
                  ? t('dashboard.enrolled', lang, { count: students.length })
                  : t('dashboard.enrolledPl', lang, { count: students.length })}
              </p>
            </div>

            {/* View toggle */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 mb-4">
              <button
                onClick={() => setView('overview')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {t('dashboard.overview', lang)}
              </button>
              <button
                onClick={() => setView('scores')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === 'scores'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {t('dashboard.testScores', lang)}
              </button>
            </div>

            {view === 'overview' ? (
              <StudentTable students={students} onSelectStudent={setSelectedStudent} />
            ) : (
              <ClassScoresTable students={students} />
            )}
          </>
        ) : null}
      </main>
    </div>
  )
}
