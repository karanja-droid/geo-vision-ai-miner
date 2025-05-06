
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  FileDown, 
  FileText, 
  Table, 
  Map as MapIcon, 
  BarChart, 
  FileBarChart,
  FileLineChart, 
  FileBarChart2
} from "lucide-react";
import { ExportOptions, ExportFormat } from '@/types/datasets';

interface ShapefileReportGeneratorProps {
  data: any;
}

const ShapefileReportGenerator: React.FC<ShapefileReportGeneratorProps> = ({ data }) => {
  const { toast } = useToast();
  const [format, setFormat] = useState<string>("geojson");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ExportOptions>({
    includeMetadata: true,
    includeAnalysis: true,
    includeRawData: false,
    format: "geojson"
  });

  const exportFormats: ExportFormat[] = [
    { type: 'geojson', mimeType: 'application/json', extension: 'geojson', description: 'GeoJSON format for geographic data' },
    { type: 'csv', mimeType: 'text/csv', extension: 'csv', description: 'Comma-separated values for spreadsheet applications' },
    { type: 'shapefile', mimeType: 'application/octet-stream', extension: 'zip', description: 'Zipped Shapefile for GIS applications' },
    { type: 'kml', mimeType: 'application/vnd.google-earth.kml+xml', extension: 'kml', description: 'KML format for Google Earth' },
    { type: 'geotiff', mimeType: 'image/tiff', extension: 'tiff', description: 'GeoTIFF raster format' },
    { type: 'chart', mimeType: 'application/pdf', extension: 'pdf', description: 'PDF with analysis charts and maps' },
    { type: 'visualization', mimeType: 'application/pdf', extension: 'pdf', description: 'Interactive visualization report' },
  ];

  const handleOptionChange = (optionName: keyof ExportOptions, value: boolean) => {
    setOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleFormatChange = (value: string) => {
    setFormat(value);
    setOptions(prev => ({
      ...prev,
      format: value
    }));
  };

  const generateReport = () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate report generation with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          toast({
            title: `${format.toUpperCase()} Report Generated`,
            description: "Your report has been successfully generated and downloaded",
          });
          
          // Simulate file download
          const link = document.createElement('a');
          link.href = '#';
          link.download = `shapefile_report_${new Date().getTime()}.${
            exportFormats.find(f => f.type === format)?.extension || 'file'
          }`;
          link.click();
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  const renderFormatIcon = (format: string) => {
    switch (format) {
      case 'geojson':
        return <MapIcon className="h-4 w-4 mr-2" />;
      case 'csv':
        return <Table className="h-4 w-4 mr-2" />;
      case 'shapefile':
        return <FileLineChart className="h-4 w-4 mr-2" />;
      case 'kml':
        return <MapIcon className="h-4 w-4 mr-2" />;
      case 'geotiff':
        return <FileBarChart2 className="h-4 w-4 mr-2" />;
      case 'chart':
        return <BarChart className="h-4 w-4 mr-2" />;
      case 'visualization':
        return <FileBarChart className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Format</label>
            <Select value={format} onValueChange={handleFormatChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {exportFormats.map((exportFormat) => (
                  <SelectItem key={exportFormat.type} value={exportFormat.type}>
                    <div className="flex items-center">
                      {renderFormatIcon(exportFormat.type)}
                      <span>{exportFormat.type.toUpperCase()}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {exportFormats.find(f => f.type === format)?.description}
            </p>
          </div>

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
          </div>
          
          {isGenerating ? (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Generating {format.toUpperCase()} report... {progress}%
              </p>
            </div>
          ) : (
            <Button className="w-full" onClick={generateReport}>
              <FileDown className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          )}
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ShapefileReportGenerator;
