import type { ReactNode } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Tiny inline-markdown renderer for paragraph and list text.
//
// Supports:
//   `code`      → inline monospace pill
//   **bold**    → bold span
//
// Anything more elaborate (links, images, italics, etc.) deliberately omitted
// — lesson text in the source PDF only uses these two so a hand-rolled splitter
// stays predictable and avoids pulling in a markdown library.
// ─────────────────────────────────────────────────────────────────────────────

const INLINE_PATTERN = /(`[^`]+`|\*\*[^*]+\*\*)/g

export function renderInline(text: string): ReactNode[] {
  const parts = text.split(INLINE_PATTERN)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-slate-100 dark:bg-slate-700/70 px-1.5 py-0.5 font-mono text-[0.9em] text-rose-700 dark:text-rose-300"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}
