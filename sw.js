/* ═══════════════════════════════════════════════════════
   John Company 2E – Spielführer
   Service Worker v1.4
   Strategie: Cache First mit Netzwerk-Fallback
═══════════════════════════════════════════════════════ */

const CACHE_NAME = 'jc2e-v1.4';
// ↑ WICHTIG: Version erhöht von v1.3 → v1.4
// Erzwingt neuen Cache und bricht den Deployment-Deadlock:
// Altes sw.js (v1.3) ist auf iPhones aktiv und bedient alte kaputte Dateien.
// Neue Cache-Version stellt sicher, dass alle Assets neu geladen werden.

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
        // Bug 6 Fix: skipWaiting() ist zurück – jetzt aber SICHER.
        //
        // Warum war es vorher gefährlich?
        //   skipWaiting() → SW aktiviert → controllerchange feuert → index.html
        //   rief window.location.reload() → iOS-PWA fror ein (Blank Screen).
        //
        // Warum ist es jetzt sicher?
        //   index.html prüft hadControllerOnLoad VOR dem load-Event (bei
        //   Script-Parse-Zeit). Nur wenn beim Seitenaufruf bereits ein
        //   Controller aktiv war (= echter Update-Fall), wird reload()
        //   aufgerufen. Beim Erst-Install ist controller=null →
        //   hadControllerOnLoad=false → kein reload → kein Einfrieren.
        //
        // Warum brauchen wir es?
        //   Ohne skipWaiting() landet der neue SW im Wartezustand. Da der
        //   "Jetzt aktualisieren"-Button in der alten Version kaputt war
        //   (sendete an den falschen SW), kommen Nutzer nie aus dem alten
        //   kaputten Code heraus – Deployment-Deadlock.
        self.skipWaiting();
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
        // Bug 4 Fix: clients.claim() wurde entfernt.
        // clients.claim() löst beim Erst-Install sofort ein controllerchange-Event aus,
        // weil kein vorheriger SW vorhanden ist und der neue SW die Wartephase überspringt.
        // Dieses controllerchange friert iOS-PWAs ein – selbst ohne skipWaiting().
        // Der SW übernimmt neue Clients jetzt beim nächsten Seitenaufruf automatisch.
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
