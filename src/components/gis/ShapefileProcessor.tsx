import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileDown, Map, AlertTriangle, Check, Activity } from "lucide-react";
import ShapefileViewer from './ShapefileViewer';
import ShapefileReportGenerator from './ShapefileReportGenerator';
import ShapefileAnalysis from './ShapefileAnalysis';
import { GeoAnalysisResult, ShapefileValidationResult } from '@/types/datasets';
import { validateGeoJSON } from '@/utils/gisOperations';

const ShapefileProcessor: React.FC = () => {
  console.log("Rendering ShapefileProcessor component");
  
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedData, setProcessedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [validationResult, setValidationResult] = useState<ShapefileValidationResult | null>(null);
  const [analysisResults, setAnalysisResults] = useState<GeoAnalysisResult[]>([]);

  useEffect(() => {
    console.log("ShapefileProcessor component mounted or updated");
    console.log("Current state:", { 
      filesCount: files.length, 
      isProcessing, 
      progress, 
      activeTab,
      hasProcessedData: processedData !== null,
      validationStatus: validationResult?.isValid,
      analysisResultsCount: analysisResults.length
    });
    
    return () => {
      console.log("ShapefileProcessor component unmounting");
    };
  }, [files, isProcessing, progress, processedData, activeTab, validationResult, analysisResults]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange triggered");
    
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      console.log("Selected files:", selectedFiles.map(f => ({name: f.name, size: f.size, type: f.type})));
      
      const shapefiles = selectedFiles.filter(file => 
        file.name.endsWith('.shp') || 
        file.name.endsWith('.dbf') || 
        file.name.endsWith('.shx') || 
        file.name.endsWith('.prj') ||
        file.name.endsWith('.zip') ||
        file.name.endsWith('.json') ||
        file.name.endsWith('.geojson')
      );
      
      console.log("Filtered shapefile components:", shapefiles.map(f => f.name));
      setFiles(shapefiles);
      
      // Testing empty file case
      if (shapefiles.length === 0) {
        console.warn("No valid shapefile components found");
        toast({
          variant: "destructive",
          title: "Invalid files",
          description: "Please select valid shapefile components (.shp, .dbf, .shx, .prj) or compressed formats (.zip, .geojson)"
        });
      } else {
        console.log(`${shapefiles.length} valid shapefile component(s) selected`);
      }
      
      // Reset processed data when new files are selected
      if (processedData) {
        console.log("Resetting processed data due to new file selection");
        setProcessedData(null);
        setValidationResult(null);
      }
    }
  };

  const validateShapefiles = (files: File[]): Promise<ShapefileValidationResult> => {
    console.log("validateShapefiles called with files:", files.map(f => f.name));
    
    // Testing edge cases with file types
    const hasShp = files.some(f => f.name.endsWith('.shp'));
    const hasDbf = files.some(f => f.name.endsWith('.dbf'));
    const hasShx = files.some(f => f.name.endsWith('.shx'));
    const hasPrj = files.some(f => f.name.endsWith('.prj'));
    const hasGeoJson = files.some(f => f.name.endsWith('.geojson') || f.name.endsWith('.json'));
    const hasZip = files.some(f => f.name.endsWith('.zip'));
    
    console.log("File type presence:", { hasShp, hasDbf, hasShx, hasPrj, hasGeoJson, hasZip });
    
    // In a real implementation, this would perform actual validation
    return new Promise((resolve) => {
      console.log("Starting validation simulation...");
      
      setTimeout(() => {
        // Generate warnings based on file types
        const warnings: string[] = [];
        
        if (!hasPrj && (hasShp || hasDbf || hasShx)) {
          warnings.push("Missing projection file (.prj)");
        }
        
        if (hasShp && !hasDbf) {
          warnings.push("Missing database file (.dbf)");
        }
        
        if (hasShp && !hasShx) {
          warnings.push("Missing index file (.shx)");
        }
        
        // Handle the case where files are provided but wouldn't be valid in real-world
        const isValid = hasGeoJson || hasZip || (hasShp && hasDbf && hasShx);
        
        // Show different validation results based on files
        const result: ShapefileValidationResult = {
          isValid,
          features: isValid ? 2 : 0,
          boundingBox: isValid ? [27.5, -13.5, 28.5, -12.5] : [0, 0, 0, 0],
          crs: isValid ? "EPSG:4326" : undefined,
          warnings,
          errors: !isValid ? ["Incomplete or invalid shapefile components"] : undefined
        };
        
        console.log("Validation result:", result);
        resolve(result);
      }, 1000);
    });
  };

  const processShapefiles = async () => {
    console.log("processShapefiles called");
    
    if (files.length === 0) {
      console.warn("No files selected for processing");
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select shapefile components to process"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    console.log("Starting processing simulation...");

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 50) {
          clearInterval(interval);
          console.log("Processing phase 1 complete, starting validation");
          
          // Validate the shapefiles
          validateShapefiles(files).then(result => {
            setValidationResult(result);
            console.log(`Validation ${result.isValid ? 'succeeded' : 'failed'}`);
            
            if (result.isValid) {
              // Continue processing
              const secondInterval = setInterval(() => {
                setProgress(prev => {
                  if (prev >= 100) {
                    clearInterval(secondInterval);
                    setIsProcessing(false);
                    console.log("Processing complete");
                    
                    // Mock processed data - testing edge case with empty data
                    let mockProcessedData;
                    
                    // Test if we're providing a proper GeoJSON object
                    mockProcessedData = {
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
                    
                    // Validate the mock data with our utility
                    const validationCheck = validateGeoJSON(mockProcessedData);
                    console.log("Processed data validation:", validationCheck);
                    
                    setProcessedData(mockProcessedData);
                    setActiveTab("view");
                    
                    toast({
                      title: "Processing complete",
                      description: "Shapefile data has been successfully processed"
                    });
                    
                    return 100;
                  }
                  return prev + 5;
                });
              }, 100);
            } else {
              // Stop processing due to validation failure
              setIsProcessing(false);
              setProgress(0);
              console.error("Processing stopped due to validation failure");
              
              toast({
                variant: "destructive",
                title: "Validation failed",
                description: "Shapefile contains errors and cannot be processed"
              });
            }
          });
          
          return 50;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleAnalysisComplete = (result: GeoAnalysisResult) => {
    console.log("Analysis complete:", result);
    setAnalysisResults(prev => [...prev, result]);
    
    // In a real implementation, we might update the processed data with the analysis results
    // For now, we'll just show a toast notification
    toast({
      title: `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} Analysis Complete`,
      description: `Analysis completed in ${result.metadata.executionTime.toFixed(2)}s`
    });
  };

  const handleTabChange = (value: string) => {
    console.log(`Tab changed to: ${value}`);
    setActiveTab(value);
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
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="view" disabled={!processedData}>View</TabsTrigger>
            <TabsTrigger value="analyze" disabled={!processedData}>Analyze</TabsTrigger>
            <TabsTrigger value="report" disabled={!processedData}>Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <Alert className="bg-muted">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Shapefile Requirements</AlertTitle>
              <AlertDescription>
                Upload individual shapefile components (.shp, .dbf, .shx, .prj), a ZIP archive containing all components, or GeoJSON files
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
                      {progress < 50 ? "Parsing shapefiles..." : "Validating and processing data..."} {progress}%
                    </p>
                  </div>
                ) : (
                  <Button onClick={processShapefiles} className="w-full">
                    Process Shapefiles
                  </Button>
                )}
                
                {validationResult && (
                  <Alert className={validationResult.isValid ? "bg-success/20" : "bg-destructive/20"}>
                    <AlertTitle className={validationResult.isValid ? "text-success" : "text-destructive"}>
                      {validationResult.isValid ? "Validation Successful" : "Validation Failed"}
                    </AlertTitle>
                    <AlertDescription>
                      <div className="text-sm">
                        <p>Features: {validationResult.features}</p>
                        <p>CRS: {validationResult.crs || "Unknown"}</p>
                        {validationResult.warnings && validationResult.warnings.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-amber-600">Warnings:</p>
                            <ul className="list-disc pl-5">
                              {validationResult.warnings.map((warning, i) => (
                                <li key={i} className="text-amber-600 text-xs">{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {validationResult.errors && validationResult.errors.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-destructive">Errors:</p>
                            <ul className="list-disc pl-5">
                              {validationResult.errors.map((error, i) => (
                                <li key={i} className="text-destructive text-xs">{error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="view">
            {processedData && <ShapefileViewer data={processedData} />}
          </TabsContent>
          
          <TabsContent value="analyze">
            {processedData && (
              <div className="space-y-6">
                <ShapefileAnalysis 
                  data={processedData} 
                  onAnalysisComplete={handleAnalysisComplete} 
                />
                
                {analysisResults.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Analysis History
                    </h3>
                    <div className="space-y-2">
                      {analysisResults.map((result, index) => (
                        <Card key={index} className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{result.type.charAt(0).toUpperCase() + result.type.slice(1)} Analysis</h4>
                              <p className="text-xs text-muted-foreground">
                                {new Date(result.metadata.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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
