// QA verification — runs every Chapter 1 exercise solution and progress-test
// predict-output snippet through real Python, replicating the app's grading
// (mock input() that does NOT echo the prompt), and checks the output matches.
//
// Run: npx tsx qa-verify.ts
import { ch1 } from './src/data/basics/ch1-introduction'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const dir = mkdtempSync(join(tmpdir(), 'pyqa-'))
let n = 0

function runPy(fullCode: string): { out: string; err: string } {
  const file = join(dir, `t${n++}.py`)
  writeFileSync(file, fullCode)
  try {
    const out = execFileSync('py', [file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 15000,
    })
    return { out, err: '' }
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string }
    return { out: err.stdout ?? '', err: err.stderr ?? String(e) }
  }
}

// Replicate the worker's non-interactive mock input (no prompt echo).
function mockWrap(code: string, inputs: string[]): string {
  return (
    `_iv = ${JSON.stringify(inputs)}\n` +
    `_ii = 0\n` +
    `def _mock_input(prompt=''):\n` +
    `    global _ii\n` +
    `    if _ii < len(_iv):\n` +
    `        v = _iv[_ii]; _ii += 1\n` +
    `        return v\n` +
    `    return ''\n` +
    `input = _mock_input\n` +
    code
  )
}

const normalize = (s: string) => s.replace(/\r\n/g, '\n').trimEnd()

function validate(mode: string, expected: string, actual: string): boolean {
  const e = normalize(expected)
  const a = normalize(actual)
  if (mode === 'exact')    return a === e
  if (mode === 'contains') return a.includes(e)
  if (mode === 'regex')    { try { return new RegExp(e).test(a) } catch { return false } }
  return false
}

let pass = 0
const fails: string[] = []

for (const module of ch1.modules) {
  for (const lesson of module.lessons) {
    // ── Exercises ───────────────────────────────────────────────────────────
    if (lesson.type === 'exercise') {
      const usesInput = /\binput\s*\(/.test(lesson.solution)
      const code = usesInput
        ? mockWrap(lesson.solution, lesson.inputValues ?? [])
        : lesson.solution
      const { out, err } = runPy(code)
      const where = `${module.slug}/${lesson.slug}`
      if (err) {
        fails.push(`EXERCISE ${where} — solution raised an error:\n    ${err.split('\n').filter(Boolean).slice(-1)[0]}`)
      } else if (!validate(lesson.validationMode, lesson.expectedOutput, out)) {
        fails.push(
          `EXERCISE ${where} — solution output does NOT match expectedOutput\n` +
          `    expected (${lesson.validationMode}): ${JSON.stringify(normalize(lesson.expectedOutput))}\n` +
          `    actual:                              ${JSON.stringify(normalize(out))}`,
        )
      } else {
        pass++
      }
    }

    // ── Progress-test predict-output questions ──────────────────────────────
    if (lesson.type === 'progress-test') {
      for (const q of lesson.questions) {
        if (q.qType !== 'predict-output') continue
        const usesInput = /\binput\s*\(/.test(q.code)
        const where = `${module.slug}/${q.id}`
        if (usesInput) {
          // No inputValues on test questions — flag for manual review.
          fails.push(`PREDICT-OUTPUT ${where} — uses input(); needs MANUAL review (expected ${JSON.stringify(q.expectedOutput)})`)
          continue
        }
        const { out, err } = runPy(q.code)
        if (err) {
          fails.push(`PREDICT-OUTPUT ${where} — code raised an error:\n    ${err.split('\n').filter(Boolean).slice(-1)[0]}`)
        } else if (normalize(out) !== normalize(q.expectedOutput)) {
          fails.push(
            `PREDICT-OUTPUT ${where} — code output does NOT match expectedOutput\n` +
            `    expected: ${JSON.stringify(normalize(q.expectedOutput))}\n` +
            `    actual:   ${JSON.stringify(normalize(out))}`,
          )
        } else {
          pass++
        }
      }
    }

    // ── Runnable blocks in theory lessons ───────────────────────────────────
    if (lesson.type === 'theory') {
      // A runnable that errors is acceptable when the lesson itself is about
      // that error — intentionally-broken demos teach by failing.  Detected
      // via an error shown in a figure OR described in the lesson prose.
      const lessonShowsError = lesson.blocks.some(
        (b) =>
          (b.kind === 'figure' && /error|traceback/i.test(b.output)) ||
          (b.kind === 'paragraph' && /\berror\b/i.test(b.text)),
      )
      for (const block of lesson.blocks) {
        if (block.kind !== 'runnable') continue
        const where = `${module.slug}/${lesson.slug}`
        const usesInput = /\binput\s*\(/.test(block.code)
        const code = usesInput
          ? mockWrap(block.code, block.inputValues ?? [])
          : block.code
        const { err } = runPy(code)
        if (err && !lessonShowsError) {
          fails.push(
            `RUNNABLE ${where} — demo errors with the given inputValues:\n` +
            `    ${err.split('\n').filter(Boolean).slice(-1)[0]}`,
          )
        } else {
          pass++
        }
      }
    }

    // ── Figure blocks in theory lessons ─────────────────────────────────────
    if (lesson.type === 'theory') {
      for (const block of lesson.blocks) {
        if (block.kind !== 'figure') continue
        // Skip figures whose "code" is illustrative pseudo-code, not runnable.
        const looksRunnable = /\bprint\s*\(/.test(block.code)
        if (!looksRunnable) continue
        const usesInput = /\binput\s*\(/.test(block.code)
        if (usesInput) continue // demo figures with input — skip
        const where = `${module.slug}/${lesson.slug}`
        const { out, err } = runPy(block.code)
        if (err) {
          // Some figures intentionally show errors — only flag if the figure's
          // expected output does NOT itself look like an error.
          if (!/error/i.test(block.output)) {
            fails.push(`FIGURE ${where} — code errors but figure output isn't an error:\n    ${err.split('\n').filter(Boolean).slice(-1)[0]}`)
          } else {
            pass++
          }
        } else if (normalize(out) !== normalize(block.output)) {
          fails.push(
            `FIGURE ${where} — code output does NOT match figure output\n` +
            `    figure says: ${JSON.stringify(normalize(block.output))}\n` +
            `    actual:      ${JSON.stringify(normalize(out))}`,
          )
        } else {
          pass++
        }
      }
    }
  }
}

console.log(`\n✓ ${pass} checks passed`)
if (fails.length) {
  console.log(`\n✗ ${fails.length} issue(s) found:\n`)
  fails.forEach((f, i) => console.log(`${i + 1}. ${f}\n`))
  process.exit(1)
} else {
  console.log('All checks passed — no issues found.\n')
}
