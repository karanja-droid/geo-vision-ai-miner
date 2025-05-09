
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FeatureTooltipProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureTooltip: React.FC<FeatureTooltipProps> = ({
  children,
  title,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <div className="group relative">
            {children}
            <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-0.5 cursor-help">
              <HelpCircle className="h-3 w-3" />
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
