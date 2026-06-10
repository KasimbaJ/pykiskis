import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw, ShieldAlert, Loader2, Users } from 'lucide-react'
import { useUser, useAuth } from '@clerk/clerk-react'
import StudentTable from '../components/dashboard/StudentTable'
import ClassScoresTable from '../components/dashboard/ClassScoresTable'
import StudentDetail from '../components/dashboard/StudentDetail'
import ClassManager from '../components/dashboard/ClassManager'
import ClassAssignments from '../components/dashboard/ClassAssignments'
import { useDashboardStore } from '../stores/useDashboardStore'
import { useClassesStore } from '../stores/useClassesStore'
import { useAssignmentsStore } from '../stores/useAssignmentsStore'

export default function DashboardPage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const isTeacher = user?.publicMetadata?.role === 'teacher'

  const { students, selectedStudent, isLoading, error, loadStudents, setSelectedStudent } =
    useDashboardStore()

  const classes = useClassesStore((s) => s.classes)
  const loadClasses = useClassesStore((s) => s.load)
  const loadAssignments = useAssignmentsStore((s) => s.load)

  const [view, setView] = useState<'overview' | 'scores' | 'assignments'>('overview')
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const [showManage, setShowManage] = useState(false)

  const refresh = () =>
    getToken()
      .then((token) => {
        if (!token) return
        loadStudents(token)
        loadClasses(token)
        loadAssignments(token)
      })
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

  // Filter the roster/scores to the selected class (null = All students).
  const activeClass = selectedClassId ? classes.find((c) => c.id === selectedClassId) ?? null : null
  const visibleStudents = activeClass
    ? students.filter((s) => activeClass.memberIds.includes(s.userId))
    : students

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
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Student Progress</h2>
              <p className="text-slate-500 text-sm mt-1">
                {visibleStudents.length} student{visibleStudents.length !== 1 ? 's' : ''}
                {activeClass ? ` in ${activeClass.name}` : ' enrolled'}
              </p>
            </div>

            {/* Class selector + manage */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                onClick={() => setSelectedClassId(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                  !selectedClassId
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                All students
              </button>
              {classes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                    selectedClassId === c.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {c.name} <span className="opacity-70">({c.memberIds.length})</span>
                </button>
              ))}
              <button
                onClick={() => setShowManage(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600"
              >
                <Users className="w-3.5 h-3.5" /> Manage classes
              </button>
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
                Overview
              </button>
              <button
                onClick={() => setView('scores')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === 'scores'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Test Scores
              </button>
              <button
                onClick={() => setView('assignments')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === 'assignments'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Assignments
              </button>
            </div>

            {view === 'overview' && (
              <StudentTable students={visibleStudents} onSelectStudent={setSelectedStudent} />
            )}
            {view === 'scores' && <ClassScoresTable students={visibleStudents} />}
            {view === 'assignments' &&
              (activeClass ? (
                <ClassAssignments classId={activeClass.id} students={visibleStudents} />
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
                  Select a class above to create and track assignments.
                </div>
              ))}
          </>
        ) : null}
      </main>

      {showManage && (
        <ClassManager students={students} onClose={() => setShowManage(false)} />
      )}
    </div>
  )
}
