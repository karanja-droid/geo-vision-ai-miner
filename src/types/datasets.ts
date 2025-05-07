
export interface ShapefileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface GeoAnalysisResult {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  features: {
    id: string;
    name: string;
    type: string;
    properties: Record<string, any>;
  }[];
  summary: {
    featureCount: number;
    area?: number;
    length?: number;
    elevation?: {
      min: number;
      max: number;
      average: number;
    };
  };
}

export interface ShapefileFeature {
  id: string;
  name: string;
  type: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any;
  };
}
