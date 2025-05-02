import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Search, Database, Download, Eye, Trash2, MapPin, File, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Zambian Copperbelt specific datasets
const ZAMBIAN_COPPERBELT_DATASETS = [
  {
    id: 'zm-cb1',
    name: 'Copperbelt Mineral Survey 2023',
    format: 'GeoJSON',
    source: 'Zambia Geological Survey Department',
    size: '42.8 MB',
    date: '2023-09-15',
    description: 'Comprehensive geological survey data from the Zambian Copperbelt region with detailed mineral distribution mapping and structural features. Includes core samples analysis and geochemical data from Kitwe, Ndola, and Chingola areas.',
    tags: ['Copper', 'Cobalt', 'Minerals', 'Survey', 'Copperbelt'],
    country: 'Zambia',
    coordinates: [-12.8159, 28.2401],
    relatedDocs: [
      { id: 'doc1', name: 'Copperbelt Technical Report', type: 'PDF', size: '15.2 MB' },
      { id: 'doc2', name: 'Mineral Grade Analysis', type: 'Excel', size: '8.4 MB' }
    ]
  },
  {
    id: 'zm-cb2',
    name: 'Konkola Deep Mining Project Data',
    format: 'Shapefile',
    source: 'Konkola Copper Mines',
    size: '38.3 MB',
    date: '2023-11-10',
    description: 'Geological and mining data from the Konkola Deep Mining Project, featuring stratigraphic columns, ore body models, and groundwater data. Includes technical specifications for mining operations below 1500m level.',
    tags: ['Deep Mining', 'Copper', 'Hydrogeology', 'Konkola'],
    country: 'Zambia',
    coordinates: [-12.5977, 27.8535],
    relatedDocs: [
      { id: 'doc3', name: 'Konkola Deep Mining Feasibility Study', type: 'PDF', size: '24.6 MB' },
      { id: 'doc4', name: 'Groundwater Management Plan', type: 'PDF', size: '12.8 MB' }
    ]
  },
  {
    id: 'zm-cb3',
    name: 'Mufulira Copper Mine Historical Data',
    format: 'CSV',
    source: 'Mopani Copper Mines',
    size: '17.5 MB',
    date: '2023-07-22',
    description: 'Historical production and geological records from Mufulira Mine (1933-present) including core samples, production statistics and geological cross-sections. Features detailed ore grade variations across different mining zones.',
    tags: ['Historical', 'Mining', 'Copper', 'Mufulira'],
    country: 'Zambia',
    coordinates: [-12.5490, 28.2406],
    relatedDocs: [
      { id: 'doc5', name: 'Mufulira Mine Historical Records (1933-1980)', type: 'PDF', size: '35.2 MB' },
      { id: 'doc6', name: 'Ore Grade Analysis (1980-Present)', type: 'Excel', size: '9.7 MB' }
    ]
  },
  {
    id: 'zm-cb4',
    name: 'Nchanga Open Pit Survey',
    format: 'GeoTIFF',
    source: 'Konkola Copper Mines',
    size: '56.7 MB',
    date: '2024-01-18',
    description: 'High-resolution survey of the Nchanga Open Pit with drone photogrammetry, structural geology mapping, and ore body modeling. Includes detailed stratigraphy and fault mapping with 3D visualization data.',
    tags: ['Open Pit', 'Copper', 'Survey', 'Nchanga'],
    country: 'Zambia',
    coordinates: [-12.5148, 27.8501],
    relatedDocs: [
      { id: 'doc7', name: 'Nchanga Open Pit Expansion Plan', type: 'PDF', size: '18.3 MB' },
      { id: 'doc8', name: 'Drone Survey Technical Specifications', type: 'PDF', size: '5.6 MB' }
    ]
  },
  {
    id: 'zm-cb5',
    name: 'Chambishi Geochemical Analysis',
    format: 'Excel',
    source: 'NFC Africa Mining',
    size: '12.2 MB',
    date: '2023-12-05',
    description: 'Comprehensive geochemical analysis of ore samples from Chambishi Mine with trace element composition and mineralogical studies. Features detailed analysis of cobalt and other critical minerals associated with copper deposits.',
    tags: ['Geochemical', 'Copper', 'Cobalt', 'Chambishi'],
    country: 'Zambia',
    coordinates: [-12.6621, 28.0539],
    relatedDocs: [
      { id: 'doc9', name: 'Chambishi Technical Report 2023', type: 'PDF', size: '22.1 MB' },
      { id: 'doc10', name: 'Critical Minerals Assessment', type: 'PowerPoint', size: '7.3 MB' }
    ]
  }
];

// Enhanced DRC datasets
const DRC_DATASETS = [
  {
    id: 'drc1',
    name: 'Katanga Copper Deposits',
    format: 'GeoTIFF',
    source: 'DRC Ministry of Mines',
    size: '45.8 MB',
    date: '2024-01-10',
    description: 'High-resolution survey of the Katanga copper deposits with mineral grading and geological cross-sections. Includes soil sampling data and detailed structural mapping from Kolwezi and Tenke-Fungurume areas.',
    tags: ['Copper', 'Mining', 'Deposits', 'Katanga'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.7222, 25.5488],
    relatedDocs: [
      { id: 'doc11', name: 'Katanga Province Mineral Report', type: 'PDF', size: '28.6 MB' },
      { id: 'doc12', name: 'Copper-Cobalt Association Analysis', type: 'Excel', size: '12.8 MB' }
    ]
  },
  {
    id: 'drc2',
    name: 'Tenke-Fungurume Mine Data',
    format: 'Shapefile',
    source: 'Tenke Fungurume Mining',
    size: '36.7 MB',
    date: '2023-10-18',
    description: 'Detailed mining and geological data from the Tenke-Fungurume operations, including ore body models, grade distribution, and structural controls on mineralization. Features comprehensive cobalt distribution maps.',
    tags: ['Copper', 'Cobalt', 'Mine', 'Tenke'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.5775, 26.1692],
    relatedDocs: [
      { id: 'doc13', name: 'Tenke-Fungurume Technical Report 2023', type: 'PDF', size: '32.1 MB' },
      { id: 'doc14', name: 'Cobalt Resources Assessment', type: 'PDF', size: '15.7 MB' }
    ]
  },
  {
    id: 'drc3',
    name: 'Kolwezi Tailings Project',
    format: 'CSV',
    source: 'Metalkol RTR',
    size: '24.5 MB',
    date: '2024-02-08',
    description: 'Comprehensive data on the Kolwezi Tailings Reclamation Project, including grade distribution, processing techniques, and environmental monitoring. Features detailed recovery estimates and processing methodologies.',
    tags: ['Tailings', 'Reclamation', 'Copper', 'Cobalt', 'Kolwezi'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.7147, 25.4706],
    relatedDocs: [
      { id: 'doc15', name: 'Tailings Reclamation Technical Study', type: 'PDF', size: '26.3 MB' },
      { id: 'doc16', name: 'Environmental Impact Assessment', type: 'PDF', size: '18.9 MB' }
    ]
  }
];

// Other African datasets
const OTHER_AFRICAN_DATASETS = [
  // Updated South Africa datasets
  {
    id: 'za1',
    name: 'Witwatersrand Gold Basin Analysis',
    format: 'GeoJSON',
    source: 'South African Geological Survey',
    size: '38.5 MB',
    date: '2024-02-15',
    description: 'Comprehensive structural and stratigraphic analysis of the Witwatersrand gold basin formations and deposits. Includes historical mining data, production statistics, and remaining reserve estimates from major mines.',
    tags: ['Gold', 'Mining', 'Basin Analysis', 'Witwatersrand'],
    country: 'South Africa',
    coordinates: [-26.2041, 28.0473],
    relatedDocs: [
      { id: 'doc17', name: 'Witwatersrand Basin Technical Report', type: 'PDF', size: '31.2 MB' },
      { id: 'doc18', name: 'Historical Gold Production Data', type: 'Excel', size: '8.6 MB' }
    ]
  },
  
  // Added Ghana datasets
  {
    id: 'gh1',
    name: 'Ashanti Gold Belt Survey',
    format: 'Shapefile',
    source: 'Ghana Geological Survey',
    size: '32.7 MB',
    date: '2024-01-25',
    description: 'Detailed mapping and survey data from the Ashanti Gold Belt including structural controls, mineralization styles, and exploration targets. Features comprehensive data from Obuasi, Tarkwa, and Ahafo mining districts.',
    tags: ['Gold', 'Mining', 'Structural Geology', 'Ashanti'],
    country: 'Ghana',
    coordinates: [6.6885, -1.6244],
    relatedDocs: [
      { id: 'doc19', name: 'Ashanti Gold Belt Exploration Guide', type: 'PDF', size: '27.3 MB' },
      { id: 'doc20', name: 'Ghana Mining Investment Report', type: 'PDF', size: '15.8 MB' }
    ]
  }
];

// Combine all African datasets
const AFRICAN_DATASETS = [
  ...ZAMBIAN_COPPERBELT_DATASETS,
  ...DRC_DATASETS,
  ...OTHER_AFRICAN_DATASETS
];

// Original datasets
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
  const [activeTab, setActiveTab] = useState<string>('zambia');
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [showDocuments, setShowDocuments] = useState<boolean>(false);
  const { toast } = useToast();
  
  const filteredDatasets = datasets.filter(dataset => {
    // First filter by tab selection
    if (activeTab === 'zambia' && dataset.country !== 'Zambia') {
      return false;
    } else if (activeTab === 'drc' && dataset.country !== 'Democratic Republic of Congo') {
      return false;
    } else if (activeTab === 'other' && dataset.country !== 'South Africa' && dataset.country !== 'Ghana' && 
               dataset.country !== 'Tanzania' && dataset.country !== 'Nigeria') {
      return false;
    } else if (activeTab === 'global' && (dataset.country === 'Zambia' || 
               dataset.country === 'Democratic Republic of Congo' || 
               dataset.country === 'South Africa' || 
               dataset.country === 'Ghana' || 
               dataset.country === 'Tanzania' || 
               dataset.country === 'Nigeria')) {
      return false;
    }
    
    // Then filter by search query
    return dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dataset.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.source.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const handleViewDataset = (dataset) => {
    setSelectedDataset(dataset);
    toast({
      title: "Viewing Dataset",
      description: `Opening ${dataset.name} for visualization and analysis.`,
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

  const handleViewDocuments = (dataset) => {
    setSelectedDataset(dataset);
    setShowDocuments(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search datasets by name, description, tags, country or source..."
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
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="zambia">Zambia</TabsTrigger>
          <TabsTrigger value="drc">DRC</TabsTrigger>
          <TabsTrigger value="other">Other African</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="all">All Datasets</TabsTrigger>
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
                  
                  {dataset.relatedDocs && dataset.relatedDocs.length > 0 && (
                    <div className="mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs flex items-center text-primary"
                        onClick={() => handleViewDocuments(dataset)}
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" /> 
                        View {dataset.relatedDocs.length} Related Documents
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewDataset(dataset)}
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
      
      {/* Dataset Details Dialog */}
      {selectedDataset && (
        <Dialog open={!!selectedDataset && !showDocuments} onOpenChange={(open) => !open && setSelectedDataset(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDataset.name}</DialogTitle>
              <DialogDescription>Detailed information and visualization</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Dataset visualization would appear here</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Dataset Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Source:</span> {selectedDataset.source}</p>
                    <p><span className="font-medium">Format:</span> {selectedDataset.format}</p>
                    <p><span className="font-medium">Size:</span> {selectedDataset.size}</p>
                    <p><span className="font-medium">Date Added:</span> {selectedDataset.date}</p>
                    <p><span className="font-medium">Country:</span> {selectedDataset.country}</p>
                    <p>
                      <span className="font-medium">Coordinates:</span> 
                      {selectedDataset.coordinates[0]}, {selectedDataset.coordinates[1]}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm">{selectedDataset.description}</p>
                  
                  <h4 className="font-medium mt-4 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedDataset.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedDataset.relatedDocs && selectedDataset.relatedDocs.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Related Documents</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedDataset.relatedDocs.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="flex items-center">
                            <File className="h-4 w-4 mr-2" />
                            {doc.name}
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" /> Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDataset(null)}>Close</Button>
              <Button>Export Data</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Related Documents Dialog */}
      {selectedDataset && (
        <Dialog open={showDocuments} onOpenChange={(open) => {
          if (!open) {
            setShowDocuments(false);
            setSelectedDataset(null);
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Documents Related to {selectedDataset.name}</DialogTitle>
              <DialogDescription>Technical reports and supplementary data</DialogDescription>
            </DialogHeader>
            
            {selectedDataset.relatedDocs && selectedDataset.relatedDocs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedDataset.relatedDocs.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center">
                        <File className="h-4 w-4 mr-2" />
                        {doc.name}
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                No related documents available for this dataset.
              </p>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowDocuments(false);
                setSelectedDataset(null);
              }}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
