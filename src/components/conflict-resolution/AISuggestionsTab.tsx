
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';

const AISuggestionsTab: React.FC = () => {
  return (
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
  );
};

export default AISuggestionsTab;
