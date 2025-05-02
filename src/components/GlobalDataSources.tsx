import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Database, Layers, Globe, Search, Filter, Download, ChartLine, Link as LinkIcon, Upload } from "lucide-react";
import { Satellite } from './IconComponents';

interface DataSource {
  id: string;
  name: string;
  type: string;
  region: string;
  status: 'connected' | 'available' | 'pending';
  coverage: number;
  lastUpdated: string;
  description: string;
  organization: string;
  dataSize: string;
}

export const GlobalDataSources: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [activeType, setActiveType] = useState<string>("all");
  const [connectingSource, setConnectingSource] = useState<string | null>(null);
  const [connectProgress, setConnectProgress] = useState<number>(0);

  const dataSources: DataSource[] = [
    // Satellite Imagery Sources
    {
      id: "sat1",
      name: "Landsat Global Archive",
      type: "satellite",
      region: "global",
      status: "connected",
      coverage: 95,
      lastUpdated: "2024-04-15",
      description: "Comprehensive multispectral imagery from the Landsat satellite program covering 40+ years of earth observation data",
      organization: "NASA/USGS",
      dataSize: "12.4 TB"
    },
    {
      id: "sat2",
      name: "Sentinel-2 Imagery",
      type: "satellite",
      region: "global",
      status: "connected",
      coverage: 90,
      lastUpdated: "2024-04-28",
      description: "High-resolution optical imagery with 13 spectral bands from the European Space Agency's Sentinel satellites",
      organization: "European Space Agency",
      dataSize: "8.7 TB"
    },
    {
      id: "sat3",
      name: "ASTER Thermal Imagery",
      type: "satellite",
      region: "global",
      status: "available",
      coverage: 85,
      lastUpdated: "2024-03-10",
      description: "Advanced Spaceborne Thermal Emission and Reflection Radiometer data with thermal infrared bands optimal for geological mapping",
      organization: "NASA/JAXA",
      dataSize: "5.3 TB"
    },
    
    // Geological Survey Sources
    {
      id: "geo1",
      name: "USGS National Geologic Map Database",
      type: "geological",
      region: "north america",
      status: "connected",
      coverage: 100,
      lastUpdated: "2024-03-22",
      description: "Comprehensive geological maps, stratigraphy, and lithologic information from the United States Geological Survey",
      organization: "USGS",
      dataSize: "1.8 TB"
    },
    {
      id: "geo2",
      name: "African Geological Surveys Database",
      type: "geological",
      region: "africa",
      status: "connected",
      coverage: 78,
      lastUpdated: "2024-02-18",
      description: "Consolidated geological mapping and survey data from geological surveys across Africa",
      organization: "OAGS",
      dataSize: "2.2 TB"
    },
    {
      id: "geo3",
      name: "European Geological Data Infrastructure",
      type: "geological",
      region: "europe",
      status: "available",
      coverage: 92,
      lastUpdated: "2024-01-30",
      description: "Harmonized geological data from European geological surveys with standardized formats and classifications",
      organization: "EuroGeoSurveys",
      dataSize: "3.1 TB"
    },
    {
      id: "geo4",
      name: "Australian Geological Survey Organization Data",
      type: "geological",
      region: "australia",
      status: "available",
      coverage: 95,
      lastUpdated: "2024-02-05",
      description: "Comprehensive geological and geophysical data covering the Australian continent",
      organization: "Geoscience Australia",
      dataSize: "1.6 TB"
    },
    
    // Mining Data Sources
    {
      id: "mine1",
      name: "Global Mining Repository",
      type: "mining",
      region: "global",
      status: "connected",
      coverage: 85,
      lastUpdated: "2024-03-05",
      description: "Historical and current mining operations data including production statistics, mineral types, and operational status",
      organization: "World Mining Data",
      dataSize: "780 GB"
    },
    {
      id: "mine2",
      name: "African Mining Operations Database",
      type: "mining",
      region: "africa",
      status: "connected",
      coverage: 82,
      lastUpdated: "2024-01-20",
      description: "Comprehensive information on mining operations across Africa with focus on copper, gold, and critical minerals",
      organization: "African Mining Intelligence",
      dataSize: "420 GB"
    },
    {
      id: "mine3",
      name: "South American Mining Archive",
      type: "mining",
      region: "south america",
      status: "available",
      coverage: 75,
      lastUpdated: "2024-03-12",
      description: "Historical and current mining data from South American countries with emphasis on copper, lithium, and precious metals",
      organization: "Latin American Mining Association",
      dataSize: "560 GB"
    },
    
    // Geophysical Data Sources
    {
      id: "geop1",
      name: "Global Gravity Field Models",
      type: "geophysical",
      region: "global",
      status: "connected",
      coverage: 98,
      lastUpdated: "2024-02-08",
      description: "High-resolution gravity field data useful for subsurface geological structure mapping",
      organization: "International Gravity Field Service",
      dataSize: "1.3 TB"
    },
    {
      id: "geop2",
      name: "Global Magnetic Anomaly Database",
      type: "geophysical",
      region: "global",
      status: "available",
      coverage: 94,
      lastUpdated: "2024-03-18",
      description: "Compilation of magnetic anomaly data providing insights into crustal structure and mineral potential",
      organization: "Commission for Geological Map of the World",
      dataSize: "2.1 TB"
    },
  ];

  const filteredSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          source.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = activeRegion === "all" || source.region === activeRegion;
    const matchesType = activeType === "all" || source.type === activeType;
    
    return matchesSearch && matchesRegion && matchesType;
  });

  const handleConnectSource = (sourceId: string) => {
    setConnectingSource(sourceId);
    setConnectProgress(0);
    
    // Simulate connection progress
    const interval = setInterval(() => {
      setConnectProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            toast({
              title: "Data Source Connected",
              description: "The selected data source has been successfully integrated",
            });
            setConnectingSource(null);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search data sources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={activeRegion} onValueChange={setActiveRegion}>
            <SelectTrigger className="w-[160px]">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="north america">North America</SelectItem>
              <SelectItem value="south america">South America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={activeType} onValueChange={setActiveType}>
            <SelectTrigger className="w-[160px]">
              <Layers className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="satellite">Satellite Imagery</SelectItem>
              <SelectItem value="geological">Geological Surveys</SelectItem>
              <SelectItem value="mining">Mining Data</SelectItem>
              <SelectItem value="geophysical">Geophysical</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((source) => (
          <Card key={source.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    {source.type === "satellite" ? <Satellite className="h-5 w-5 mr-2" /> :
                     source.type === "geological" ? <Layers className="h-5 w-5 mr-2" /> :
                     source.type === "mining" ? <Database className="h-5 w-5 mr-2" /> :
                     <Globe className="h-5 w-5 mr-2" />}
                    {source.name}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Globe className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    {source.region.charAt(0).toUpperCase() + source.region.slice(1)}
                    <span className="mx-2">•</span>
                    {source.organization}
                  </CardDescription>
                </div>
                <Badge 
                  variant={source.status === "connected" ? "default" : 
                          source.status === "available" ? "outline" : "secondary"}
                >
                  {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{source.description}</p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span>{source.coverage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Size:</span>
                  <span>{source.dataSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated:</span>
                  <span>{source.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{source.type.charAt(0).toUpperCase() + source.type.slice(1)}</span>
                </div>
              </div>
              
              {connectingSource === source.id ? (
                <div className="space-y-2">
                  <Progress value={connectProgress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    Connecting... {connectProgress}%
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  {source.status !== "connected" ? (
                    <Button 
                      className="flex-1" 
                      onClick={() => handleConnectSource(source.id)}
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1">
                      <Database className="h-4 w-4 mr-2" /> Manage
                    </Button>
                  )}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <ChartLine className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>{source.name}</DialogTitle>
                        <DialogDescription>
                          Detailed information about this data source
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Description</h4>
                          <p className="text-sm">{source.description}</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium">Provider</h4>
                            <p className="text-sm">{source.organization}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Data Type</h4>
                            <p className="text-sm">{source.type.charAt(0).toUpperCase() + source.type.slice(1)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Region</h4>
                            <p className="text-sm">{source.region.charAt(0).toUpperCase() + source.region.slice(1)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Last Updated</h4>
                            <p className="text-sm">{source.lastUpdated}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Data Size</h4>
                            <p className="text-sm">{source.dataSize}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Coverage</h4>
                            <p className="text-sm">{source.coverage}%</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Available Formats</h4>
                          <div className="flex flex-wrap gap-1">
                            {source.type === "satellite" && (
                              <>
                                <Badge variant="outline">GeoTIFF</Badge>
                                <Badge variant="outline">COG</Badge>
                                <Badge variant="outline">JPEG2000</Badge>
                              </>
                            )}
                            {source.type === "geological" && (
                              <>
                                <Badge variant="outline">Shapefile</Badge>
                                <Badge variant="outline">GeoJSON</Badge>
                                <Badge variant="outline">GeoPackage</Badge>
                              </>
                            )}
                            {source.type === "mining" && (
                              <>
                                <Badge variant="outline">CSV</Badge>
                                <Badge variant="outline">Excel</Badge>
                                <Badge variant="outline">GeoJSON</Badge>
                              </>
                            )}
                            {source.type === "geophysical" && (
                              <>
                                <Badge variant="outline">GeoTIFF</Badge>
                                <Badge variant="outline">NetCDF</Badge>
                                <Badge variant="outline">XYZ</Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" /> Sample Data
                        </Button>
                        {source.status === "connected" ? (
                          <Button variant="default">Access Data</Button>
                        ) : (
                          <Button onClick={() => handleConnectSource(source.id)}>Connect Source</Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredSources.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Database className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No data sources found</p>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setActiveRegion('all');
              setActiveType('all');
            }}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Add Custom Data Source</CardTitle>
          <CardDescription>Integrate your own geological data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="sm:w-auto flex justify-center">
              <Layers className="h-4 w-4 mr-2" /> Connect New Source
            </Button>
            <Button variant="outline" className="sm:w-auto flex justify-center">
              <Upload className="h-4 w-4 mr-2" /> Upload Local Data
            </Button>
            <Button variant="outline" className="sm:w-auto flex justify-center">
              <LinkIcon className="h-4 w-4 mr-2" /> Connect API
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
