
/**
 * GIS Utility functions for shapefile processing and analysis
 */

/**
 * Validates a GeoJSON object for correct structure and properties
 * @param data The GeoJSON data to validate
 * @returns Validation result with errors and warnings
 */
export const validateGeoJSON = (data: any) => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check if it's a valid GeoJSON
  if (!data || typeof data !== 'object') {
    errors.push('Invalid GeoJSON: data is not an object');
    return { isValid: false, errors, warnings };
  }
  
  // Check for required type property
  if (!data.type) {
    errors.push('Invalid GeoJSON: missing type property');
  } else if (!['FeatureCollection', 'Feature', 'Geometry'].includes(data.type)) {
    errors.push(`Invalid GeoJSON: unrecognized type "${data.type}"`);
  }
  
  // For FeatureCollection, validate features
  if (data.type === 'FeatureCollection') {
    if (!Array.isArray(data.features)) {
      errors.push('Invalid FeatureCollection: features is not an array');
    } else if (data.features.length === 0) {
      warnings.push('Empty FeatureCollection: no features found');
    } else {
      // Check first few features
      for (let i = 0; i < Math.min(5, data.features.length); i++) {
        const feature = data.features[i];
        if (!feature.type || feature.type !== 'Feature') {
          errors.push(`Invalid feature at index ${i}: missing or incorrect type property`);
        }
        if (!feature.geometry) {
          errors.push(`Invalid feature at index ${i}: missing geometry property`);
        } else if (!feature.geometry.type || !feature.geometry.coordinates) {
          errors.push(`Invalid geometry at feature index ${i}: missing type or coordinates`);
        }
        if (!feature.properties) {
          warnings.push(`Feature at index ${i} has no properties`);
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    features: data.features?.length || 0
  };
};

/**
 * Calculate the bounding box of a GeoJSON object
 * @param geojson The GeoJSON data
 * @returns [minX, minY, maxX, maxY] array representing the bounding box
 */
export const calculateBoundingBox = (geojson: any): [number, number, number, number] => {
  if (!geojson || !geojson.features || !Array.isArray(geojson.features) || geojson.features.length === 0) {
    return [0, 0, 0, 0];
  }
  
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  
  const processCoordinates = (coords: any, type: string) => {
    if (type === 'Point') {
      minX = Math.min(minX, coords[0]);
      minY = Math.min(minY, coords[1]);
      maxX = Math.max(maxX, coords[0]);
      maxY = Math.max(maxY, coords[1]);
    } else if (type === 'LineString' || type === 'MultiPoint') {
      coords.forEach((coord: any) => {
        minX = Math.min(minX, coord[0]);
        minY = Math.min(minY, coord[1]);
        maxX = Math.max(maxX, coord[0]);
        maxY = Math.max(maxY, coord[1]);
      });
    } else if (type === 'Polygon' || type === 'MultiLineString') {
      coords.forEach((line: any) => {
        line.forEach((coord: any) => {
          minX = Math.min(minX, coord[0]);
          minY = Math.min(minY, coord[1]);
          maxX = Math.max(maxX, coord[0]);
          maxY = Math.max(maxY, coord[1]);
        });
      });
    } else if (type === 'MultiPolygon') {
      coords.forEach((polygon: any) => {
        polygon.forEach((ring: any) => {
          ring.forEach((coord: any) => {
            minX = Math.min(minX, coord[0]);
            minY = Math.min(minY, coord[1]);
            maxX = Math.max(maxX, coord[0]);
            maxY = Math.max(maxY, coord[1]);
          });
        });
      });
    }
  };
  
  geojson.features.forEach((feature: any) => {
    if (feature.geometry) {
      processCoordinates(feature.geometry.coordinates, feature.geometry.type);
    }
  });
  
  return [minX, minY, maxX, maxY];
};

/**
 * Creates a simple buffer around a GeoJSON feature (simplified implementation)
 * Note: In a production environment, use Turf.js or another GIS library
 * @param feature The GeoJSON feature to buffer
 * @param distance Buffer distance
 * @param unit Unit of measurement (e.g., 'km', 'm')
 * @returns New GeoJSON feature with buffer
 */
export const bufferFeature = (feature: any, distance: number, unit: string) => {
  // This is a placeholder. In a real implementation,
  // you would use a proper spatial library like Turf.js:
  // return turf.buffer(feature, distance, { units: unit });
  
  // For now, just return the original feature with a note
  return {
    ...feature,
    properties: {
      ...feature.properties,
      buffer_applied: `${distance} ${unit}`,
      buffer_note: 'This is a simulated buffer (visualization only)'
    }
  };
};

/**
 * Simplified implementation to convert between coordinate reference systems
 * In production, use a proper projection library
 * @param geojson The GeoJSON data
 * @param fromCRS Source CRS code (e.g., 'EPSG:4326')
 * @param toCRS Target CRS code (e.g., 'EPSG:3857')
 * @returns Reprojected GeoJSON
 */
export const reprojectGeoJSON = (geojson: any, fromCRS: string, toCRS: string) => {
  // This is a placeholder. In a real implementation,
  // you would use a library like proj4js:
  // const proj4 = require('proj4');
  // ...projection implementation...
  
  // For now, just return the original data with a note
  return {
    ...geojson,
    crs: {
      type: 'name',
      properties: {
        name: toCRS
      }
    }
  };
};
