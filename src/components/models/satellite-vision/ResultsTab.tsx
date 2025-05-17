
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, FileText, BarChart } from "lucide-react";
import MineralsChart from './MineralsChart';
import CoverageStatistics from './CoverageStatistics';
import AnalysisMap from './AnalysisMap';

interface ResultsTabProps {
  analysisResults: {
    minerals: {
      ironOxide: number;
      copperSulfide: number;
      silicates: number;
      goldIndicators?: number;
      diamondIndicators?: number;
      cobaltIndicators?: number;
    };
    statistics: {
      areaAnalyzed: string;
      anomaliesDetected: number;
      featurePoints: number;
      confidenceScore: string;
      africanConfidence?: string;
    };
    hotspots?: Array<{
      id: number;
      lat: number;
      lng: number;
      strength: number;
      mineralType?: string;
    }>;
  } | null;
  handleDownloadReport: () => void;
  handleViewFullAnalysis: () => void;
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ 
  analysisResults, 
  handleDownloadReport, 
  handleViewFullAnalysis,
  showMap,
  setShowMap
}) => {
  if (!analysisResults) return null;
  
  // Determine the dominant mineral for the map visualization
  const determineMineralType = () => {
    const minerals = analysisResults.minerals;
    
    if (minerals.goldIndicators && minerals.goldIndicators > 50) {
      return 'gold';
    } else if (minerals.diamondIndicators && minerals.diamondIndicators > 50) {
      return 'diamond';
    } else if (minerals.cobaltIndicators && minerals.cobaltIndicators > 50) {
      return 'cobalt';
    } else if (minerals.ironOxide > minerals.copperSulfide && minerals.ironOxide > minerals.silicates) {
      return 'iron';
    } else if (minerals.copperSulfide > minerals.ironOxide && minerals.copperSulfide > minerals.silicates) {
      return 'copper';
    } else {
      return 'gold';
    }
  };
  
  return (
    <div className="space-y-4">
      <Alert variant="default" className="bg-green-500/10 border-green-200">
        <Activity className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-700">Analysis Complete</AlertTitle>
        <AlertDescription>
          SatelliteVision CNN has successfully analyzed the selected imagery 
          {analysisResults.statistics.africanConfidence && 
            ` with ${analysisResults.statistics.africanConfidence}% African context confidence`}
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MineralsChart minerals={analysisResults.minerals} />
        <CoverageStatistics statistics={analysisResults.statistics} />
      </div>
      
      {/* Map visualization */}
      {showMap && analysisResults.hotspots && (
        <AnalysisMap 
          hotspots={analysisResults.hotspots} 
          mineralType={determineMineralType()}
        />
      )}
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={handleDownloadReport}>
          <FileText className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button onClick={() => {
          setShowMap(!showMap);
          if (!showMap) handleViewFullAnalysis();
        }}>
          <BarChart className="h-4 w-4 mr-2" />
          {showMap ? "Hide Map View" : "View Full Analysis"}
        </Button>
      </div>
    </div>
  );
};

export default ResultsTab;
