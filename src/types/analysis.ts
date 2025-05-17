
export interface AnalysisResult {
  id: string;
  layerId: string;
  timestamp: string;
  modelType: 'prediction' | 'classification' | 'anomaly';
  confidence: number;
  data: any;
  mineralType?: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'unknown';
}

export interface AnalysisOptions {
  dataSource?: string;
  resolution?: string;
  depth?: string;
  spectralBands?: string[];
  regionFocus?: string;
  targetMinerals?: string[];
  deepLearning?: boolean;
  confidenceThreshold?: number;
}

export interface MineralProspectivityMap {
  id: string;
  name: string;
  mineralType: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'other';
  confidence: number;
  generatedAt: string;
  features: {
    geological: boolean;
    geochemical: boolean;
    remoteSensing: boolean;
  };
  modelType: string;
  dataSourceIds: string[];
}

export interface DrillRecommendation {
  id: string;
  location: import('./geo').GeoPoint;
  priority: 'low' | 'medium' | 'high';
  expectedMineralType: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'unknown';
  expectedGrade: number;
  depth: number;
  costEstimate: number;
  createdAt: string;
  aiConfidence: number;
}
