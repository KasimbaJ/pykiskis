// ─────────────────────────────────────────────────────────────────────────────
// Python Basics Learning Path — type definitions
//
// A parallel learning track to the existing 5-phase Python Learning Path.
// Organised as: Chapter → Module → Lesson.  Each Lesson is one of four
// variants (Theory, Quiz, Exercise, Recap) that share a base shape.
//
// Lesson keys in the progress store use the composite string
//   `${chapter.slug}.${module.slug}.${lesson.slug}`
// to avoid collisions with the numeric levelId space used by Phase levels.
// ─────────────────────────────────────────────────────────────────────────────

export interface Chapter {
  /** 1-7, used for ordering and display ("Ch 1"). */
  id: number
  /** URL-safe identifier — appears in routes like `/basics/:chapterSlug`. */
  slug: string
  /** Display name, e.g. "Introduction". */
  title: string
  /** Short tagline shown under the title on chapter cards. */
  subtitle: string
  /** Longer description used on the chapter detail page. */
  description: string
  /** Tailwind colour token (mirrors phase colours). */
  color: string
  /** Show a "FEATURED" badge — used for the Projects chapters (Ch 3, Ch 7). */
  featured?: boolean
  modules: Module[]
}

export interface Module {
  /** URL-safe slug, unique within the chapter. */
  slug: string
  title: string
  /** Optional one-line description shown in the Course Outline drawer. */
  summary?: string
  lessons: Lesson[]
}

// ─── Lesson variants ─────────────────────────────────────────────────────────

export type Lesson = TheoryLesson | QuizLesson | ExerciseLesson | RecapLesson

interface LessonBase {
  /** URL-safe slug, unique within the module. */
  slug: string
  title: string
}

export interface TheoryLesson extends LessonBase {
  type: 'theory'
  blocks: ContentBlock[]
}

export interface QuizLesson extends LessonBase {
  type: 'quiz'
  question: string
  options: QuizOption[]
  /** Must match one of the option ids. */
  correctOptionId: string
  /** Shown after the learner answers, regardless of correctness. */
  explanation: string
}

export interface QuizOption {
  /** Stable id stored in progress (e.g. "a", "b", "c"). */
  id: string
  text: string
}

export interface ExerciseLesson extends LessonBase {
  type: 'exercise'
  /** Markdown-lite body shown in the left panel (paragraphs separated by blank lines). */
  problemDescription: string
  /** Optional bulleted "Remember:" list shown under the description. */
  remember?: string[]
  starterCode: string
  expectedOutput: string
  validationMode: 'exact' | 'contains' | 'regex'
  solution: string
  /** Pre-supplied stdin for non-interactive validation (mirrors Level.inputValues). */
  inputValues?: string[]
}

export interface RecapLesson extends LessonBase {
  type: 'recap'
  congratsTitle: string
  /** Short summary paragraph. */
  summary: string
  /** Optional title of the next module to point the learner forward. */
  nextModuleTitle?: string
}

// ─── Content blocks (used by TheoryLesson) ───────────────────────────────────

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | NoteBlock
  | ListBlock
  | CodeBlock
  | RunnableBlock
  | FigureBlock

export interface ParagraphBlock {
  kind: 'paragraph'
  /** Supports inline `code` (backticks) and **bold** markdown. */
  text: string
}

export interface HeadingBlock {
  kind: 'heading'
  level: 2 | 3
  text: string
}

export interface NoteBlock {
  kind: 'note'
  text: string
}

export interface ListBlock {
  kind: 'list'
  ordered: boolean
  items: string[]
}

export interface CodeBlock {
  kind: 'code'
  /** Read-only syntax-highlighted code. */
  code: string
}

export interface RunnableBlock {
  kind: 'runnable'
  code: string
  /** Optional caption shown above the snippet. */
  caption?: string
}

export interface FigureBlock {
  kind: 'figure'
  /** Code shown above the output (no Run button — purely illustrative). */
  code: string
  output: string
  caption?: string
}

// ─── Progress ────────────────────────────────────────────────────────────────

/** Stored per-lesson, keyed by `${chapter.slug}.${module.slug}.${lesson.slug}`. */
export interface LessonProgress {
  completed: boolean
  attempts: number
  visitedAt?: string
  /** Best submitted code for exercise lessons. */
  bestCode?: string
  /** Last option chosen for quiz lessons. */
  selectedOption?: string
}

/** Shape returned by GET /api/basics-progress. */
export interface ServerBasicsProgress {
  lessons: Array<{
    lessonId: string
    completed: boolean
    attempts: number
    visitedAt: string | null
    bestCode: string | null
    selectedOption: string | null
  }>
}
