// Align service worker: the app opens instantly and works offline after the
// first visit. Pages are network-first (so a new deploy shows up on the next
// open); built assets and images are cache-first (their names change when
// they change). Other origins (Supabase) are never cached.
const CACHE = 'align-v1'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k)
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== self.location.origin) return

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const res = await fetch(req)
        const c = await caches.open(CACHE)
        c.put('./', res.clone())
        return res
      } catch {
        return (await caches.match('./')) || Response.error()
      }
    })())
    return
  }

  e.respondWith((async () => {
    const hit = await caches.match(req)
    if (hit) return hit
    const res = await fetch(req)
    if (res.ok && (url.pathname.includes('/assets/') || url.pathname.includes('/img/') || url.pathname.includes('/icons/'))) {
      const c = await caches.open(CACHE)
      c.put(req, res.clone())
    }
    return res
  })())
})
