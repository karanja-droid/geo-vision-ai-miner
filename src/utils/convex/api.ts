
/**
 * Utilities for communicating with the Convex API
 */

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

export interface ConvexConfig {
  deploymentName: string;
}

// Default configuration that can be updated
let config: ConvexConfig = {
  deploymentName: ''
};

/**
 * Configure the Convex API connection
 */
export const configureConvexApi = (newConfig: ConvexConfig) => {
  config = { ...config, ...newConfig };
  // Save to localStorage for persistence
  localStorage.setItem('convexConfig', JSON.stringify(config));
  return config;
};

/**
 * Load configuration from local storage if available
 */
export const loadConvexConfig = (): ConvexConfig => {
  const savedConfig = localStorage.getItem('convexConfig');
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      config = { ...config, ...parsedConfig };
    } catch (error) {
      console.error('Failed to parse saved Convex configuration:', error);
    }
  }
  return config;
};

/**
 * Get the base URL for the Convex API
 */
export const getConvexApiUrl = () => {
  if (!config.deploymentName) {
    throw new Error('Convex API is not configured. Please set a deployment name.');
  }
  return `https://${config.deploymentName}.convex.cloud/api`;
};

/**
 * Fetch mines data from the Convex API
 */
export const fetchMinesData = async (): Promise<MineData[]> => {
  try {
    const apiUrl = `${getConvexApiUrl()}/mines`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch mines data:', error);
    throw error;
  }
};
