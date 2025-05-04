
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface SatelliteConnectionHeaderProps {
  onBack: () => void;
}

const SatelliteConnectionHeader: React.FC<SatelliteConnectionHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Satellite Imagery</h2>
      </div>
      <Badge variant="default">Connected</Badge>
    </div>
  );
};

export default SatelliteConnectionHeader;
