
import React, { useState } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilter } from './dataset/SearchFilter';
import { DatasetCard } from './dataset/DatasetCard';
import { DatasetDetailsDialog } from './dataset/DatasetDetailsDialog';
import { RelatedDocsDialog } from './dataset/RelatedDocsDialog';
import { 
  ALL_DATASETS, 
  Dataset 
} from '@/data/datasetLibraryData';

export const DatasetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [datasets, setDatasets] = useState<Dataset[]>(ALL_DATASETS);
  const [activeTab, setActiveTab] = useState<string>('zambia');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
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
  
  const handleViewDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowDocuments(false);
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

  const handleViewDocuments = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowDocuments(true);
  };

  return (
    <div className="space-y-6">
      <SearchFilter 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
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
            <DatasetCard 
              key={dataset.id}
              dataset={dataset}
              onViewDataset={handleViewDataset}
              onDownloadDataset={handleDownloadDataset}
              onDeleteDataset={handleDeleteDataset}
              onViewDocuments={handleViewDocuments}
            />
          ))}
        </div>
      )}
      
      {/* Dataset Details Dialog */}
      <DatasetDetailsDialog 
        dataset={selectedDataset} 
        open={!!selectedDataset && !showDocuments}
        onOpenChange={(open) => !open && setSelectedDataset(null)}
      />
      
      {/* Related Documents Dialog */}
      <RelatedDocsDialog
        dataset={selectedDataset}
        open={!!selectedDataset && showDocuments}
        onOpenChange={(open) => {
          if (!open) {
            setShowDocuments(false);
            setSelectedDataset(null);
          }
        }}
      />
    </div>
  );
};
