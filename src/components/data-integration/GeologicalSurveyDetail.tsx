
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Layers, Download, Map, Database, ArrowLeft } from "lucide-react";

interface GeologicalSurveyDetailProps {
  onBack: () => void;
}

const GeologicalSurveyDetail: React.FC<GeologicalSurveyDetailProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connected, setConnected] = useState(false);
  const [downloadingDataset, setDownloadingDataset] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const handleConnect = () => {
    setConnecting(true);
    setConnectionProgress(0);
    
    // Simulate connection progress
    const interval = setInterval(() => {
      setConnectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setConnecting(false);
          setConnected(true);
          toast({
            title: "Connection successful",
            description: "Geological Survey data source has been connected",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const handleDownload = (datasetId: string, datasetName: string) => {
    // Prevent multiple simultaneous downloads
    if (downloadingDataset) return;
    
    setDownloadingDataset(datasetId);
    setDownloadProgress(0);
    
    toast({
      title: "Download started",
      description: `Downloading ${datasetName}...`,
    });
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            setDownloadingDataset(null);
            toast({
              title: "Download complete",
              description: `${datasetName} has been downloaded successfully.`,
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const availableDatasets = [
    {
      id: "geo1",
      name: "Geological Map (1:100,000)",
      type: "Shapefile",
      size: "245 MB",
      coverage: "86%"
    },
    {
      id: "geo2",
      name: "Stratigraphic Columns",
      type: "GeoJSON",
      size: "78 MB",
      coverage: "92%"
    },
    {
      id: "geo3",
      name: "Fault Lines",
      type: "Shapefile",
      size: "124 MB",
      coverage: "95%"
    },
    {
      id: "geo4",
      name: "Mineral Occurrences",
      type: "GeoJSON",
      size: "56 MB",
      coverage: "78%"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Layers className="h-5 w-5 mr-2 text-primary" />
              Geological Surveys
            </CardTitle>
            <CardDescription>
              Shapefiles containing geological maps, fault lines, and lithological information
            </CardDescription>
          </div>
          <Badge variant={connected ? "default" : "outline"}>
            {connected ? "Connected" : "Ready to connect"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="datasets">Available Datasets</TabsTrigger>
            <TabsTrigger value="settings">Connection Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Data Source</h3>
                  <p className="text-sm text-muted-foreground">Geological Survey Department</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Format</h3>
                  <p className="text-sm text-muted-foreground">Shapefile, GeoJSON, GeoTIFF</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Size</h3>
                  <p className="text-sm text-muted-foreground">1.8 GB Total</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Last Updated</h3>
                  <p className="text-sm text-muted-foreground">March 22, 2024</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">
                  This comprehensive dataset provides geological mapping information including rock types, 
                  geological formations, fault lines, and stratigraphic data essential for mineral 
                  exploration and geological analysis. The data is provided by the Geological Survey 
                  Department and is updated quarterly.
                </p>
              </div>
              
              {connecting ? (
                <div className="space-y-2 pt-4">
                  <Progress value={connectionProgress} />
                  <p className="text-center text-sm text-muted-foreground">
                    Connecting to Geological Survey data... {connectionProgress}%
                  </p>
                </div>
              ) : connected ? (
                <div className="flex justify-between items-center pt-4">
                  <p className="text-sm text-green-600 font-medium">
                    Connected Successfully
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Database className="h-4 w-4 mr-2" />
                      Manage Data
                    </Button>
                    <Button size="sm" variant="outline">
                      <Map className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="pt-4">
                  <Button onClick={handleConnect}>
                    Connect to Geological Survey Data
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="datasets">
            <div className="space-y-4">
              <div className="border rounded-md divide-y">
                {availableDatasets.map((dataset) => (
                  <div key={dataset.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{dataset.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {dataset.type} • {dataset.size}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs">
                        <span className="font-medium">Coverage: </span>
                        {dataset.coverage}
                      </div>
                      {downloadingDataset === dataset.id ? (
                        <div className="w-24">
                          <Progress value={downloadProgress} className="h-1 w-full" />
                          <p className="text-xs text-center mt-1">{downloadProgress}%</p>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownload(dataset.id, dataset.name)}
                          disabled={!connected || !!downloadingDataset}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                {connected ? (
                  <p>All datasets are available for download and analysis</p>
                ) : (
                  <p>Connect to the data source to access these datasets</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">API Endpoint</h3>
                  <p className="text-sm text-muted-foreground">https://api.geological-survey.org/v1/data</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Authentication</h3>
                  <p className="text-sm text-muted-foreground">OAuth 2.0</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Rate Limit</h3>
                  <p className="text-sm text-muted-foreground">100 requests / minute</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Data Refresh</h3>
                  <p className="text-sm text-muted-foreground">Quarterly</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline">
                  Advanced Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeologicalSurveyDetail;
