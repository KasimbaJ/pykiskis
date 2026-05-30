// ─────────────────────────────────────────────────────────────────────────────
// Code Visualizer — trace data shapes (v2: identity-aware heap model)
//
// The Pyodide worker runs a snippet under sys.settrace and emits one TraceStep
// per executed line.  Each step carries the call stack (frames + their locals)
// and a `heap` of the compound objects referenced at that point.  Variables hold
// either an inline primitive or a {ref} to a heap object — so when two variables
// reference the SAME object (aliasing), they share one heap id and the UI draws
// two arrows to one box.
// ─────────────────────────────────────────────────────────────────────────────

export interface TracePrimitive {
  kind: 'primitive'
  /** 'int' | 'float' | 'str' | 'bool' | 'NoneType' (or '?' for unserializable). */
  pytype: string
  value: string | number | boolean | null
}

/** A pointer to a heap object, keyed by its stable per-run id. */
export interface TraceRef {
  kind: 'ref'
  id: number
}

/** A value held by a variable or inside a container: inline primitive or a ref. */
export type TraceValue = TracePrimitive | TraceRef

// ── Heap objects (referenced by id) ──────────────────────────────────────────

export interface HeapSequence {
  kind: 'sequence'
  /** 'list' | 'tuple' | 'set' | 'frozenset'. */
  pytype: string
  items: TraceValue[]
  truncated?: boolean
}

export interface HeapDict {
  kind: 'dict'
  pytype: string
  entries: Array<[TraceValue, TraceValue]>
  truncated?: boolean
}

/** Anything not a primitive/sequence/dict (e.g. a class instance) — shown by repr. */
export interface HeapOther {
  kind: 'object'
  pytype: string
  repr: string
}

export type HeapObject = HeapSequence | HeapDict | HeapOther

// ── Frames & steps ───────────────────────────────────────────────────────────

export interface TraceLocal {
  name: string
  value: TraceValue
}

export interface TraceFrame {
  /** Function name; module scope is reported as 'Global'. */
  name: string
  locals: TraceLocal[]
}

export interface TraceStep {
  /** 1-based line about to execute (or that returned / raised). */
  line: number
  event: 'line' | 'return' | 'exception'
  /** Program stdout captured up to this step. */
  stdout: string
  /** Call stack, outermost (Global) first, innermost last. */
  frames: TraceFrame[]
  /** Compound objects referenced at this step, keyed by id (JSON keys are strings). */
  heap: Record<number, HeapObject>
}

export interface TraceResult {
  steps: TraceStep[]
  /** Non-null if the snippet raised; carries the formatted exception line. */
  error: string | null
  /** True if tracing stopped at the step cap (e.g. a long loop). */
  truncated: boolean
}
