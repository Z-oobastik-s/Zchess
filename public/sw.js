const CACHE_VERSION = '__BUILD_VERSION__';
const CACHE_NAME = `zchess-cache-v${CACHE_VERSION}`;
const BASE = '/Zchess/';

const PRECACHE_URLS = [
  `${BASE}`,
  `${BASE}index.html`,
  `${BASE}manifest.json`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name.startsWith('zchess-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.pathname.startsWith(BASE)) return;

  if (
    request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname === BASE ||
    url.pathname === `${BASE}index.html`
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.includes('/assets/') || url.pathname.includes('/version.json')) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.includes('sw.js')) {
    event.respondWith(networkOnly(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match(`${BASE}index.html`);
  }
}

async function networkOnly(request) {
  return fetch(request);
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}
