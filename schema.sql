CREATE TABLE IF NOT EXISTS students (
  user_id       TEXT    PRIMARY KEY,
  name          TEXT    NOT NULL DEFAULT '',
  current_streak INTEGER NOT NULL DEFAULT 0,
  best_streak   INTEGER NOT NULL DEFAULT 0,
  last_active_at TEXT,
  last_streak_date TEXT,
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS level_progress (
  user_id      TEXT    NOT NULL,
  level_id     INTEGER NOT NULL,
  completed    INTEGER NOT NULL DEFAULT 0,
  attempts     INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT,
  best_code    TEXT,
  PRIMARY KEY (user_id, level_id)
);

CREATE INDEX IF NOT EXISTS idx_lp_user ON level_progress(user_id);
