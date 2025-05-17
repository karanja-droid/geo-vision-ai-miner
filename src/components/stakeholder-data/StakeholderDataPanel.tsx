
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DatasetInfo, StakeholderOrganization } from '@/types';
import OrganizationFilter from './OrganizationFilter';
import DatasetsTab from './DatasetsTab';
import ActivityTab from './ActivityTab';
import { useDatasets } from '@/hooks/database';
import { Loader2 } from 'lucide-react';

interface StakeholderDataPanelProps {
  className?: string;
}

const StakeholderDataPanel: React.FC<StakeholderDataPanelProps> = ({ className }) => {
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<StakeholderOrganization | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  const { getDatasets } = useDatasets();
  
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const fetchedDatasets = await getDatasets();
        if (fetchedDatasets) {
          setDatasets(fetchedDatasets);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching datasets:", error);
        setIsLoading(false);
      }
    };
    
    fetchDatasets();
  }, [getDatasets]);

  const filteredDatasets = selectedOrganization === 'all' 
    ? datasets 
    : datasets.filter(dataset => dataset.organization === selectedOrganization);

  // Extract available organizations from the actual dataset
  const getAvailableOrganizations = (): StakeholderOrganization[] => {
    const uniqueOrgs = new Set<StakeholderOrganization>();
    
    datasets.forEach(dataset => {
      if (dataset.organization) {
        uniqueOrgs.add(dataset.organization as StakeholderOrganization);
      }
    });
    
    // If no organizations found, return the default list
    if (uniqueOrgs.size === 0) {
      return [
        'Geological Survey Department',
        'Mining Company',
        'Remote Sensing Agency',
        'Environmental Regulator',
        'Academic Institution'
      ];
    }
    
    return Array.from(uniqueOrgs);
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Stakeholder Contributions</CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizationFilter 
          selectedOrganization={selectedOrganization}
          setSelectedOrganization={setSelectedOrganization}
          organizations={getAvailableOrganizations()}
        />

        <Tabs defaultValue="datasets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="activity">Contribution Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="datasets" className="mt-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">Loading datasets...</span>
              </div>
            ) : (
              <DatasetsTab datasets={filteredDatasets} />
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <ActivityTab />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-3 border-t flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Total datasets: {filteredDatasets.length}
          </span>
          <Button size="sm">
            Contribute Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StakeholderDataPanel;
