/* ══════════════════════════════════════════════════════════════
   ENTRE TODOS — Service Worker
   Estrategia: Cache-first para assets estáticos, network-first para HTML
══════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'entre-todos-v1';
const STATIC_ASSETS = [
  '/entre-todos-preview/app.html',
  '/entre-todos-preview/index.html',
  '/entre-todos-preview/consulta-popular-cuba.html',
  '/entre-todos-preview/propuestas-transicion-cuba.html',
  '/entre-todos-preview/candidaturas-cuba.html',
  '/entre-todos-preview/entre-todos-logo.png',
  '/entre-todos-preview/manifest.json'
];

/* ── INSTALL: precache assets esenciales ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

/* ── ACTIVATE: limpiar caches viejos ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ── FETCH: network-first para HTML, cache-first para assets ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo manejar mismo origen
  if (url.origin !== location.origin) return;

  if (event.request.destination === 'document') {
    // HTML: network-first, fallback a cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Assets: cache-first
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        });
      })
    );
  }
});
