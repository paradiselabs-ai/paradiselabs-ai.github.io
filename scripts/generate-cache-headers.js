import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * This script generates cache configuration files for GitHub Pages deployment
 */

// Path to the dist directory
const distDir = path.resolve(__dirname, '..', 'dist');

// Get the base URL from environment or default to '/'
const baseUrl = process.env.BASE_URL || '/';

console.log('Starting cache headers configuration for GitHub Pages...');
console.log(`Dist directory: ${distDir}`);
console.log(`Base URL: ${baseUrl}`);

// Create the .nojekyll file for GitHub Pages
try {
  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory does not exist. Build may have failed.');
    process.exit(1);
  }
  
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  console.log('✅ Created .nojekyll file for GitHub Pages');
} catch (err) {
  console.error('❌ Failed to create .nojekyll file:', err);
}

// Create a documentation file about GitHub Pages caching
try {
  const cacheInfoContent = `# GitHub Pages Cache Control Documentation

GitHub Pages does not support custom HTTP headers configuration. 
This project implements a service worker-based caching strategy instead.

## Cache Strategy

- HTML files: No cache, to ensure fresh content (using network-first strategy)
- JavaScript/CSS with hash in filename: Long-term cache (1 year)
- Other static assets: Short-term cache with revalidation

## Implementation

The service worker (sw.js) implements these strategies:
1. Cache-first for hashed assets (immutable content)
2. Network-first for HTML files
3. Stale-while-revalidate for other assets

## Fingerprinting

The build system (Vite) automatically adds content hashes to filenames
for proper cache invalidation when content changes.
`;

  fs.writeFileSync(path.join(distDir, 'cache-control-docs.md'), cacheInfoContent);
  console.log('✅ Created cache control documentation file');
} catch (err) {
  console.error('❌ Failed to create cache documentation:', err);
}

// Create a simple service worker for browser cache control
try {
  // Check if assets directory exists
  const assetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.warn('⚠️ Assets directory not found. Using empty assets list.');
    var assetFiles = '';
  } else {
    // Get a list of asset files - handle potential errors
    try {
      var assetFiles = fs.readdirSync(assetsDir)
        .filter(file => file.match(/\.js$|\.css$/))
        .map(file => `'${baseUrl}assets/${file}'`).join(',\n  ');
    } catch (err) {
      console.warn('⚠️ Could not read assets directory. Using empty assets list.');
      var assetFiles = '';
    }
  }
    
  const swContent = `// Service Worker for cache control
const CACHE_NAME = 'glue-cache-v1';
const BASE_URL = '${baseUrl}';
const STATIC_ASSETS = [
  BASE_URL,
  BASE_URL + 'index.html',
  // Main entry points
  ${assetFiles}
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
  if (url.pathname.match(/\\/assets\\/.*\\.[a-f0-9]{8}\\./)) {
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
`;

  fs.writeFileSync(path.join(distDir, 'sw.js'), swContent);
  console.log('✅ Created service worker for browser cache control');
  
  // Add service worker registration to index.html
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ index.html not found. Cannot add service worker registration.');
  } else {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    if (!indexHtml.includes('serviceWorker')) {
      indexHtml = indexHtml.replace('</body>', `
  <!-- Service worker registration for cache control -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('${baseUrl}sw.js')
          .then(reg => console.log('Service worker registered'))
          .catch(err => console.error('Service worker registration failed:', err));
      });
    }
  </script>
</body>`);
      
      fs.writeFileSync(indexHtmlPath, indexHtml);
      console.log('✅ Added service worker registration to index.html');
      
      // Also update the 200.html and 404.html files if they exist
      const html200Path = path.join(distDir, '200.html');
      const html404Path = path.join(distDir, '404.html');
      
      if (fs.existsSync(html200Path)) {
        fs.writeFileSync(html200Path, indexHtml);
        console.log('✅ Updated 200.html with service worker registration');
      }
      
      if (fs.existsSync(html404Path)) {
        fs.writeFileSync(html404Path, indexHtml);
        console.log('✅ Updated 404.html with service worker registration');
      }
    } else {
      console.log('ℹ️ Service worker registration already exists in index.html');
    }
  }
} catch (err) {
  console.error('❌ Failed to set up service worker:', err);
}

console.log('✅ Cache headers configuration complete for GitHub Pages deployment'); 