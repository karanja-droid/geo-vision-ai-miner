
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalysis } from '@/hooks/database';
import { ModelInfo } from '@/types/models';
import { AnalysisOptions } from '@/types/analysis';
import { generateReport, downloadReport } from '../utils/reportGenerator';

export const useModelAnalysis = (
  modelInfo: ModelInfo,
  analysisOptions: AnalysisOptions,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setActiveTab: (value: string) => void,
  setIsAnalyzing: (value: boolean) => void,
  setAnalysisResults: (value: any) => void,
  onAnalyze?: (options: AnalysisOptions) => void
) => {
  const { toast } = useToast();
  const { runModelAnalysis } = useAnalysis();
  const [showMap, setShowMap] = useState(false);

  const handleAnalyze = async (selectedDataset: string | null) => {
    if (!selectedDataset) {
      toast({
        title: "No dataset selected",
        description: "Please select a dataset before running analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setActiveTab("progress");
    
    // Simulate initial progress while backend prepares
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 800);
    
    try {
      // Call the backend analysis endpoint
      const datasetId = selectedDataset || 'demo-dataset-001';
      
      // Run the analysis through our backend
      const result = await runModelAnalysis(
        datasetId, 
        modelInfo.id, 
        analysisOptions
      );
      
      // Process the results
      if (result) {
        setAnalysisResults({
          timestamp: result.timestamp,
          options: analysisOptions,
          minerals: {
            ironOxide: Math.round(result.data.spectralAnalysis?.['visible']?.strength * 100) || 60,
            copperSulfide: Math.round(result.data.spectralAnalysis?.['near-ir']?.strength * 100) || 40,
            silicates: Math.round(result.data.spectralAnalysis?.['short-ir']?.strength * 100) || 30,
            goldIndicators: Math.round(result.data.spectralAnalysis?.['thermal']?.strength * 100) || 20,
            diamondIndicators: Math.round(result.data.spectralAnalysis?.['ultraviolet']?.strength * 100) || 10
          },
          statistics: {
            areaAnalyzed: result.data.coverage?.analyzed?.toFixed(1) || "10.0",
            anomaliesDetected: result.data.anomalies || 5,
            featurePoints: result.data.featureCount || 150,
            confidenceScore: (result.confidence * 100).toFixed(1)
          },
          hotspots: result.data.hotspots || []
        });
      }
      
      // Clear the interval and complete the progress
      clearInterval(progressInterval);
      setProgress(100);
      
      // Switch to results tab after completion
      setTimeout(() => {
        setIsAnalyzing(false);
        setActiveTab("results");
      }, 500);
      
    } catch (error) {
      console.error("Analysis failed:", error);
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
    
    // Call the onAnalyze callback if provided
    if (onAnalyze) {
      onAnalyze(analysisOptions);
    }
  };

  const handleDownloadReport = () => {
    if (!setAnalysisResults) {
      toast({
        title: "No analysis results available",
        description: "Run an analysis first to generate a downloadable report.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Generate and download the report
      const report = generateReport(setAnalysisResults, modelInfo);
      downloadReport(report);
      
      toast({
        title: "Report downloaded",
        description: "The analysis report has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Failed to download report:", error);
      toast({
        title: "Download failed",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewFullAnalysis = () => {
    if (!setAnalysisResults) {
      toast({
        title: "No analysis results available",
        description: "Run an analysis first to view the full results.",
        variant: "destructive",
      });
      return;
    }
    
    // This no longer opens an alert - the map visualization is shown in the component
    console.log("Displaying full analysis with map visualization", setAnalysisResults);
    setShowMap(!showMap);
  };

  return {
    handleAnalyze,
    handleDownloadReport,
    handleViewFullAnalysis,
    showMap,
    setShowMap
  };
};
