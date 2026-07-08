// Spelling guard — flags a small, unambiguous set of American spellings in
// LEARNER-FACING PROSE only (the course standardises on British English).
//
// Deliberately conservative to avoid false positives:
//   • scans prose fields only (never `code`, `expectedOutput`, `slug`, or the
//     chapter `color:` theme token);
//   • strips inline-code spans (`...`) first, so Python identifiers and methods
//     like `favorite_actor` or `.capitalize()` are never matched;
//   • flags only a curated list of words that are unambiguously prose.
//
// Run: npx tsx spell-guard.ts
import { chapters } from './src/data/basics/index'
import { localize, type LocalizedString } from './src/i18n'

// American -> British, prose-only, low false-positive.
const FLAGGED = /\b(analyze[ds]?|analyzing|normalize[ds]?|normalizing|capitalization|behaviors?|organize[ds]?|organizing)\b/gi

const strip = (s: string) => s.replace(/`[^`]*`/g, '') // drop inline-code spans

const hits: string[] = []
function check(where: string, value: LocalizedString | undefined) {
  if (value == null) return
  const text = strip(localize(value, 'en'))
  const found = text.match(FLAGGED)
  if (found) hits.push(`${where}: ${[...new Set(found)].join(', ')}`)
}

for (const ch of chapters) {
  check(`ch${ch.id} title`, ch.title)
  check(`ch${ch.id} subtitle`, ch.subtitle)
  check(`ch${ch.id} description`, ch.description)
  for (const m of ch.modules) {
    const mw = `ch${ch.id}/${m.slug}`
    check(`${mw} summary`, m.summary)
    for (const l of m.lessons) {
      const lw = `${mw}/${l.slug}`
      check(`${lw} title`, l.title)
      if (l.type === 'theory') {
        for (const b of l.blocks) {
          if (b.kind === 'paragraph' || b.kind === 'note' || b.kind === 'heading') check(lw, b.text)
          else if (b.kind === 'list') b.items.forEach((it) => check(lw, it))
          else if (b.kind === 'figure' || b.kind === 'visualize') check(lw, b.caption)
        }
      } else if (l.type === 'quiz') {
        check(lw, l.question)
        l.options.forEach((o) => check(lw, o.text))
        check(lw, l.explanation)
      } else if (l.type === 'exercise') {
        check(lw, l.problemDescription)
      } else if (l.type === 'recap') {
        check(lw, l.congratsTitle)
        check(lw, l.summary)
      } else if (l.type === 'progress-test') {
        check(lw, l.intro)
        for (const q of l.questionBanks.flat()) {
          check(`${lw}/${q.id}`, q.prompt)
          if (q.qType === 'mcq') q.options.forEach((o) => check(`${lw}/${q.id}`, o.text))
          if ('explanation' in q) check(`${lw}/${q.id}`, q.explanation)
        }
      }
    }
  }
}

if (hits.length) {
  console.log(`\n✗ ${hits.length} American spelling(s) in prose (course uses British English):\n`)
  hits.forEach((h, i) => console.log(`${i + 1}. ${h}`))
  console.log('\nFix the prose (leave Python identifiers/methods and slugs alone).\n')
  process.exit(1)
} else {
  console.log('\n✓ Spelling guard: no American spellings in learner-facing prose.\n')
}
