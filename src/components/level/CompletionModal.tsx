import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Share2, Home, Code2 } from 'lucide-react'
import { useEditorStore } from '../../stores/useEditorStore'
import { useProgressStore } from '../../stores/useProgressStore'
import type { Level } from '../../types'

// ── Confetti data ──────────────────────────────────────────────
const COLORS = [
  '#ef4444', '#3b82f6', '#22c55e', '#f59e0b',
  '#8b5cf6', '#ec4899', '#f97316', '#06b6d4',
]

interface Piece {
  id: number; color: string; left: string
  delay: string; duration: string; width: string; height: string
  radius: string
}

function generateConfetti(count = 70): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const size   = 8 + Math.random() * 8
    const isRect = Math.random() > 0.6
    const isCirc = !isRect && Math.random() > 0.5
    return {
      id:       i,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      left:     `${Math.random() * 100}%`,
      delay:    `${Math.random() * 2.5}s`,
      duration: `${3 + Math.random() * 2}s`,
      width:    isRect ? `${size * 1.8}px` : `${size}px`,
      height:   `${size}px`,
      radius:   isCirc ? '50%' : '2px',
    }
  })
}

// ── Component ──────────────────────────────────────────────────
interface Props { level: Level }

export default function CompletionModal({ level }: Props) {
  const { feedbackType, setFeedbackType } = useEditorStore()
  const { studentName } = useProgressStore()
  const navigate = useNavigate()

  const confetti = useMemo(() => generateConfetti(), [])

  if (level.id !== 100 || feedbackType !== 'success') return null

  const date = new Date().toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const tweetText = encodeURIComponent(
    `🎉 I just completed all 100 levels of Pykiškis — from "Hello, World!" to Machine Learning! #Python #100DaysOfCode https://pykiskis.pages.dev`
  )

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">

      {/* ── Confetti ── */}
      {confetti.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            backgroundColor: p.color,
            left: p.left,
            width: p.width,
            height: p.height,
            borderRadius: p.radius,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* ── Backdrop ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* ── Modal card ── */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

          {/* Gradient header */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 px-6 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-9 h-9 text-yellow-300" />
            </div>
            <h1 className="text-white text-2xl font-bold">Course Complete!</h1>
            <p className="text-white/80 text-sm mt-1">
              You've mastered all 100 levels of Python 🐍
            </p>
          </div>

          {/* Certificate */}
          <div className="px-6 pt-5 pb-4">
            <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-3">
              Certificate of Completion
            </p>

            <div className="border-2 border-slate-100 rounded-2xl p-5 text-center bg-slate-50">
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Pykiškis</span>
              </div>

              <p className="text-slate-500 text-sm">This certifies that</p>
              <p className="text-2xl font-bold text-slate-800 mt-1 mb-2">
                {studentName || 'Python Learner'}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                has successfully completed<br />
                <span className="font-semibold text-slate-700">
                  100 Levels of Python
                </span>
                {' '}— from fundamentals to machine learning
              </p>

              <div className="flex items-center gap-3 mt-4">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-xs text-slate-400">{date}</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex flex-col gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${tweetText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share on X / Twitter
            </a>
            <button
              onClick={() => {
                setFeedbackType(null)
                navigate('/')
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
