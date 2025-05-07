
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DatasetInfo, StakeholderOrganization } from '@/types';
import OrganizationFilter from './OrganizationFilter';
import DatasetsTab from './DatasetsTab';
import ActivityTab from './ActivityTab';

// Mock datasets for demonstration
const initialDatasets: DatasetInfo[] = [
  {
    id: '1',
    name: 'Regional Geological Map 2023',
    type: 'Geological',
    size: 38500000,
    uploadDate: '2023-11-10',
    description: 'Comprehensive geological mapping of the Sierra Nevada region',
    source: 'California Geological Survey',
    organization: 'Geological Survey Department',
    validated: true,
    contributors: ['user1', 'user3']
  },
  {
    id: '2',
    name: 'Mineral Exploration License Data',
    type: 'Regulatory',
    size: 12400000,
    uploadDate: '2023-12-15',
    description: 'Active mining licenses and exploration permits in the region',
    source: 'Pacific Mining Corp',
    organization: 'Mining Company',
    validated: true,
    contributors: ['user5']
  },
  {
    id: '3',
    name: 'Sentinel-2 Satellite Imagery',
    type: 'Remote Sensing',
    size: 156000000,
    uploadDate: '2024-01-28',
    description: 'High-resolution multispectral satellite imagery of target areas',
    source: 'EarthObs Technologies',
    organization: 'Remote Sensing Agency',
    validated: true,
    contributors: ['user2', 'user7']
  },
  {
    id: '4',
    name: 'Environmental Impact Assessment',
    type: 'Environmental',
    size: 24800000,
    uploadDate: '2024-02-05',
    description: 'Baseline environmental data and compliance requirements',
    source: 'Environmental Protection Agency',
    organization: 'Environmental Regulator',
    validated: false,
    contributors: ['user4']
  },
  {
    id: '5',
    name: 'Regional Mineralization Model',
    type: 'Academic',
    size: 18500000,
    uploadDate: '2024-03-12',
    description: 'Research paper and data on regional ore formation patterns',
    source: 'University of Colorado',
    organization: 'Academic Institution',
    validated: true,
    contributors: ['user6']
  }
];

interface StakeholderDataPanelProps {
  className?: string;
}

const StakeholderDataPanel: React.FC<StakeholderDataPanelProps> = ({ className }) => {
  const [datasets, setDatasets] = useState<DatasetInfo[]>(initialDatasets);
  const [selectedOrganization, setSelectedOrganization] = useState<StakeholderOrganization | 'all'>('all');
  
  const filteredDatasets = selectedOrganization === 'all' 
    ? datasets 
    : datasets.filter(dataset => dataset.organization === selectedOrganization);

  const organizations: StakeholderOrganization[] = [
    'Geological Survey Department',
    'Mining Company',
    'Remote Sensing Agency',
    'Environmental Regulator',
    'Academic Institution'
  ];

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Stakeholder Contributions</CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizationFilter 
          selectedOrganization={selectedOrganization}
          setSelectedOrganization={setSelectedOrganization}
          organizations={organizations}
        />

        <Tabs defaultValue="datasets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="activity">Contribution Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="datasets" className="mt-4 space-y-4">
            <DatasetsTab datasets={filteredDatasets} />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <ActivityTab />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-3 border-t flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Total datasets: {datasets.length}
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
