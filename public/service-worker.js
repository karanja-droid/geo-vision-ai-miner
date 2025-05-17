
// Service worker for Progressive Web App functionality
const CACHE_NAME = 'geovision-ai-miner-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/dataset-management',
  '/interactive-map',
  '/analysis'
];

// Assets to cache for offline usage
const assetsToCache = [
  '/assets/logo.svg',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png'
];

// Map tile URLs to cache (example patterns)
const mapTilesToCache = [
  // Google Maps tile patterns
  /.*maps\.googleapis\.com\/maps\/api\/js.*/,
  /.*maps\.googleapis\.com\/maps-api-v3\/api\/js.*/,
  /.*maps\.gstatic\.com\/mapfiles.*/,
  // Mapbox tile patterns
  /.*api\.mapbox\.com\/styles.*/,
  /.*api\.tiles\.mapbox\.com\/v4.*/
];

// Install the service worker and cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll([...urlsToCache, ...assetsToCache]);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !mapTilesToCache.some(pattern => pattern.test(event.request.url))) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Check if this is a map tile request
        const isMapTile = mapTilesToCache.some(pattern => 
          pattern.test(event.request.url)
        );
        
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
                // Don't cache API requests or dynamic content unless it's map tiles
                if ((!event.request.url.includes('/api/') && 
                    !event.request.url.includes('?') &&
                    event.request.method === 'GET') || isMapTile) {
                  cache.put(event.request, responseToCache);
                }
              });
            
            return response;
          })
          .catch(() => {
            // If fetch fails (offline), try to return a fallback response for HTML pages
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
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
  } else if (event.tag === 'sync-dataset-uploads') {
    event.waitUntil(syncDatasetUploads());
  }
});

// Function to sync pending actions
async function syncPendingActions() {
  try {
    // In a real app, this would use IndexedDB to get pending actions
    // and submit them to your server
    console.log('Background sync: processing pending actions');
    
    // Access the indexed DB to get pending actions
    const db = await openDatabase();
    const pendingActions = await getPendingActions(db);
    
    if (pendingActions.length > 0) {
      console.log(`Found ${pendingActions.length} pending actions to sync`);
      // Process each pending action...
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Function to sync dataset uploads that failed when offline
async function syncDatasetUploads() {
  try {
    console.log('Background sync: processing dataset uploads');
    
    // Access the indexed DB to get pending uploads
    const db = await openDatabase();
    const pendingUploads = await getPendingUploads(db);
    
    if (pendingUploads.length > 0) {
      console.log(`Found ${pendingUploads.length} datasets to upload`);
      // Process each pending upload...
    }
  } catch (error) {
    console.error('Background sync for datasets failed:', error);
  }
}

// Helper function to open IndexedDB
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('GeovisionOfflineCache', 1);
    
    request.onerror = () => reject(new Error('Failed to open IndexedDB'));
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object stores if they don't exist yet
      if (!db.objectStoreNames.contains('pendingActions')) {
        db.createObjectStore('pendingActions', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('pendingUploads')) {
        db.createObjectStore('pendingUploads', { keyPath: 'id' });
      }
    };
  });
}

// Helper function to get pending actions from IndexedDB
function getPendingActions(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('pendingActions', 'readonly');
    const store = transaction.objectStore('pendingActions');
    const request = store.getAll();
    
    request.onerror = () => reject(new Error('Failed to get pending actions'));
    request.onsuccess = () => resolve(request.result);
  });
}

// Helper function to get pending uploads from IndexedDB
function getPendingUploads(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('pendingUploads', 'readonly');
    const store = transaction.objectStore('pendingUploads');
    const request = store.getAll();
    
    request.onerror = () => reject(new Error('Failed to get pending uploads'));
    request.onsuccess = () => resolve(request.result);
  });
}
