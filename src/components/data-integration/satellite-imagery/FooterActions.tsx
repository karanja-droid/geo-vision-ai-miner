
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface FooterActionsProps {
  onBack: () => void;
}

const FooterActions: React.FC<FooterActionsProps> = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button variant="outline" onClick={onBack}>Back to Data Sources</Button>
      <Button asChild>
        <Link to="/satellite-vision">
          Open SatelliteVision Demo
        </Link>
      </Button>
    </div>
  );
};

export default FooterActions;
