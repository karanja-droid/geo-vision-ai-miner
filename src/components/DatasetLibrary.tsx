
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Search, Database, Download, Eye, Trash2 } from "lucide-react";

// Mock dataset data for demonstration
const MOCK_DATASETS = [
  {
    id: '1',
    name: 'Sierra Nevada Survey',
    format: 'GeoJSON',
    source: 'Upload',
    size: '24.5 MB',
    date: '2023-10-15',
    description: 'Comprehensive geological survey data from Sierra Nevada region',
    tags: ['Geological', 'Survey', 'Mountains']
  },
  {
    id: '2',
    name: 'Satellite Images 2023',
    format: 'GeoTIFF',
    source: 'External API',
    size: '156 MB',
    date: '2023-12-02',
    description: 'High-resolution satellite imagery of target exploration areas',
    tags: ['Remote Sensing', 'Satellite', 'Imagery']
  },
  {
    id: '3',
    name: 'Historical Mining Data',
    format: 'CSV',
    source: 'Upload',
    size: '8.7 MB',
    date: '2023-08-30',
    description: 'Collection of historical mining records and exploration data',
    tags: ['Historical', 'Mining', 'Records']
  },
  {
    id: '4',
    name: 'Fault Line Analysis',
    format: 'Shapefile',
    source: 'USGS',
    size: '32.1 MB',
    date: '2024-01-18',
    description: 'Detailed fault line mappings with geological annotations',
    tags: ['Faults', 'Seismic', 'Structural']
  },
  {
    id: '5',
    name: 'Mineral Distribution Map',
    format: 'GeoJSON',
    source: 'Research Team',
    size: '17.3 MB',
    date: '2024-03-05',
    description: 'Detailed mapping of mineral distributions across the survey area',
    tags: ['Minerals', 'Distribution', 'Mapping']
  },
];

export const DatasetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [datasets, setDatasets] = useState(MOCK_DATASETS);
  const { toast } = useToast();
  
  const filteredDatasets = datasets.filter(dataset => 
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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
            placeholder="Search datasets by name, description, or tags..."
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
