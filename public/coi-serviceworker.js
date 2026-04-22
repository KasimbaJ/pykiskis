/**
 * Cross-Origin Isolation Service Worker
 *
 * Intercepts navigation requests and injects the two headers required for
 * SharedArrayBuffer + Atomics (needed for blocking Python input()):
 *   Cross-Origin-Opener-Policy:   same-origin
 *   Cross-Origin-Embedder-Policy: credentialless
 *
 * This is a reliable fallback for when server-side _headers rules don't
 * apply (e.g. Cloudflare Pages SPA rewrites).
 */

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (event) => {
  // Only intercept same-origin navigation requests (page loads / route changes).
  // All other requests (API calls, Clerk, CDN assets, etc.) pass through untouched.
  if (event.request.mode !== 'navigate') return
  if (!event.request.url.startsWith(self.location.origin + '/')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const headers = new Headers(response.headers)
        headers.set('Cross-Origin-Opener-Policy', 'same-origin')
        headers.set('Cross-Origin-Embedder-Policy', 'credentialless')
        return new Response(response.body, {
          status:     response.status,
          statusText: response.statusText,
          headers,
        })
      })
      .catch(() => fetch(event.request)), // network error → pass through
  )
})
