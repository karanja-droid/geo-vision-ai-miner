
import React from 'react';
import { Check, Map, AlertTriangle } from 'lucide-react';

const ActivityTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="analysis-card">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-md bg-green-100 text-green-700">
            <Check size={16} />
          </div>
          <div>
            <h3 className="font-medium">New Dataset Validated</h3>
            <p className="text-xs text-muted-foreground">Yesterday at 2:45 PM</p>
          </div>
        </div>
        <p className="text-sm">
          Environmental Impact Assessment from Environmental Protection Agency has been validated and is now available for analysis.
        </p>
      </div>
      
      <div className="analysis-card">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-md bg-blue-100 text-blue-700">
            <Map size={16} />
          </div>
          <div>
            <h3 className="font-medium">Dataset Contribution</h3>
            <p className="text-xs text-muted-foreground">April 24, 2024 at 10:23 AM</p>
          </div>
        </div>
        <p className="text-sm">
          Geological Survey Department has contributed a new dataset: "Core Sample Analysis Q1 2024"
        </p>
      </div>
      
      <div className="analysis-card">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-md bg-amber-100 text-amber-700">
            <AlertTriangle size={16} />
          </div>
          <div>
            <h3 className="font-medium">Validation Required</h3>
            <p className="text-xs text-muted-foreground">April 22, 2024 at 4:15 PM</p>
          </div>
        </div>
        <p className="text-sm">
          New dataset from Mining Company requires validation: "Exploration Results Phase 2"
        </p>
      </div>
    </div>
  );
};

export default ActivityTab;
