import { Terminal } from 'lucide-react'
import { useEditorStore } from '../../stores/useEditorStore'

export default function OutputPanel() {
  const { output, error, isRunning } = useEditorStore()

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900">
      <div className="px-4 py-2 border-b border-slate-700 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-slate-400" />
        <span className="text-slate-400 text-sm">Output</span>
      </div>
      <div className="p-4 font-mono text-sm min-h-[100px] max-h-[200px] overflow-auto">
        {isRunning ? (
          <span className="text-yellow-400">Running...</span>
        ) : error ? (
          <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
        ) : output ? (
          <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
        ) : (
          <span className="text-slate-500">
            Click "Run" to execute your code
          </span>
        )}
      </div>
    </div>
  )
}
