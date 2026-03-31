/* ═══════════════════════════════════════════════════════════════════
   sw.js – Service Worker für Getränke-Tracker PWA  (V51)
   ─────────────────────────────────────────────────────────────────
   URSACHEN-ANALYSE (endgültig):

   1) iOS evicts den SW-Cache aggressiv (nach 7 Tagen ohne Nutzung,
      bei Speicherdruck, nach Safari-Cache-Löschung). Der SW ist noch
      registriert, sein Cache ist aber leer.

   2) Wenn der Cache leer ist und networkFetch hängt (kein Netz,
      langsames GitHub-CDN), resolved event.respondWith() NIEMALS
      → App zeigt dauerhaft weißen Bildschirm / friert ein.

   3) WebKit-Bug iOS 16.4+: Wenn die an respondWith() übergebene
      Promise rejected wird (statt resolved), wirft Safari intern
      "FetchEvent.respondWith received an error: TypeError: Internal
      error" → weißer Bildschirm ohne JS-Fehlermeldung.

   LÖSUNG V51:
   ① respondWith() ist komplett in try/catch gewrappt → kann nie
      eine rejected Promise empfangen (WebKit-Bug-Fix)
   ② networkFetch hat einen 8s-Timeout via Promise.race()
   ③ Wenn Cache LEER + Netz-Timeout: sofortige Offline-Seite mit
      Reload-Button (kein ewiges Hängen mehr)
   ④ Bei Cache-Treffer: sofort ausliefern, Netz im Hintergrund
      aktualisieren (stale-while-revalidate)
   ⑤ skipWaiting() immer sofort → neuer SW übernimmt zuverlässig
   ⑥ controllerchange-Guard in index.html verhindert Reload-Schleife

   UPDATE-STRATEGIE (stabil ab V49+):
   Install  → cachen + skipWaiting()
   Activate → alte Caches löschen + clients.claim()
   Fetch    → Cache-First + Netz-Revalidate + Timeout-Schutz
   ═══════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'tracker-v51';
const ASSETS = ['./', './index.html'];

/* ── Install ──────────────────────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())   // auch bei Cache-Fehler übernehmen
  );
});

/* ── Activate ─────────────────────────────────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Hilfsfunktion: fetch mit Timeout ─────────────────────────────── */
function fetchWithTimeout(request, ms) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('SW fetch timeout')), ms)
    )
  ]);
}

/* ── Offline-Fallback-Seite ───────────────────────────────────────── */
function offlinePage() {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>Tracker – Offline</title>
<style>
  body{font-family:Georgia,serif;background:#06101E;color:#EDE4CC;
       display:flex;flex-direction:column;align-items:center;
       justify-content:center;height:100vh;margin:0;text-align:center;padding:20px;box-sizing:border-box}
  h1{color:#C9A84C;font-size:22px;margin-bottom:10px}
  p{color:#8DAFC8;font-size:14px;line-height:1.6;margin-bottom:24px}
  button{background:#C9A84C;color:#06101E;border:none;padding:14px 28px;
         border-radius:10px;font-family:Georgia,serif;font-size:16px;
         font-weight:bold;cursor:pointer;touch-action:manipulation}
</style>
</head>
<body>
  <h1>⚓ Keine Verbindung</h1>
  <p>Der Tracker konnte nicht geladen werden.<br>Bitte stelle eine Internetverbindung her<br>und tippe auf Neu laden.</p>
  <button onclick="location.reload()">↺ Neu laden</button>
</body>
</html>`;
  return new Response(html, {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

/* ── Fetch ────────────────────────────────────────────────────────── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  /* URL normalisieren: iOS PWA startet mit "/" → auf index.html mappen */
  let requestUrl = event.request.url;
  if (requestUrl.endsWith('/')) requestUrl += 'index.html';

  /* KRITISCH: respondWith() darf NIEMALS eine rejected Promise erhalten
     (WebKit-Bug iOS 16.4+: TypeError: Internal error → weißer Bildschirm).
     Daher: alles in try/catch, alle Pfade resolven immer. */
  event.respondWith((async () => {
    try {
      const cached = await caches.match(requestUrl);

      if (cached) {
        /* Cache-Treffer: sofort ausliefern, Netz im Hintergrund aktualisieren */
        event.waitUntil(
          fetchWithTimeout(event.request, 8000)
            .then(response => {
              if (response && response.status === 200 && response.type === 'basic') {
                return caches.open(CACHE_NAME)
                  .then(cache => cache.put(requestUrl, response));
              }
            })
            .catch(() => { /* Hintergrund-Update fehlgeschlagen – ignorieren */ })
        );
        return cached;
      }

      /* Kein Cache-Treffer: Netz mit Timeout versuchen */
      try {
        const response = await fetchWithTimeout(event.request, 8000);
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(requestUrl, clone));
        }
        return response;
      } catch (_) {
        /* Netz-Timeout oder Fehler → Offline-Seite zeigen */
        return offlinePage();
      }

    } catch (err) {
      /* Absoluter Fallback – verhindert rejected Promise an respondWith() */
      console.warn('[SW] Fetch-Handler Fehler:', err);
      return offlinePage();
    }
  })());
});

/* ── Message-Handler ─────────────────────────────────────────────── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
