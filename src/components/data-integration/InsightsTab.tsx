
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChartLine } from "lucide-react";
import { DataInsights } from "@/components/DataInsights";

export const InsightsTab: React.FC = () => {
  return (
    <>
      <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
        <ChartLine className="h-5 w-5" />
        <AlertTitle>Data Insights</AlertTitle>
        <AlertDescription>
          AI-powered analytics and predictive models based on integrated global datasets
        </AlertDescription>
      </Alert>
      
      <DataInsights />
    </>
  );
};
