import type { Level } from '../types'

function normalize(text: string): string {
  return text.replace(/\r\n/g, '\n').trimEnd()
}

export function validateOutput(level: Level, actualOutput: string): boolean {
  const expected = normalize(level.expectedOutput)
  const actual = normalize(actualOutput)

  switch (level.validationMode) {
    case 'exact':
      return actual === expected
    case 'contains':
      return actual.includes(expected)
    case 'regex': {
      try {
        return new RegExp(expected).test(actual)
      } catch {
        return false
      }
    }
    default:
      return actual === expected
  }
}

// For theory levels: validate the raw code text (not execution output).
// In theory mode the student writes code — we check that the code *contains*
// the expected expression.  Both 'exact' and 'contains' modes use substring
// matching (an exact-equality check against the full code string would never
// pass because the student always writes more than just the expected snippet).
// Only 'regex' differs — it applies a regex test against the code text.
export function validateTheoryAnswer(level: Level, code: string): boolean {
  const expected = normalize(level.expectedOutput)
  const actual = normalize(code)

  if (level.validationMode === 'regex') {
    try {
      return new RegExp(expected).test(actual)
    } catch {
      return false
    }
  }
  return actual.includes(expected)
}
