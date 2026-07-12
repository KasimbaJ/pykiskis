// ─────────────────────────────────────────────────────────────────────────────
// Global API rate limiter (Cloudflare Pages middleware).
//
// Runs before every Pages Function.  Applies a coarse per-IP fixed-window limit
// to `/api/*` to blunt brute-force and scraping.  It is a SOFT limit: KV is
// eventually consistent, so counts can undershoot slightly under a burst — that
// is fine for abuse protection and keeps the hot path to a single KV read/write.
//
// DORMANT UNTIL CONFIGURED: if no `RATE_LIMIT` KV namespace is bound, the
// middleware does nothing and passes every request through.  To activate:
//   1. wrangler kv namespace create pykiskis-rate-limit
//   2. Add to wrangler.toml:
//        [[kv_namespaces]]
//        binding = "RATE_LIMIT"
//        id = "<the id from step 1>"
//   3. Redeploy.  (Optionally set RL_MAX / RL_WINDOW_SEC vars to tune.)
// ─────────────────────────────────────────────────────────────────────────────

interface Env {
  RATE_LIMIT?: KVNamespace
  /** Max requests per window per IP (default 120). */
  RL_MAX?: string
  /** Window length in seconds (default 60). */
  RL_WINDOW_SEC?: string
}

function tooMany(retryAfterSec: number): Response {
  return new Response(JSON.stringify({ error: 'Too many requests' }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfterSec),
    },
  })
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context
  const kv = env.RATE_LIMIT

  // Only guard the API, and only when a KV namespace is actually bound.
  const url = new URL(request.url)
  if (!kv || !url.pathname.startsWith('/api/')) return next()

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const max = Number(env.RL_MAX) || 120
  const windowSec = Number(env.RL_WINDOW_SEC) || 60

  const nowSec = Math.floor(Date.now() / 1000)
  const window = Math.floor(nowSec / windowSec)
  const key = `rl:${ip}:${window}`

  try {
    const current = Number(await kv.get(key)) || 0
    if (current >= max) {
      const retryAfter = (window + 1) * windowSec - nowSec
      return tooMany(retryAfter > 0 ? retryAfter : windowSec)
    }
    // Count this request.  TTL of 2 windows lets old keys expire on their own.
    await kv.put(key, String(current + 1), { expirationTtl: windowSec * 2 })
  } catch {
    // Never let a KV hiccup take down the API — fail open.
    return next()
  }

  return next()
}
