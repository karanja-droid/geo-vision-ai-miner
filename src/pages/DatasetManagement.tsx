
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { DatasetUploader } from "@/components/DatasetUploader";
import { DatasetLibrary } from "@/components/DatasetLibrary";
import { DatasetIntegration } from "@/components/DatasetIntegration";
import { Database, Upload, Link } from "lucide-react";

const DatasetManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('library'); // Changed default tab to 'library'

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Geological Dataset Management</h1>
        <p className="text-muted-foreground">
          Import, manage, and integrate diverse geological datasets
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upload">Upload Datasets</TabsTrigger>
          <TabsTrigger value="library">Dataset Library</TabsTrigger>
          <TabsTrigger value="integration">Data Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <Upload className="h-5 w-5" />
            <AlertTitle>Upload Geological Datasets</AlertTitle>
            <AlertDescription>
              Import your geological data from various sources and formats
            </AlertDescription>
          </Alert>
          
          <DatasetUploader />
        </TabsContent>
        
        <TabsContent value="library">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <Database className="h-5 w-5" />
            <AlertTitle>Dataset Library</AlertTitle>
            <AlertDescription>
              Access, manage, and explore your geological datasets with emphasis on African mineral resources
            </AlertDescription>
          </Alert>
          
          <DatasetLibrary />
        </TabsContent>
        
        <TabsContent value="integration">
          <Alert variant="default" className="mb-6 bg-primary/10 border-primary/20">
            <Link className="h-5 w-5" />
            <AlertTitle>Data Integration Tools</AlertTitle>
            <AlertDescription>
              Connect and merge datasets from different sources
            </AlertDescription>
          </Alert>
          
          <DatasetIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatasetManagement;
