
import React from 'react';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FeedbackDialog } from './FeedbackDialog';

interface BetaBannerProps {
  show?: boolean;
  className?: string;
}

export const BetaBanner: React.FC<BetaBannerProps> = ({ 
  show = true, 
  className = ""
}) => {
  if (!show) return null;

  return (
    <Alert className={`bg-amber-50 border-amber-200 ${className}`}>
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800 flex items-center justify-between flex-wrap gap-4">
        <span>
          This feature is in beta. You may encounter issues while using it.
        </span>
        <FeedbackDialog 
          buttonVariant="outline" 
          buttonSize="sm" 
          className="bg-white border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
        />
      </AlertDescription>
    </Alert>
  );
};
