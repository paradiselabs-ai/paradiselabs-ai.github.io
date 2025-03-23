// Service Worker for cache control
const CACHE_NAME = 'glue-cache-v1';
const BASE_URL = '/';
const STATIC_ASSETS = [
  BASE_URL,
  BASE_URL + 'index.html',
  // Main entry points
  '/assets/backend.CMRMkKTU.js',
  '/assets/components.1JGZsXUz.js',
  '/assets/documentation.CeQ1-Nna.css',
  '/assets/documentation.CsD88AgW.js',
  '/assets/home.CkXB7kzr.css',
  '/assets/home._0EMf26g.js',
  '/assets/index.DgeR5L2D.js',
  '/assets/index.DMX_ADYF.css',
  '/assets/react-core.CF-4sVlY.js',
  '/assets/react-full.hLWEX48c.js',
  '/assets/state.BBBb-3Ib.js',
  '/assets/ui-libs.1V-OyM-R.js',
  '/assets/ui-libs.BzBcDO9z.css',
  '/assets/vendor.CBJAbCk_.js',
  '/assets/workflow.CBP4IdCp.js',
  '/assets/workflow.ClaqlwTj.css'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip browser extensions and third-party requests
  if (url.origin !== self.location.origin) return;
  
  // Cache-first for assets with hash filenames (immutable content)
  if (url.pathname.match(/\/assets\/.*\.[a-f0-9]{8}\./)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }
  
  // Network-first for HTML files
  if (url.pathname.endsWith('.html') || url.pathname === BASE_URL) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Ensure correct Content-Type header for HTML
          if (!response.headers.get('Content-Type') || 
              !response.headers.get('Content-Type').includes('text/html')) {
            const newHeaders = new Headers(response.headers);
            newHeaders.set('Content-Type', 'text/html; charset=utf-8');
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Stale-while-revalidate for other assets
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(response => {
        // Update cache
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
        });
        return response;
      });
      
      return cachedResponse || fetchPromise;
    })
  );
});
