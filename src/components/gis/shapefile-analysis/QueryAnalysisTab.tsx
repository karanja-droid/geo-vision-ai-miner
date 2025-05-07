
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Calculator } from "lucide-react";

interface QueryAnalysisTabProps {
  data: any;
}

const QueryAnalysisTab: React.FC<QueryAnalysisTabProps> = ({ data }) => {
  console.log("Rendering QueryAnalysisTab", { 
    hasData: !!data,
    attributeCount: data?.features?.[0]?.properties ? Object.keys(data.features[0].properties).length : 0 
  });
  
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Filter and query features using SQL-like expressions
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Query Expression</label>
        <Input 
          placeholder="e.g. mineralDeposits LIKE '%Copper%'" 
        />
        <p className="text-xs text-muted-foreground">
          Use attribute names from your data with operators like =, &gt;, &lt;, LIKE, AND, OR
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Available Attributes</label>
        <div className="bg-muted p-2 rounded-md text-xs">
          {Object.keys(data.features[0]?.properties || {}).map((key) => (
            <span key={key} className="inline-block px-2 py-1 bg-background rounded-md m-1">
              {key}
            </span>
          ))}
        </div>
      </div>
      
      <Button className="w-full">
        <Calculator className="h-4 w-4 mr-2" />
        Run Query
      </Button>
    </div>
  );
};

export default QueryAnalysisTab;
