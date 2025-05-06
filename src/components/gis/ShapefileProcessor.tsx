
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileDown, Map, AlertTriangle, Check } from "lucide-react";
import ShapefileViewer from './ShapefileViewer';
import ShapefileReportGenerator from './ShapefileReportGenerator';

const ShapefileProcessor: React.FC = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedData, setProcessedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const shapefiles = selectedFiles.filter(file => 
        file.name.endsWith('.shp') || 
        file.name.endsWith('.dbf') || 
        file.name.endsWith('.shx') || 
        file.name.endsWith('.prj')
      );
      
      setFiles(shapefiles);
      
      if (shapefiles.length === 0) {
        toast({
          variant: "destructive",
          title: "Invalid files",
          description: "Please select valid shapefile components (.shp, .dbf, .shx, .prj)"
        });
      }
    }
  };

  const processShapefiles = () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select shapefile components to process"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Mock processed data
          const mockProcessedData = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [[[27.5, -12.5], [28.5, -12.5], [28.5, -13.5], [27.5, -13.5], [27.5, -12.5]]]
                },
                properties: {
                  name: "Copperbelt Province",
                  population: 2382895,
                  mineralDeposits: "Copper, Cobalt",
                  explorationStatus: "Active"
                }
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [28.2, -12.8]
                },
                properties: {
                  name: "Mining Site A",
                  minerals: "Copper",
                  status: "Operational",
                  output: "450000 tons/year"
                }
              }
            ]
          };
          
          setProcessedData(mockProcessedData);
          setActiveTab("view");
          
          toast({
            title: "Processing complete",
            description: "Shapefile data has been successfully processed"
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>GIS Shapefile Processor</CardTitle>
        <CardDescription>
          Upload and process geological shapefiles for analysis and reporting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="view" disabled={!processedData}>View</TabsTrigger>
            <TabsTrigger value="report" disabled={!processedData}>Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <Alert className="bg-muted">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Shapefile Requirements</AlertTitle>
              <AlertDescription>
                Please upload all required shapefile components (.shp, .dbf, .shx, and .prj files)
              </AlertDescription>
            </Alert>
            
            <div className="border-2 border-dashed rounded-lg p-8 text-center mt-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload Shapefiles</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop shapefile components or click to browse
              </p>
              <input
                type="file"
                id="shapefile-upload"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
              <Button asChild>
                <label htmlFor="shapefile-upload">Select Files</label>
              </Button>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Selected Files ({files.length})</h4>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
                
                {isProcessing ? (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-center text-muted-foreground">
                      Processing shapefiles... {progress}%
                    </p>
                  </div>
                ) : (
                  <Button onClick={processShapefiles} className="w-full">
                    Process Shapefiles
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="view">
            {processedData && <ShapefileViewer data={processedData} />}
          </TabsContent>
          
          <TabsContent value="report">
            {processedData && <ShapefileReportGenerator data={processedData} />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShapefileProcessor;
