
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SearchFilter } from './dataset/SearchFilter';
import { DatasetDetailsDialog } from './dataset/DatasetDetailsDialog';
import { RelatedDocsDialog } from './dataset/RelatedDocsDialog';
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { cacheDataset, getAllCachedDatasets } from '@/services/DatasetCacheService';
import { useDatasets } from '@/hooks/database';
import { DatasetInfo } from '@/types';
import { FilterTabs } from './dataset-library/FilterTabs';
import { OfflineAlert } from './dataset-library/OfflineAlert';
import { DatasetGrid } from './dataset-library/DatasetGrid';
import { useDatasetFiltering } from './dataset-library/useDatasetFiltering';

export const DatasetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [activeTab, setActiveTab] = useState<string>('zambia');
  const [selectedDataset, setSelectedDataset] = useState<DatasetInfo | null>(null);
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
          setDatasets(fetchedDatasets as DatasetInfo[]);
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
          const cached = await getAllCachedDatasets<DatasetInfo>('library');
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
  
  // Use the filtering hook
  const filteredDatasets = useDatasetFiltering(datasets, activeTab, searchQuery);
  
  const handleViewDataset = (dataset: DatasetInfo) => {
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

  const handleViewDocuments = (dataset: DatasetInfo) => {
    setSelectedDataset(dataset);
    setShowDocuments(true);
  };

  return (
    <div className="space-y-6">
      <SearchFilter 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <OfflineAlert isOnline={isOnline} />
      
      <FilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <DatasetGrid
        loading={loading}
        isOnline={isOnline}
        datasets={filteredDatasets}
        onViewDataset={handleViewDataset}
        onDownloadDataset={handleDownloadDataset}
        onDeleteDataset={handleDeleteDataset}
        onViewDocuments={handleViewDocuments}
      />
      
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
