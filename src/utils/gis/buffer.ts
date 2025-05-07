
/**
 * GIS buffer operations for creating buffer zones around features
 */

/**
 * Creates a simple buffer around a GeoJSON feature (simplified implementation)
 * Note: In a production environment, use Turf.js or another GIS library
 * @param feature The GeoJSON feature to buffer
 * @param distance Buffer distance
 * @param unit Unit of measurement (e.g., 'km', 'm')
 * @returns New GeoJSON feature with buffer
 */
export const bufferFeature = (feature: any, distance: number, unit: string) => {
  console.log(`bufferFeature called with distance: ${distance}${unit}`);
  
  // Test edge case: negative distance
  if (distance < 0) {
    console.warn("bufferFeature: Negative buffer distance provided, using absolute value");
    distance = Math.abs(distance);
  }
  
  // Test edge case: invalid feature
  if (!feature || !feature.geometry || !feature.geometry.type) {
    console.error("bufferFeature: Invalid feature provided");
    return null;
  }
  
  // Test edge case: zero distance
  if (distance === 0) {
    console.warn("bufferFeature: Zero buffer distance, returning original feature");
    return { ...feature };
  }
  
  // This is a placeholder. In a real implementation,
  // you would use a proper spatial library like Turf.js:
  // return turf.buffer(feature, distance, { units: unit });
  
  // For now, just return the original feature with a note
  const bufferedFeature = {
    ...feature,
    properties: {
      ...feature.properties,
      buffer_applied: `${distance} ${unit}`,
      buffer_note: 'This is a simulated buffer (visualization only)'
    }
  };
  
  console.log("Buffer applied to feature:", {
    featureType: feature.geometry.type,
    originalProperties: Object.keys(feature.properties || {}),
    bufferedProperties: Object.keys(bufferedFeature.properties)
  });
  
  return bufferedFeature;
};
