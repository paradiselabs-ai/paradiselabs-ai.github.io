# GitHub Pages Cache Control Documentation

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
