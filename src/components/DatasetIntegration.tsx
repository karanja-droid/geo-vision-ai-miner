
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, ArrowRightLeft, Database, MapPin } from "lucide-react";

// African Geological Data Sources
const AFRICAN_DATASOURCES = [
  {
    id: 'agds1',
    name: 'African Minerals Geoscience Initiative',
    description: 'Continental-scale geological, geophysical, and geochemical datasets',
    url: 'https://amgi.africamuseum.be/',
    countries: ['Pan-African'],
    dataTypes: ['Geological Maps', 'Geochemical Data', 'Mineral Resources']
  },
  {
    id: 'agds2',
    name: 'Zambia Geological Survey Department',
    description: 'Official geological data repository for Zambia',
    url: 'https://www.gsd.gov.zm/',
    countries: ['Zambia'],
    dataTypes: ['Geological Maps', 'Mineral Resources', 'Mining Records']
  },
  {
    id: 'agds3',
    name: 'DRC Centre for Geological and Mining Research',
    description: 'Research center for geological and mining data in DRC',
    url: 'https://www.crgm-rdc.cd/',
    countries: ['Democratic Republic of Congo'],
    dataTypes: ['Mining Data', 'Geological Surveys', 'Mineral Resources']
  },
  {
    id: 'agds4',
    name: 'South African Council for Geoscience',
    description: 'National geological survey organization of South Africa',
    url: 'https://www.geoscience.org.za/',
    countries: ['South Africa'],
    dataTypes: ['Geological Maps', 'Geophysical Data', 'Mineral Resources']
  },
  {
    id: 'agds5',
    name: 'African Mineral Resource Data System',
    description: 'Comprehensive database of mineral resources across Africa',
    url: 'https://www.amd.gov/',
    countries: ['Pan-African'],
    dataTypes: ['Mineral Resources', 'Mining Records']
  }
];

export const DatasetIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('connect');
  const [selectedDataset, setSelectedDataset] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [connectionUrl, setConnectionUrl] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [integrationProgress, setIntegrationProgress] = useState<number>(0);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!selectedSource) {
      toast({
        title: "Source Required",
        description: "Please select a data source to connect to",
        variant: "destructive"
      });
      return;
    }
    
    if (!connectionUrl && !apiKey) {
      toast({
        title: "Connection Details Required",
        description: "Please enter a connection URL or API key",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    setIntegrationProgress(0);
    
    // Simulate connection progress
    const interval = setInterval(() => {
      setIntegrationProgress((prev) => {
        const newValue = prev + 15;
        if (newValue >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setTimeout(() => {
            toast({
              title: "Connection Established",
              description: "Successfully connected to the data source",
            });
          }, 500);
          return 100;
        }
        return newValue;
      });
    }, 600);
  };

  const handleIntegrate = () => {
    if (!selectedDataset || !selectedSource) {
      toast({
        title: "Selection Required",
        description: "Please select both a dataset and data source to integrate",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    setIntegrationProgress(0);
    
    // Simulate integration progress
    const interval = setInterval(() => {
      setIntegrationProgress((prev) => {
        const newValue = prev + 12;
        if (newValue >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setTimeout(() => {
            toast({
              title: "Integration Complete",
              description: "The dataset has been successfully integrated",
            });
          }, 500);
          return 100;
        }
        return newValue;
      });
    }, 700);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>African Geological Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {AFRICAN_DATASOURCES.map((source) => (
              <div key={source.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      {source.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {source.countries.map((country, i) => (
                        <Badge key={i} variant="outline" className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSource(source.id)}
                  >
                    Connect
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {source.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {source.dataTypes.map((type, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Data Integration Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="connect" disabled={isConnecting}>Connect</TabsTrigger>
              <TabsTrigger value="integrate" disabled={isConnecting}>Integrate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect" className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="data-source">Data Source</Label>
                  <Select 
                    value={selectedSource} 
                    onValueChange={setSelectedSource}
                    disabled={isConnecting}
                  >
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      {AFRICAN_DATASOURCES.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="connection-url">Connection URL</Label>
                  <Input 
                    id="connection-url" 
                    placeholder="https://api.example.com/data" 
                    value={connectionUrl}
                    onChange={(e) => setConnectionUrl(e.target.value)}
                    disabled={isConnecting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key (if required)</Label>
                  <Input 
                    id="api-key" 
                    placeholder="Enter API key" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={isConnecting}
                    type="password"
                  />
                </div>
                
                {isConnecting && integrationProgress > 0 && (
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${integrationProgress}%` }}
                    />
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={handleConnect} 
                  disabled={isConnecting}
                >
                  <Link className="h-4 w-4 mr-2" />
                  {isConnecting ? 'Connecting...' : 'Connect to Data Source'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="integrate" className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="local-dataset">Local Dataset</Label>
                  <Select 
                    value={selectedDataset} 
                    onValueChange={setSelectedDataset}
                    disabled={isConnecting}
                  >
                    <SelectTrigger id="local-dataset">
                      <SelectValue placeholder="Select local dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zm1">Copperbelt Mineral Survey</SelectItem>
                      <SelectItem value="zm2">Lusaka Basin Lithology</SelectItem>
                      <SelectItem value="drc1">Katanga Copper Deposits</SelectItem>
                      <SelectItem value="drc2">Kivu Tin and Coltan Survey</SelectItem>
                      <SelectItem value="za1">Witwatersrand Gold Basin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-center py-4">
                  <ArrowRightLeft className="h-8 w-8 text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="remote-source">Remote Data Source</Label>
                  <Select 
                    value={selectedSource} 
                    onValueChange={setSelectedSource}
                    disabled={isConnecting}
                  >
                    <SelectTrigger id="remote-source">
                      <SelectValue placeholder="Select remote source" />
                    </SelectTrigger>
                    <SelectContent>
                      {AFRICAN_DATASOURCES.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {isConnecting && integrationProgress > 0 && (
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${integrationProgress}%` }}
                    />
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={handleIntegrate} 
                  disabled={isConnecting}
                >
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  {isConnecting ? 'Integrating...' : 'Integrate Data'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Alert className="mt-4">
            <AlertDescription className="text-xs">
              Data integration enables merging datasets from different sources.
              Connect to external data providers or import data directly.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
