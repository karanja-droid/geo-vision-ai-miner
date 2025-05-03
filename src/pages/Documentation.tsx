
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModulesFeatures from '@/components/documentation/ModulesFeatures';
import SlackIntegrationDocs from '@/components/documentation/SlackIntegrationDocs';
import UserGuideTabs from '@/components/documentation/UserGuideTabs';
import FAQSection from '@/components/documentation/FAQSection';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">GeoVision AI Miner Documentation</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to using the GeoVision AI Miner platform for geological exploration and analysis.
          </p>
        </div>
        
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="modules">Modules & Features</TabsTrigger>
            <TabsTrigger value="user-guide">User Guide</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Modules & Features Tab */}
          <TabsContent value="modules" className="space-y-6">
            <ModulesFeatures />
            <SlackIntegrationDocs />
          </TabsContent>
          
          {/* User Guide Tab */}
          <TabsContent value="user-guide" className="space-y-6">
            <UserGuideTabs />
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <FAQSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
