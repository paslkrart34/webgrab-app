/**
 * WebGrab Service Worker
 *
 * Caching strategy:
 * - App shell (index.html): cache-first with network fallback
 * - Images from articles: cache-first
 * - Proxy requests: network-first with cache fallback
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `webgrab-${CACHE_VERSION}`;

/**
 * Install event: cache the app shell
 */
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Cache the main app shell
            return cache.addAll([
                './',
                './index.html',
                './manifest.json'
            ]).catch((error) => {
                // It's okay if some files don't exist yet
                console.warn('[SW] Cache addAll warning:', error.message);
                return cache.add('./index.html');
            });
        })
    );

    // Skip waiting - activate immediately
    self.skipWaiting();
});

/**
 * Activate event: clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // Claim all clients immediately
    self.clients.claim();
});

/**
 * Fetch event: implement caching strategies
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Strategy 1: Cache-first for app shell (HTML, manifest)
    if (url.pathname === '/' || url.pathname.endsWith('index.html') || url.pathname.endsWith('manifest.json')) {
        event.respondWith(
            caches.match(request).then((response) => {
                if (response) {
                    return response;
                }
                return fetch(request).then((response) => {
                    // Only cache successful responses
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                }).catch(() => {
                    // Return cached version if network fails
                    return caches.match(request);
                });
            })
        );
        return;
    }

    // Strategy 2: Cache-first for images and large media
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then((response) => {
                if (response) {
                    return response;
                }
                return fetch(request).then((response) => {
                    // Cache the image for offline viewing
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                }).catch(() => {
                    // Return a placeholder or cached image if network fails
                    return new Response(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect fill="#2a2a2a" width="600" height="400"/><text x="50%" y="50%" font-size="18" fill="#999" text-anchor="middle" dominant-baseline="central">Image not available offline</text></svg>`,
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                });
            })
        );
        return;
    }

    // Strategy 3: Network-first for API calls and proxy requests
    // (These are typically to external URLs or the CORS proxy)
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful responses for offline fallback
                if (response && response.status === 200 && request.method === 'GET') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // On network failure, try the cache
                return caches.match(request).then((response) => {
                    if (response) {
                        return response;
                    }
                    // If nothing in cache and network failed, return offline message
                    return new Response(
                        'The requested resource is not available offline.',
                        { status: 503, statusText: 'Service Unavailable' }
                    );
                });
            })
    );
});

/**
 * Message handler for cache management from the app
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
