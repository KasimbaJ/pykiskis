import type { TheoryLesson } from '../../types/basics'
import ContentBlockRenderer from './blocks/ContentBlockRenderer'

/** Renders the body of a TheoryLesson — just a mapped list of ContentBlocks. */
export default function TheoryView({ lesson }: { lesson: TheoryLesson }) {
  return (
    <article className="space-y-4">
      {lesson.blocks.map((block, i) => (
        <ContentBlockRenderer key={i} block={block} />
      ))}
    </article>
  )
}
