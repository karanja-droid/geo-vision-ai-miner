
import { useState, useMemo } from 'react';
import { DatasetInfo } from '@/types';

export const useDatasetFiltering = (datasets: DatasetInfo[], activeTab: string, searchQuery: string) => {
  return useMemo(() => {
    return datasets.filter(dataset => {
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
  }, [datasets, activeTab, searchQuery]);
};
