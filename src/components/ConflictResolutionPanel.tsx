
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Conflict } from '@/types';
import { AlertTriangle, CheckCircle, HelpCircle, Users, MessageSquare } from 'lucide-react';

// Mock conflicts
const initialConflicts: Conflict[] = [
  {
    id: '1',
    type: 'claim-overlap',
    severity: 'high',
    description: 'Mining license claim overlap between Pacific Mining Corp and Sierra Explorations',
    partiesInvolved: ['Mining Company', 'Government Agency'],
    status: 'reviewing',
    resolutionSuggestions: [
      'Adjust boundary of claim A by 2.5km eastward',
      'Establish shared access zone for both companies',
      'Negotiate time-based access agreement'
    ],
    createdAt: '2024-04-10T08:00:00Z',
    updatedAt: '2024-04-12T14:30:00Z'
  },
  {
    id: '2',
    type: 'regulatory',
    severity: 'medium',
    description: 'Water usage permit requirement conflict with existing drilling plan',
    partiesInvolved: ['Mining Company', 'Environmental Regulator', 'Government Agency'],
    status: 'resolving',
    resolutionSuggestions: [
      'Reduce water consumption by implementing closed-loop system',
      'Obtain additional permit for temporary increased usage',
      'Adjust drilling schedule to non-drought season'
    ],
    createdAt: '2024-04-05T10:15:00Z',
    updatedAt: '2024-04-15T09:45:00Z'
  },
  {
    id: '3',
    type: 'environmental',
    severity: 'high',
    description: 'Potential impact on protected wetland area from exploration activities',
    partiesInvolved: ['Environmental Regulator', 'Mining Company', 'Academic Institution'],
    status: 'identified',
    resolutionSuggestions: [],
    createdAt: '2024-04-20T11:30:00Z',
    updatedAt: '2024-04-20T11:30:00Z'
  }
];

interface ConflictResolutionPanelProps {
  className?: string;
}

const ConflictResolutionPanel: React.FC<ConflictResolutionPanelProps> = ({ className }) => {
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const [selectedConflict, setSelectedConflict] = useState<string | null>(conflicts[0]?.id || null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'reviewing':
        return <HelpCircle size={16} className="text-amber-500" />;
      case 'resolving':
        return <Users size={16} className="text-blue-500" />;
      case 'identified':
      default:
        return <AlertTriangle size={16} className="text-red-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-500 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const activeConflicts = conflicts.filter(c => c.status !== 'resolved');
  const selectedConflictData = conflicts.find(c => c.id === selectedConflict);

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
            <div className="space-y-3 mb-4">
              {activeConflicts.map((conflict) => (
                <div 
                  key={conflict.id} 
                  className={`analysis-card cursor-pointer ${selectedConflict === conflict.id ? 'ring-2 ring-primary/50' : ''}`}
                  onClick={() => setSelectedConflict(conflict.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(conflict.status)}
                      <h3 className="font-medium ml-2">
                        {conflict.type === 'claim-overlap' ? 'Claim Overlap' : 
                         conflict.type === 'regulatory' ? 'Regulatory Conflict' : 
                         conflict.type === 'environmental' ? 'Environmental Issue' : 
                         conflict.type === 'stakeholder' ? 'Stakeholder Dispute' : 
                         'Conflict'}
                      </h3>
                    </div>
                    <Badge className={getSeverityColor(conflict.severity)}>
                      {conflict.severity} severity
                    </Badge>
                  </div>
                  <p className="text-sm mt-1.5">
                    {conflict.description}
                  </p>
                  <div className="mt-2 text-xs flex justify-between items-center">
                    <span>
                      <span className="text-muted-foreground">Status: </span>
                      <span className="capitalize">{conflict.status}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Identified: {formatDate(conflict.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedConflictData && (
              <div className="pt-3 border-t">
                <h3 className="font-medium mb-2">Conflict Details</h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Parties Involved:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedConflictData.partiesInvolved.map((party, index) => (
                      <Badge key={index} variant="outline">
                        {party}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedConflictData.resolutionSuggestions && selectedConflictData.resolutionSuggestions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">AI Resolution Suggestions:</h4>
                    <ul className="text-sm space-y-1 pl-5 list-disc">
                      {selectedConflictData.resolutionSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="space-x-2 mt-4">
                  <Button size="sm">
                    <MessageSquare size={14} className="mr-1" />
                    Contact Parties
                  </Button>
                  <Button size="sm" variant="outline">
                    View Location
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <div className="text-center p-8 text-muted-foreground">
              <CheckCircle size={32} className="mx-auto mb-3 text-green-500" />
              <p>No resolved conflicts yet</p>
              <p className="text-sm mt-2">Resolved conflicts will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-suggestions" className="mt-4">
            <div className="analysis-card">
              <div className="flex items-center mb-2">
                <AlertTriangle size={16} className="text-amber-500 mr-2" />
                <h3 className="font-medium">Potential Water Rights Conflict</h3>
              </div>
              <p className="text-sm mb-3">
                AI analysis has detected a potential conflict between planned drilling activities and seasonal water access rights in the northern sector.
              </p>
              <Badge className="bg-blue-500 text-white mb-2">Preventative Detection</Badge>
              <Button size="sm">Review Analysis</Button>
            </div>
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
