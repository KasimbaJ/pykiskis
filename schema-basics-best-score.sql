-- Migration: add best_score column to lesson_progress for progress-test lessons.
--
-- best_score is an integer 0-10 representing the best score the learner
-- achieved on a progress-test lesson.  NULL for other lesson types.
--
-- Apply with:
--   npx wrangler d1 execute pykiskis-db --file=schema-basics-best-score.sql --remote
--
-- D1 (SQLite) accepts ALTER TABLE ... ADD COLUMN if the column doesn't exist,
-- but it'll error on re-run.  Use the catch-and-ignore pattern by checking
-- pragma table_info before running.  Easiest: just run once.

ALTER TABLE lesson_progress ADD COLUMN best_score INTEGER;
