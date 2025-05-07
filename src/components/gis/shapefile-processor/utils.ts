
import { ShapefileValidationResult } from '@/types/datasets';

export const validateShapefiles = (files: File[]): Promise<ShapefileValidationResult> => {
  console.log("validateShapefiles called with files:", files.map(f => f.name));
  
  // Testing edge cases with file types
  const hasShp = files.some(f => f.name.endsWith('.shp'));
  const hasDbf = files.some(f => f.name.endsWith('.dbf'));
  const hasShx = files.some(f => f.name.endsWith('.shx'));
  const hasPrj = files.some(f => f.name.endsWith('.prj'));
  const hasGeoJson = files.some(f => f.name.endsWith('.geojson') || f.name.endsWith('.json'));
  const hasZip = files.some(f => f.name.endsWith('.zip'));
  
  console.log("File type presence:", { hasShp, hasDbf, hasShx, hasPrj, hasGeoJson, hasZip });
  
  // In a real implementation, this would perform actual validation
  return new Promise((resolve) => {
    console.log("Starting validation simulation...");
    
    setTimeout(() => {
      // Generate warnings based on file types
      const warnings: string[] = [];
      
      if (!hasPrj && (hasShp || hasDbf || hasShx)) {
        warnings.push("Missing projection file (.prj)");
      }
      
      if (hasShp && !hasDbf) {
        warnings.push("Missing database file (.dbf)");
      }
      
      if (hasShp && !hasShx) {
        warnings.push("Missing index file (.shx)");
      }
      
      // Handle the case where files are provided but wouldn't be valid in real-world
      const isValid = hasGeoJson || hasZip || (hasShp && hasDbf && hasShx);
      
      // Show different validation results based on files
      const result: ShapefileValidationResult = {
        isValid,
        features: isValid ? 2 : 0,
        boundingBox: isValid ? [27.5, -13.5, 28.5, -12.5] : [0, 0, 0, 0],
        crs: isValid ? "EPSG:4326" : undefined,
        warnings,
        errors: !isValid ? ["Incomplete or invalid shapefile components"] : undefined
      };
      
      console.log("Validation result:", result);
      resolve(result);
    }, 1000);
  });
};
