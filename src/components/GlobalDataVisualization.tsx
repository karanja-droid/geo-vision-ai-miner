
import React, { useState } from 'react';
import { RegionSelection } from './data-visualization/RegionSelection';
import { DataLayerSelection } from './data-visualization/DataLayerSelection';
import { IntegrationControls } from './data-visualization/IntegrationControls';
import { VisualizationArea } from './data-visualization/VisualizationArea';
import { IntegrationStats } from './data-visualization/IntegrationStats';
import { QuickActions } from './data-visualization/QuickActions';
import { DataQuality } from './data-visualization/DataQuality';

export const GlobalDataVisualization: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>("global");
  const [activeDataType, setActiveDataType] = useState<string>("satellite");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RegionSelection 
          activeRegion={activeRegion} 
          setActiveRegion={setActiveRegion} 
        />
        
        <DataLayerSelection 
          activeDataType={activeDataType} 
          setActiveDataType={setActiveDataType} 
        />
        
        <IntegrationControls />
      </div>
      
      <VisualizationArea 
        activeDataType={activeDataType} 
        activeRegion={activeRegion} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IntegrationStats />
        <QuickActions />
        <DataQuality />
      </div>
    </div>
  );
};
