// ─────────────────────────────────────────────────────────────────────────────
// cleanPythonError — strip Pyodide / CPython internal frames from a traceback
// so learners only see lines that reference their own code.
//
// Shared by the Phase track (useCodeExecution) and the Basics track
// (RunnableBlock, ExerciseView) so error display is consistent everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export function cleanPythonError(raw: string): string {
  if (!raw) return raw
  const lines = raw.split('\n')
  const output: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Keep the "Traceback…" header as-is
    if (line.startsWith('Traceback (most recent call last):')) {
      output.push(line)
      i++
      continue
    }

    // Frame entry — skip Pyodide / CPython internal files
    if (line.startsWith('  File ')) {
      const isInternal =
        /\/lib\/python/.test(line) ||
        /site-packages\/pyodide/.test(line) ||
        /_bootstrap/.test(line) ||
        /importlib/.test(line) ||
        /\/pyodide\//.test(line)

      if (isInternal) {
        // Skip the frame header plus any indented source-snippet lines below it
        i++
        while (i < lines.length && lines[i].startsWith('    ')) i++
        continue
      }
    }

    output.push(line)
    i++
  }

  // Remove trailing blank lines
  while (output.length && output[output.length - 1].trim() === '') output.pop()

  return output.join('\n')
}
