
import { AnalysisOptions } from '@/types/analysis';
import { ModelInfo } from '@/types/models';

export const generateReport = (analysisResults: any, modelInfo: ModelInfo): string => {
  if (!analysisResults) return '';

  return `
SATELLITE VISION CNN ANALYSIS REPORT
===================================
Generated: ${new Date().toLocaleString()}

ANALYSIS PARAMETERS
------------------
Data Source: ${analysisResults.options.dataSource}
Resolution: ${analysisResults.options.resolution}
Analysis Depth: ${analysisResults.options.depth}
Spectral Bands: ${analysisResults.options.spectralBands.join(', ')}
Region Focus: ${analysisResults.options.regionFocus || 'Global'}
Target Minerals: ${analysisResults.options.targetMinerals?.join(', ') || 'All'}

MINERAL DETECTION RESULTS
------------------------
Iron Oxide: ${analysisResults.minerals.ironOxide}%
Copper Sulfide: ${analysisResults.minerals.copperSulfide}%
Silicates: ${analysisResults.minerals.silicates}%
Gold Indicators: ${analysisResults.minerals.goldIndicators || '0'}%
Diamond Indicators: ${analysisResults.minerals.diamondIndicators || '0'}%

STATISTICS
---------
Area Analyzed: ${analysisResults.statistics.areaAnalyzed} km²
Anomalies Detected: ${analysisResults.statistics.anomaliesDetected}
Feature Points: ${analysisResults.statistics.featurePoints}
Confidence Score: ${analysisResults.statistics.confidenceScore}%
African Context Confidence: ${analysisResults.statistics.africanConfidence || analysisResults.statistics.confidenceScore}%

HOTSPOTS
-------
${analysisResults.hotspots.map((hotspot: any) => 
  `ID: ${hotspot.id}, Location: [${hotspot.lat.toFixed(6)}, ${hotspot.lng.toFixed(6)}], Strength: ${(hotspot.strength * 100).toFixed(1)}%, Likely Mineral: ${hotspot.mineralType || 'Unknown'}`
).join('\n')}

NOTES
-----
This report was generated using SatelliteVision CNN model (${modelInfo.id}).
Model accuracy: ${modelInfo.accuracy}%
Last trained: ${new Date(modelInfo.lastTrained).toLocaleDateString()}
Regional specialization: ${modelInfo.regionSpecialization || 'Global'}
`;
};

export const downloadReport = (report: string): void => {
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `satellite-vision-report-${new Date().getTime()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
