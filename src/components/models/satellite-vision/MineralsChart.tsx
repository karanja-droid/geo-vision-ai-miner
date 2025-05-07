
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MineralsChartProps {
  minerals: {
    ironOxide: number;
    copperSulfide: number;
    silicates: number;
    goldIndicators?: number;
    diamondIndicators?: number;
    cobaltIndicators?: number;
  };
}

const MineralsChart: React.FC<MineralsChartProps> = ({ minerals }) => {
  // Transform the data into the format expected by the chart
  const data = [
    { name: 'Iron Oxide', value: minerals.ironOxide, color: '#e57373' },
    { name: 'Copper Sulfide', value: minerals.copperSulfide, color: '#64b5f6' },
    { name: 'Silicates', value: minerals.silicates, color: '#fff176' }
  ];
  
  // Add African-specific minerals if present
  if (minerals.goldIndicators) {
    data.push({ name: 'Gold Indicators', value: minerals.goldIndicators, color: '#ffd700' });
  }
  
  if (minerals.diamondIndicators) {
    data.push({ name: 'Diamond Indicators', value: minerals.diamondIndicators, color: '#b2ebf2' });
  }
  
  if (minerals.cobaltIndicators) {
    data.push({ name: 'Cobalt Indicators', value: minerals.cobaltIndicators, color: '#9575cd' });
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Mineral Signatures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Presence']} 
                labelFormatter={(label) => `${label} Signature`}
              />
              <Bar dataKey="value" name="Presence" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const Cell = (props: any) => {
  const { fill, x, y, width, height } = props;
  
  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} radius={[4, 4, 0, 0]} />
  );
};

export default MineralsChart;
