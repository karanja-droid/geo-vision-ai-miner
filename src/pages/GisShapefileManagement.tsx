
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShapefileProcessor from '@/components/gis/ShapefileProcessor';

const GisShapefileManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">GIS Shapefile Management</h1>
        <p className="text-muted-foreground">
          Process and analyze geological shapefiles and generate comprehensive reports
        </p>
      </div>
      
      <Tabs defaultValue="processor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="processor">Shapefile Processor</TabsTrigger>
          <TabsTrigger value="library">Shapefile Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="processor">
          <ShapefileProcessor />
        </TabsContent>
        
        <TabsContent value="library">
          <div className="border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                <path d="M15 2v5h5" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Your Shapefile Library</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Process shapefiles first to add them to your library
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GisShapefileManagement;
