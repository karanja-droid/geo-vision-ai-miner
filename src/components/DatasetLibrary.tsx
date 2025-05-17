
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilter } from './dataset/SearchFilter';
import { DatasetCard } from './dataset/DatasetCard';
import { DatasetDetailsDialog } from './dataset/DatasetDetailsDialog';
import { RelatedDocsDialog } from './dataset/RelatedDocsDialog';
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { cacheDataset, getAllCachedDatasets } from '@/services/DatasetCacheService';
import { useDatasets } from '@/hooks/database';
import { DatasetInfo } from '@/types';
import { Loader2 } from "lucide-react";

// Type declaration to ensure compatibility between Dataset from data/datasetLibraryData.ts and DatasetInfo
type Dataset = DatasetInfo;

export const DatasetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [activeTab, setActiveTab] = useState<string>('zambia');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [showDocuments, setShowDocuments] = useState<boolean>(false);
  const { toast } = useToast();
  const { isOnline, addToCache, cachedDatasets } = useConnectivity();
  const { getDatasets, loading } = useDatasets();
  
  // Fetch datasets from API
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const fetchedDatasets = await getDatasets();
        if (fetchedDatasets) {
          setDatasets(fetchedDatasets as Dataset[]);
        }
      } catch (error) {
        console.error("Failed to fetch datasets:", error);
        toast({
          title: "Error fetching datasets",
          description: "Could not load datasets from the server. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    if (isOnline) {
      fetchDatasets();
    } else if (cachedDatasets.length > 0) {
      // Load cached datasets when offline
      const loadCachedDatasets = async () => {
        try {
          const cached = await getAllCachedDatasets<Dataset>('library');
          if (cached && cached.length > 0) {
            setDatasets(cached);
          }
        } catch (error) {
          console.error("Failed to load cached datasets:", error);
        }
      };
      loadCachedDatasets();
    }
  }, [isOnline, cachedDatasets.length, getDatasets, toast]);
  
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
    } else if (activeTab === 'all') {
      // Include all datasets for "all" tab
    }
    
    // Then filter by search query
    return !searchQuery || 
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dataset.description && dataset.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dataset.tags && dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (dataset.country && dataset.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dataset.source && dataset.source.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  const handleViewDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowDocuments(false);
    toast({
      title: "Viewing Dataset",
      description: `Opening ${dataset.name} for visualization and analysis.`,
    });
  };
  
  const handleDownloadDataset = async (id: string) => {
    const dataset = datasets.find(d => d.id === id);
    if (!dataset) return;
    
    try {
      // Cache the dataset in IndexedDB
      await cacheDataset(dataset, 'library');
      // Update the connectivity context
      await addToCache(id);
      
      toast({
        title: "Download Complete",
        description: `${dataset.name} has been cached for offline use.`,
      });
    } catch (error) {
      console.error("Failed to cache dataset:", error);
      toast({
        title: "Download Failed",
        description: "Could not cache dataset for offline use.",
        variant: "destructive"
      });
    }
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
      
      {!isOnline && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-800">
            You are currently offline. Only cached datasets are available.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="zambia">Zambia</TabsTrigger>
          <TabsTrigger value="drc">DRC</TabsTrigger>
          <TabsTrigger value="other">Other African</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="all">All Datasets</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading datasets...</span>
        </div>
      ) : filteredDatasets.length === 0 ? (
        <Alert>
          <AlertDescription>
            {!isOnline 
              ? "No cached datasets available. Connect to the internet to access more datasets." 
              : "No datasets match your search criteria."}
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
