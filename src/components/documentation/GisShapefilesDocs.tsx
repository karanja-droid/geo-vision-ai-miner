
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

// Import the tab content components
import OverviewTab from "./gis-shapefiles/OverviewTab";
import AnalysisToolsTab from "./gis-shapefiles/AnalysisToolsTab";
import ReportsTab from "./gis-shapefiles/ReportsTab";
import FormatsTab from "./gis-shapefiles/FormatsTab";

const GisShapefilesDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5" />
            GIS Shapefile Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The GIS Shapefile module allows geologists and analysts to process, analyze, 
            and generate reports from geological shapefile data. This documentation covers 
            the key features and how to use them effectively.
          </p>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis Tools</TabsTrigger>
              <TabsTrigger value="reports">Report Generation</TabsTrigger>
              <TabsTrigger value="formats">Supported Formats</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="analysis">
              <AnalysisToolsTab />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>

            <TabsContent value="formats">
              <FormatsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GisShapefilesDocs;
