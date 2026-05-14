import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { Play, Loader2 } from 'lucide-react'
import { usePyodide } from '../../../hooks/usePyodide'
import { runPython } from '../../../services/pythonRunner'

interface Props {
  code: string
  caption?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// RunnableBlock — an inline read-only code snippet with its own Run button.
//
// Used inside theory lessons to let learners execute illustrative examples
// without leaving the page.  Reuses the shared Pyodide worker; output renders
// directly underneath the snippet.
// ─────────────────────────────────────────────────────────────────────────────

export default function RunnableBlock({ code, caption }: Props) {
  const { isLoading: pyodideLoading, progress } = usePyodide()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    if (isRunning || pyodideLoading) return
    setIsRunning(true)
    setError(null)
    setOutput('')
    // Non-interactive: theory demos shouldn't prompt for stdin.  If the snippet
    // happens to call input(), it falls back to mock mode (returns "").
    const result = await runPython(code, [], { interactive: false })
    setIsRunning(false)
    setOutput(result.output)
    if (result.error) setError(result.error)
  }

  return (
    <div className="space-y-2">
      {caption && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{caption}</p>
      )}

      <div className="rounded-lg overflow-hidden border border-slate-700">
        <CodeMirror
          value={code}
          extensions={[python(), EditorView.editable.of(false)]}
          theme={oneDark}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: false,
            foldGutter: false,
            tabSize: 4,
            highlightActiveLine: false,
          }}
        />
        <div className="flex items-center justify-between bg-slate-800 px-3 py-2 border-t border-slate-700">
          <button
            onClick={run}
            disabled={isRunning || pyodideLoading}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            Run Code
          </button>
          {pyodideLoading && (
            <span className="text-xs text-slate-400">
              Loading Python… {progress.pct}%
            </span>
          )}
        </div>
      </div>

      {(output !== null || error) && (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 font-mono text-sm">
          <div className="px-3 py-1.5 border-b border-slate-700/60 text-[10px] uppercase tracking-wider text-slate-400">
            Output
          </div>
          <pre className="px-3 py-2 whitespace-pre-wrap break-words min-h-[2rem]">
            {output}
            {error && (
              <span className="text-rose-400">{output ? '\n' : ''}{error}</span>
            )}
          </pre>
        </div>
      )}
    </div>
  )
}
