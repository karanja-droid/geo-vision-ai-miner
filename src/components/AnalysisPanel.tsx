
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { ChartLine, BarChart3, PieChart } from "lucide-react";

const AnalysisPanel: React.FC = () => {
  const { toast } = useToast();

  const handleRunAnalysis = () => {
    toast({
      title: "Analysis Started",
      description: "Your geological dataset analysis is now running. Results will be available shortly.",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <ChartLine className="h-5 w-5 mr-2" />
          Data Analysis
        </CardTitle>
        <CardDescription>
          Analyze your geological datasets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
            <BarChart3 className="h-8 w-8 mb-2" />
            <span className="text-sm">Statistical Analysis</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
            <PieChart className="h-8 w-8 mb-2" />
            <span className="text-sm">Data Visualization</span>
          </Button>
        </div>
        <Button className="w-full" onClick={handleRunAnalysis}>Run Analysis</Button>
        <div className="text-xs text-muted-foreground text-center">
          Advanced options available in the <Link to="/dataset-management" className="underline">Dataset Management</Link> section
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisPanel;
