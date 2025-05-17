
export interface AnalysisOptions {
  deepLearning?: boolean;
  sensitivity?: number;
  useHistoricalData?: boolean;
  mineralFocus?: 'gold' | 'copper' | 'all' | string;
  resolution?: 'low' | 'medium' | 'high';
  spectralBands?: string[];
  targetElements?: string[];
  regionFocus?: string;
}

export interface AnalysisResult {
  id: string;
  datasetId: string;
  timestamp: string;
  confidence: number;
  mineralType?: string;
  data: {
    anomalies: number;
    coverage?: string;
    insights?: string[];
    hotspots?: Array<{
      id: number;
      lat: number;
      lng: number;
      strength: number;
      mineralType?: string;
    }>;
    correlations?: Record<string, number>;
    recommendations?: string[];
  };
}

export interface AnomalyAlertData {
  title: string;
  description: string;
  confidence: number;
  location?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  mineralType?: string;
  timestamp?: string;
}

export interface ModelInfo {
  id: string;
  name: string;
  type: string;
  target: string;
  accuracy: number;
  lastTrained: string;
  description: string;
  feedbackIncorporated?: boolean;
  regionSpecialization?: string;
  mineralTypes?: string[];
}
