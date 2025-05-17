
export interface AnalysisOptions {
  deepLearning?: boolean;
  sensitivity?: number;
  useHistoricalData?: boolean;
  mineralFocus?: 'gold' | 'copper' | 'all' | string;
  resolution?: 'low' | 'medium' | 'high';
  spectralBands?: string[];
  targetElements?: string[];
  regionFocus?: string;
  // Added missing properties used in the code
  targetMinerals?: string[];
  confidenceThreshold?: number;
  dataSource?: string;
  depth?: string;
}

export interface AnalysisResult {
  id: string;
  datasetId: string;
  timestamp: string;
  confidence: number;
  mineralType?: string;
  // Added missing properties used in the code
  modelType?: string;
  layerId?: string;
  data: {
    anomalies: number;
    coverage?: string | {
      total: number;
      analyzed: number;
      unit: string;
    };
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
    featureCount?: number;
    spectralAnalysis?: Record<string, any>;
    processingTime?: number;
    resolution?: string;
  };
}

export interface AnomalyAlertData {
  title: string;
  description: string;
  confidence: number;
  location?: string;
  severity: 'low' | 'medium' | 'high' | 'critical'; // Changed from optional to required
  mineralType?: string;
  timestamp?: string;
}

// Renamed to avoid naming conflict with models.ts
export interface AnalysisModelInfo {
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
