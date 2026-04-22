import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { useEditorStore } from '../../stores/useEditorStore'

export default function CodeEditor() {
  const { code, setCode } = useEditorStore()

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-slate-400 text-sm ml-2">main.py</span>
      </div>
      <CodeMirror
        value={code}
        onChange={setCode}
        extensions={[python()]}
        theme={oneDark}
        height="250px"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          foldGutter: false,
          tabSize: 4,
        }}
      />
    </div>
  )
}
