# D1 backup & restore runbook

The production database is Cloudflare **D1** (`pykiskis-db`, binding `DB`). D1
keeps its own point-in-time recovery, but we also take our own nightly logical
backups so a restore never depends on a single provider mechanism and we can
diff or seed a local copy.

## Automated nightly backup

`.github/workflows/d1-backup.yml` runs every night (02:17 UTC) and on manual
dispatch. It exports the whole database to `pykiskis-db-<date>.sql` and stores it
as a GitHub Actions **artifact** with 30-day retention.

### One-time setup

The workflow reuses the repo secrets the deploy job already uses:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` — **must include D1 read/export permission.** The
  Pages-deploy token may not. If a run fails with a permissions error, create a
  token with *Account → D1 → Edit* (or add D1 to the existing token) and update
  the secret.

### Run it now

GitHub → Actions → **D1 backup** → *Run workflow*. When it finishes, the
`.sql` file is on the run page under **Artifacts**.

### Verify a backup

Download the artifact and load it into a throwaway local D1 to confirm it
restores cleanly:

```bash
wrangler d1 execute pykiskis-db --local --file=pykiskis-db-2026-07-13.sql
wrangler d1 execute pykiskis-db --local --command="SELECT COUNT(*) FROM students;"
```

## Manual backup

```bash
wrangler d1 export pykiskis-db --remote --output backup.sql
```

Add `--no-data` for schema-only, or `--table <name>` for a single table.

## Restore

⚠️ Restoring writes rows into the target database. Restore into a **new** or
**empty** database first and verify, then cut over — do not blind-restore over
live data.

```bash
# into a fresh DB (recommended)
wrangler d1 create pykiskis-db-restore
wrangler d1 execute pykiskis-db-restore --remote --file=backup.sql
# …verify counts / spot-check, then repoint the binding in wrangler.toml
```

## Offsite copies (optional, later)

GitHub artifacts expire after 30 days. For longer retention, extend the workflow
to also push the `.sql` to R2 or another bucket. Not required for launch.
