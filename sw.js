/* ═══════════════════════════════════════════════════
   HATUA v3.0 — Service Worker
   Offline-first PWA · Cache Strategy · Background Sync
═══════════════════════════════════════════════════ */

const CACHE_NAME = 'hatua-v3.0.0';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/app.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap'
];

/* ── Install: cache core assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[HATUA SW] Installing and caching core assets');
      return cache.addAll(CORE_ASSETS.filter(url => !url.startsWith('https://fonts')));
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => {
      console.log('[HATUA SW] Activated v3.0.0');
      return self.clients.claim();
    })
  );
});

/* ── Fetch: cache-first with network fallback ── */
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET, chrome-extension, and API calls
  if (request.method !== 'GET') return;
  if (request.url.includes('chrome-extension')) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, toCache));
        return response;
      }).catch(() => {
        // Offline fallback
        if (request.headers.get('Accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});

/* ── Push Notifications ── */
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'You have a new HATUA notification!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '🏃 Open HATUA' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'HATUA Fitness', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action !== 'dismiss') {
    event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
  }
});

/* ── Background Sync ── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-workouts') {
    event.waitUntil(syncWorkouts());
  }
});

async function syncWorkouts() {
  console.log('[HATUA SW] Background sync: uploading pending workouts');
  // In production: read from IndexedDB and POST to API
}
