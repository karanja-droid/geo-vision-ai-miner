
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, MapPin } from "lucide-react";
import ProcessorTabs from './shapefile-processor/ProcessorTabs';
import { useToast } from "@/components/ui/use-toast";
import { ShapefileValidationResult, GeoAnalysisResult } from '@/types/datasets';

const ShapefileProcessor: React.FC = () => {
  console.log("Rendering ShapefileProcessor component");
  
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [processedData, setProcessedData] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<ShapefileValidationResult | null>(null);
  const { toast } = useToast();

  // Reset progress when files change
  useEffect(() => {
    setProgress(0);
    setValidationResult(null);
    setProcessedData(null);
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
      console.log("Files selected:", fileList.map(f => f.name));
    }
  };

  const handleProcessFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);

      // Simulate processing steps
      await simulateProcessing(25, "Validating files");
      await simulateFileValidation();
      
      if (validationResult?.isValid) {
        await simulateProcessing(75, "Converting shapefile data");
        await simulateProcessingComplete();
        setActiveTab("view");
      } else {
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Error processing files:", err);
      toast({
        title: "Processing Error",
        description: "An error occurred while processing files",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const simulateProcessing = async (targetProgress: number, message: string) => {
    const startProgress = progress;
    const increment = (targetProgress - startProgress) / 10;
    
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(prev => Math.min(prev + increment, targetProgress));
    }
    
    console.log(message);
  };
  
  const simulateFileValidation = async () => {
    // Check file types
    const hasShapefile = files.some(file => 
      file.name.endsWith('.shp') || 
      file.name.endsWith('.geojson') || 
      file.name.endsWith('.json')
    );
    
    // If no valid shapefile is found, return error
    if (!hasShapefile) {
      setValidationResult({
        isValid: false,
        errors: ["No valid shapefile or GeoJSON found"],
        warnings: []
      });
      
      toast({
        title: "Invalid Files",
        description: "No valid shapefile or GeoJSON found",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate a valid result
    setValidationResult({
      isValid: true,
      errors: [],
      warnings: files.length < 2 ? ["Missing associated files may affect rendering"] : []
    });
  };
  
  const simulateProcessingComplete = async () => {
    // Generate sample GeoJSON data based on file names
    const sampleData = generateSampleGeoJSON(files);
    setProcessedData(sampleData);
    
    toast({
      title: "Processing Complete",
      description: `Successfully processed ${files.length} files`,
    });
    
    setIsProcessing(false);
    setProgress(100);
  };
  
  const generateSampleGeoJSON = (files: File[]) => {
    // Base GeoJSON structure
    const geojson = {
      type: "FeatureCollection",
      features: [] as any[]
    };
    
    // Generate random features based on file names
    const featureCount = Math.floor(Math.random() * 6) + 5; // 5-10 features
    
    for (let i = 0; i < featureCount; i++) {
      // Determine feature type based on index
      let geometryType;
      let geometryCoords;
      
      if (i % 3 === 0) {
        // Point feature
        geometryType = "Point";
        geometryCoords = [
          -100 + Math.random() * 50,
          30 + Math.random() * 20
        ];
      } else if (i % 3 === 1) {
        // LineString feature
        geometryType = "LineString";
        const points = [];
        const pointCount = Math.floor(Math.random() * 4) + 3; // 3-6 points
        for (let j = 0; j < pointCount; j++) {
          points.push([
            -100 + Math.random() * 50,
            30 + Math.random() * 20
          ]);
        }
        geometryCoords = points;
      } else {
        // Polygon feature
        geometryType = "Polygon";
        const points = [];
        const pointCount = Math.floor(Math.random() * 4) + 5; // 5-8 points
        const centerX = -100 + Math.random() * 50;
        const centerY = 30 + Math.random() * 20;
        const radius = 1 + Math.random() * 3;
        
        for (let j = 0; j < pointCount; j++) {
          const angle = (j / pointCount) * Math.PI * 2;
          points.push([
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
          ]);
        }
        // Close the polygon
        points.push([...points[0]]);
        geometryCoords = [points];
      }
      
      // Create feature
      const feature = {
        type: "Feature",
        properties: {
          name: `Feature ${i + 1}`,
          description: `Generated from ${files[i % files.length].name}`,
          elevation: Math.floor(Math.random() * 1000),
          rockType: ["Igneous", "Sedimentary", "Metamorphic", "Volcanic"][i % 4],
          mineral: ["Gold", "Copper", "Iron", "Coal", "None"][i % 5],
        },
        geometry: {
          type: geometryType,
          coordinates: geometryCoords
        }
      };
      
      geojson.features.push(feature);
    }
    
    return geojson;
  };
  
  const handleAnalysisComplete = (result: GeoAnalysisResult) => {
    console.log("Analysis complete:", result);
    toast({
      title: "Analysis Complete",
      description: `Found ${result.features.length} features matching criteria`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Database className="h-5 w-5 mt-1 text-primary" />
          <div>
            <CardTitle>GIS Shapefile Processor</CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload, analyze and process geological shapefile data
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ProcessorTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          files={files}
          onFileChange={handleFileChange}
          onProcessFiles={handleProcessFiles}
          isProcessing={isProcessing}
          progress={progress}
          processedData={processedData}
          validationResult={validationResult}
          onAnalysisComplete={handleAnalysisComplete}
        />
      </CardContent>
    </Card>
  );
};

export default ShapefileProcessor;
