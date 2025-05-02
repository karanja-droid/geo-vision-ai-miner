
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
  type: 'csv' | 'json' | 'geojson' | 'shapefile' | 'kml' | 'geotiff';
  mimeType: string;
  extension: string;
  description: string;
}

export interface ExportOptions {
  includeMetadata: boolean;
  includeAnalysis: boolean;
  includeRawData: boolean;
  format: string;
}
