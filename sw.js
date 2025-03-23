// Service Worker for cache control
const CACHE_NAME = 'glue-cache-v1';
const BASE_URL = '/';
const STATIC_ASSETS = [
  BASE_URL,
  BASE_URL + 'index.html',
  // Main entry points
  '/assets/backend.QuUChf_h.js',
  '/assets/components.CAIqTpDd.js',
  '/assets/documentation.CeQ1-Nna.css',
  '/assets/documentation.DM07_CSQ.js',
  '/assets/home.CkXB7kzr.css',
  '/assets/home.IZqz74kX.js',
  '/assets/index.Cxu_marm.js',
  '/assets/index.DMX_ADYF.css',
  '/assets/react-core.BQPeW7rL.js',
  '/assets/react-full.BKSoK5FJ.js',
  '/assets/state.DF06KoBk.js',
  '/assets/ui-libs.BvCUr5oq.css',
  '/assets/ui-libs.CGYtS8Ml.js',
  '/assets/vendor.BtI3oo2L.js',
  '/assets/workflow.ClaqlwTj.css',
  '/assets/workflow.Q9Vp1-I6.js'
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
      fetch(event.request).catch(() => caches.match(event.request))
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
