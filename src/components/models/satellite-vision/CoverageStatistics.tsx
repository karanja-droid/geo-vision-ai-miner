
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CoverageStatisticsProps {
  statistics: {
    areaAnalyzed: string;
    anomaliesDetected: number;
    featurePoints: number;
    confidenceScore: string;
    africanConfidence?: string;
  };
}

const CoverageStatistics: React.FC<CoverageStatisticsProps> = ({ statistics }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Coverage Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Area Analyzed</p>
            <p className="text-lg font-medium">{statistics.areaAnalyzed} km²</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Anomalies Detected</p>
            <p className="text-lg font-medium">{statistics.anomaliesDetected}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Feature Points</p>
            <p className="text-lg font-medium">{statistics.featurePoints}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Confidence Score</p>
            <p className="text-lg font-medium">{statistics.confidenceScore}%</p>
          </div>
          
          {statistics.africanConfidence && (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">African Context Confidence</p>
              <p className="text-lg font-medium text-amber-600">{statistics.africanConfidence}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverageStatistics;
