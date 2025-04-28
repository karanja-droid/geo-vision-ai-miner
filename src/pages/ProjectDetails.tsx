
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TechnologyStack from '@/components/TechnologyStack';
import ImplementationSteps from '@/components/ImplementationSteps';
import Challenges from '@/components/Challenges';
import OutcomesPanel from '@/components/OutcomesPanel';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('technology');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Project Implementation Plan</h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technology">Technology Stack</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
          <TabsTrigger value="challenges">Challenges & Mitigation</TabsTrigger>
          <TabsTrigger value="outcomes">Expected Outcomes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technology" className="min-h-[600px]">
          <TechnologyStack />
        </TabsContent>
        
        <TabsContent value="implementation" className="min-h-[600px]">
          <ImplementationSteps />
        </TabsContent>
        
        <TabsContent value="challenges" className="min-h-[600px]">
          <Challenges />
        </TabsContent>
        
        <TabsContent value="outcomes" className="min-h-[600px]">
          <OutcomesPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
