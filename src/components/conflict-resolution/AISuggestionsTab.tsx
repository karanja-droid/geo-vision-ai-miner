
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AISuggestionsTab: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="analysis-card">
      <div className="flex items-center mb-2">
        <AlertTriangle size={isMobile ? 14 : 16} className="text-amber-500 mr-2" />
        <h3 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Potential Water Rights Conflict</h3>
      </div>
      <p className={`${isMobile ? 'text-xs' : 'text-sm'} mb-3`}>
        AI analysis has detected a potential conflict between planned drilling activities and seasonal water access rights in the northern sector.
      </p>
      <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex flex-row items-center space-x-2'}`}>
        <Badge className="bg-blue-500 text-white mb-2">Preventative Detection</Badge>
        <Button size={isMobile ? "sm" : "sm"}>Review Analysis</Button>
      </div>
    </div>
  );
};

export default AISuggestionsTab;
