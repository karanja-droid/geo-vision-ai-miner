
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DatasetUploader: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [datasetName, setDatasetName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<string>("file");
  const [urlInput, setUrlInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  
  const handleFileUpload = () => {
    if (!datasetName) {
      toast({
        title: "Dataset name required",
        description: "Please enter a name for your dataset",
        variant: "destructive"
      });
      return;
    }
    
    if (fileInputRef.current && !fileInputRef.current.files?.length) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setTimeout(() => {
            toast({
              title: "Upload complete",
              description: `Dataset "${datasetName}" has been successfully uploaded`,
            });
            // Reset form
            setDatasetName("");
            setDescription("");
            setSelectedFormat("");
            if (fileInputRef.current) fileInputRef.current.value = "";
          }, 500);
          return 100;
        }
        return newValue;
      });
    }, 500);
  };
  
  const handleUrlUpload = () => {
    if (!datasetName) {
      toast({
        title: "Dataset name required",
        description: "Please enter a name for your dataset",
        variant: "destructive"
      });
      return;
    }
    
    if (!urlInput) {
      toast({
        title: "URL required",
        description: "Please enter a URL to download from",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newValue = prev + 15;
        if (newValue >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setTimeout(() => {
            toast({
              title: "Download complete",
              description: `Dataset "${datasetName}" has been successfully downloaded from URL`,
            });
            // Reset form
            setDatasetName("");
            setDescription("");
            setSelectedFormat("");
            setUrlInput("");
          }, 500);
          return 100;
        }
        return newValue;
      });
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Dataset Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataset-name">Dataset Name</Label>
              <Input 
                id="dataset-name" 
                placeholder="Enter dataset name" 
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                disabled={isUploading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataset-description">Description (optional)</Label>
              <Input 
                id="dataset-description" 
                placeholder="Brief description of the dataset" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataset-format">Data Format</Label>
              <Select 
                value={selectedFormat} 
                onValueChange={setSelectedFormat}
                disabled={isUploading}
              >
                <SelectTrigger id="dataset-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="geojson">GeoJSON</SelectItem>
                  <SelectItem value="shp">Shapefile</SelectItem>
                  <SelectItem value="tiff">GeoTIFF</SelectItem>
                  <SelectItem value="xyz">XYZ Points</SelectItem>
                  <SelectItem value="gpx">GPX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={uploadMethod} onValueChange={setUploadMethod}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="file" disabled={isUploading}>File Upload</TabsTrigger>
              <TabsTrigger value="url" disabled={isUploading}>From URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  ref={fileInputRef}
                  disabled={isUploading}
                />
                <Label 
                  htmlFor="file-upload" 
                  className="cursor-pointer block w-full"
                >
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
                  <p className="text-sm font-medium mb-1">
                    Click to select file or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: CSV, GeoJSON, SHP, TIFF, GPX, XYZ
                  </p>
                </Label>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleFileUpload} 
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Dataset'}
              </Button>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-input">Dataset URL</Label>
                <Input 
                  id="url-input" 
                  placeholder="https://example.com/dataset.csv" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a URL to a publicly accessible dataset file
                </p>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleUrlUpload} 
                disabled={isUploading}
              >
                {isUploading ? 'Downloading...' : 'Download from URL'}
              </Button>
            </TabsContent>
          </Tabs>
          
          {isUploading && (
            <div className="mt-4 space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                {uploadProgress}% complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
