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

export type Lesson =
  | TheoryLesson
  | QuizLesson
  | ExerciseLesson
  | RecapLesson
  | ProgressTestLesson

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

// ─── Progress Test ───────────────────────────────────────────────────────────
//
// A multi-question checkpoint scored out of 10.  Learners can retake it
// unlimited times to improve their score; the best score is what's kept.
// Submitting any answer set marks the lesson complete (you can't skip past it
// without engaging), but the score itself does NOT gate progression.

export interface ProgressTestLesson extends LessonBase {
  type: 'progress-test'
  /** Short intro shown above the questions. */
  intro: string
  /** Suggested passing score (out of 10).  Shown to the learner but not enforced. */
  passingScore: number
  /** How many questions to present per attempt (drawn randomly from the banks). */
  presentCount: number
  /**
   * One bank, or several to draw evenly from.  Module tests have a single bank;
   * the Final Test lists all four so it can pull an even share from each.
   */
  questionBanks: ProgressTestQuestion[][]
}

export type ProgressTestQuestion =
  | MCQQuestion
  | PredictOutputQuestion
  | FillInBlankQuestion

interface QuestionBase {
  /** Short id, unique within the test (e.g. "q1", "q2"). */
  id: string
  /** Question prompt (markdown-lite). */
  prompt: string
  /** Optional explanation shown after grading. */
  explanation?: string
}

export interface MCQQuestion extends QuestionBase {
  qType: 'mcq'
  options: QuizOption[]
  correctOptionId: string
}

export interface PredictOutputQuestion extends QuestionBase {
  qType: 'predict-output'
  /** Code snippet shown read-only. */
  code: string
  /** Single expected output string (compared after trimEnd / CRLF-normalise). */
  expectedOutput: string
  /**
   * Pre-supplied stdin for snippets that call input().  Used only by the QA
   * harness to run the snippet through real Python — the learner predicts the
   * output rather than executing the code, so this never reaches the UI.
   */
  inputValues?: string[]
}

export interface FillInBlankQuestion extends QuestionBase {
  qType: 'fill-in-blank'
  /** Accepted answers — match is case-insensitive and trimmed. */
  acceptedAnswers: string[]
  /** Optional helper text shown next to the input (e.g. "use Python syntax"). */
  hint?: string
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
  /**
   * Pre-supplied stdin values for demos that call input().  Required for any
   * runnable snippet using input() — without them the demo would receive an
   * empty string and crash (e.g. float('')).  The values are echoed into the
   * output alongside the prompt so the demo reads like a real terminal.
   */
  inputValues?: string[]
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
  /** Best score (out of 10) for progress-test lessons. */
  bestScore?: number
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
    bestScore: number | null
  }>
}
