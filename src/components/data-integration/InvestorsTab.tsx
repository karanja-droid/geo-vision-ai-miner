
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users } from "lucide-react";
import { InvestorDashboard } from "@/components/InvestorDashboard";

export const InvestorsTab: React.FC = () => {
  return (
    <>
      <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
        <Users className="h-5 w-5" />
        <AlertTitle>Investor Dashboard</AlertTitle>
        <AlertDescription>
          Key metrics and investment opportunities from global geological data analysis
        </AlertDescription>
      </Alert>
      
      <InvestorDashboard />
    </>
  );
};
