// Service Worker for GLUE Website
// Version: 1.1.0

const CACHE_NAME = 'glue-cache-v1';

// Assets to pre-cache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/images/glue.svg',
  '/images/glue-logo.webp',
  '/fonts/material-symbols.woff2',
  '/fonts/material-icons.css'
];

// Installation event - cache critical files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Pre-caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch(error => {
        console.error('Pre-caching failed:', error);
      })
  );
});

// Activation event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  // Claim clients to ensure the service worker controls all pages immediately
  event.waitUntil(self.clients.claim());
  
  // Clean up outdated caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Helper function to detect brotli/gzip support
function supportsCompression(request) {
  const acceptEncoding = request.headers.get('accept-encoding') || '';
  return acceptEncoding.includes('br') || acceptEncoding.includes('gzip');
}

// Helper function to determine if a request is for an asset that should be cached
function isAssetRequest(url) {
  // Get the file extension
  const fileExtension = url.pathname.split('.').pop().toLowerCase();
  
  // List of asset extensions to cache
  const assetExtensions = [
    'js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 
    'woff', 'woff2', 'ttf', 'eot', 'ico', 'json'
  ];
  
  return assetExtensions.includes(fileExtension);
}

// Detect if this is an API request
function isAPIRequest(url) {
  return url.pathname.startsWith('/api/');
}

// Fetch event - custom caching strategies based on request type
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Handle asset requests with cache-first strategy
  if (isAssetRequest(requestUrl)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network and cache
        return fetch(event.request).then(response => {
          // Only cache valid responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response as it can only be used once
          const responseToCache = response.clone();
          
          // Cache the fetched response
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        }).catch(error => {
          console.error('Fetch failed:', error);
          // Show fallback content for images or other assets
          if (event.request.destination === 'image') {
            return caches.match('/images/fallback.png');
          }
          throw error;
        });
      })
    );
    return;
  }
  
  // For API requests, use network-only strategy
  if (isAPIRequest(requestUrl)) {
    event.respondWith(
      fetch(event.request).catch(error => {
        console.error('API fetch failed:', error);
        return new Response(JSON.stringify({
          error: 'Network connection error',
          offline: true
        }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }
  
  // For HTML pages, use network-first strategy
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response as it can only be used once
          const responseToCache = response.clone();
          
          // Cache the latest version
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        })
        .catch(error => {
          console.log('Fetch failed; returning offline page instead.', error);
          
          // When offline, try to return cached page
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If no cache exists for this URL, serve the offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  // Default strategy: stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response immediately if available
      if (cachedResponse) {
        // Revalidate the cache in the background
        fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response and update the cache
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }).catch(error => {
          console.error('Background fetch failed:', error);
        });
        
        return cachedResponse;
      }
      
      // If not cached, fetch from network
      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone the response and store in cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    })
  );
}); 