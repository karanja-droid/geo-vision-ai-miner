
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  FileDown, 
  FileText, 
  Table, 
  Map as MapIcon, 
  BarChart, 
  FileBarChart,
  FileLineChart, 
  FileBarChart2,
  Settings,
  PaintBucket,
  Layers
} from "lucide-react";
import { ExportOptions, ExportFormat, ReportTemplate } from '@/types/datasets';

interface ShapefileReportGeneratorProps {
  data: any;
}

const ShapefileReportGenerator: React.FC<ShapefileReportGeneratorProps> = ({ data }) => {
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
      case 'excel':
        return <Table className="h-4 w-4 mr-2" />;
      case 'web':
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
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
          
          <TabsContent value="format" className="space-y-4">
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Template</label>
              <Select 
                value={options.template} 
                onValueChange={(value) => handleOptionChange('template', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {reportTemplates.find(t => t.id === options.template)?.description}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Resolution Settings</label>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Image Quality</span>
                  <span className="text-xs text-muted-foreground">
                    {options.resolution === 'low' ? 'Low' : 
                     options.resolution === 'medium' ? 'Medium' : 'High'}
                  </span>
                </div>
                <Select
                  value={options.resolution}
                  onValueChange={(value) => handleOptionChange('resolution', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Faster)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High (Detailed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="styling" className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Brand Customization</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Primary Color</label>
                  <div className="flex items-center">
                    <PaintBucket className="h-4 w-4 mr-2 text-primary" />
                    <Select defaultValue="blue">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="gray">Gray</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Font Family</label>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <Select defaultValue="sans">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sans">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Map Layer Style</label>
                <div className="flex items-center">
                  <Layers className="h-4 w-4 mr-2" />
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Advanced Settings</label>
              <Button variant="outline" className="w-full" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure Layout & Elements
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 mt-4 border-t">
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
        </div>
          
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
      </CardContent>
    </Card>
  );
};

export default ShapefileReportGenerator;
