
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  dataset: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ dataset }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
        <p className="text-muted-foreground">Loading {dataset.replace('_', ' ')} model...</p>
      </div>
    </div>
  );
};

export default LoadingState;
