/* ════════════════════════════════════════
   SERVICE WORKER – John Company 2E Spielführer
   Offline-first caching strategy
   ════════════════════════════════════════ */

const CACHE_NAME = 'jc2e-v2';
const PRECACHE = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icon.png',
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  // Cache-first for same-origin, network-first for others
  if (evt.request.url.startsWith(self.location.origin)) {
    evt.respondWith(
      caches.match(evt.request).then(cached => {
        if (cached) return cached;
        return fetch(evt.request).then(resp => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(evt.request, copy));
          }
          return resp;
        }).catch(() => caches.match('./index.html'));
      })
    );
  }
});
