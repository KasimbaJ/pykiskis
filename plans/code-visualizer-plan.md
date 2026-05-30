# Code Visualizer — Implementation Plan

> Self-contained handoff. A fresh session with zero prior context can execute this.
> To start: `Read plans/code-visualizer-plan.md and execute it — Phase 1 first.`
>
> STATUS: Not started (pending). See plans/README.md for the active-plan index.

## Goal

A **step-through code visualizer** (à la pythontutor.com) for the Pykiškis Python
course: students watch code execute one line at a time, seeing variables change,
the call stack grow/shrink, and output appear. It is **authored into lessons** —
it shows up only where a lesson author drops a `visualize` block, i.e. exactly
where stepping through the code helps explain a concept. It is NOT a global tool
and does NOT auto-visualize every snippet.

## Decisions (locked with the user)

- **Build native** — trace execution inside the existing Pyodide web worker via
  Python's `sys.settrace`. No external service (no pythontutor.com iframe):
  works offline, keeps student code private, matches the stack, full styling
  control.
- **Authored content block** — a new `visualize` `ContentBlock` variant, embedded
  per-lesson where needed. Renders only where placed.
- **v1 depth: stepper + variables + output** — step fwd/back through lines,
  highlight the current line, show a live variables table per scope, and a
  growing output console. The visual **heap/reference diagram with arrows**
  (aliasing between lists/dicts/objects) is deferred to **v2**.
  > OPEN: confirm v1 depth before Phase 2. If the user wants the heap diagram in
  > v1, Phase 2's UI work roughly doubles.

## Project context (for a fresh session)

PyLingo / "Pykiškis" — browser-based Python learning app.
- Production: https://pykiskis.pages.dev · Repo: github.com/KasimbaJ/pykiskis
- Deploy: push to `master` → GitHub Actions → Cloudflare Pages (~1 min).
  Watch with `gh run watch <id>`.
- Stack: React 19, Vite, TypeScript, Tailwind 4, Zustand, Clerk, CF Pages + D1.
- Verify before shipping: `npm run lint` && `npm run build` must be clean.

### How code executes today (the integration surface)
- `public/pyodide-worker.js` — a web worker that loads Pyodide and runs user code
  via `exec(code, globals_dict)`. Handles `type: 'run'` messages. stdout is
  captured into `_out` via `pyodide.setStdout`. Interactive `input()` uses a
  SharedArrayBuffer to block the worker; non-interactive runs use a mock `input()`
  fed from `inputValues`.
- `src/services/pythonRunner.ts` — main-thread API over the worker:
  `runPython(code, inputValues, opts)` returns a Promise<ExecutionResult>.
  Manages the singleton worker, timeouts, the stop button, and input plumbing.
- `src/hooks/usePyodide.ts` — exposes `{ isLoading, progress }` for the
  "Python loading…" UI; backed by `onPythonReady` / `onPythonProgress`.
- `src/components/basics/TheoryView.tsx` — renders a `TheoryLesson`'s
  `blocks: ContentBlock[]`. Existing block kinds include `runnable` (code + Run)
  and `figure` (code + static output) — the visualizer is a sibling of these.
- `src/types/basics.ts` — defines `ContentBlock` union and the block interfaces.

**Why tracing is simpler than the run path:** tracing runs to completion and
returns ALL steps in one message — it never blocks for input — so it needs NO
SharedArrayBuffer. `input()` in a visualized snippet uses the existing mock path
with pre-supplied `inputValues`.

---

## Phase 1 — Tracing engine (worker + service)

### 1a. Worker: add a `trace` message — `public/pyodide-worker.js`
Add a branch alongside the existing `type === 'run'` handler for `type === 'trace'`.
It runs the user code under a Python trace harness and posts back
`{ type: 'trace_result', steps, error, truncated }`.

Python trace harness (exec'd in the worker; build as a string):
- `compile(code, '<student>', 'exec')` so trace events can be filtered to user
  code by `frame.f_code.co_filename == '<student>'`.
- Redirect stdout to an in-Python buffer (StringIO) so each step can snapshot
  "output so far". (Don't rely on JS `_out` for per-step granularity.)
- Install a tracer with `sys.settrace` that, on each `'line'` event for a
  user-code frame, appends a **step**:
  ```
  { line: <lineno about to execute>,
    stdout: <output captured so far>,
    frames: [ { name, locals: {var: <serialized value>} }, ... ]  # innermost last
    event: 'line' | 'return' | 'exception',
  }
  ```
  Also record `'call'`/`'return'` to drive the call-stack view, and capture a
  final step on exception with the error message.
- **Caps (prevent runaway/memory blowup):**
  - `MAX_STEPS = 1000` — stop tracing past this; set `truncated = true`.
  - Value serialization: depth ≤ 4, ≤ 100 items per container, repr ≤ 200 chars.
  - Cycle-safe: track `id()`s already being serialized.
- **Value serialization** → JSON-safe:
  - `int/float/bool/str/None` → the primitive (with str length cap).
  - `list/tuple/set` → `{ type, items: [...] }` (recursive, capped).
  - `dict` → `{ type: 'dict', entries: [[k, v], ...] }` (recursive, capped).
  - everything else → `{ type: <typename>, repr: <repr()> }`.
  - (v2 will add object identity/refs for the heap diagram — keep the shape
    forward-compatible by always emitting a `type` tag.)
- Wrap execution in try/except so a raising program still returns the steps
  collected up to the exception plus a final error step.
- `sys.settrace(None)` in a finally; convert the Python steps list to JS via
  `.toJs()` (or `json.dumps` then `JSON.parse` on the JS side — JSON is safer
  and avoids PyProxy lifetime issues).

### 1b. Service: `tracePython` — `src/services/pythonRunner.ts`
- Add `tracePython(code: string, inputValues?: string[]): Promise<TraceResult>`
  mirroring `runPython` but posting `type: 'trace'` and resolving on
  `trace_result`. Reuse the worker singleton, the readiness guard, and a timeout
  (tracing is bounded, but keep a ~30 s guard for pathological input).
- No SharedArrayBuffer; if `input()` is used, pass `inputValues` for the mock.
- Types (add to `src/types/index.ts` or a new `src/types/visualizer.ts`):
  ```ts
  export interface TraceValue { /* primitive | {type, items|entries|repr} */ }
  export interface TraceFrame { name: string; locals: Record<string, TraceValue> }
  export interface TraceStep {
    line: number
    stdout: string
    frames: TraceFrame[]
    event: 'line' | 'return' | 'exception'
  }
  export interface TraceResult {
    steps: TraceStep[]
    error: string | null
    truncated: boolean
  }
  ```

### 1c. Phase 1 verification
- Temporary console/dev check (or a tiny throwaway route): `tracePython` on a
  loop + a function call returns a sensible `steps` array; a raising snippet
  returns steps + error; a 100000-iteration loop returns `truncated: true` with
  ≤ 1000 steps. Then `npm run lint && npm run build` clean.

---

## Phase 2 — Visualizer UI component

`src/components/visualizer/CodeVisualizer.tsx`
- Props: `{ code: string; inputValues?: string[]; caption?: string }`.
- **Lazy:** do NOT trace on mount (a lesson may have several blocks). Show the
  code with a **"Visualize" button**; trace on first click, then memoize steps so
  stepping is instant. Show a loading state if Pyodide isn't ready yet
  (reuse `usePyodide`).
- Layout (stacked on mobile, side-by-side on desktop):
  - **Left:** CodeMirror, read-only (same setup as `PredictOutputInput` /
    `runnable`), with the **current line highlighted** via a line decoration.
    (Use a CodeMirror `Decoration.line` + a `StateField`/`StateEffect`, updated
    from the current step's `line`.)
  - **Right top:** **Variables** — one section per frame (Global + each call
    frame's locals), `name → value` rows. Render `TraceValue` with a small
    recursive formatter (lists/dicts shown inline, capped with `…`).
  - **Right bottom:** **Output** console showing `steps[current].stdout`
    (grows as you step).
- **Controls:** ⏮ Reset · ◀ Prev · ▶ Next · scrubber `<input type=range>` ·
  ▶/⏸ auto-play (e.g. step every 700 ms). Show "Step X / N".
- **Notices:** if `truncated`, show "Stopped after 1000 steps". If `error`,
  show the message at the final step (and mark that step's line).
- Dark-mode styling consistent with `ProgressTestView` / `TheoryView`.

Verify in the browser (preview server + sign-in pattern used elsewhere this
repo): step through a sample with a loop + function; confirm line highlight,
variable updates per frame, growing output, scrubber, and auto-play.

---

## Phase 3 — Author it into lessons (the content block)

### 3a. Type — `src/types/basics.ts`
Add to the `ContentBlock` union and define:
```ts
export interface VisualizeBlock {
  kind: 'visualize'
  code: string
  /** Optional caption shown above the visualizer. */
  caption?: string
  /** Pre-supplied stdin if the snippet calls input() (mock, deterministic). */
  inputValues?: string[]
}
```

### 3b. Renderer — `src/components/basics/TheoryView.tsx`
Add a `case 'visualize'` to the block renderer:
`return <CodeVisualizer code={block.code} inputValues={block.inputValues} caption={block.caption} />`.

### 3c. Author one real example
Drop a `visualize` block into a Chapter 1 theory lesson where stepping helps —
e.g. **Variables** (watch a variable get reassigned) or **Arithmetic Operators**
(operator precedence) in `src/data/basics/ch1/`. This proves the authoring flow
and gives a live demo. Keep the snippet short (≤ ~15 lines) so the step count
stays small.

### 3d. (Optional) QA harness
`qa-verify.ts` could trace each `visualize` block to assert it runs without
error — mirrors how it already checks `runnable`/`figure`/predict-output. Nice-to-have.

---

## Phase 4 — Polish, verify, ship

- Edge cases: empty/blank code, code that only defines functions (few line
  events), exception on line 1, deep recursion (cap depth), `input()` with
  supplied values.
- `npm run lint` && `npm run build` clean.
- Browser-verify the authored lesson example end-to-end.
- Commit, `git push origin master`, `gh run watch <id>` to confirm deploy.

## Done when

- A `visualize` block in a theory lesson renders a working step-through:
  current-line highlight, per-frame variables, growing output, prev/next/scrubber/
  auto-play, truncation + error notices.
- It appears ONLY where authored — no global tool, nothing auto-visualized.
- lint + build green; deployed; one real Chapter 1 lesson uses it.

## Deferred to v2 (not in this plan)

- **Heap / reference diagram** — boxes-and-arrows showing object identity and
  aliasing (two names pointing at the same list, nested structures). The
  `TraceValue` shape already carries a `type` tag to make this additive.
- Embedding the visualizer in exercises, or a standalone Playground "Visualize"
  button, if ever wanted.

## Risk notes

- **Step explosion / memory** — mitigated by `MAX_STEPS` + value caps.
- **Serialization of arbitrary/cyclic objects** — depth/size caps + id() cycle
  guard; unknown types fall back to `{type, repr}`.
- **PyProxy lifetime** — prefer `json.dumps` in Python → `JSON.parse` in JS over
  passing live PyProxies across the boundary.
- **settrace under Pyodide** — it's CPython; expected to work. Validate in
  Phase 1c before building the UI.
- **No new heavy deps** — CodeMirror is already in the bundle; the line-highlight
  decoration uses APIs already available.
