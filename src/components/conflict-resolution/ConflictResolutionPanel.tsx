
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Conflict } from '@/types';
import { initialConflicts } from './utils';
import ActiveConflictsTab from './ActiveConflictsTab';
import ResolvedConflictsTab from './ResolvedConflictsTab';
import AISuggestionsTab from './AISuggestionsTab';

interface ConflictResolutionPanelProps {
  className?: string;
}

const ConflictResolutionPanel: React.FC<ConflictResolutionPanelProps> = ({ className }) => {
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const [selectedConflict, setSelectedConflict] = useState<string | null>(conflicts[0]?.id || null);

  const activeConflicts = conflicts.filter(c => c.status !== 'resolved');

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Conflict Resolution</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeConflicts.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <ActiveConflictsTab 
              conflicts={activeConflicts} 
              selectedConflict={selectedConflict} 
              setSelectedConflict={setSelectedConflict} 
            />
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <ResolvedConflictsTab />
          </TabsContent>
          
          <TabsContent value="ai-suggestions" className="mt-4">
            <AISuggestionsTab />
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-3 border-t flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {activeConflicts.length} active conflicts requiring attention
          </span>
          <Button size="sm">
            Report Conflict
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConflictResolutionPanel;
