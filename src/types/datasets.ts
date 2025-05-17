
export interface ShapefileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  features?: number; // Adding optional features property
  crs?: string; // Adding optional CRS property
}

export interface GeoAnalysisResult {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  type: string; // Adding type property
  features: {
    id: string;
    name: string;
    type: string;
    properties: Record<string, any>;
  }[];
  metadata: {
    executionTime?: number;
    timestamp: string;
    parameters?: Record<string, any>;
  }; // Adding metadata property
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
  result?: any; // Adding optional result property
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

// Expanded DatasetInfo to include all required fields
export interface DatasetInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  description?: string;
  source?: string;
  organization?: StakeholderOrganization;
  validated?: boolean;
  contributors?: string[];
  // Added these fields to match usage in DatasetLibrary.tsx
  country?: string;
  tags?: string[];
  format?: string;
  date?: string;
  coordinates?: number[];
  relatedDocs?: {
    id: string;
    name: string;
    type: string;
    size: string;
  }[];
}

export type StakeholderOrganization = 
  | 'Geological Survey Department'
  | 'Mining Company'
  | 'Remote Sensing Agency'
  | 'Environmental Regulator'
  | 'Academic Institution';

export interface ExportOptions {
  includeMetadata: boolean;
  includeAnalysis: boolean;
  includeRawData: boolean;
  includeMaps?: boolean;
  includeCharts?: boolean;
  format: string;
  resolution: 'low' | 'medium' | 'high';
  compression: number;
  template: string;
}

export interface ExportFormat {
  type: string;
  mimeType: string;
  extension: string;
  description: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
}
