
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Layers3 } from "lucide-react";

const KeyFeatures: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Features</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
            <span className="text-sm">Creates 3D subsurface mineralization models</span>
          </li>
          <li className="flex items-start">
            <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
            <span className="text-sm">Integrates drill hole data with geophysics</span>
          </li>
          <li className="flex items-start">
            <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
            <span className="text-sm">Uncertainty quantification for predictions</span>
          </li>
          <li className="flex items-start">
            <Layers3 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
            <span className="text-sm">Real-time API for inference and integration</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default KeyFeatures;
