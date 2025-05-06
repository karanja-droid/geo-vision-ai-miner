
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface MineralsChartProps {
  minerals: {
    ironOxide: number;
    copperSulfide: number; 
    silicates: number;
  };
}

const MineralsChart: React.FC<MineralsChartProps> = ({ minerals }) => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-2">Detected Minerals</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Iron Oxide</span>
          <span className="font-medium">{minerals.ironOxide}%</span>
        </div>
        <Progress value={minerals.ironOxide} className="h-1.5" />
        
        <div className="flex justify-between">
          <span>Copper Sulfide</span>
          <span className="font-medium">{minerals.copperSulfide}%</span>
        </div>
        <Progress value={minerals.copperSulfide} className="h-1.5" />
        
        <div className="flex justify-between">
          <span>Silicates</span>
          <span className="font-medium">{minerals.silicates}%</span>
        </div>
        <Progress value={minerals.silicates} className="h-1.5" />
      </div>
    </div>
  );
};

export default MineralsChart;
