// Service Worker for lightning-fast caching
const CACHE_NAME = 'dollarmento-v2';
const CRITICAL_CACHE = 'critical-v2';

// Critical resources to cache immediately
const criticalUrls = [
  '/',
  '/financial-calculators/',
  '/learning/',
  '/investment-market-menu/',
  '/logo.png'
];

// Static assets to cache
const staticUrls = [
  '/_next/static/css/',
  '/_next/static/chunks/',
  '/_next/static/media/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CRITICAL_CACHE).then(cache => cache.addAll(criticalUrls)),
      caches.open(CACHE_NAME).then(cache => cache.addAll(staticUrls))
    ])
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache-first strategy for static assets
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
    return;
  }
  
  // Network-first for pages with fallback to cache
  event.respondWith(
    fetch(event.request).then(response => {
      const responseClone = response.clone();
      caches.open(CRITICAL_CACHE).then(cache => {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});