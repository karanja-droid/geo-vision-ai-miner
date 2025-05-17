import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatasetInfo } from '@/types';
import { useDatasets, useFiles } from '@/hooks/database';
import { Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface UploadPanelProps {
  className?: string;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ className }) => {
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [activeTab, setActiveTab] = useState<string>('existing');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { getDatasets } = useDatasets();
  const { uploadDatasetFile, processDatasetFile } = useFiles();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const fetchedDatasets = await getDatasets();
        if (fetchedDatasets) {
          setDatasets(fetchedDatasets);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching datasets:", error);
        setIsLoading(false);
      }
    };
    
    fetchDatasets();
  }, [getDatasets]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Assume we have a datasetId for the upload
      const datasetId = "dataset-" + Date.now();
      
      // Process the file
      const result = await processDatasetFile(selectedFile, datasetId);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "Upload Complete",
        description: `${selectedFile.name} has been uploaded successfully.`,
      });
      
      // Refresh the datasets list
      const updatedDatasets = await getDatasets();
      if (updatedDatasets) {
        setDatasets(updatedDatasets);
      }
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setSelectedFile(null);
      }, 1000);
      
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="existing" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Existing Datasets</TabsTrigger>
            <TabsTrigger value="upload">Upload New Data</TabsTrigger>
          </TabsList>
          <TabsContent value="existing" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading datasets...</span>
              </div>
            ) : datasets.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                <p>No datasets available</p>
                <p className="text-sm mt-2">Upload new data to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="analysis-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{dataset.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {dataset.type} • {formatFileSize(dataset.size)} • {formatDate(dataset.uploadDate)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </div>
                    {dataset.description && (
                      <p className="text-sm mt-2 text-muted-foreground">{dataset.description}</p>
                    )}
                    {dataset.source && (
                      <p className="text-xs mt-1">Source: {dataset.source}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="upload" className="mt-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Upload Dataset</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here or click to browse
              </p>
              
              <input 
                type="file" 
                id="file-upload" 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".csv,.geojson,.tiff,.shp,.gpx"
                disabled={isUploading}
              />
              
              <label htmlFor="file-upload">
                <Button 
                  disabled={isUploading}
                  className="cursor-pointer"
                >
                  {isUploading ? 'Uploading...' : 'Select Files'}
                </Button>
              </label>
              
              {selectedFile && (
                <div className="mt-4 text-sm">
                  Selected file: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  <Button 
                    onClick={handleUpload} 
                    disabled={isUploading} 
                    className="ml-4"
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              )}
              
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              <div className="mt-4 text-xs text-muted-foreground">
                Supported formats: CSV, GeoJSON, TIFF, SHP, GPX
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UploadPanel;
