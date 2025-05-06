
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, FileText, BarChart } from "lucide-react";
import MineralsChart from './MineralsChart';
import CoverageStatistics from './CoverageStatistics';

interface ResultsTabProps {
  analysisResults: {
    minerals: {
      ironOxide: number;
      copperSulfide: number;
      silicates: number;
    };
    statistics: {
      areaAnalyzed: string;
      anomaliesDetected: number;
      featurePoints: number;
      confidenceScore: string;
    };
  } | null;
  handleDownloadReport: () => void;
  handleViewFullAnalysis: () => void;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ 
  analysisResults, 
  handleDownloadReport, 
  handleViewFullAnalysis 
}) => {
  if (!analysisResults) return null;
  
  return (
    <div className="space-y-4">
      <Alert variant="default" className="bg-green-500/10 border-green-200">
        <Activity className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-700">Analysis Complete</AlertTitle>
        <AlertDescription>
          SatelliteVision CNN has successfully analyzed the selected imagery.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MineralsChart minerals={analysisResults.minerals} />
        <CoverageStatistics statistics={analysisResults.statistics} />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={handleDownloadReport}>
          <FileText className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button onClick={handleViewFullAnalysis}>
          <BarChart className="h-4 w-4 mr-2" />
          View Full Analysis
        </Button>
      </div>
    </div>
  );
};

export default ResultsTab;
