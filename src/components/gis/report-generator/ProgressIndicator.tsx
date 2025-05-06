
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  isGenerating: boolean;
  progress: number;
  format: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ isGenerating, progress, format }) => {
  if (!isGenerating) return null;
  
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-center text-muted-foreground">
        Generating {format.toUpperCase()} report... {progress}%
      </p>
    </div>
  );
};

export default ProgressIndicator;
