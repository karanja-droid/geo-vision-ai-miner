
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FileDown } from "lucide-react";
import { ExportOptions, ExportFormat, ReportTemplate } from '@/types/datasets';

// Import refactored components
import FormatTab from './FormatTab';
import ContentTab from './ContentTab';
import StylingTab from './StylingTab';
import DataSummaryCards from './DataSummaryCards';
import ProgressIndicator from './ProgressIndicator';

interface ReportGeneratorProps {
  data: any;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data }) => {
  const { toast } = useToast();
  const [format, setFormat] = useState<string>("geojson");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("format");
  const [options, setOptions] = useState<ExportOptions>({
    includeMetadata: true,
    includeAnalysis: true,
    includeRawData: false,
    format: "geojson",
    resolution: "medium",
    compression: 0.7,
    template: "professional"
  });

  const exportFormats: ExportFormat[] = [
    { type: 'geojson', mimeType: 'application/json', extension: 'geojson', description: 'GeoJSON format for geographic data' },
    { type: 'csv', mimeType: 'text/csv', extension: 'csv', description: 'Comma-separated values for spreadsheet applications' },
    { type: 'shapefile', mimeType: 'application/octet-stream', extension: 'zip', description: 'Zipped Shapefile for GIS applications' },
    { type: 'kml', mimeType: 'application/vnd.google-earth.kml+xml', extension: 'kml', description: 'KML format for Google Earth' },
    { type: 'geotiff', mimeType: 'image/tiff', extension: 'tiff', description: 'GeoTIFF raster format' },
    { type: 'chart', mimeType: 'application/pdf', extension: 'pdf', description: 'PDF with analysis charts and maps' },
    { type: 'visualization', mimeType: 'application/pdf', extension: 'pdf', description: 'Interactive visualization report' },
    { type: 'excel', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: 'xlsx', description: 'Excel spreadsheet with data tables and charts' },
    { type: 'web', mimeType: 'text/html', extension: 'html', description: 'Interactive HTML report for web sharing' },
  ];
  
  const reportTemplates: ReportTemplate[] = [
    { id: 'professional', name: 'Professional', description: 'Clean, corporate style with subtle branding' },
    { id: 'technical', name: 'Technical', description: 'Data-focused with detailed technical specifications' },
    { id: 'presentation', name: 'Presentation', description: 'Visually rich for stakeholder presentations' },
    { id: 'minimal', name: 'Minimal', description: 'Simplified layout focusing on essential data' },
  ];

  const handleOptionChange = (optionName: keyof ExportOptions, value: any) => {
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Report Generation</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="styling">Styling</TabsTrigger>
          </TabsList>
          
          <TabsContent value="format">
            <FormatTab 
              options={options}
              exportFormats={exportFormats}
              reportTemplates={reportTemplates}
              format={format}
              handleFormatChange={handleFormatChange}
              handleOptionChange={handleOptionChange}
            />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentTab 
              options={options}
              handleOptionChange={handleOptionChange}
            />
          </TabsContent>
          
          <TabsContent value="styling">
            <StylingTab />
          </TabsContent>
        </Tabs>

        <div className="pt-4 mt-4 border-t">
          {isGenerating ? (
            <ProgressIndicator 
              isGenerating={isGenerating}
              progress={progress}
              format={format}
            />
          ) : (
            <Button className="w-full" onClick={generateReport}>
              <FileDown className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          )}
        </div>
          
        <DataSummaryCards data={data} />
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
