
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from '@/types';

interface RecentAnalysisCardProps {
  results: AnalysisResult[];
  mostRecentDate: string;
}

const RecentAnalysisCard: React.FC<RecentAnalysisCardProps> = ({ results, mostRecentDate }) => {
  // Function to get mineral color
  const getMineralColor = (mineral?: string): string => {
    switch(mineral) {
      case 'copper': return 'bg-mineral-copper text-white';
      case 'cobalt': return 'bg-mineral-cobalt text-white';
      case 'gold': return 'bg-mineral-gold text-black';
      case 'iron': return 'bg-mineral-iron text-white';
      case 'zinc': return 'bg-mineral-zinc text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Most Recent Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="text-sm text-muted-foreground">Date:</span>
            <span className="ml-2">{mostRecentDate}</span>
          </div>
          {results.length > 0 && (
            <>
              <div>
                <span className="text-sm text-muted-foreground">Model Type:</span>
                <span className="ml-2">{results[0].modelType}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Mineral:</span>
                <Badge className={`ml-2 ${getMineralColor(results[0].mineralType)}`}>
                  {results[0].mineralType}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="ml-2">{(Number(results[0].confidence) * 100).toFixed(1)}%</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAnalysisCard;
