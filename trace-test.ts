// Visualizer trace test — runs EVERY `visualize` block in the course through a
// real-Python sys.settrace harness that mirrors public/pyodide-worker.js
// (buildTraceHarness), and checks each one: no error, produces multiple steps,
// and reports truncation / heap usage. This verifies the step-through visualizers
// actually work (the worker uses Pyodide; here we use local `py`, same CPython).
//
// Run: npx tsx trace-test.ts
import { chapters } from './src/data/basics/index'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const dir = mkdtempSync(join(tmpdir(), 'pyktrace-'))
let n = 0

// Mirror of buildTraceHarness() from public/pyodide-worker.js.
function buildTraceHarness(code: string, inputsJson: string): string {
  return `
import sys as _sys, io as _io, json as _json, math as _math, traceback as _tb, types as _types
_MAX_STEPS = 1000
_MAX_ITEMS = 100
_MAX_REPR = 200
_HEAP_CAP = 300
def _pyk_cap(r):
    return r if len(r) <= _MAX_REPR else r[:_MAX_REPR] + "…"
_pyk_idmap = {}
_pyk_idnext = [1]
def _pyk_idfor(v):
    r = id(v)
    n = _pyk_idmap.get(r)
    if n is None:
        n = _pyk_idnext[0]; _pyk_idnext[0] += 1; _pyk_idmap[r] = n
    return n
def _pyk_isprim(v):
    return v is None or v is True or v is False or isinstance(v, (int, float, str))
def _pyk_prim(v):
    if v is None or v is True or v is False:
        return {"kind": "primitive", "pytype": type(v).__name__, "value": v}
    if isinstance(v, int):
        return {"kind": "primitive", "pytype": "int", "value": v}
    if isinstance(v, float):
        return {"kind": "primitive", "pytype": "float", "value": (repr(v) if not _math.isfinite(v) else v)}
    return {"kind": "primitive", "pytype": "str", "value": _pyk_cap(v)}
def _pyk_hide(v):
    return isinstance(v, (_types.FunctionType, _types.BuiltinFunctionType, _types.MethodType, _types.ModuleType, type))
def _pyk_val(v, heap):
    if _pyk_isprim(v):
        return _pyk_prim(v)
    n = _pyk_idfor(v)
    if n not in heap:
        if len(heap) >= _HEAP_CAP:
            heap[n] = {"kind": "object", "pytype": type(v).__name__, "repr": _pyk_cap(repr(v))}
            return {"kind": "ref", "id": n}
        heap[n] = {"kind": "object", "pytype": type(v).__name__, "repr": ""}
        if isinstance(v, (list, tuple, set, frozenset)):
            items = []; trunc = False
            for i, x in enumerate(v):
                if i >= _MAX_ITEMS: trunc = True; break
                items.append(_pyk_val(x, heap))
            heap[n] = {"kind": "sequence", "pytype": type(v).__name__, "items": items, "truncated": trunc}
        elif isinstance(v, dict):
            entries = []; trunc = False
            for i, (k, val) in enumerate(v.items()):
                if i >= _MAX_ITEMS: trunc = True; break
                entries.append([_pyk_val(k, heap), _pyk_val(val, heap)])
            heap[n] = {"kind": "dict", "pytype": "dict", "entries": entries, "truncated": trunc}
        else:
            heap[n] = {"kind": "object", "pytype": type(v).__name__, "repr": _pyk_cap(repr(v))}
    return {"kind": "ref", "id": n}
_pyk_steps = []
_pyk_trunc = [False]
_pyk_out = _io.StringIO()
_pyk_skip = {"__builtins__", "__name__", "__doc__", "__loader__", "__spec__",
             "__package__", "__file__", "input"}
def _pyk_snapshot(frame, event):
    if len(_pyk_steps) >= _MAX_STEPS:
        _pyk_trunc[0] = True
        return
    heap = {}
    chain = []
    f = frame
    while f is not None:
        if f.f_code.co_filename == "<student>":
            chain.append(f)
        f = f.f_back
    chain.reverse()
    frames = []
    for fr in chain:
        loc = []
        for name, val in list(fr.f_locals.items()):
            if name in _pyk_skip or name.startswith("__") or _pyk_hide(val):
                continue
            try:
                loc.append({"name": name, "value": _pyk_val(val, heap)})
            except Exception:
                loc.append({"name": name, "value": {"kind": "primitive", "pytype": "?", "value": "<unserializable>"}})
        nm = fr.f_code.co_name
        frames.append({"name": "Global" if nm == "<module>" else nm, "locals": loc})
    _pyk_steps.append({"line": frame.f_lineno, "event": event,
                       "stdout": _pyk_out.getvalue(), "frames": frames, "heap": heap})
def _pyk_tracer(frame, event, arg):
    if frame.f_code.co_filename != "<student>":
        return None
    if event in ("line", "return", "exception"):
        _pyk_snapshot(frame, event)
    return _pyk_tracer
_pyk_iv = ${inputsJson}
_pyk_ii = [0]
def _pyk_input(prompt=""):
    if prompt:
        _pyk_out.write(str(prompt))
    v = ""
    if _pyk_ii[0] < len(_pyk_iv):
        v = _pyk_iv[_pyk_ii[0]]; _pyk_ii[0] += 1
    _pyk_out.write(str(v) + "\\n")
    return v
_pyk_error = None
_pyk_g = {"__name__": "__main__", "__builtins__": __builtins__, "input": _pyk_input}
_pyk_real_stdout = _sys.stdout
try:
    _pyk_code = compile(${JSON.stringify(code)}, "<student>", "exec")
    _sys.stdout = _pyk_out
    _sys.settrace(_pyk_tracer)
    try:
        exec(_pyk_code, _pyk_g)
    finally:
        _sys.settrace(None)
        _sys.stdout = _pyk_real_stdout
except Exception as _e:
    _sys.settrace(None)
    _sys.stdout = _pyk_real_stdout
    _pyk_error = "".join(_tb.format_exception_only(type(_e), _e)).strip()
print(_json.dumps({"steps": len(_pyk_steps), "error": _pyk_error, "truncated": _pyk_trunc[0],
                   "heapInLast": (len(_pyk_steps) > 0 and len(_pyk_steps[-1]["heap"]) > 0),
                   "framesMax": max((len(s["frames"]) for s in _pyk_steps), default=0)}))
`
}

interface Found { where: string; code: string; inputValues: string[] }
const found: Found[] = []

for (const ch of chapters) {
  for (const mod of ch.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.type !== 'theory') continue
      for (const block of lesson.blocks) {
        if (block.kind !== 'visualize') continue
        found.push({
          where: `ch${ch.id}/${mod.slug}/${lesson.slug}`,
          code: block.code,
          // VisualizeBlock may carry inputValues for input() snippets.
          inputValues: (block as { inputValues?: string[] }).inputValues ?? [],
        })
      }
    }
  }
}

let pass = 0
const fails: string[] = []
console.log(`\nTracing ${found.length} visualize blocks through real Python (sys.settrace)…\n`)

for (const f of found) {
  const file = join(dir, `t${n++}.py`)
  writeFileSync(file, buildTraceHarness(f.code, JSON.stringify(f.inputValues)))
  let out = ''
  try {
    out = execFileSync('py', [file], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 20000 })
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string }
    fails.push(`${f.where} — harness failed to run:\n    ${(err.stderr || String(e)).split('\n').filter(Boolean).slice(-1)[0]}`)
    continue
  }
  let r: { steps: number; error: string | null; truncated: boolean; heapInLast: boolean; framesMax: number }
  try {
    r = JSON.parse(out.trim().split('\n').slice(-1)[0])
  } catch {
    fails.push(`${f.where} — could not parse trace result: ${out.slice(0, 200)}`)
    continue
  }
  const flags: string[] = []
  if (r.truncated) flags.push('truncated')
  if (r.heapInLast) flags.push('heap')
  if (r.framesMax > 1) flags.push(`${r.framesMax} frames`)
  if (r.error) {
    fails.push(`${f.where} — trace produced an error: ${r.error}`)
  } else if (r.steps < 2) {
    fails.push(`${f.where} — only ${r.steps} step(s); nothing meaningful to step through`)
  } else {
    pass++
    console.log(`  ✓ ${f.where.padEnd(48)} ${String(r.steps).padStart(3)} steps${flags.length ? '  [' + flags.join(', ') + ']' : ''}`)
  }
}

console.log(`\n${pass}/${found.length} visualizers traced cleanly.`)
if (fails.length) {
  console.log(`\n✗ ${fails.length} issue(s):\n`)
  fails.forEach((f, i) => console.log(`${i + 1}. ${f}\n`))
  process.exit(1)
} else {
  console.log('All step-through visualizers work — every snippet traces with no error and multiple steps.\n')
}
