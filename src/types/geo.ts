
// Add ShapefileValidationResult if it doesn't exist yet
export interface ShapefileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  features?: number;
  crs?: string;
}

// Add GeoPoint interface
export interface GeoPoint {
  id: string;
  latitude: number;
  longitude: number;
  elevation: number;
  properties?: Record<string, any>;
}
