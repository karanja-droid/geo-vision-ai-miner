
// Utility functions for 3D visualization

/**
 * Generate 3D points based on dataset type
 */
export const generateVisualizationData = (
  dataset: string,
  visualizationMode: string
): {
  points: [number, number, number][];
  connections: [number, number][];
  colors: string[];
} => {
  const points: [number, number, number][] = [];
  const connections: [number, number][] = [];
  const colors: string[] = [];

  // Create different visualizations based on the selected mode and dataset
  if (dataset === 'copper_deposit' || dataset === 'gold_vein') {
    // Create a 3D grid of points representing geological layers
    const gridSize = 5;
    const spacing = 1;
    
    // Generate grid points with some variation based on dataset
    for (let z = -gridSize; z <= gridSize; z += spacing) {
      for (let x = -gridSize; x <= gridSize; x += spacing) {
        let y = 0;
        
        // Create varied terrain
        if (dataset === 'copper_deposit') {
          // Create a terrain with potential copper deposit indicators
          y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2;
          
          // Add anomaly for copper deposit
          const dist = Math.sqrt(x * x + z * z);
          if (dist < 3) {
            y -= 1.5 * (3 - dist) / 3;
          }
        } else if (dataset === 'gold_vein') {
          // Create a terrain with vein-like structures
          y = Math.sin(x * 0.3 + z * 0.3) * 1.5;
          
          // Add vein
          if (Math.abs(x + z) < 1) {
            y -= 2;
          }
        }
        
        points.push([x, y, z]);
        
        // Determine point color based on visualization mode
        if (visualizationMode === 'mineralization') {
          const dist = Math.sqrt(x * x + z * z);
          if (dataset === 'copper_deposit' && dist < 3) {
            colors.push('#1E88E5'); // Blue for copper
          } else if (dataset === 'gold_vein' && Math.abs(x + z) < 1) {
            colors.push('#FFC107'); // Yellow for gold
          } else {
            colors.push('#9E9E9E'); // Gray for regular rock
          }
        } else if (visualizationMode === 'porosity') {
          const porosity = Math.abs(Math.sin(x * 0.7) * Math.cos(z * 0.7));
          const r = Math.floor(porosity * 255);
          const g = Math.floor((1 - porosity) * 255);
          colors.push(`rgb(${r}, ${g}, 150)`);
        } else if (visualizationMode === 'fault_lines') {
          if ((dataset === 'copper_deposit' && Math.abs(x) < 0.5) || 
              (dataset === 'gold_vein' && Math.abs(z) < 0.5)) {
            colors.push('#F44336'); // Red for fault lines
          } else {
            colors.push('#9E9E9E'); // Gray for regular rock
          }
        } else {
          // Default 3D structure coloring
          const depth = (y + 5) / 10; // Normalize to 0-1 range
          const r = Math.floor((1 - depth) * 200);
          const g = Math.floor(depth * 100 + 100);
          const b = Math.floor(depth * 255);
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
    }
    
    // Create connections between adjacent points
    const pointsPerRow = 2 * gridSize / spacing + 1;
    for (let i = 0; i < points.length; i++) {
      // Connect to point to the right (if not at right edge)
      if ((i + 1) % pointsPerRow !== 0) {
        connections.push([i, i + 1]);
      }
      
      // Connect to point below (if exists)
      if (i + pointsPerRow < points.length) {
        connections.push([i, i + pointsPerRow]);
      }
    }
  } else if (dataset === 'fault_system') {
    // Create fault system visualization
    const gridSize = 5;
    const spacing = 1;
    
    // Generate grid points
    for (let z = -gridSize; z <= gridSize; z += spacing) {
      for (let x = -gridSize; x <= gridSize; x += spacing) {
        // Create fault system with offset
        let y;
        if (x > 0) {
          y = -1 + Math.sin(z * 0.5) * 0.5;
        } else {
          y = 1 + Math.sin(z * 0.5) * 0.5;
        }
        
        points.push([x, y, z]);
        
        // Color based on visualization mode
        if (visualizationMode === 'fault_lines') {
          if (Math.abs(x) < 0.5) {
            colors.push('#F44336'); // Red for fault lines
          } else {
            colors.push('#9E9E9E');
          }
        } else {
          const depth = (y + 5) / 10;
          const r = Math.floor((1 - depth) * 200);
          const g = Math.floor(depth * 100 + 100);
          const b = Math.floor(depth * 255);
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
    }
    
    // Create connections for fault system
    const pointsPerRow = 2 * gridSize / spacing + 1;
    for (let i = 0; i < points.length; i++) {
      if ((i + 1) % pointsPerRow !== 0) {
        connections.push([i, i + 1]);
      }
      if (i + pointsPerRow < points.length) {
        connections.push([i, i + pointsPerRow]);
      }
    }
  } else if (dataset === 'sedimentary_basin') {
    // Create basin-like structure
    const levels = 8;
    const pointsPerCircle = 16;
    
    // Create concentric circles at different depths
    for (let level = 0; level < levels; level++) {
      const y = -level * 0.5;
      const radius = 5 - level * 0.4;
      
      for (let i = 0; i < pointsPerCircle; i++) {
        const angle = (i / pointsPerCircle) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        points.push([x, y, z]);
        
        // Determine color
        if (visualizationMode === 'porosity') {
          const porosity = (levels - level) / levels;
          const r = Math.floor(porosity * 255);
          const g = Math.floor((1 - porosity) * 200);
          const b = 100;
          colors.push(`rgb(${r}, ${g}, ${b})`);
        } else {
          // Layered coloring for sedimentary basin
          const basinColors = [
            '#FFF59D', // Sand
            '#A1887F', // Silt
            '#795548', // Clay
            '#5D4037', // Shale
            '#455A64', // Limestone
            '#37474F', // Dolomite
            '#263238', // Basement rock
            '#1A237E'  // Deep basement
          ];
          colors.push(basinColors[level]);
        }
      }
    }
    
    // Connect points in same level
    for (let level = 0; level < levels; level++) {
      const startIdx = level * pointsPerCircle;
      for (let i = 0; i < pointsPerCircle; i++) {
        connections.push([
          startIdx + i, 
          startIdx + ((i + 1) % pointsPerCircle)
        ]);
      }
    }
    
    // Connect levels
    for (let level = 0; level < levels - 1; level++) {
      for (let i = 0; i < pointsPerCircle; i++) {
        connections.push([
          level * pointsPerCircle + i,
          (level + 1) * pointsPerCircle + i
        ]);
      }
    }
  }

  return { points, connections, colors };
};

/**
 * Apply 3D rotation to points and prepare for rendering
 */
export const applyRotationAndPerspective = (
  points: [number, number, number][],
  rotation: { x: number; y: number },
  centerX: number,
  centerY: number,
  scale: number
) => {
  return points.map(([x, y, z]) => {
    // Apply rotation around Y axis
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    const x2 = x * cosY - z * sinY;
    const z2 = z * cosY + x * sinY;
    
    // Apply rotation around X axis
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const y2 = y * cosX - z2 * sinX;
    const z3 = z2 * cosX + y * sinX;
    
    // Calculate 2D position with perspective
    const perspective = 5;
    const depth = perspective / (perspective + z3);
    const screenX = centerX + x2 * scale * depth;
    const screenY = centerY + y2 * scale * depth;
    
    return { screenX, screenY, depth, originalZ: z3 };
  });
};
