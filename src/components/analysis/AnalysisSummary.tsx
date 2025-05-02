
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartPie, Download } from "lucide-react";
import { AnalysisResult } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface AnalysisSummaryProps {
  results: AnalysisResult[];
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ results }) => {
  // Function to format timestamp
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  // Prepare summary statistics
  const totalAnomalies = results.reduce((acc, result) => acc + result.data.anomalies, 0);
  const avgConfidence = results.length > 0 
    ? parseFloat((results.reduce((acc, result) => acc + Number(result.confidence), 0) / results.length * 100).toFixed(1)) 
    : 0;
  const hotspotCount = results.reduce((acc, result) => acc + (result.data.hotspots?.length || 0), 0);
  const mostRecentDate = results.length > 0 
    ? formatDate(results.reduce((latest, result) => 
        new Date(result.timestamp) > new Date(latest) ? result.timestamp : latest, 
        results[0].timestamp)) 
    : 'N/A';

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{totalAnomalies}</div>
              <p className="text-sm text-muted-foreground">Total Anomalies</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{avgConfidence}%</div>
              <p className="text-sm text-muted-foreground">Avg. Confidence</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{hotspotCount}</div>
              <p className="text-sm text-muted-foreground">Hotspots</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{results.length}</div>
              <p className="text-sm text-muted-foreground">Analyses</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Summary Report
        </Button>
      </div>
    </div>
  );
};

export default AnalysisSummary;
