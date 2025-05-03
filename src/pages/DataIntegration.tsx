
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataSourcesTab } from '@/components/data-integration/DataSourcesTab';
import { CloudDeploymentTab } from '@/components/data-integration/CloudDeploymentTab';
import { CollaborationTab } from '@/components/data-integration/CollaborationTab';
import { AIModelsTab } from '@/components/data-integration/AIModelsTab';
import { IntegrationsTab } from '@/components/data-integration/IntegrationsTab';

const DataIntegration: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Data Integration Hub</h1>
            <p className="text-muted-foreground">Connect real-world geological data sources with cloud-based AI processing</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>

        <Tabs defaultValue="data-sources">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="cloud-deployment">Cloud Deployment</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration Tools</TabsTrigger>
            <TabsTrigger value="ai-models">Enhanced AI Models</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="data-sources">
            <DataSourcesTab />
          </TabsContent>

          <TabsContent value="cloud-deployment">
            <CloudDeploymentTab />
          </TabsContent>

          <TabsContent value="collaboration">
            <CollaborationTab />
          </TabsContent>

          <TabsContent value="ai-models">
            <AIModelsTab />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataIntegration;
