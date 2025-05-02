
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from '@/types';

interface AnalysisBreakdownCardProps {
  results: AnalysisResult[];
}

const AnalysisBreakdownCard: React.FC<AnalysisBreakdownCardProps> = ({ results }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Analysis Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Prediction Models:</span>
            <Badge variant="outline">
              {results.filter(r => r.modelType === 'prediction').length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Classification Models:</span>
            <Badge variant="outline">
              {results.filter(r => r.modelType === 'classification').length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">High Confidence (&gt;80%):</span>
            <Badge variant="outline">
              {results.filter(r => Number(r.confidence) > 0.8).length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Layers Analyzed:</span>
            <Badge variant="outline">
              {new Set(results.map(r => r.layerId)).size}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisBreakdownCard;
