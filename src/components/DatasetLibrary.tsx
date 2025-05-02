
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Search, Database, Download, Eye, Trash2, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock dataset data for African countries
const AFRICAN_DATASETS = [
  // Zambia Datasets
  {
    id: 'zm1',
    name: 'Copperbelt Mineral Survey',
    format: 'GeoJSON',
    source: 'Zambia Geological Survey',
    size: '34.2 MB',
    date: '2023-08-15',
    description: 'Detailed geological survey data from the Zambian Copperbelt region',
    tags: ['Copper', 'Mining', 'Minerals'],
    country: 'Zambia',
    coordinates: [-13.1339, 28.3232]
  },
  {
    id: 'zm2',
    name: 'Lusaka Basin Lithology',
    format: 'Shapefile',
    source: 'University of Zambia',
    size: '18.7 MB',
    date: '2023-11-24',
    description: 'Lithological mapping of the Lusaka Basin with structural features',
    tags: ['Lithology', 'Basin', 'Structural'],
    country: 'Zambia',
    coordinates: [-15.3875, 28.3228]
  },
  
  // DRC Datasets
  {
    id: 'drc1',
    name: 'Katanga Copper Deposits',
    format: 'GeoTIFF',
    source: 'DRC Ministry of Mines',
    size: '45.8 MB',
    date: '2024-01-10',
    description: 'High-resolution survey of the Katanga copper deposits with mineral grading',
    tags: ['Copper', 'Mining', 'Deposits'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.7222, 25.5488]
  },
  {
    id: 'drc2',
    name: 'Kivu Tin and Coltan Survey',
    format: 'CSV',
    source: 'Geological Society of DRC',
    size: '12.3 MB',
    date: '2023-12-05',
    description: 'Survey data for tin and coltan resources in the Kivu province',
    tags: ['Tin', 'Coltan', 'Critical Minerals'],
    country: 'Democratic Republic of Congo',
    coordinates: [-2.4783, 28.8417]
  },
  
  // South Africa Datasets
  {
    id: 'za1',
    name: 'Witwatersrand Gold Basin',
    format: 'GeoJSON',
    source: 'South African Geological Survey',
    size: '28.9 MB',
    date: '2024-02-15',
    description: 'Comprehensive data on the Witwatersrand gold basin formations and deposits',
    tags: ['Gold', 'Mining', 'Basin Analysis'],
    country: 'South Africa',
    coordinates: [-26.2041, 28.0473]
  },
  
  // Nigeria Datasets
  {
    id: 'ng1',
    name: 'Niger Delta Oil Formations',
    format: 'Shapefile',
    source: 'Nigerian Geological Survey',
    size: '36.4 MB',
    date: '2023-09-20',
    description: 'Geological mapping of oil-bearing formations in the Niger Delta region',
    tags: ['Oil', 'Petroleum', 'Sedimentary'],
    country: 'Nigeria',
    coordinates: [5.3429, 6.9110]
  },
  
  // Tanzania Datasets
  {
    id: 'tz1',
    name: 'Tanzanite Deposits Mererani',
    format: 'GeoTIFF',
    source: 'Tanzania Minerals Commission',
    size: '19.2 MB',
    date: '2023-10-08',
    description: 'Survey data on tanzanite deposits in the Mererani mining area',
    tags: ['Tanzanite', 'Gemstones', 'Mining'],
    country: 'Tanzania',
    coordinates: [-3.5795, 37.0175]
  },
  
  // Ghana Datasets
  {
    id: 'gh1',
    name: 'Ashanti Gold Belt Survey',
    format: 'CSV',
    source: 'Ghana Geological Survey',
    size: '22.1 MB',
    date: '2024-01-25',
    description: 'Detailed mapping and survey data from the Ashanti Gold Belt',
    tags: ['Gold', 'Mining', 'Structural Geology'],
    country: 'Ghana',
    coordinates: [6.6885, -1.6244]
  },
];

// Original mock datasets
const ORIGINAL_DATASETS = [
  {
    id: '1',
    name: 'Sierra Nevada Survey',
    format: 'GeoJSON',
    source: 'USGS',
    size: '24.5 MB',
    date: '2023-10-15',
    description: 'Comprehensive geological survey data from Sierra Nevada region',
    tags: ['Geological', 'Survey', 'Mountains'],
    country: 'United States',
    coordinates: [38.9543, -120.1244]
  },
  {
    id: '2',
    name: 'Satellite Images 2023',
    format: 'GeoTIFF',
    source: 'DigitalGlobe',
    size: '156 MB',
    date: '2023-12-02',
    description: 'High-resolution satellite imagery of target exploration areas',
    tags: ['Remote Sensing', 'Satellite', 'Imagery'],
    country: 'Global',
    coordinates: [0, 0]
  },
  {
    id: '3',
    name: 'Historical Mining Data',
    format: 'CSV',
    source: 'Mining Archives',
    size: '8.7 MB',
    date: '2023-08-30',
    description: 'Collection of historical mining records and exploration data',
    tags: ['Historical', 'Mining', 'Records'],
    country: 'United States',
    coordinates: [39.7392, -104.9903]
  },
  {
    id: '4',
    name: 'Fault Line Analysis',
    format: 'Shapefile',
    source: 'USGS',
    size: '32.1 MB',
    date: '2024-01-18',
    description: 'Detailed fault line mappings with geological annotations',
    tags: ['Faults', 'Seismic', 'Structural'],
    country: 'United States',
    coordinates: [37.7749, -122.4194]
  },
  {
    id: '5',
    name: 'Mineral Distribution Map',
    format: 'GeoJSON',
    source: 'Research Team',
    size: '17.3 MB',
    date: '2024-03-05',
    description: 'Detailed mapping of mineral distributions across the survey area',
    tags: ['Minerals', 'Distribution', 'Mapping'],
    country: 'Canada',
    coordinates: [53.9333, -116.5765]
  },
];

// Combined datasets
const ALL_DATASETS = [...AFRICAN_DATASETS, ...ORIGINAL_DATASETS];

export const DatasetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [datasets, setDatasets] = useState(ALL_DATASETS);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();
  
  const filteredDatasets = datasets.filter(dataset => {
    // First filter by tab selection
    if (activeTab !== 'all' && dataset.country.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Then filter by search query
    return dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dataset.country.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const handleViewDataset = (id: string) => {
    const dataset = datasets.find(d => d.id === id);
    toast({
      title: "Viewing Dataset",
      description: `Opening ${dataset?.name} for visualization and analysis.`,
    });
  };
  
  const handleDownloadDataset = (id: string) => {
    const dataset = datasets.find(d => d.id === id);
    toast({
      title: "Download Started",
      description: `Downloading ${dataset?.name} (${dataset?.size})`,
    });
  };
  
  const handleDeleteDataset = (id: string) => {
    setDatasets(datasets.filter(d => d.id !== id));
    toast({
      title: "Dataset Deleted",
      description: "The dataset has been removed from your library.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search datasets by name, description, tags, or country..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          Filter
        </Button>
        <Button>
          Import New
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All Countries</TabsTrigger>
          <TabsTrigger value="zambia">Zambia</TabsTrigger>
          <TabsTrigger value="democratic republic of congo">DRC</TabsTrigger>
          <TabsTrigger value="other">Other Countries</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredDatasets.length === 0 ? (
        <Alert>
          <AlertDescription>
            No datasets match your search criteria.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDatasets.map(dataset => (
            <Card key={dataset.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      {dataset.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge>{dataset.format}</Badge>
                      <Badge variant="outline">{dataset.source}</Badge>
                      <Badge variant="secondary" className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" /> {dataset.country}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <p className="text-sm">{dataset.description}</p>
                <div className="mt-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-3">Size: {dataset.size}</span>
                    <span>Added: {dataset.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dataset.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewDataset(dataset.id)}
                >
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadDataset(dataset.id)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteDataset(dataset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
