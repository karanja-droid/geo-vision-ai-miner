
import React from 'react';
import Header from './Header';
import Map from './Map';
import UploadPanel from './UploadPanel';
import AIAnalysisPanel from './AIAnalysisPanel';
import ResultsVisualization from './ResultsVisualization';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Map Area */}
          <div className="col-span-12 lg:col-span-8">
            <Map className="mb-6" />
            <ResultsVisualization />
          </div>
          
          {/* Side Panels */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <UploadPanel />
            <AIAnalysisPanel />
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
