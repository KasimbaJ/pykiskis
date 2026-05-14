import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { Lightbulb } from 'lucide-react'
import type { ContentBlock } from '../../../types/basics'
import { renderInline } from '../inline'
import RunnableBlock from './RunnableBlock'

// ─────────────────────────────────────────────────────────────────────────────
// Renders a single ContentBlock.  Theory lessons map an array of these through
// here.  RunnableBlock is a separate component because it pulls in Pyodide
// state and needs its own React state for output and run status.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  block: ContentBlock
}

export default function ContentBlockRenderer({ block }: Props) {
  switch (block.kind) {
    case 'paragraph':
      return (
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">
          {renderInline(block.text)}
        </p>
      )

    case 'heading':
      return block.level === 2 ? (
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-2">{block.text}</h2>
      ) : (
        <h3 className="text-base font-semibold text-slate-800 dark:text-white mt-1">{block.text}</h3>
      )

    case 'note':
      return (
        <aside className="flex gap-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
          <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
          <p>{renderInline(block.text)}</p>
        </aside>
      )

    case 'list':
      return block.ordered ? (
        <ol className="list-decimal pl-6 space-y-1 text-slate-700 dark:text-slate-200">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-200">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      )

    case 'code':
      return (
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <CodeMirror
            value={block.code}
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
        </div>
      )

    case 'runnable':
      return <RunnableBlock code={block.code} caption={block.caption} />

    case 'figure':
      return (
        <figure className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 space-y-3">
          <pre className="text-sm font-mono whitespace-pre-wrap break-words text-slate-800 dark:text-slate-100">
            {block.code}
          </pre>
          <div className="rounded-md bg-slate-900 text-slate-100 px-3 py-2 font-mono text-sm whitespace-pre-wrap">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Output</div>
            {block.output}
          </div>
          {block.caption && (
            <figcaption className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Figure: {block.caption}
            </figcaption>
          )}
        </figure>
      )
  }
}
