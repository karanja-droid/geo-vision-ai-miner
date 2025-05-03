
import React from 'react';

interface LoadingStateProps {
  dataset: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ dataset }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-background">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
      <div className="text-lg font-medium">Loading visualization</div>
      <div className="text-sm text-muted-foreground">Preparing {dataset.replace('_', ' ')} dataset</div>
    </div>
  );
};

export default LoadingState;
