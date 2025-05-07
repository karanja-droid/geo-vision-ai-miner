
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import AISuggestionsTab from './AISuggestionsTab';
import ActiveConflictsTab from './ActiveConflictsTab';
import ResolvedConflictsTab from './ResolvedConflictsTab';
import { initialConflicts } from './utils';
import { Conflict } from '@/types';

const ConflictResolutionPanel: React.FC = () => {
  const isMobile = useIsMobile();
  const [conflicts] = useState<Conflict[]>(initialConflicts);
  const [selectedConflict, setSelectedConflict] = useState<string | null>(null);

  return (
    <div className="bg-card rounded-lg shadow-md border overflow-hidden">
      <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold p-3 sm:p-4 border-b`}>Conflict Resolution</h2>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3 px-1 py-0.5' : 'grid-cols-3'} mb-1 sm:mb-2`}>
          <TabsTrigger value="active" className={isMobile ? 'text-xs py-1 px-1' : ''}>
            Active
          </TabsTrigger>
          <TabsTrigger value="resolved" className={isMobile ? 'text-xs py-1 px-1' : ''}>
            Resolved
          </TabsTrigger>
          <TabsTrigger value="ai" className={isMobile ? 'text-xs py-1 px-1' : ''}>
            AI Suggestions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className={`${isMobile ? 'p-2' : 'p-4'}`}>
          <ActiveConflictsTab 
            conflicts={conflicts} 
            selectedConflict={selectedConflict} 
            setSelectedConflict={setSelectedConflict} 
          />
        </TabsContent>
        <TabsContent value="resolved" className={`${isMobile ? 'p-2' : 'p-4'}`}>
          <ResolvedConflictsTab />
        </TabsContent>
        <TabsContent value="ai" className={`${isMobile ? 'p-2' : 'p-4'}`}>
          <AISuggestionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConflictResolutionPanel;
