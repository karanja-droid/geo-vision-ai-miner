
import { GeologicalDataset } from '@/components/data-integration/geological-survey/GeologicalDatasetItem';
import { Dataset } from '@/data/datasetLibraryData';

const DB_NAME = 'GeovisionOfflineCache';
const DB_VERSION = 1;
const DATASETS_STORE = 'datasets';
const GEO_DATASETS_STORE = 'geologicalDatasets';

let dbInstance: IDBDatabase | null = null;

/**
 * Initialize the IndexedDB database
 */
export const initDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening database:', event);
      reject('Could not open IndexedDB');
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains(DATASETS_STORE)) {
        db.createObjectStore(DATASETS_STORE, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(GEO_DATASETS_STORE)) {
        db.createObjectStore(GEO_DATASETS_STORE, { keyPath: 'id' });
      }
    };
  });
};

/**
 * Store a dataset in the cache
 */
export const cacheDataset = async <T extends { id: string }>(dataset: T, storeType: 'geological' | 'library'): Promise<void> => {
  try {
    const db = await initDatabase();
    const storeName = storeType === 'geological' ? GEO_DATASETS_STORE : DATASETS_STORE;
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(dataset);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to cache dataset'));
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error('Transaction failed'));
    });
  } catch (error) {
    console.error('Error caching dataset:', error);
    throw error;
  }
};

/**
 * Remove a dataset from the cache
 */
export const removeCachedDataset = async (id: string, storeType: 'geological' | 'library'): Promise<void> => {
  try {
    const db = await initDatabase();
    const storeName = storeType === 'geological' ? GEO_DATASETS_STORE : DATASETS_STORE;
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to remove dataset from cache'));
    });
  } catch (error) {
    console.error('Error removing dataset from cache:', error);
    throw error;
  }
};

/**
 * Get a dataset from the cache
 */
export const getCachedDataset = async <T>(id: string, storeType: 'geological' | 'library'): Promise<T | null> => {
  try {
    const db = await initDatabase();
    const storeName = storeType === 'geological' ? GEO_DATASETS_STORE : DATASETS_STORE;
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = () => reject(new Error('Failed to get dataset from cache'));
    });
  } catch (error) {
    console.error('Error getting dataset from cache:', error);
    return null;
  }
};

/**
 * Get all datasets from the cache
 */
export const getAllCachedDatasets = async <T>(storeType: 'geological' | 'library'): Promise<T[]> => {
  try {
    const db = await initDatabase();
    const storeName = storeType === 'geological' ? GEO_DATASETS_STORE : DATASETS_STORE;
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = () => reject(new Error('Failed to get datasets from cache'));
    });
  } catch (error) {
    console.error('Error getting all datasets from cache:', error);
    return [];
  }
};

/**
 * Check if a dataset exists in the cache
 */
export const datasetExistsInCache = async (id: string, storeType: 'geological' | 'library'): Promise<boolean> => {
  try {
    const dataset = await getCachedDataset(id, storeType);
    return dataset !== null;
  } catch (error) {
    return false;
  }
};
