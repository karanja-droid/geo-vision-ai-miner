
import React, { useState } from 'react';
import Header from './Header';
import Map from './Map';
import UploadPanel from './UploadPanel';
import AIAnalysisPanel from './AIAnalysisPanel';
import ResultsVisualization from './ResultsVisualization';
import RoleSelector from './RoleSelector';
import TasksPanel from './TasksPanel';
import CommunicationPanel from './CommunicationPanel';
import StakeholderDataPanel from './StakeholderDataPanel';
import WorkflowPanel from './WorkflowPanel';
import ConflictResolutionPanel from './ConflictResolutionPanel';
import AIModelPanel from './AIModelPanel';
import { UserRole } from '@/types';

const Dashboard: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('geologist');

  // Enhanced function to determine which panels to show based on role
  const getPanelVisibility = (role: UserRole) => {
    const baseVisibility = {
      map: true,
      upload: false,
      aiAnalysis: false,
      results: false,
      tasks: false,
      communication: false,
      stakeholderData: false,
      workflow: false,
      conflictResolution: false,
      aiModel: false
    };

    switch(role) {
      case 'geologist':
        return { 
          ...baseVisibility, 
          upload: true, 
          aiAnalysis: true, 
          results: true, 
          tasks: true, 
          communication: true, 
          aiModel: true 
        };
      case 'drill-team':
        return { 
          ...baseVisibility,
          results: true, 
          tasks: true, 
          communication: true,
          workflow: true
        };
      case 'government':
        return { 
          ...baseVisibility,
          results: true, 
          conflictResolution: true, 
          stakeholderData: true
        };
      case 'investor':
        return { 
          ...baseVisibility,
          results: true,
          aiModel: true
        };
      case 'admin':
        return { 
          ...baseVisibility,
          upload: true, 
          aiAnalysis: true, 
          results: true, 
          tasks: true, 
          communication: true,
          stakeholderData: true,
          workflow: true,
          conflictResolution: true,
          aiModel: true
        };
      case 'geological-survey':
        return { 
          ...baseVisibility,
          results: true,
          stakeholderData: true,
          communication: true,
          aiModel: true
        };
      case 'mining-company':
        return { 
          ...baseVisibility,
          results: true,
          tasks: true,
          workflow: true,
          conflictResolution: true
        };
      case 'remote-sensing':
        return { 
          ...baseVisibility,
          upload: true,
          stakeholderData: true,
          aiModel: true
        };
      case 'environmental':
        return { 
          ...baseVisibility,
          results: true,
          conflictResolution: true,
          aiModel: true
        };
      case 'academic':
        return { 
          ...baseVisibility,
          stakeholderData: true,
          aiModel: true,
          results: true
        };
      default:
        return baseVisibility;
    }
  };

  const panelVisibility = getPanelVisibility(selectedRole);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-3">
        <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
      </div>
      <div className="container mx-auto px-4 py-3 flex-grow">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8">
            {panelVisibility.map && <Map className="mb-6" />}
            {panelVisibility.results && <ResultsVisualization className="mb-6" />}
            {panelVisibility.workflow && <WorkflowPanel className="mb-6" />}
            {panelVisibility.aiModel && <AIModelPanel className="mb-6" />}
          </div>
          
          {/* Side Panels */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {panelVisibility.upload && <UploadPanel />}
            {panelVisibility.aiAnalysis && <AIAnalysisPanel />}
            {panelVisibility.tasks && <TasksPanel role={selectedRole} />}
            {panelVisibility.communication && <CommunicationPanel role={selectedRole} />}
            {panelVisibility.stakeholderData && <StakeholderDataPanel />}
            {panelVisibility.conflictResolution && <ConflictResolutionPanel />}
          </div>
        </div>
      </div>
      
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>GeoVision AI Miner &copy; 2024 - AI-Powered Geological Exploration</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
