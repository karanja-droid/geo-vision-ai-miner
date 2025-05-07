
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Database, ChartLine, Layers, Users, Combine } from "lucide-react";

// Import all the tab components
import { Header } from "@/components/data-integration/Header";
import { VisualizationTab } from "@/components/data-integration/VisualizationTab";
import { DataSourcesTab } from "@/components/data-integration/DataSourcesTab";
import { InsightsTab } from "@/components/data-integration/InsightsTab";
import { InvestorsTab } from "@/components/data-integration/InvestorsTab";
import { AIModelsTab } from "@/components/data-integration/AIModelsTab";
import { CloudDeploymentTab } from "@/components/data-integration/CloudDeploymentTab";
import { CollaborationTab } from "@/components/data-integration/CollaborationTab";
import { IntegrationsTab } from "@/components/data-integration/IntegrationsTab";

const GlobalDataIntegration: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('visualization');

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
          <TabsTrigger value="sources">Global Data Sources</TabsTrigger>
          <TabsTrigger value="insights">Data Insights</TabsTrigger>
          <TabsTrigger value="investors">Investor Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization">
          <VisualizationTab />
        </TabsContent>
        
        <TabsContent value="sources">
          <DataSourcesTab />
        </TabsContent>
        
        <TabsContent value="insights">
          <InsightsTab />
        </TabsContent>
        
        <TabsContent value="investors">
          <InvestorsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalDataIntegration;
