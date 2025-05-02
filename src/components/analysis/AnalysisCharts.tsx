
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, FileSpreadsheet, Download } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AnalysisResult } from '@/types/analysis';
import { 
  AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';

interface AnalysisChartsProps {
  results: AnalysisResult[];
}

const AnalysisCharts: React.FC<AnalysisChartsProps> = ({ results }) => {
  // Prepare chart data
  const confidenceData = results.map(result => ({
    name: result.id,
    confidence: parseFloat((Number(result.confidence) * 100).toFixed(1)),
    mineral: result.mineralType,
    timestamp: new Date(result.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric' })
  }));

  const anomaliesOverTime = results.map(result => ({
    date: new Date(result.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric' }),
    anomalies: result.data.anomalies,
    mineral: result.mineralType
  }));

  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ChartBar className="h-5 w-5 mr-2" />
            Confidence Levels by Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer 
              config={{
                copper: { color: '#d32f2f' },
                cobalt: { color: '#5c6bc0' },
                gold: { color: '#ffc107' },
                iron: { color: '#795548' },
                zinc: { color: '#607d8b' },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={confidenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <RechartsTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="confidence" name="Confidence %" fill="var(--color-copper)" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Anomalies Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer 
              config={{
                anomalies: { color: '#ff9800' },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={anomaliesOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="anomalies" 
                    fill="var(--color-anomalies)" 
                    stroke="var(--color-anomalies)" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Charts
        </Button>
        <Button size="sm">
          View More Analytics
        </Button>
      </div>
    </div>
  );
};

export default AnalysisCharts;
