-- Migration for the Python Basics Learning Path.
--
-- Adds a separate table for lesson-level progress on the chapter-based track.
-- Keyed by a composite string lesson_id (e.g. "introduction.get-started.hello-world")
-- rather than a numeric id, so it can't collide with level_progress.level_id.
--
-- Apply with:
--   npx wrangler d1 execute pykiskis-db --file=schema-basics.sql --remote
--
-- Safe to run multiple times — CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id         TEXT    NOT NULL,
  lesson_id       TEXT    NOT NULL,    -- e.g. "introduction.get-started.hello-world"
  completed       INTEGER NOT NULL DEFAULT 0,
  attempts        INTEGER NOT NULL DEFAULT 0,
  visited_at      TEXT,
  best_code       TEXT,                -- exercise lessons only
  selected_option TEXT,                -- quiz lessons only
  PRIMARY KEY (user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_user ON lesson_progress(user_id);
