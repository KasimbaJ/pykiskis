-- Migration: Classes + Assignments for the Teacher Dashboard.
--
-- Additive only — no change to existing tables. With no classes defined, the
-- dashboard behaves exactly as before (an "All students" view).
--
-- Apply with:
--   npx wrangler d1 execute pykiskis-db --file=schema-classes.sql --remote
-- (or via the Cloudflare D1 MCP, statement by statement).
--
-- Safe to run multiple times — CREATE ... IF NOT EXISTS throughout.

-- A teacher-owned class/group.
CREATE TABLE IF NOT EXISTS classes (
  id              TEXT PRIMARY KEY,           -- uuid
  name            TEXT NOT NULL,
  teacher_user_id TEXT NOT NULL,              -- Clerk id of the creating teacher
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Student membership in a class (join table — a student may be in many).
CREATE TABLE IF NOT EXISTS class_members (
  class_id TEXT NOT NULL,
  user_id  TEXT NOT NULL,                     -- student Clerk id
  PRIMARY KEY (class_id, user_id)
);

-- A piece of content assigned to a class, with an optional due date.
-- (Used from Phase 2 — created now so the migration is one file.)
CREATE TABLE IF NOT EXISTS assignments (
  id              TEXT PRIMARY KEY,           -- uuid
  class_id        TEXT NOT NULL,
  content_type    TEXT NOT NULL,              -- 'lesson' | 'test' | 'level'
  content_key     TEXT NOT NULL,              -- lesson_id / test lesson key / level id (string)
  title           TEXT NOT NULL,              -- display label
  due_date        TEXT,                       -- ISO date, nullable
  teacher_user_id TEXT NOT NULL,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_class_members_user  ON class_members(user_id);
CREATE INDEX IF NOT EXISTS idx_class_members_class ON class_members(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class   ON assignments(class_id);
