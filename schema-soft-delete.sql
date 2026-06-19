-- Soft-delete support for students (GDPR / removing a student).
-- A teacher action marks the student deleted and purges their learning data
-- (lesson_progress + level_progress). The row is retained (name kept) but
-- excluded everywhere via `deleted_at IS NULL`. Clerk account is NOT touched.
--
-- Apply to prod D1 once:  (deleted_at is NULL for all existing/active students)
ALTER TABLE students ADD COLUMN deleted_at TEXT;
