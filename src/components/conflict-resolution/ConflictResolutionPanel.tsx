
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import AISuggestionsTab from './AISuggestionsTab';
import ActiveConflictsTab from './ActiveConflictsTab';
import ResolvedConflictsTab from './ResolvedConflictsTab';

const ConflictResolutionPanel: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-card rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold p-4 border-b">Conflict Resolution</h2>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-3'} mb-2`}>
          <TabsTrigger value="active" className={isMobile ? 'text-xs py-1 px-2' : ''}>
            Active
          </TabsTrigger>
          <TabsTrigger value="resolved" className={isMobile ? 'text-xs py-1 px-2' : ''}>
            Resolved
          </TabsTrigger>
          <TabsTrigger value="ai" className={isMobile ? 'text-xs py-1 px-2' : ''}>
            AI Suggestions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="p-4">
          <ActiveConflictsTab />
        </TabsContent>
        <TabsContent value="resolved" className="p-4">
          <ResolvedConflictsTab />
        </TabsContent>
        <TabsContent value="ai" className="p-4">
          <AISuggestionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConflictResolutionPanel;
