
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ConnectivityContextType {
  isOnline: boolean;
  lastOnlineTime: Date | null;
  cachedDatasets: string[];
  isCacheLoading: boolean;
  addToCache: (datasetId: string) => Promise<void>;
  removeFromCache: (datasetId: string) => Promise<void>;
  isCached: (datasetId: string) => boolean;
}

const ConnectivityContext = createContext<ConnectivityContextType>({
  isOnline: true,
  lastOnlineTime: new Date(),
  cachedDatasets: [],
  isCacheLoading: false,
  addToCache: async () => {},
  removeFromCache: async () => {},
  isCached: () => false,
});

export const useConnectivity = () => useContext(ConnectivityContext);

interface ConnectivityProviderProps {
  children: ReactNode;
}

export const ConnectivityProvider: React.FC<ConnectivityProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(
    navigator.onLine ? new Date() : null
  );
  const [cachedDatasets, setCachedDatasets] = useState<string[]>([]);
  const [isCacheLoading, setIsCacheLoading] = useState<boolean>(true);

  // Load cached dataset IDs from localStorage on mount
  useEffect(() => {
    const loadCachedDatasets = async () => {
      try {
        const cached = localStorage.getItem('cachedDatasets');
        setCachedDatasets(cached ? JSON.parse(cached) : []);
      } catch (error) {
        console.error("Error loading cached datasets:", error);
        setCachedDatasets([]);
      } finally {
        setIsCacheLoading(false);
      }
    };
    
    loadCachedDatasets();
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save cached dataset IDs to localStorage whenever it changes
  useEffect(() => {
    if (!isCacheLoading) {
      localStorage.setItem('cachedDatasets', JSON.stringify(cachedDatasets));
    }
  }, [cachedDatasets, isCacheLoading]);

  const addToCache = async (datasetId: string) => {
    if (!cachedDatasets.includes(datasetId)) {
      const updatedCache = [...cachedDatasets, datasetId];
      setCachedDatasets(updatedCache);
    }
  };

  const removeFromCache = async (datasetId: string) => {
    const updatedCache = cachedDatasets.filter(id => id !== datasetId);
    setCachedDatasets(updatedCache);
  };

  const isCached = (datasetId: string) => {
    return cachedDatasets.includes(datasetId);
  };

  return (
    <ConnectivityContext.Provider 
      value={{ 
        isOnline, 
        lastOnlineTime, 
        cachedDatasets,
        isCacheLoading,
        addToCache,
        removeFromCache,
        isCached
      }}
    >
      {children}
    </ConnectivityContext.Provider>
  );
};
