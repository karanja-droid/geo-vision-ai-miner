
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText } from "lucide-react";

interface ExportOptionsProps {
  results?: any;
  onExport?: (format: string, options: any) => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ results, onExport }) => {
  const { toast } = useToast();
  const [format, setFormat] = useState<string>("geojson");
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(true);
  const [includeAnalysis, setIncludeAnalysis] = useState<boolean>(true);
  const [includeRawData, setIncludeRawData] = useState<boolean>(false);
  
  const handleExport = () => {
    if (!results) {
      toast({
        title: "No data to export",
        description: "Please run an analysis first to generate exportable data.",
        variant: "destructive",
      });
      return;
    }
    
    const options = {
      includeMetadata,
      includeAnalysis,
      includeRawData
    };
    
    if (onExport) {
      onExport(format, options);
    } else {
      // Default export behavior
      const exportData = prepareExportData(results, options);
      downloadData(exportData, format);
      
      toast({
        title: "Export successful",
        description: `Data exported in ${format.toUpperCase()} format.`,
      });
    }
  };
  
  const prepareExportData = (data: any, options: any) => {
    // This is a simplified implementation
    let exportData: any = {};
    
    if (options.includeRawData) {
      exportData.rawData = data;
    }
    
    if (options.includeMetadata) {
      exportData.metadata = {
        timestamp: new Date().toISOString(),
        dataType: "geological_analysis",
        version: "1.0",
      };
    }
    
    if (options.includeAnalysis) {
      exportData.analysis = {
        anomalies: data.reduce((acc: number, result: any) => acc + result.data.anomalies, 0),
        confidence: data.length > 0 ? data.reduce((acc: number, result: any) => acc + result.confidence, 0) / data.length : 0,
        hotspots: data.flatMap((result: any) => result.data.hotspots || []),
      };
    }
    
    return exportData;
  };
  
  const downloadData = (data: any, format: string) => {
    let downloadContent;
    let mimeType;
    let fileExtension;
    
    switch (format) {
      case "csv":
        // Convert to CSV (simplified)
        downloadContent = "data:text/csv;charset=utf-8,Type,Value\n";
        Object.entries(data).forEach(([key, value]) => {
          downloadContent += `${key},${value}\n`;
        });
        mimeType = "text/csv";
        fileExtension = "csv";
        break;
      
      case "shapefile":
        // In a real app, this would be more complex and likely use a library
        downloadContent = JSON.stringify(data);
        mimeType = "application/octet-stream";
        fileExtension = "zip"; // Shapefiles are typically zipped
        break;
      
      case "kml":
        // Simplified KML generation
        downloadContent = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2">\n<Document>\n<name>Geological Analysis</name>\n</Document>\n</kml>`;
        mimeType = "application/vnd.google-earth.kml+xml";
        fileExtension = "kml";
        break;
      
      case "geotiff":
        // This would require actual raster processing in a real app
        downloadContent = "Sample GeoTIFF content";
        mimeType = "application/octet-stream";
        fileExtension = "tiff";
        break;
      
      case "geojson":
      default:
        downloadContent = JSON.stringify(data, null, 2);
        mimeType = "application/json";
        fileExtension = "geojson";
    }
    
    // Create download link
    const link = document.createElement("a");
    const blob = new Blob([downloadContent], { type: mimeType });
    link.href = URL.createObjectURL(blob);
    link.download = `geological_analysis_${new Date().getTime()}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <FileText className="h-5 w-5 mr-2" />
          Export Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Export Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geojson">GeoJSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="shapefile">Shapefile</SelectItem>
                <SelectItem value="kml">KML</SelectItem>
                <SelectItem value="geotiff">GeoTIFF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Include in Export</label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="metadata" 
                checked={includeMetadata} 
                onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)} 
              />
              <label htmlFor="metadata" className="text-sm cursor-pointer">
                Include metadata
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="analysis" 
                checked={includeAnalysis} 
                onCheckedChange={(checked) => setIncludeAnalysis(checked as boolean)} 
              />
              <label htmlFor="analysis" className="text-sm cursor-pointer">
                Include analysis results
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rawData" 
                checked={includeRawData} 
                onCheckedChange={(checked) => setIncludeRawData(checked as boolean)} 
              />
              <label htmlFor="rawData" className="text-sm cursor-pointer">
                Include raw dataset
              </label>
            </div>
          </div>
          
          <Button className="w-full" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          
          <p className="text-xs text-muted-foreground mt-2">
            {format === 'geojson' && "GeoJSON format includes geographic features with associated attributes and is compatible with most GIS software."}
            {format === 'csv' && "CSV format is a simple table format that can be opened in spreadsheet applications like Excel."}
            {format === 'shapefile' && "Shapefile is a popular geospatial vector data format for geographic information system software."}
            {format === 'kml' && "KML format is used to display geographic data in Earth browsers such as Google Earth and Google Maps."}
            {format === 'geotiff' && "GeoTIFF is a raster format that includes spatial reference information embedded in the file."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
