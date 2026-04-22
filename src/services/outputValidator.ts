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

// For theory levels: validate the raw code text (not execution output)
export function validateTheoryAnswer(level: Level, code: string): boolean {
  const expected = normalize(level.expectedOutput)
  const actual = normalize(code)

  switch (level.validationMode) {
    case 'exact':
      return actual.includes(expected)
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
      return actual.includes(expected)
  }
}
