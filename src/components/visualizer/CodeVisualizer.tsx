import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView, Decoration, type DecorationSet } from '@codemirror/view'
import { StateField, StateEffect } from '@codemirror/state'
import { Eye, Play, Pause, SkipBack, SkipForward, RotateCcw, Loader2 } from 'lucide-react'
import { usePyodide } from '../../hooks/usePyodide'
import { tracePython } from '../../services/pythonRunner'
import { cleanPythonError } from '../../services/pythonError'
import type { TraceStep, TraceValue, TracePrimitive, HeapObject } from '../../types/visualizer'

// ─────────────────────────────────────────────────────────────────────────────
// CodeVisualizer — step-through execution for a code snippet (authored into
// lessons via a `visualize` content block).  Shows the code with the current
// line highlighted, a heap diagram (variables → objects with drawn arrows so
// aliasing is visible), and the program output as it grows.  Lazy: it traces
// only when the learner clicks "Visualize".
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

function formatPrimitive(v: TracePrimitive): string {
  if (v.value === null || v.pytype === 'NoneType') return 'None'
  if (v.pytype === 'bool') return v.value ? 'True' : 'False'
  if (v.pytype === 'str') return JSON.stringify(v.value)
  return String(v.value)
}

const seqBrackets: Record<string, [string, string]> = {
  list: ['[', ']'],
  tuple: ['(', ')'],
  set: ['{', '}'],
  frozenset: ['{', '}'],
}

interface Arrow { key: string; x1: number; y1: number; x2: number; y2: number }

// ── Heap diagram: frames (left) + objects (right) + arrows ───────────────────
function HeapDiagram({ step }: { step: TraceStep }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const nodesRef = useRef<Map<string, HTMLElement>>(new Map())
  const [arrows, setArrows] = useState<Arrow[]>([])

  const heapIds = Object.keys(step.heap).map(Number).sort((a, b) => a - b)
  const hasHeap = heapIds.length > 0

  const setNode = (key: string) => (el: HTMLElement | null) => {
    const m = nodesRef.current
    if (el) m.set(key, el)
    else m.delete(key)
  }

  // Where every ref points: variable → object, and object item → object.
  const links = useMemo(() => {
    const ls: { sourceKey: string; targetId: number }[] = []
    step.frames.forEach((f, fi) =>
      f.locals.forEach((l) => {
        if (l.value.kind === 'ref') ls.push({ sourceKey: `v:${fi}:${l.name}`, targetId: l.value.id })
      }),
    )
    for (const id of heapIds) {
      const obj = step.heap[id]
      if (obj.kind === 'sequence') {
        obj.items.forEach((it, idx) => {
          if (it.kind === 'ref') ls.push({ sourceKey: `h:${id}:${idx}`, targetId: it.id })
        })
      } else if (obj.kind === 'dict') {
        obj.entries.forEach(([k, v], i) => {
          if (k.kind === 'ref') ls.push({ sourceKey: `h:${id}:${2 * i}`, targetId: k.id })
          if (v.kind === 'ref') ls.push({ sourceKey: `h:${id}:${2 * i + 1}`, targetId: v.id })
        })
      }
    }
    return ls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Measure DOM and lay out the arrows (recompute on step change + resize).
  useLayoutEffect(() => {
    let raf = 0
    const compute = () => {
      const cont = containerRef.current
      if (!cont) return
      const cb = cont.getBoundingClientRect()
      const next: Arrow[] = []
      for (const lk of links) {
        const src = nodesRef.current.get(lk.sourceKey)
        const tgt = nodesRef.current.get(`box:${lk.targetId}`)
        if (!src || !tgt) continue
        const s = src.getBoundingClientRect()
        const t = tgt.getBoundingClientRect()
        next.push({
          key: lk.sourceKey,
          x1: s.right - cb.left,
          y1: s.top + s.height / 2 - cb.top,
          x2: t.left - cb.left,
          y2: t.top + t.height / 2 - cb.top,
        })
      }
      setArrows(next)
    }
    raf = requestAnimationFrame(compute)
    const ro = new ResizeObserver(() => { raf = requestAnimationFrame(compute) })
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', compute)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [links, step])

  const renderValue = (v: TraceValue, handleKey: string) =>
    v.kind === 'primitive' ? (
      <span className="text-slate-800 dark:text-slate-100">{formatPrimitive(v)}</span>
    ) : (
      <span
        ref={setNode(handleKey)}
        className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 align-middle"
        title="→ object"
      />
    )

  return (
    <div ref={containerRef} className="relative">
      {hasHeap && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          <defs>
            <marker id="pyk-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#6366f1" />
            </marker>
          </defs>
          {arrows.map((a) => {
            const dx = Math.max(20, Math.min(60, Math.abs(a.x2 - a.x1) / 2))
            return (
              <path
                key={a.key}
                d={`M ${a.x1} ${a.y1} C ${a.x1 + dx} ${a.y1}, ${a.x2 - dx} ${a.y2}, ${a.x2} ${a.y2}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth={1.5}
                markerEnd="url(#pyk-arrowhead)"
              />
            )
          })}
        </svg>
      )}

      <div className={hasHeap ? 'flex gap-8 items-start' : ''}>
        {/* Frames / variables */}
        <div className="space-y-2 shrink-0">
          {hasHeap && <div className="text-[10px] uppercase tracking-wider text-slate-400">Variables</div>}
          {step.frames.map((frame, fi) => {
            const vars = frame.locals
            return (
              <div key={fi}>
                {step.frames.length > 1 && (
                  <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 mb-1">
                    {frame.name === 'Global' ? 'Global' : `${frame.name}()`}
                  </div>
                )}
                {vars.length > 0 ? (
                  <table className="text-sm font-mono">
                    <tbody>
                      {vars.map((l) => (
                        <tr key={l.name}>
                          <td className="pr-2 align-middle text-slate-500 dark:text-slate-400 whitespace-nowrap">{l.name}</td>
                          <td className="pr-1 align-middle text-slate-400">=</td>
                          <td className="align-middle break-all">{renderValue(l.value, `v:${fi}:${l.name}`)}</td>
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

        {/* Heap objects */}
        {hasHeap && (
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Objects</div>
            <div className="space-y-3">
              {heapIds.map((id) => {
                const obj: HeapObject = step.heap[id]
                return (
                  <div
                    key={id}
                    ref={setNode(`box:${id}`)}
                    className="inline-block rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1.5"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{obj.pytype}</div>
                    {obj.kind === 'sequence' && (
                      <div className="flex gap-1 font-mono text-sm">
                        <span className="text-slate-400">{seqBrackets[obj.pytype]?.[0] ?? '['}</span>
                        {obj.items.map((it, idx) => (
                          <span key={idx} className="px-1 border-l border-slate-200 dark:border-slate-700 first:border-l-0">
                            {renderValue(it, `h:${id}:${idx}`)}
                          </span>
                        ))}
                        {obj.truncated && <span className="text-slate-400">…</span>}
                        <span className="text-slate-400">{seqBrackets[obj.pytype]?.[1] ?? ']'}</span>
                      </div>
                    )}
                    {obj.kind === 'dict' && (
                      <table className="font-mono text-sm">
                        <tbody>
                          {obj.entries.map(([k, v], i) => (
                            <tr key={i}>
                              <td className="pr-1 align-middle">{renderValue(k, `h:${id}:${2 * i}`)}</td>
                              <td className="pr-1 align-middle text-slate-400">:</td>
                              <td className="align-middle">{renderValue(v, `h:${id}:${2 * i + 1}`)}</td>
                            </tr>
                          ))}
                          {obj.truncated && (
                            <tr><td className="text-slate-400" colSpan={3}>…</td></tr>
                          )}
                        </tbody>
                      </table>
                    )}
                    {obj.kind === 'object' && (
                      <div className="font-mono text-sm text-slate-800 dark:text-slate-100">{obj.repr}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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

      {/* Heap diagram */}
      {traced && step && (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 overflow-x-auto">
          <HeapDiagram step={step} />
        </div>
      )}

      {/* Output */}
      {traced && (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 font-mono text-sm">
          <div className="px-3 py-1.5 border-b border-slate-700/60 text-[10px] uppercase tracking-wider text-slate-400">
            Output
          </div>
          <pre className="px-3 py-2 whitespace-pre-wrap break-words min-h-[2rem]">{step?.stdout ?? ''}</pre>
        </div>
      )}

      {/* Notices */}
      {truncated && (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Stopped after {total} steps — this snippet runs too long to visualize fully (e.g. a big loop).
        </p>
      )}
      {traceError && (
        <p className="text-xs text-rose-600 dark:text-rose-400 font-mono">{traceError}</p>
      )}
    </div>
  )
}
