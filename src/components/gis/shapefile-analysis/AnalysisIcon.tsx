
import React from 'react';
import { CircleDot, Scissors, Map, Ruler, Calculator } from "lucide-react";

interface AnalysisIconProps {
  type: string;
}

const AnalysisIcon: React.FC<AnalysisIconProps> = ({ type }) => {
  console.log("Rendering AnalysisIcon for type:", type);

  switch (type) {
    case 'buffer':
      return <CircleDot className="h-4 w-4" />;
    case 'intersect':
      return <Scissors className="h-4 w-4" />;
    case 'union':
      return <Map className="h-4 w-4" />;
    case 'measure':
      return <Ruler className="h-4 w-4" />;
    case 'query':
      return <Calculator className="h-4 w-4" />;
    default:
      return <Map className="h-4 w-4" />;
  }
};

export default AnalysisIcon;
