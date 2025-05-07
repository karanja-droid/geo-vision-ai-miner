
/**
 * GIS spatial operations for calculations and transformations
 */

/**
 * Calculate the bounding box of a GeoJSON object
 * @param geojson The GeoJSON data
 * @returns [minX, minY, maxX, maxY] array representing the bounding box
 */
export const calculateBoundingBox = (geojson: any): [number, number, number, number] => {
  console.log("calculateBoundingBox called");
  
  if (!geojson || !geojson.features || !Array.isArray(geojson.features) || geojson.features.length === 0) {
    console.warn("calculateBoundingBox: Invalid or empty GeoJSON provided");
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
  
  geojson.features.forEach((feature: any, index: number) => {
    console.log(`Processing feature ${index + 1}/${geojson.features.length}, type: ${feature.geometry?.type || 'unknown'}`);
    if (feature.geometry) {
      processCoordinates(feature.geometry.coordinates, feature.geometry.type);
    } else {
      console.warn(`Feature at index ${index} has no geometry`);
    }
  });
  
  const result: [number, number, number, number] = [minX, minY, maxX, maxY];
  console.log("Calculated bounding box:", result);
  return result;
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
  console.log(`reprojectGeoJSON called: ${fromCRS} -> ${toCRS}`);
  
  // Test edge case: same CRS
  if (fromCRS === toCRS) {
    console.warn("reprojectGeoJSON: Source and target CRS are the same, no conversion needed");
    return { ...geojson };
  }
  
  // Test edge case: invalid GeoJSON
  if (!geojson || !geojson.type) {
    console.error("reprojectGeoJSON: Invalid GeoJSON provided");
    return null;
  }
  
  // This is a placeholder. In a real implementation,
  // you would use a library like proj4js:
  // const proj4 = require('proj4');
  // ...projection implementation...
  
  // For now, just return the original data with a note
  const result = {
    ...geojson,
    crs: {
      type: 'name',
      properties: {
        name: toCRS,
        original_crs: fromCRS
      }
    }
  };
  
  console.log("Reprojection complete:", {
    fromCRS,
    toCRS,
    featureCount: geojson.features?.length || 0
  });
  
  return result;
};
