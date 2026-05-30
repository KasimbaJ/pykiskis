// ─────────────────────────────────────────────────────────────────────────────
// Code Visualizer — trace data shapes
//
// The Pyodide worker runs a snippet under sys.settrace and emits one TraceStep
// per executed line: the line about to run, a snapshot of every user-code frame
// (function name + its local variables), and the program output so far.  The
// React stepper walks this array.  Values carry a `kind` discriminant + the
// exact Python `pytype` so a future v2 heap/reference view can build on the same
// shape without changing the engine.
// ─────────────────────────────────────────────────────────────────────────────

export interface TracePrimitive {
  kind: 'primitive'
  /** Exact Python type name: 'int' | 'float' | 'str' | 'bool' | 'NoneType'. */
  pytype: string
  value: string | number | boolean | null
}

export interface TraceSequence {
  kind: 'sequence'
  /** 'list' | 'tuple' | 'set' | 'frozenset'. */
  pytype: string
  items: TraceValue[]
  /** True if the sequence was longer than the per-container cap. */
  truncated?: boolean
}

export interface TraceDict {
  kind: 'dict'
  pytype: string
  entries: Array<[TraceValue, TraceValue]>
  truncated?: boolean
}

export interface TraceObject {
  kind: 'object'
  pytype: string
  /** repr() of the value, capped in length. Used for anything not above. */
  repr: string
}

export type TraceValue = TracePrimitive | TraceSequence | TraceDict | TraceObject

export interface TraceLocal {
  name: string
  value: TraceValue
}

export interface TraceFrame {
  /** Function name; module scope is reported as 'Global'. */
  name: string
  /** Locals in insertion order. */
  locals: TraceLocal[]
}

export interface TraceStep {
  /** 1-based line number about to execute (or that returned / raised). */
  line: number
  event: 'line' | 'return' | 'exception'
  /** Program stdout captured up to this step. */
  stdout: string
  /** Call stack, outermost (Global) first, innermost last. */
  frames: TraceFrame[]
}

export interface TraceResult {
  steps: TraceStep[]
  /** Non-null if the snippet raised; carries the formatted exception line. */
  error: string | null
  /** True if tracing stopped at the step cap (e.g. a long loop). */
  truncated: boolean
}
