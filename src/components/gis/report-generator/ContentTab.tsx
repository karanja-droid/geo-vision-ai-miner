
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ExportOptions } from '@/types/datasets';

interface ContentTabProps {
  options: ExportOptions;
  handleOptionChange: (optionName: keyof ExportOptions, value: any) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ options, handleOptionChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="text-sm font-medium">Report Options</label>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="metadata" 
            checked={options.includeMetadata}
            onCheckedChange={(checked) => handleOptionChange('includeMetadata', !!checked)} 
          />
          <label htmlFor="metadata" className="text-sm cursor-pointer">
            Include metadata (projection, source, attributes)
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="analysis" 
            checked={options.includeAnalysis}
            onCheckedChange={(checked) => handleOptionChange('includeAnalysis', !!checked)}
          />
          <label htmlFor="analysis" className="text-sm cursor-pointer">
            Include AI analysis and insights
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="rawData" 
            checked={options.includeRawData}
            onCheckedChange={(checked) => handleOptionChange('includeRawData', !!checked)}
          />
          <label htmlFor="rawData" className="text-sm cursor-pointer">
            Include raw feature data
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="maps" 
            checked={options.includeMaps ?? true}
            onCheckedChange={(checked) => handleOptionChange('includeMaps', !!checked)}
          />
          <label htmlFor="maps" className="text-sm cursor-pointer">
            Include map visualizations
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="charts" 
            checked={options.includeCharts ?? true}
            onCheckedChange={(checked) => handleOptionChange('includeCharts', !!checked)}
          />
          <label htmlFor="charts" className="text-sm cursor-pointer">
            Include charts and graphs
          </label>
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="text-sm font-medium">Compression</label>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">File Size Optimization</span>
            <span className="text-xs text-muted-foreground">
              {Math.round(options.compression * 100)}%
            </span>
          </div>
          <Slider
            value={[options.compression]}
            min={0.1}
            max={1.0}
            step={0.1}
            onValueChange={([value]) => handleOptionChange('compression', value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Higher compression = smaller file size, potentially lower quality
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
