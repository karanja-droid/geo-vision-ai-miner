
import React, { useState } from 'react';
import Header from './Header';
import Map from './Map';
import UploadPanel from './UploadPanel';
import AIAnalysisPanel from './AIAnalysisPanel';
import ResultsVisualization from './ResultsVisualization';
import RoleSelector from './RoleSelector';
import TasksPanel from './TasksPanel';
import CommunicationPanel from './CommunicationPanel';
import { UserRole } from '@/types';

const Dashboard: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('geologist');

  // Function to determine which panels to show based on role
  const getPanelVisibility = (role: UserRole) => {
    switch(role) {
      case 'geologist':
        return { map: true, upload: true, analysis: true, results: true, tasks: true, communication: true };
      case 'drill-team':
        return { map: true, upload: false, analysis: false, results: true, tasks: true, communication: true };
      case 'government':
        return { map: true, upload: false, analysis: false, results: true, tasks: false, communication: false };
      case 'investor':
        return { map: true, upload: false, analysis: false, results: true, tasks: false, communication: false };
      case 'admin':
      default:
        return { map: true, upload: true, analysis: true, results: true, tasks: true, communication: true };
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
            {panelVisibility.results && <ResultsVisualization />}
          </div>
          
          {/* Side Panels */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {panelVisibility.upload && <UploadPanel />}
            {panelVisibility.analysis && <AIAnalysisPanel />}
            {panelVisibility.tasks && <TasksPanel role={selectedRole} />}
            {panelVisibility.communication && <CommunicationPanel role={selectedRole} />}
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
