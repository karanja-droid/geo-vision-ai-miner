
import { ShapefileValidationResult } from "@/types/datasets";

export const validateShapefileData = (data: any): ShapefileValidationResult => {
  // Check if data is valid GeoJSON
  if (!data || !data.type || data.type !== "FeatureCollection") {
    return {
      isValid: false,
      errors: ["Invalid GeoJSON format: missing or incorrect type"],
      warnings: []
    };
  }
  
  // Check if features array exists
  if (!Array.isArray(data.features)) {
    return {
      isValid: false,
      errors: ["Invalid GeoJSON: missing features array"],
      warnings: []
    };
  }
  
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Check each feature
  data.features.forEach((feature: any, index: number) => {
    if (!feature.geometry) {
      errors.push(`Feature #${index + 1} has no geometry`);
    } else if (!feature.geometry.type) {
      errors.push(`Feature #${index + 1} has invalid geometry type`);
    }
    
    if (!feature.properties) {
      warnings.push(`Feature #${index + 1} has no properties`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    features: data.features.length,
    crs: data.crs?.properties?.name || "Unknown"
  };
};
