
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartPie } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { AnalysisResult } from '@/types';

interface MineralDistributionChartProps {
  results: AnalysisResult[];
}

const MineralDistributionChart: React.FC<MineralDistributionChartProps> = ({ results }) => {
  // Chart data preparation
  const mineralDistribution = results.reduce((acc, result) => {
    const mineral = result.mineralType || 'unknown';
    const existingItem = acc.find(item => item.name === mineral);
    if (existingItem) {
      existingItem.value += 1;
    } else {
      acc.push({ name: mineral, value: 1 });
    }
    return acc;
  }, [] as { name: string, value: number }[]);

  // Color configuration for chart
  const COLORS = ['#d32f2f', '#5c6bc0', '#ffc107', '#795548', '#607d8b'];
  const mineralToColor: Record<string, string> = {
    copper: '#d32f2f',
    cobalt: '#5c6bc0',
    gold: '#ffc107',
    iron: '#795548',
    zinc: '#607d8b'
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <ChartPie className="h-5 w-5 mr-2" />
          Mineral Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mineralDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mineralDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={mineralToColor[entry.name] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background p-2 border rounded shadow-sm">
                      <p className="font-medium">{payload[0].name}</p>
                      <p className="text-sm">{`Count: ${payload[0].value}`}</p>
                      <p className="text-sm">{`Percentage: ${((payload[0].value / results.length) * 100).toFixed(1)}%`}</p>
                    </div>
                  );
                }
                return null;
              }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MineralDistributionChart;
