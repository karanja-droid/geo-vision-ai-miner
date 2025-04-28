
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Workflow, WorkflowStep } from '@/types';
import { 
  PlayCircle, 
  PauseCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Brain, 
  Calendar, 
  User 
} from 'lucide-react';

// Mock data
const initialWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'High-Potential Zone Investigation',
    status: 'active',
    steps: [
      { id: '1-1', name: 'AI Analysis Complete', status: 'completed' },
      { id: '1-2', name: 'Soil Sample Collection', status: 'in-progress', assignedTo: ['user2'], dueDate: '2024-05-05' },
      { id: '1-3', name: 'Lab Analysis', status: 'pending', dependsOn: ['1-2'] },
      { id: '1-4', name: 'Drilling Decision', status: 'pending', dependsOn: ['1-3'] }
    ],
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2024-04-25T14:30:00Z',
    triggeredBy: 'ai',
    stakeholdersInvolved: ['Geological Survey Department', 'Mining Company']
  },
  {
    id: '2',
    name: 'Environmental Compliance Review',
    status: 'active',
    steps: [
      { id: '2-1', name: 'Initial Assessment', status: 'completed' },
      { id: '2-2', name: 'Stakeholder Notification', status: 'completed' },
      { id: '2-3', name: 'Documentation Review', status: 'in-progress', assignedTo: ['user4'], dueDate: '2024-05-10' },
      { id: '2-4', name: 'Approval Decision', status: 'pending', dependsOn: ['2-3'] }
    ],
    createdAt: '2024-04-15T09:00:00Z',
    updatedAt: '2024-04-22T11:15:00Z',
    triggeredBy: 'user',
    stakeholdersInvolved: ['Environmental Regulator', 'Mining Company']
  },
  {
    id: '3',
    name: 'Quarterly Data Integration',
    status: 'completed',
    steps: [
      { id: '3-1', name: 'Data Collection', status: 'completed' },
      { id: '3-2', name: 'Quality Validation', status: 'completed' },
      { id: '3-3', name: 'Model Retraining', status: 'completed' },
      { id: '3-4', name: 'Report Generation', status: 'completed' }
    ],
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-30T16:45:00Z',
    triggeredBy: 'schedule',
    stakeholdersInvolved: ['Academic Institution', 'Geological Survey Department']
  }
];

interface WorkflowPanelProps {
  className?: string;
}

const WorkflowPanel: React.FC<WorkflowPanelProps> = ({ className }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(workflows[0]?.id || null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayCircle size={16} className="text-green-500" />;
      case 'inactive':
        return <PauseCircle size={16} className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={14} className="text-blue-500" />;
      case 'failed':
        return <XCircle size={14} className="text-red-500" />;
      default:
        return <Clock size={14} className="text-gray-400" />;
    }
  };

  const getTriggerIcon = (trigger: 'ai' | 'user' | 'schedule') => {
    switch (trigger) {
      case 'ai':
        return <Brain size={14} />;
      case 'user':
        return <User size={14} />;
      case 'schedule':
        return <Calendar size={14} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const activeWorkflows = workflows.filter(w => w.status === 'active');
  const completedWorkflows = workflows.filter(w => w.status === 'completed');
  const selectedWorkflowData = workflows.find(w => w.id === selectedWorkflow);

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Automated Workflows</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeWorkflows.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              {activeWorkflows.map((workflow) => (
                <div 
                  key={workflow.id} 
                  className={`analysis-card cursor-pointer ${selectedWorkflow === workflow.id ? 'ring-2 ring-primary/50' : ''}`}
                  onClick={() => setSelectedWorkflow(workflow.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(workflow.status)}
                      <h3 className="font-medium ml-2">{workflow.name}</h3>
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      {getTriggerIcon(workflow.triggeredBy)}
                      <span className="capitalize">{workflow.triggeredBy} Triggered</span>
                    </div>
                    <span>Updated {formatDate(workflow.updatedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedWorkflowData && (
              <div className="pt-3 border-t">
                <h3 className="font-medium mb-2">Workflow Steps</h3>
                <div className="space-y-3">
                  {selectedWorkflowData.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-1">
                        {getStepStatusIcon(step.status)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{index + 1}. {step.name}</span>
                          <Badge variant={step.status === 'completed' ? 'default' : 'outline'} className={
                            step.status === 'completed' ? 'bg-green-500' : 
                            step.status === 'in-progress' ? 'text-blue-500' : 'text-gray-500'
                          }>
                            {step.status}
                          </Badge>
                        </div>
                        {step.assignedTo && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Assigned to team member • Due: {formatDate(step.dueDate || '')}
                          </p>
                        )}
                        {step.dependsOn && step.dependsOn.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Waiting on previous step
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                  <div className="text-xs text-muted-foreground">
                    <p>Stakeholders: {selectedWorkflowData.stakeholdersInvolved.length}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Manage Workflow
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="space-y-3">
              {completedWorkflows.map((workflow) => (
                <div key={workflow.id} className="analysis-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(workflow.status)}
                      <h3 className="font-medium ml-2">{workflow.name}</h3>
                    </div>
                    <Badge className="bg-blue-500 text-white">Completed</Badge>
                  </div>
                  <div className="mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>Created: {formatDate(workflow.createdAt)}</span>
                      <span>Completed: {formatDate(workflow.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-4">
            <div className="space-y-3">
              <div className="analysis-card">
                <h3 className="font-medium">High-Potential Zone Investigation</h3>
                <p className="text-sm mt-1">Standard workflow for investigating AI-identified mineral potential zones</p>
                <Button size="sm" className="mt-2">Create Workflow</Button>
              </div>
              <div className="analysis-card">
                <h3 className="font-medium">Environmental Compliance Review</h3>
                <p className="text-sm mt-1">Process for environmental assessment and regulatory compliance</p>
                <Button size="sm" className="mt-2">Create Workflow</Button>
              </div>
              <div className="analysis-card">
                <h3 className="font-medium">Stakeholder Data Integration</h3>
                <p className="text-sm mt-1">Workflow for validating and incorporating stakeholder data contributions</p>
                <Button size="sm" className="mt-2">Create Workflow</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-3 border-t flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Total active workflows: {activeWorkflows.length}
          </span>
          <Button size="sm">
            New Workflow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowPanel;
