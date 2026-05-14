import type { Chapter } from '../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 1: Introduction
//
// Full content will be transcribed from the source PDF in a follow-up commit.
// For now this is a skeleton with the 10 module slugs and a single placeholder
// lesson in each, so routing and navigation can be validated end-to-end.
// ─────────────────────────────────────────────────────────────────────────────

export const ch1: Chapter = {
  id: 1,
  slug: 'introduction',
  title: 'Introduction',
  subtitle: 'Get started with Python',
  description:
    'Welcome to Python! In this chapter you will write your first program, ' +
    'meet strings and numbers, learn about variables and arithmetic, and read ' +
    'input from the user.',
  color: 'indigo',
  modules: [
    {
      slug: 'get-started',
      title: 'Get Started',
      summary: 'Run your first Python program.',
      lessons: [
        {
          slug: 'placeholder',
          title: 'Coming soon',
          type: 'theory',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Lesson content will appear here once Chapter 1 is fully transcribed from the source material.',
            },
          ],
        },
      ],
    },
    { slug: 'numbers-and-strings',  title: 'Numbers and Strings',  lessons: [] },
    { slug: 'comments',             title: 'Comments',             lessons: [] },
    { slug: 'variables',            title: 'Variables',            lessons: [] },
    { slug: 'output',               title: 'Output',               lessons: [] },
    { slug: 'arithmetic-operators', title: 'Arithmetic Operators', lessons: [] },
    { slug: 'data-conversion',      title: 'Data Conversion',      lessons: [] },
    { slug: 'get-user-input',       title: 'Get User Input',       lessons: [] },
    { slug: 'introduction-examples', title: 'Introduction Examples', lessons: [] },
    { slug: 'recap',                title: 'Recap',                lessons: [] },
  ],
}
