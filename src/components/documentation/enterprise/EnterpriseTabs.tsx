
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecurityComplianceTab from './SecurityComplianceTab';
import DeploymentOptionsTab from './DeploymentOptionsTab';
import SupportSLAsTab from './SupportSLAsTab';

const EnterpriseTabs: React.FC = () => {
  return (
    <Tabs defaultValue="security" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="security">Security & Compliance</TabsTrigger>
        <TabsTrigger value="deployment">Deployment Options</TabsTrigger>
        <TabsTrigger value="support">Support & SLAs</TabsTrigger>
      </TabsList>
      
      {/* Security & Compliance Tab */}
      <TabsContent value="security" className="space-y-6">
        <SecurityComplianceTab />
      </TabsContent>
      
      {/* Deployment Options Tab */}
      <TabsContent value="deployment" className="space-y-6">
        <DeploymentOptionsTab />
      </TabsContent>
      
      {/* Support & SLAs Tab */}
      <TabsContent value="support" className="space-y-6">
        <SupportSLAsTab />
      </TabsContent>
    </Tabs>
  );
};

export default EnterpriseTabs;
