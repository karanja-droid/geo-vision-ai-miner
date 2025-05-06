
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModulesFeatures from '@/components/documentation/ModulesFeatures';
import SlackIntegrationDocs from '@/components/documentation/SlackIntegrationDocs';
import TeamsIntegrationDocs from '@/components/documentation/TeamsIntegrationDocs';
import SatelliteVisionDocs from '@/components/documentation/SatelliteVisionDocs';
import UserGuideTabs from '@/components/documentation/UserGuideTabs';
import FAQSection from '@/components/documentation/FAQSection';
import EnterpriseReadinessDocs from '@/components/documentation/EnterpriseReadinessDocs';

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="modules">Modules & Features</TabsTrigger>
            <TabsTrigger value="satellite-vision">SatelliteVision CNN</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise Readiness</TabsTrigger>
            <TabsTrigger value="user-guide">User Guide</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Modules & Features Tab */}
          <TabsContent value="modules" className="space-y-6">
            <ModulesFeatures />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <SlackIntegrationDocs />
              <TeamsIntegrationDocs />
            </div>
          </TabsContent>
          
          {/* SatelliteVision CNN Tab */}
          <TabsContent value="satellite-vision" className="space-y-6">
            <SatelliteVisionDocs />
          </TabsContent>
          
          {/* Enterprise Readiness Tab */}
          <TabsContent value="enterprise" className="space-y-6" id="enterprise-readiness">
            <EnterpriseReadinessDocs />
          </TabsContent>
          
          {/* User Guide Tab */}
          <TabsContent value="user-guide" className="space-y-6">
            <UserGuideTabs />
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6" id="faq">
            <FAQSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
