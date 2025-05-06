
import React from 'react';
import { Card } from "@/components/ui/card";

interface DataSummaryCardsProps {
  data: any;
}

const DataSummaryCards: React.FC<DataSummaryCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
      <Card className="p-3 bg-muted/50">
        <div className="text-sm font-medium">Data Summary</div>
        <ul className="text-xs space-y-1 mt-1">
          <li>Features: {data.features.length}</li>
          <li>
            Types: {
              [...new Set(data.features.map((f: any) => f.geometry.type))].join(', ')
            }
          </li>
          <li>
            Properties: {
              Object.keys(data.features[0]?.properties || {}).length
            } fields per feature
          </li>
        </ul>
      </Card>
      
      <Card className="p-3 bg-muted/50">
        <div className="text-sm font-medium">Available Analyses</div>
        <ul className="text-xs space-y-1 mt-1">
          <li>Mineral density visualization</li>
          <li>Property correlation analysis</li>
          <li>Geographic distribution charts</li>
        </ul>
      </Card>
    </div>
  );
};

export default DataSummaryCards;
