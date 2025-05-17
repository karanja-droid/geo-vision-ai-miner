
// Add these interfaces to the existing file
export interface MineralProspectivityMap {
  id: string;
  name: string;
  mineralType: string;
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
  location: {
    id: string;
    latitude: number;
    longitude: number;
    elevation: number;
  };
  priority: 'high' | 'medium' | 'low';
  expectedMineralType: string;
  expectedGrade: number;
  depth: number;
  costEstimate: number;
  createdAt: string;
  aiConfidence: number;
}

// Add the ModelInfo interface
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
