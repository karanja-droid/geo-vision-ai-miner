
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const PlaceholderContent: React.FC = () => {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="text-center py-16">
        <div className="mb-4 mx-auto bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center">
          <Info className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No Dataset Selected</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Please select a sample dataset from the panel on the left to run the SatelliteVision CNN analysis.
        </p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderContent;
