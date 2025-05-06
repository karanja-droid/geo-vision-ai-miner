
import { StakeholderOrganization } from './organizations';

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
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  tags?: string[];
  organization?: StakeholderOrganization;
  accessRights?: import('./users').UserRole[];
}

export interface ExportFormat {
  type: string;
  mimeType: string;
  extension: string;
  description: string;
}

export interface ExportOptions {
  includeMetadata: boolean;
  includeAnalysis: boolean;
  includeRawData: boolean;
  format: string;
  resolution?: 'low' | 'medium' | 'high';
  compression?: number;
  template?: string;
  includeMaps?: boolean;
  includeCharts?: boolean;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
}

export interface ShapefileValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  features: number;
  boundingBox?: [number, number, number, number]; // [minX, minY, maxX, maxY]
  crs?: string;
}

export interface GeoAnalysisResult {
  type: 'buffer' | 'intersection' | 'union' | 'difference' | 'area' | 'length' | 'custom';
  result: any;
  metadata: {
    executionTime: number;
    timestamp: string;
    parameters?: Record<string, any>;
  };
}
