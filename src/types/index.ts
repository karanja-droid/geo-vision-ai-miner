
export interface GeoPoint {
  id: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  properties?: Record<string, any>;
}

export interface DataLayer {
  id: string;
  name: string;
  type: 'raster' | 'vector' | 'point' | 'heatmap';
  visible: boolean;
  opacity: number;
  data: any;
}

export interface AnalysisResult {
  id: string;
  layerId: string;
  timestamp: string;
  modelType: 'prediction' | 'classification' | 'anomaly';
  confidence: number;
  data: any;
  mineralType?: 'copper' | 'cobalt' | 'gold' | 'iron' | 'zinc' | 'unknown';
}

export interface DatasetInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  description?: string;
  source?: string;
}

export interface ModelInfo {
  id: string;
  name: string;
  type: 'predictive' | 'computer-vision' | 'reinforcement';
  target: string;
  accuracy: number;
  lastTrained: string;
  description?: string;
}
