
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ModelInfoAlert from './ModelInfo';
import { ModelInfo } from '@/types/models';

interface AnalysisOptions {
  dataSource: string;
  resolution: string;
  depth: string;
  spectralBands: string[];
}

interface ConfigurationTabProps {
  analysisOptions: AnalysisOptions;
  handleOptionChange: (key: keyof AnalysisOptions, value: any) => void;
  handleSpectralBandToggle: (band: string) => void;
  modelInfo: ModelInfo;
}

const ConfigurationTab: React.FC<ConfigurationTabProps> = ({
  analysisOptions,
  handleOptionChange,
  handleSpectralBandToggle,
  modelInfo
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Data Source</label>
          <Select 
            value={analysisOptions.dataSource}
            onValueChange={(value) => handleOptionChange("dataSource", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="landsat-8">Landsat 8</SelectItem>
              <SelectItem value="landsat-9">Landsat 9</SelectItem>
              <SelectItem value="sentinel-2">Sentinel-2</SelectItem>
              <SelectItem value="worldview-3">WorldView-3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Resolution</label>
          <Select 
            value={analysisOptions.resolution}
            onValueChange={(value) => handleOptionChange("resolution", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (30m)</SelectItem>
              <SelectItem value="medium">Medium (15m)</SelectItem>
              <SelectItem value="high">High (5m)</SelectItem>
              <SelectItem value="very-high">Very High (1m)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Analysis Depth</label>
          <Select 
            value={analysisOptions.depth}
            onValueChange={(value) => handleOptionChange("depth", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select analysis depth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shallow">Shallow (Fast)</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="deep">Deep (Comprehensive)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Spectral Bands</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["visible", "near-ir", "short-ir", "thermal-ir", "red-edge"].map(band => (
              <Badge 
                key={band}
                variant={analysisOptions.spectralBands.includes(band) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSpectralBandToggle(band)}
              >
                {band}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <ModelInfoAlert modelInfo={modelInfo} />
    </div>
  );
};

export default ConfigurationTab;
