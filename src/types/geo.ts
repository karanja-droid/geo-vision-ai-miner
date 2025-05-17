
// Add ShapefileValidationResult if it doesn't exist yet
export interface ShapefileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  features?: number;
  crs?: string;
}
