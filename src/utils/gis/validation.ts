
/**
 * GIS validation utilities for validating geospatial data
 */

/**
 * Validates a GeoJSON object for correct structure and properties
 * @param data The GeoJSON data to validate
 * @returns Validation result with errors and warnings
 */
export const validateGeoJSON = (data: any) => {
  console.log("validateGeoJSON called with data:", data ? typeof data : "undefined");
  
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check if it's a valid GeoJSON
  if (!data || typeof data !== 'object') {
    console.warn("Invalid GeoJSON: data is not an object");
    errors.push('Invalid GeoJSON: data is not an object');
    return { isValid: false, errors, warnings };
  }
  
  // Check for required type property
  if (!data.type) {
    console.warn("Invalid GeoJSON: missing type property");
    errors.push('Invalid GeoJSON: missing type property');
  } else if (!['FeatureCollection', 'Feature', 'Geometry'].includes(data.type)) {
    console.warn(`Invalid GeoJSON: unrecognized type "${data.type}"`);
    errors.push(`Invalid GeoJSON: unrecognized type "${data.type}"`);
  }
  
  // For FeatureCollection, validate features
  if (data.type === 'FeatureCollection') {
    if (!Array.isArray(data.features)) {
      console.warn("Invalid FeatureCollection: features is not an array");
      errors.push('Invalid FeatureCollection: features is not an array');
    } else if (data.features.length === 0) {
      console.warn("Empty FeatureCollection: no features found");
      warnings.push('Empty FeatureCollection: no features found');
    } else {
      console.log(`Found ${data.features.length} features in collection`);
      // Check first few features
      for (let i = 0; i < Math.min(5, data.features.length); i++) {
        const feature = data.features[i];
        if (!feature.type || feature.type !== 'Feature') {
          console.warn(`Invalid feature at index ${i}: missing or incorrect type property`);
          errors.push(`Invalid feature at index ${i}: missing or incorrect type property`);
        }
        if (!feature.geometry) {
          console.warn(`Invalid feature at index ${i}: missing geometry property`);
          errors.push(`Invalid feature at index ${i}: missing geometry property`);
        } else if (!feature.geometry.type || !feature.geometry.coordinates) {
          console.warn(`Invalid geometry at feature index ${i}: missing type or coordinates`);
          errors.push(`Invalid geometry at feature index ${i}: missing type or coordinates`);
        }
        if (!feature.properties) {
          console.warn(`Feature at index ${i} has no properties`);
          warnings.push(`Feature at index ${i} has no properties`);
        }
      }
    }
  }
  
  const result = {
    isValid: errors.length === 0,
    errors,
    warnings,
    features: data.features?.length || 0
  };
  
  console.log("validateGeoJSON result:", result);
  return result;
};
