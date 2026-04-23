/**
 * This service worker previously added COOP/COEP headers for cross-origin
 * isolation, but it caused Pyodide (the Python runtime) to hang at 0% because
 * the inherited COEP policy blocked importScripts() from the CDN.
 *
 * This version unregisters itself so browsers that already installed it are
 * cleaned up automatically on the next page load.
 */
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() =>
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => client.navigate(client.url))
      }),
    ),
  )
})
