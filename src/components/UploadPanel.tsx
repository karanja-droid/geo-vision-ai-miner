
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatasetInfo } from '@/types';

// Mock datasets
const initialDatasets: DatasetInfo[] = [
  {
    id: '1',
    name: 'Sierra Nevada Survey',
    type: 'Geological',
    size: 24500000,
    uploadDate: '2023-10-15',
    description: 'Comprehensive geological survey data from Sierra Nevada region',
    source: 'USGS'
  },
  {
    id: '2',
    name: 'Satellite Images 2023',
    type: 'Remote Sensing',
    size: 156000000,
    uploadDate: '2023-12-02',
    description: 'High-resolution satellite imagery of target exploration areas',
    source: 'DigitalGlobe'
  },
  {
    id: '3',
    name: 'Historical Mining Data',
    type: 'Historical',
    size: 8700000,
    uploadDate: '2023-08-30',
    description: 'Collection of historical mining records and exploration data',
    source: 'Mining Archives'
  },
];

interface UploadPanelProps {
  className?: string;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ className }) => {
  const [datasets, setDatasets] = useState<DatasetInfo[]>(initialDatasets);
  const [activeTab, setActiveTab] = useState<string>('existing');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Select Files'}
              </Button>
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
