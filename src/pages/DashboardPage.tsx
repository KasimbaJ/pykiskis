import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw, ShieldAlert, Loader2 } from 'lucide-react'
import { useUser, useAuth } from '@clerk/clerk-react'
import StudentTable from '../components/dashboard/StudentTable'
import StudentDetail from '../components/dashboard/StudentDetail'
import { useDashboardStore } from '../stores/useDashboardStore'

export default function DashboardPage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const isTeacher = user?.publicMetadata?.role === 'teacher'

  const { students, selectedStudent, isLoading, error, loadStudents, setSelectedStudent } =
    useDashboardStore()

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
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Teacher Access Only</h1>
          <p className="text-slate-500 mb-6 text-sm">
            This dashboard is restricted to teachers. Ask your admin to set{' '}
            <code className="bg-slate-100 px-1 rounded">role: "teacher"</code> in your Clerk
            public metadata.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learning
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
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <h1 className="text-lg font-bold text-slate-800">Teacher Dashboard</h1>
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
            Loading student data…
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-6">
            Failed to load students: {error}
          </div>
        )}

        {!isLoading && !error && student ? (
          <StudentDetail student={student} onBack={() => setSelectedStudent(null)} />
        ) : !isLoading && !error ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Student Progress</h2>
              <p className="text-slate-500 text-sm mt-1">
                {students.length} student{students.length !== 1 ? 's' : ''} enrolled
              </p>
            </div>
            <StudentTable students={students} onSelectStudent={setSelectedStudent} />
          </>
        ) : null}
      </main>
    </div>
  )
}
