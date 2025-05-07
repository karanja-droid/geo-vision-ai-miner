
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { GeoAnalysisResult, ShapefileValidationResult } from '@/types/datasets';
import { validateGeoJSON } from '@/utils/gisOperations';
import ProcessorTabs from './shapefile-processor/ProcessorTabs';
import { validateShapefiles } from './shapefile-processor/utils';
import AnalysisHistory from './shapefile-processor/AnalysisHistory';

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
        <ProcessorTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          files={files}
          onFileChange={handleFileChange}
          onProcessFiles={processShapefiles}
          isProcessing={isProcessing}
          progress={progress}
          processedData={processedData}
          validationResult={validationResult}
          onAnalysisComplete={handleAnalysisComplete}
        />
        
        {activeTab === "analyze" && processedData && (
          <div className="mt-6">
            <AnalysisHistory analysisResults={analysisResults} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShapefileProcessor;
