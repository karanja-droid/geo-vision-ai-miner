
import React from 'react';
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export const Steps = ({ children, className }: StepsProps) => {
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
};

interface StepItemProps {
  step: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const StepItem = ({ step, title, children, className }: StepItemProps) => {
  return (
    <div className={cn("relative pl-10 pb-8", className)}>
      {/* Step number */}
      <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-primary bg-background text-sm font-medium">
        {step}
      </div>
      
      {/* Vertical line connecting steps */}
      <div className="absolute left-3.5 top-7 h-full w-px bg-muted"></div>
      
      {/* Content */}
      <div>
        <h4 className="text-base font-medium mb-2">{title}</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};
