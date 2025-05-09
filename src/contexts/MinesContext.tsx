
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMinesData, loadConvexConfig, configureConvexApi, ConvexConfig } from '../utils/convex/api';
import { useToast } from '@/components/ui/use-toast';

interface MineData {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    country: string;
    region?: string;
  };
  minerals: string[];
  status: 'active' | 'inactive' | 'planned' | 'closed';
  production?: {
    mineral: string;
    amount: number;
    unit: string;
    year: number;
  }[];
  owner?: string;
  description?: string;
}

interface MinesContextType {
  mines: MineData[];
  loading: boolean;
  error: Error | null;
  refreshMines: () => Promise<void>;
  configureApi: (config: ConvexConfig) => void;
  isConfigured: boolean;
}

const MinesContext = createContext<MinesContextType | undefined>(undefined);

export const MinesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mines, setMines] = useState<MineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [config, setConfig] = useState<ConvexConfig>(loadConvexConfig());
  const { toast } = useToast();

  const fetchMines = async () => {
    if (!config.deploymentName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchMinesData();
      setMines(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      toast({
        title: "Failed to fetch mines data",
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const configureApi = (newConfig: ConvexConfig) => {
    const updatedConfig = configureConvexApi(newConfig);
    setConfig(updatedConfig);
    toast({
      title: "API Configuration Updated",
      description: `Connected to ${updatedConfig.deploymentName} deployment`,
    });
    fetchMines();
  };

  useEffect(() => {
    fetchMines();
  }, []);

  return (
    <MinesContext.Provider value={{ 
      mines, 
      loading, 
      error, 
      refreshMines: fetchMines,
      configureApi,
      isConfigured: !!config.deploymentName
    }}>
      {children}
    </MinesContext.Provider>
  );
};

export const useMines = () => {
  const context = useContext(MinesContext);
  if (context === undefined) {
    throw new Error('useMines must be used within a MinesProvider');
  }
  return context;
};
