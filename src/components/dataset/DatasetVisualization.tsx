
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Database, FileType, HardDrive } from "lucide-react";
import { Dataset } from '@/data/datasetLibraryData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DatasetVisualizationProps {
  dataset: Dataset;
}

// Generate sample data based on dataset properties
const generateVisualizationData = (dataset: Dataset) => {
  // Create sample data points using dataset properties as seeds
  const dataPoints = [];
  const seedValue = dataset.name.length + dataset.description.length;
  
  for (let i = 0; i < 10; i++) {
    const baseValue = (seedValue * (i + 1)) % 100;
    dataPoints.push({
      name: `Point ${i + 1}`,
      value: baseValue + Math.floor(Math.random() * 20),
      average: 50 + (dataset.tags.length * 5) % 20,
    });
  }
  
  return dataPoints;
};

export const DatasetVisualization: React.FC<DatasetVisualizationProps> = ({ dataset }) => {
  const visualizationData = generateVisualizationData(dataset);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map Preview */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-muted relative">
            <div className="absolute inset-0 grid-pattern"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-medium">{dataset.country}</div>
                <div className="text-xs text-muted-foreground">
                  {dataset.coordinates[0].toFixed(4)}, {dataset.coordinates[1].toFixed(4)}
                </div>
              </div>
            </div>
            
            {/* Simulated dataset coverage area */}
            <div className="absolute left-1/4 top-1/4 w-24 h-24 rounded-full bg-primary/20 animate-pulse-slow"></div>
          </div>
          <div className="p-3 border-t">
            <h3 className="font-medium text-sm mb-1">Geographic Information</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" /> {dataset.country} • Region {dataset.id.charAt(0).toUpperCase() + dataset.id.slice(1, 3)}
            </div>
          </div>
        </Card>
        
        {/* Dataset Info Card */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center">
            <Database className="h-4 w-4 mr-2 text-primary" /> Dataset Overview
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-1 border-b border-muted">
              <div className="flex items-center text-sm">
                <FileType className="h-4 w-4 mr-2 text-muted-foreground" /> Format
              </div>
              <Badge>{dataset.format}</Badge>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-muted">
              <div className="flex items-center text-sm">
                <HardDrive className="h-4 w-4 mr-2 text-muted-foreground" /> Size
              </div>
              <span className="text-sm">{dataset.size}</span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-muted">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" /> Added
              </div>
              <span className="text-sm">{dataset.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <Database className="h-4 w-4 mr-2 text-muted-foreground" /> Source
              </div>
              <span className="text-sm">{dataset.source}</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Data Visualization Chart - Fixed the overflow issues */}
      <Card className="p-4 overflow-hidden">
        <h3 className="font-medium mb-3">Data Visualization</h3>
        <div className="h-64 w-full">
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "#8B5CF6",
              },
              average: {
                label: "Average",
                color: "#94A3B8",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visualizationData}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis 
                  dataKey="name" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ 
                    fontSize: 10,
                    width: 20,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="var(--color-average)"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="text-xs text-center mt-2 text-muted-foreground">
          Visualization of {dataset.name} dataset
        </div>
      </Card>
    </div>
  );
};

export default DatasetVisualization;
