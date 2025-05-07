
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessingProgressProps {
  isProcessing: boolean;
  progress: number;
}

const ProcessingProgress: React.FC<ProcessingProgressProps> = ({ isProcessing, progress }) => {
  console.log("Rendering ProcessingProgress component", { isProcessing, progress });
  
  if (!isProcessing) return null;
  
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-center text-muted-foreground">
        {progress < 50 ? "Parsing shapefiles..." : "Validating and processing data..."} {progress}%
      </p>
    </div>
  );
};

export default ProcessingProgress;
