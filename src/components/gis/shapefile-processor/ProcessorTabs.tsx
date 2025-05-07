
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShapefileViewer from '../ShapefileViewer';
import ShapefileAnalysis from '../ShapefileAnalysis';
import ShapefileReportGenerator from '../ShapefileReportGenerator';
import FileUpload from './FileUpload';
import ProcessingProgress from './ProcessingProgress';
import ValidationResult from './ValidationResult';
import { ShapefileValidationResult, GeoAnalysisResult } from '@/types/datasets';

interface ProcessorTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessFiles: () => void;
  isProcessing: boolean;
  progress: number;
  processedData: any;
  validationResult: ShapefileValidationResult | null;
  onAnalysisComplete: (result: GeoAnalysisResult) => void;
}

const ProcessorTabs: React.FC<ProcessorTabsProps> = ({
  activeTab,
  onTabChange,
  files,
  onFileChange,
  onProcessFiles,
  isProcessing,
  progress,
  processedData,
  validationResult,
  onAnalysisComplete
}) => {
  console.log("Rendering ProcessorTabs component", { 
    activeTab, 
    filesCount: files.length,
    hasProcessedData: processedData !== null
  });
  
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="view" disabled={!processedData}>View</TabsTrigger>
        <TabsTrigger value="analyze" disabled={!processedData}>Analyze</TabsTrigger>
        <TabsTrigger value="report" disabled={!processedData}>Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="space-y-4">
        <FileUpload 
          files={files}
          onFileChange={onFileChange}
          onProcessFiles={onProcessFiles}
          isProcessing={isProcessing}
          progress={progress}
        />
        
        <ProcessingProgress 
          isProcessing={isProcessing} 
          progress={progress} 
        />
        
        {validationResult && <ValidationResult validationResult={validationResult} />}
      </TabsContent>
      
      <TabsContent value="view">
        {processedData && <ShapefileViewer data={processedData} />}
      </TabsContent>
      
      <TabsContent value="analyze">
        {processedData && (
          <ShapefileAnalysis 
            data={processedData} 
            onAnalysisComplete={onAnalysisComplete} 
          />
        )}
      </TabsContent>
      
      <TabsContent value="report">
        {processedData && <ShapefileReportGenerator data={processedData} />}
      </TabsContent>
    </Tabs>
  );
};

export default ProcessorTabs;
