import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEditorStore } from '../../stores/useEditorStore'
import type { Level } from '../../types'
import { levels } from '../../data/levels/index'

interface Props {
  level: Level;
  onReset: () => void;
}

export default function FeedbackModal({ level, onReset }: Props) {
  const { feedbackType, showSolution, setFeedbackType } = useEditorStore()
  const navigate = useNavigate()

  if (!feedbackType) return null
  // Level 100 success is handled by CompletionModal (confetti + certificate)
  if (level.id === 100 && feedbackType === 'success') return null

  const isSuccess = feedbackType === 'success'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in">
        <div className="text-center mb-4">
          {isSuccess ? (
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          )}
        </div>

        <h2
          className={`text-2xl font-bold text-center mb-2 ${
            isSuccess ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {isSuccess ? 'Correct!' : 'Not Quite Right'}
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-center mb-4">
          {isSuccess
            ? `Great job! You've completed Level ${level.id}: ${level.title}`
            : showSolution
              ? 'Review the expected solution below and try again.'
              : 'Not quite! Check the hints for guidance.'}
        </p>

        {!isSuccess && showSolution && (
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4 border border-slate-200 dark:border-slate-600">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Expected Solution
            </h3>
            <pre className="text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap bg-slate-100 dark:bg-slate-900 p-3 rounded">
              {level.solution}
            </pre>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-1">
              Explanation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{level.explanation}</p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {isSuccess ? (
            <>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Back to Levels
              </button>
              {level.id < levels.length && (
                <button
                  onClick={() => {
                    setFeedbackType(null)
                    navigate(`/level/${level.id + 1}`)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next Level <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setFeedbackType(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Keep Trying
              </button>
              <button
                onClick={() => {
                  setFeedbackType(null)
                  onReset()
                }}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset Code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
