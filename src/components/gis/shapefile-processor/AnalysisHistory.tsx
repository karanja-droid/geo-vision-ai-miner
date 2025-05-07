
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { GeoAnalysisResult } from '@/types/datasets';

interface AnalysisHistoryProps {
  analysisResults: GeoAnalysisResult[];
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ analysisResults }) => {
  console.log("Rendering AnalysisHistory component", { resultCount: analysisResults.length });
  
  if (analysisResults.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium flex items-center">
        <Activity className="h-5 w-5 mr-2" />
        Analysis History
      </h3>
      <div className="space-y-2">
        {analysisResults.map((result, index) => (
          <Card key={index} className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{result.type.charAt(0).toUpperCase() + result.type.slice(1)} Analysis</h4>
                <p className="text-xs text-muted-foreground">
                  {new Date(result.metadata.timestamp).toLocaleString()}
                </p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
