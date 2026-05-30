import { useEffect, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView, Decoration, type DecorationSet } from '@codemirror/view'
import { StateField, StateEffect } from '@codemirror/state'
import { Eye, Play, Pause, SkipBack, SkipForward, RotateCcw, Loader2 } from 'lucide-react'
import { usePyodide } from '../../hooks/usePyodide'
import { tracePython } from '../../services/pythonRunner'
import { cleanPythonError } from '../../services/pythonError'
import type { TraceStep, TraceValue } from '../../types/visualizer'

// ─────────────────────────────────────────────────────────────────────────────
// CodeVisualizer — step-through execution for a code snippet (authored into
// lessons via a `visualize` content block).  Shows the code with the current
// line highlighted, a per-frame variables table, and the program output as it
// grows.  Lazy: it traces only when the learner clicks "Visualize".
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  code: string
  caption?: string
  /** Pre-supplied stdin if the snippet calls input() (deterministic mock). */
  inputValues?: string[]
}

const AUTOPLAY_MS = 800

// ── CodeMirror current-line highlight (dispatched as we step) ────────────────
const setHighlight = StateEffect.define<number | null>()
const lineDeco = Decoration.line({ class: 'cm-pyk-current-line' })
const highlightField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(value, tr) {
    value = value.map(tr.changes)
    for (const e of tr.effects) {
      if (e.is(setHighlight)) {
        const ln = e.value
        value =
          ln != null && ln >= 1 && ln <= tr.state.doc.lines
            ? Decoration.set([lineDeco.range(tr.state.doc.line(ln).from)])
            : Decoration.none
      }
    }
    return value
  },
  provide: (f) => EditorView.decorations.from(f),
})
const highlightTheme = EditorView.theme({
  '.cm-pyk-current-line': { backgroundColor: 'rgba(99, 102, 241, 0.25)' },
})

// Python-faithful one-line rendering of a serialized value.
function formatValue(v: TraceValue): string {
  switch (v.kind) {
    case 'primitive':
      if (v.value === null || v.pytype === 'NoneType') return 'None'
      if (v.pytype === 'bool') return v.value ? 'True' : 'False'
      if (v.pytype === 'str') return JSON.stringify(v.value)
      return String(v.value)
    case 'sequence': {
      const inner = v.items.map(formatValue).join(', ') + (v.truncated ? ', …' : '')
      if (v.pytype === 'tuple') return `(${inner})`
      if (v.pytype === 'set' || v.pytype === 'frozenset') return `{${inner}}`
      return `[${inner}]`
    }
    case 'dict': {
      const inner =
        v.entries.map(([k, val]) => `${formatValue(k)}: ${formatValue(val)}`).join(', ') +
        (v.truncated ? ', …' : '')
      return `{${inner}}`
    }
    case 'object':
      return v.repr
  }
}

// Hide function/class/module bindings from the variables panel — they're noise
// for a beginner watching values change.
const HIDDEN_PYTYPES = new Set(['function', 'builtin_function_or_method', 'method', 'module', 'type'])

export default function CodeVisualizer({ code, caption, inputValues }: Props) {
  const { isLoading: pyodideLoading, progress } = usePyodide()
  const [steps, setSteps] = useState<TraceStep[] | null>(null)
  const [current, setCurrent] = useState(0)
  const [isTracing, setIsTracing] = useState(false)
  const [traceError, setTraceError] = useState<string | null>(null)
  const [truncated, setTruncated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const viewRef = useRef<EditorView | null>(null)

  const total = steps?.length ?? 0
  const step = steps?.[current]

  const visualize = async () => {
    if (isTracing || pyodideLoading) return
    setIsTracing(true)
    setTraceError(null)
    const result = await tracePython(code, inputValues ?? [])
    setIsTracing(false)
    setTruncated(result.truncated)
    setTraceError(result.error ? cleanPythonError(result.error) : null)
    setCurrent(0)
    setIsPlaying(false)
    setSteps(result.steps)
  }

  // Move the current-line highlight (and scroll to it) as we step.
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const ln = step?.line ?? null
    view.dispatch({ effects: setHighlight.of(ln) })
    if (ln != null && ln >= 1 && ln <= view.state.doc.lines) {
      view.dispatch({ effects: EditorView.scrollIntoView(view.state.doc.line(ln).from, { y: 'center' }) })
    }
  }, [step])

  // Auto-play: schedule the next step only while playing and not yet at the end.
  // Stopping at the end is handled by `goto`/`togglePlay`, never by a setState
  // inside this effect.
  useEffect(() => {
    if (!isPlaying || !steps || current >= steps.length - 1) return
    const id = setTimeout(() => setCurrent((c) => Math.min(c + 1, steps.length - 1)), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [isPlaying, current, steps])

  const goto = (i: number) => {
    setIsPlaying(false)
    setCurrent(Math.max(0, Math.min(i, total - 1)))
  }

  const traced = steps != null
  const atEnd = current >= total - 1
  const showPause = isPlaying && !atEnd

  const togglePlay = () => {
    if (atEnd) {
      setCurrent(0)
      setIsPlaying(true)
    } else {
      setIsPlaying((p) => !p)
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/10 p-3">
      {caption && <p className="text-sm text-slate-600 dark:text-slate-300">{caption}</p>}

      <div className="grid gap-3 md:grid-cols-2">
        {/* Code with current-line highlight */}
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <CodeMirror
            value={code}
            theme={oneDark}
            extensions={[python(), EditorView.editable.of(false), highlightField, highlightTheme]}
            onCreateEditor={(view) => { viewRef.current = view }}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: false,
              foldGutter: false,
              tabSize: 4,
              highlightActiveLine: false,
            }}
          />
        </div>

        {/* Variables + output */}
        <div className="space-y-2">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 min-h-[6rem]">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Variables</div>
            {!traced ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Click <strong>Visualize</strong> to step through the code.
              </p>
            ) : step && step.frames.length > 0 ? (
              <div className="space-y-2">
                {step.frames.map((frame, fi) => {
                  const vars = frame.locals.filter((l) => !HIDDEN_PYTYPES.has(l.value.pytype))
                  return (
                    <div key={fi}>
                      {step.frames.length > 1 && (
                        <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 mb-1">
                          {frame.name === 'Global' ? 'Global' : `${frame.name}()`}
                        </div>
                      )}
                      {vars.length > 0 ? (
                        <table className="w-full text-sm font-mono">
                          <tbody>
                            {vars.map((l) => (
                              <tr key={l.name}>
                                <td className="pr-3 align-top text-slate-500 dark:text-slate-400 whitespace-nowrap">{l.name}</td>
                                <td className="text-slate-800 dark:text-slate-100 break-all">{formatValue(l.value)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-xs text-slate-400 dark:text-slate-500">(no variables yet)</p>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500">(no variables yet)</p>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 font-mono text-sm">
            <div className="px-3 py-1.5 border-b border-slate-700/60 text-[10px] uppercase tracking-wider text-slate-400">
              Output
            </div>
            <pre className="px-3 py-2 whitespace-pre-wrap break-words min-h-[2rem]">{step?.stdout ?? ''}</pre>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2">
        {!traced ? (
          <>
            <button
              onClick={visualize}
              disabled={isTracing || pyodideLoading}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTracing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              Visualize
            </button>
            {pyodideLoading && (
              <span className="text-xs text-slate-400">Loading Python… {progress.pct}%</span>
            )}
          </>
        ) : total === 0 ? (
          <span className="text-sm text-slate-500 dark:text-slate-400">Nothing to visualize.</span>
        ) : (
          <>
            <button onClick={() => goto(0)} title="Reset"
              className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={() => goto(current - 1)} disabled={current === 0} title="Previous"
              className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed">
              <SkipBack className="w-4 h-4" />
            </button>
            <button onClick={togglePlay} title={showPause ? 'Pause' : 'Play'}
              className="p-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
              {showPause ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={() => goto(current + 1)} disabled={atEnd} title="Next"
              className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed">
              <SkipForward className="w-4 h-4" />
            </button>
            <input
              type="range" min={0} max={total - 1} value={current}
              onChange={(e) => goto(Number(e.target.value))}
              className="flex-1 min-w-[6rem] accent-indigo-600"
            />
            <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Step {current + 1} / {total}
            </span>
          </>
        )}
      </div>

      {/* Notices */}
      {truncated && (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Stopped after {total} steps — this snippet runs too long to visualize fully (e.g. a big loop).
        </p>
      )}
      {traceError && (
        <p className="text-xs text-rose-600 dark:text-rose-400 font-mono">
          {traceError}
        </p>
      )}
    </div>
  )
}
