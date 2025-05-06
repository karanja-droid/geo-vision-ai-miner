
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeatureTimeline from '@/components/roadmap/FeatureTimeline';
import EnterpriseReadiness from '@/components/roadmap/EnterpriseReadiness';
import MarketAnalysis from '@/components/roadmap/MarketAnalysis';

const ProductRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('timeline');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Feature Timeline</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise Readiness</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
        </TabsList>
        
        {/* Feature Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <FeatureTimeline />
        </TabsContent>
        
        {/* Enterprise Readiness Tab */}
        <TabsContent value="enterprise" className="space-y-6">
          <EnterpriseReadiness />
        </TabsContent>
        
        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-6">
          <MarketAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductRoadmap;
