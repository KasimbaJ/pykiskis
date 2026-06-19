// ─────────────────────────────────────────────────────────────────────────────
// POST /api/client-error — best-effort client crash logging (no third party).
//
// The in-app ErrorBoundary posts here when a render crashes. We simply write the
// payload to the Cloudflare function logs (visible via `wrangler pages
// deployment tail` or the dashboard) — no external telemetry service, no PII
// leaving Cloudflare. Unauthenticated (the boundary fires before auth is known),
// so the body is size-capped and never trusted beyond logging.
// ─────────────────────────────────────────────────────────────────────────────

const MAX_BODY = 16 * 1024 // 16 KB — plenty for a message + two stacks

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const text = (await request.text()).slice(0, MAX_BODY)
    // Log as a single line so it's easy to find/grep in the function logs.
    console.error('[client-error]', text)
  } catch {
    console.error('[client-error] (unreadable body)')
  }
  // Always 204 — logging is best-effort and must never surface an error.
  return new Response(null, { status: 204 })
}
