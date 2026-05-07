import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Play, Square, Send, RotateCcw, Loader2, BookOpen } from 'lucide-react'
import Header from '../components/layout/Header'
import CodeEditor from '../components/editor/CodeEditor'
import OutputPanel from '../components/editor/OutputPanel'
import LevelInstructions from '../components/level/LevelInstructions'
import HintPanel from '../components/level/HintPanel'
import FeedbackModal from '../components/level/FeedbackModal'
import CompletionModal from '../components/level/CompletionModal'
import { levels } from '../data/levels/index'
import { useEditorStore } from '../stores/useEditorStore'
import { useProgressStore } from '../stores/useProgressStore'
import { useCodeExecution } from '../hooks/useCodeExecution'
import { usePyodide } from '../hooks/usePyodide'
import { stopPython } from '../services/pythonRunner'

export default function LevelPage() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const { isLoading: pyodideLoading, progress: pyodideProgress } = usePyodide()

  const level = levels.find((l) => l.id === Number(levelId))
  const { resetEditor, isRunning } = useEditorStore()
  const { isLevelUnlocked, levels: progress } = useProgressStore()

  useEffect(() => {
    if (level) {
      resetEditor(level.starterCode)
    }
  }, [level?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!level) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Level not found
          </h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to levels
          </Link>
        </div>
      </div>
    )
  }

  if (!isLevelUnlocked(level.id)) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Level Locked
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Complete Level {level.id - 1} first to unlock this level.
          </p>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to levels
          </Link>
        </div>
      </div>
    )
  }

  const isCompleted = progress[level.id]?.completed === true

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Levels
          </button>
          {isCompleted && (
            <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
              Completed
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Instructions */}
          <div className="space-y-4">
            <LevelInstructions level={level} />
            <HintPanel level={level} />
          </div>

          {/* Right: Editor + Output */}
          <div className="space-y-4">
            {level.levelMode === 'theory' && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                <BookOpen className="w-4 h-4" />
                Theory level — write the code snippet shown and click Check Answer.
              </div>
            )}
            {level.levelMode !== 'theory' && pyodideLoading && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                    <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                    <span>{pyodideProgress.message}</span>
                  </div>
                  <span className="text-xs text-blue-500 dark:text-blue-400 tabular-nums">
                    {pyodideProgress.pct}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${pyodideProgress.pct}%` }}
                  />
                </div>
              </div>
            )}

            <CodeEditor />
            <EditorActions
              level={level}
              pyodideLoading={pyodideLoading}
              isRunning={isRunning}
              onReset={() => resetEditor(level.starterCode)}
            />
            <OutputPanel />
          </div>
        </div>
      </main>

      <CompletionModal level={level} />
      <FeedbackModal level={level} onReset={() => resetEditor(level.starterCode)} />
    </div>
  )
}

function EditorActions({
  level,
  pyodideLoading,
  isRunning,
  onReset,
}: {
  level: (typeof levels)[number];
  pyodideLoading: boolean;
  isRunning: boolean;
  onReset: () => void;
}) {
  const { execute, submit } = useCodeExecution(level)
  const isTheory = level.levelMode === 'theory'
  const disabled = (!isTheory && pyodideLoading) || isRunning

  return (
    <div className="flex gap-2 flex-wrap">
      {!isTheory && (
        isRunning ? (
          <button
            onClick={stopPython}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            <Square className="w-4 h-4 fill-current" />
            Stop
          </button>
        ) : (
          <button
            onClick={execute}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        )
      )}
      <button
        onClick={submit}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isTheory ? 'Check Answer' : 'Submit'}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  )
}
