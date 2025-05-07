
// Service worker for Progressive Web App functionality
const CACHE_NAME = 'geovision-ai-miner-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico'
];

// Install the service worker and cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Don't cache API requests or dynamic content
                if (!event.request.url.includes('/api/') && 
                    !event.request.url.includes('?') &&
                    event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });
            
            return response;
          });
      })
  );
});

// Update the service worker and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for pending actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-pending-actions') {
    event.waitUntil(syncPendingActions());
  }
});

// Function to sync pending actions
async function syncPendingActions() {
  try {
    // In a real app, this would use IndexedDB to get pending actions
    // and submit them to your server
    console.log('Background sync: processing pending actions');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}
