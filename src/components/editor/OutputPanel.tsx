import { useRef, useEffect } from 'react'
import { Terminal } from 'lucide-react'
import { useEditorStore } from '../../stores/useEditorStore'
import { provideInput } from '../../services/pythonRunner'

export default function OutputPanel() {
  const { output, error, isRunning, pendingInput, setPendingInput } = useEditorStore()
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus the input field whenever a new input request arrives
  useEffect(() => {
    if (pendingInput) inputRef.current?.focus()
  }, [pendingInput])

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const value = e.currentTarget.value
    provideInput(value)
    setPendingInput(null)
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900">
      <div className="px-4 py-2 border-b border-slate-700 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-slate-400" />
        <span className="text-slate-400 text-sm">Output</span>
        {pendingInput && (
          <span className="ml-auto text-xs text-yellow-400 animate-pulse">
            waiting for input…
          </span>
        )}
      </div>

      <div className="p-4 font-mono text-sm min-h-[100px] max-h-[200px] overflow-auto">

        {/* ── Waiting for input ─────────────────────────────────── */}
        {pendingInput ? (
          <div>
            {pendingInput.partialOutput && (
              <pre className="text-green-400 whitespace-pre-wrap">{pendingInput.partialOutput}</pre>
            )}
            <div className="flex items-baseline mt-0.5">
              <span className="text-green-400 whitespace-pre">{pendingInput.prompt}</span>
              <input
                ref={inputRef}
                type="text"
                spellCheck={false}
                onKeyDown={handleSubmit}
                className="flex-1 min-w-0 bg-transparent text-yellow-300 outline-none caret-yellow-300 ml-0.5"
              />
            </div>
            <p className="text-slate-600 text-xs mt-2">Press Enter to submit</p>
          </div>
        ) : isRunning ? (
          <span className="text-yellow-400">Running…</span>
        ) : error ? (
          <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
        ) : output ? (
          <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
        ) : (
          <span className="text-slate-500">Click "Run" to execute your code</span>
        )}

      </div>
    </div>
  )
}
