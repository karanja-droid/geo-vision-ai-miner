
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { DatasetCacheQueue } from '@/services/DatasetCacheQueue';

interface ConnectivityContextType {
  isOnline: boolean;
  lastOnlineTime: Date | null;
  cachedDatasets: string[];
  isCacheLoading: boolean;
  addToCache: (datasetId: string) => Promise<void>;
  removeFromCache: (datasetId: string) => Promise<void>;
  isCached: (datasetId: string) => boolean;
  syncStatus: 'idle' | 'syncing' | 'completed' | 'error';
  pendingChanges: number;
  sync: () => Promise<void>;
  registerOfflineAction: (action: OfflineAction) => void;
}

export interface OfflineAction {
  id: string;
  type: 'download' | 'upload' | 'delete';
  datasetId: string;
  timestamp: number;
  payload?: any;
}

const ConnectivityContext = createContext<ConnectivityContextType>({
  isOnline: true,
  lastOnlineTime: new Date(),
  cachedDatasets: [],
  isCacheLoading: false,
  addToCache: async () => {},
  removeFromCache: async () => {},
  isCached: () => false,
  syncStatus: 'idle',
  pendingChanges: 0,
  sync: async () => {},
  registerOfflineAction: () => {},
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
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'error'>('idle');
  const [pendingChanges, setPendingChanges] = useState<number>(0);
  const [offlineActions, setOfflineActions] = useState<OfflineAction[]>([]);
  
  // Load cached dataset IDs and offline actions from localStorage on mount
  useEffect(() => {
    const loadCachedDatasets = async () => {
      try {
        const cached = localStorage.getItem('cachedDatasets');
        setCachedDatasets(cached ? JSON.parse(cached) : []);
        
        const actions = localStorage.getItem('offlineActions');
        const parsedActions = actions ? JSON.parse(actions) : [];
        setOfflineActions(parsedActions);
        setPendingChanges(parsedActions.length);
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
      
      // Auto-sync when connection is restored
      if (pendingChanges > 0) {
        toast({
          title: "Connection restored",
          description: `You're back online. Syncing ${pendingChanges} pending changes...`,
        });
        sync();
      } else {
        toast({
          title: "Connection restored",
          description: "You're back online.",
        });
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connection lost",
        description: "You're now working offline. Changes will be synced when you reconnect.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingChanges]);

  // Save cached dataset IDs to localStorage whenever it changes
  useEffect(() => {
    if (!isCacheLoading) {
      localStorage.setItem('cachedDatasets', JSON.stringify(cachedDatasets));
    }
  }, [cachedDatasets, isCacheLoading]);
  
  // Save offline actions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('offlineActions', JSON.stringify(offlineActions));
    setPendingChanges(offlineActions.length);
  }, [offlineActions]);

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
  
  const registerOfflineAction = useCallback((action: OfflineAction) => {
    setOfflineActions(prev => {
      // Check if action with same id already exists
      const existingIndex = prev.findIndex(a => a.id === action.id);
      
      if (existingIndex >= 0) {
        // Update existing action
        const updated = [...prev];
        updated[existingIndex] = action;
        return updated;
      }
      
      // Add new action
      return [...prev, action];
    });
  }, []);
  
  const sync = async () => {
    if (!isOnline || offlineActions.length === 0) {
      return;
    }
    
    setSyncStatus('syncing');
    
    try {
      // Process each action in the queue
      const actionsToProcess = [...offlineActions];
      const processedActionIds: string[] = [];
      
      for (const action of actionsToProcess) {
        try {
          await DatasetCacheQueue.processAction(action);
          processedActionIds.push(action.id);
        } catch (error) {
          console.error(`Error processing action ${action.id}:`, error);
          // Continue with other actions even if one fails
        }
      }
      
      // Remove processed actions from the queue
      setOfflineActions(prev => prev.filter(action => !processedActionIds.includes(action.id)));
      
      setSyncStatus('completed');
      toast({
        title: "Synchronization complete",
        description: `Successfully processed ${processedActionIds.length} out of ${actionsToProcess.length} actions.`,
      });
    } catch (error) {
      console.error("Sync error:", error);
      setSyncStatus('error');
      toast({
        title: "Synchronization error",
        description: "Some changes couldn't be synchronized. Try again later.",
        variant: "destructive"
      });
    }
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
        isCached,
        syncStatus,
        pendingChanges,
        sync,
        registerOfflineAction
      }}
    >
      {children}
    </ConnectivityContext.Provider>
  );
};
