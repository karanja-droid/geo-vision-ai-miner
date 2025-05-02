
import React from 'react';
import { Dataset } from '@/data/datasetLibraryData';
import { Badge } from "@/components/ui/badge";
import { MapPin, Database, FileBadge } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DatasetVisualizationProps {
  dataset: Dataset;
  className?: string;
}

export const DatasetVisualization: React.FC<DatasetVisualizationProps> = ({
  dataset,
  className = ''
}) => {
  // Determine what type of visualization to show based on dataset format
  const renderVisualization = () => {
    switch (dataset.format) {
      case 'GeoJSON':
      case 'GeoTIFF':
      case 'Shapefile':
        return renderMapVisualization();
      case 'CSV':
      case 'Excel':
        return renderTabularVisualization();
      default:
        return renderDefaultVisualization();
    }
  };
  
  // Visualization for geospatial data
  const renderMapVisualization = () => {
    return (
      <div className="relative h-full w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {/* Simulated map visualization */}
        <div className="absolute inset-0">
          {/* Grid pattern to simulate a map */}
          <div className="h-full w-full grid grid-cols-12 grid-rows-8">
            {Array(96).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="border border-slate-200 dark:border-slate-700"
              ></div>
            ))}
          </div>
          
          {/* Add a simulated feature at the dataset coordinates */}
          <div 
            className="absolute w-6 h-6 rounded-full bg-primary/20 border-2 border-primary animate-pulse"
            style={{ 
              left: `${(dataset.coordinates[1] + 180) / 360 * 100}%`, 
              top: `${(90 - dataset.coordinates[0]) / 180 * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
        
        {/* Overlay with dataset details */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center text-white">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {dataset.coordinates[0].toFixed(4)}°, {dataset.coordinates[1].toFixed(4)}°
            </span>
            <Badge className="ml-2" variant="outline">
              {dataset.country}
            </Badge>
          </div>
        </div>
      </div>
    );
  };
  
  // Visualization for tabular data
  const renderTabularVisualization = () => {
    return (
      <div className="h-full w-full bg-slate-100 dark:bg-slate-800 p-4 overflow-hidden">
        <div className="flex items-center mb-2">
          <Database className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Tabular Data Preview</span>
        </div>
        
        <ScrollArea className="h-[calc(100%-2rem)]">
          {/* Simulated table visualization */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden min-w-[500px]">
            <div className="bg-slate-200 dark:bg-slate-700 p-2">
              <div className="grid grid-cols-4">
                {['ID', 'Name', 'Type', 'Value'].map((header, i) => (
                  <div key={i} className="text-xs font-medium">{header}</div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800">
              {Array(15).fill(0).map((_, i) => (
                <div key={i} className="grid grid-cols-4 p-2 border-b border-slate-100 dark:border-slate-700">
                  {[`${i+1}`, `Sample ${i+1}`, i % 2 === 0 ? 'Primary' : 'Secondary', ((i+1) * 15.7).toFixed(1)].map((cell, j) => (
                    <div key={j} className="text-xs truncate">{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        <div className="mt-2 text-xs text-muted-foreground">
          Showing 15 of 1,000+ records
        </div>
      </div>
    );
  };
  
  // Default visualization for other formats
  const renderDefaultVisualization = () => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 p-4">
        <FileBadge className="h-12 w-12 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">{dataset.format} Dataset</h3>
        <p className="text-sm text-muted-foreground text-center mt-2">
          {dataset.name}<br />
          {dataset.size} • {dataset.date}
        </p>
      </div>
    );
  };
  
  return (
    <div className={`h-full w-full ${className}`}>
      {renderVisualization()}
    </div>
  );
};
