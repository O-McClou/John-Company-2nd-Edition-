/* ═══════════════════════════════════════════════════════
   John Company 2E – Spielführer
   Service Worker v1.3
   Strategie: Cache First mit Netzwerk-Fallback
═══════════════════════════════════════════════════════ */

const CACHE_NAME = 'jc2e-v1.7';

// Alle Dateien, die offline verfügbar sein sollen
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './icon-192.png',
  './icon-512.png'
];

/* ── INSTALL: Cache befüllen ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache wird befüllt…');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation abgeschlossen');
        // Sofort aktivieren, ohne auf alten SW zu warten
        return self.skipWaiting();
      })
      .catch(err => {
        console.warn('[SW] Cache-Fehler beim Install:', err);
      })
  );
});

/* ── ACTIVATE: Alte Caches entfernen ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Alter Cache gelöscht:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Aktivierung abgeschlossen');
        // Sofort alle Clients übernehmen
        return self.clients.claim();
      })
  );
});

/* ── FETCH: Cache First, Netzwerk als Fallback ── */
self.addEventListener('fetch', event => {
  // Nur GET-Anfragen abfangen
  if (event.request.method !== 'GET') return;

  // Nur Anfragen für unsere eigene Domain
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Cache-Hit: sofort zurückgeben
          // Im Hintergrund aktualisieren (Stale-While-Revalidate)
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseClone));
              }
              return networkResponse;
            })
            .catch(() => {
              // Netzwerk nicht verfügbar – kein Problem, Cache wird verwendet
            });
          return cachedResponse;
        }

        // Cache-Miss: Netzwerk versuchen und in Cache speichern
        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
              return networkResponse;
            }
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone));
            return networkResponse;
          })
          .catch(err => {
            console.warn('[SW] Netzwerk nicht verfügbar:', err);
            // Falls index.html angefragt wird, aus Cache nehmen
            if (event.request.url.includes('index.html') || event.request.url.endsWith('/')) {
              return caches.match('./index.html');
            }
          });
      })
  );
});

/* ── MESSAGE: Update-Nachricht empfangen ── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
