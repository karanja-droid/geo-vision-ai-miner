
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Map, BookOpen, BadgeCheck, FileText, Check, Clock, AlertTriangle } from 'lucide-react';
import { DatasetInfo, StakeholderOrganization } from '@/types';

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

  const getOrganizationIcon = (org?: StakeholderOrganization) => {
    switch (org) {
      case 'Geological Survey Department':
        return <Map size={16} />;
      case 'Mining Company':
        return <Building size={16} />;
      case 'Remote Sensing Agency':
        return <Map size={16} />;
      case 'Environmental Regulator':
        return <BadgeCheck size={16} />;
      case 'Academic Institution':
        return <BookOpen size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Filter by Organization</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedOrganization === 'all' ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedOrganization('all')}
            >
              All Organizations
            </Badge>
            {organizations.map((org) => (
              <Badge
                key={org}
                variant={selectedOrganization === org ? "default" : "outline"}
                className="cursor-pointer flex items-center gap-1"
                onClick={() => setSelectedOrganization(org)}
              >
                {getOrganizationIcon(org)}
                {org.replace(' Department', '').replace(' Agency', '')}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="datasets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="activity">Contribution Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="datasets" className="mt-4 space-y-4">
            {filteredDatasets.length > 0 ? (
              <div className="space-y-3">
                {filteredDatasets.map((dataset) => (
                  <div key={dataset.id} className="analysis-card">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-md bg-primary/10 text-primary mt-0.5">
                          {getOrganizationIcon(dataset.organization)}
                        </div>
                        <div>
                          <h3 className="font-medium">{dataset.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {dataset.type} • {formatFileSize(dataset.size)} • {formatDate(dataset.uploadDate)}
                          </p>
                          {dataset.source && (
                            <p className="text-xs mt-1">Source: {dataset.source}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge 
                          variant={dataset.validated ? "default" : "outline"}
                          className={dataset.validated ? 'bg-green-500' : 'text-amber-500'}
                        >
                          {dataset.validated ? (
                            <div className="flex items-center gap-1">
                              <Check size={12} />
                              <span>Validated</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>Pending</span>
                            </div>
                          )}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Use
                        </Button>
                      </div>
                    </div>
                    {dataset.description && (
                      <p className="text-sm mt-2 text-muted-foreground">{dataset.description}</p>
                    )}
                    {dataset.contributors && dataset.contributors.length > 0 && (
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <span>Contributors: {dataset.contributors.length}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <p>No datasets available from the selected organization</p>
                <p className="text-sm mt-2">Try selecting a different organization or check back later</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <div className="space-y-4">
              <div className="analysis-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-green-100 text-green-700">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">New Dataset Validated</h3>
                    <p className="text-xs text-muted-foreground">Yesterday at 2:45 PM</p>
                  </div>
                </div>
                <p className="text-sm">
                  Environmental Impact Assessment from Environmental Protection Agency has been validated and is now available for analysis.
                </p>
              </div>
              
              <div className="analysis-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-blue-100 text-blue-700">
                    <Map size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Dataset Contribution</h3>
                    <p className="text-xs text-muted-foreground">April 24, 2024 at 10:23 AM</p>
                  </div>
                </div>
                <p className="text-sm">
                  Geological Survey Department has contributed a new dataset: "Core Sample Analysis Q1 2024"
                </p>
              </div>
              
              <div className="analysis-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-700">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Validation Required</h3>
                    <p className="text-xs text-muted-foreground">April 22, 2024 at 4:15 PM</p>
                  </div>
                </div>
                <p className="text-sm">
                  New dataset from Mining Company requires validation: "Exploration Results Phase 2"
                </p>
              </div>
            </div>
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
