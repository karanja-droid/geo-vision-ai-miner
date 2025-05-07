
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Layers, ArrowLeft } from "lucide-react";
import { GeologicalOverviewTab } from './geological-survey/GeologicalOverviewTab';
import { GeologicalDatasetsTab } from './geological-survey/GeologicalDatasetsTab';
import { GeologicalSettingsTab } from './geological-survey/GeologicalSettingsTab';
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { cacheDataset, removeCachedDataset } from '@/services/DatasetCacheService';
import { GeologicalDataset } from './geological-survey/GeologicalDatasetItem';
import { DatasetCacheQueue } from '@/services/DatasetCacheQueue';

interface GeologicalSurveyDetailProps {
  onBack: () => void;
}

const GeologicalSurveyDetail: React.FC<GeologicalSurveyDetailProps> = ({ onBack }) => {
  const { toast } = useToast();
  const { isOnline, addToCache, removeFromCache, registerOfflineAction } = useConnectivity();
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
  
  const handleDownload = async (datasetId: string, datasetName: string) => {
    // Prevent multiple simultaneous downloads
    if (downloadingDataset) return;
    
    setDownloadingDataset(datasetId);
    setDownloadProgress(0);
    
    toast({
      title: "Download started",
      description: `Downloading ${datasetName}...`,
    });
    
    // Find the dataset from our available datasets
    const datasetToCache = availableDatasets.find(d => d.id === datasetId);
    
    // Create an offline action for this download
    const actionId = DatasetCacheQueue.createActionId();
    registerOfflineAction({
      id: actionId,
      type: 'download',
      datasetId,
      timestamp: Date.now(),
      payload: {
        name: datasetName,
        type: 'geological'
      }
    });
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          setTimeout(async () => {
            // Cache the dataset when download completes
            if (datasetToCache) {
              try {
                await cacheDataset(datasetToCache, 'geological');
                await addToCache(datasetId);
                
                toast({
                  title: "Download complete",
                  description: `${datasetName} has been downloaded and cached for offline use.`,
                });
              } catch (error) {
                console.error("Failed to cache dataset:", error);
                toast({
                  title: "Caching failed",
                  description: "Could not save dataset for offline use.",
                  variant: "destructive"
                });
              }
            }
            
            setDownloadingDataset(null);
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
            <GeologicalOverviewTab
              connecting={connecting}
              connectionProgress={connectionProgress}
              connected={connected}
              onConnect={handleConnect}
            />
          </TabsContent>
          
          <TabsContent value="datasets">
            <GeologicalDatasetsTab
              availableDatasets={availableDatasets}
              connected={connected}
              downloadingDataset={downloadingDataset}
              downloadProgress={downloadProgress}
              onDownload={handleDownload}
            />
          </TabsContent>
          
          <TabsContent value="settings">
            <GeologicalSettingsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeologicalSurveyDetail;
