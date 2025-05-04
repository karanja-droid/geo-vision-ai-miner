
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Database, Globe, Layers } from "lucide-react";

interface VisualizationAreaProps {
  activeDataType: string;
  activeRegion: string;
}

export const VisualizationArea: React.FC<VisualizationAreaProps> = ({
  activeDataType,
  activeRegion
}) => {
  return (
    <Card className="col-span-full">
      <CardContent className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden rounded-md bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            {activeDataType === "satellite" ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-green-800 to-amber-800 opacity-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4 rounded-lg backdrop-blur-sm border bg-white/80">
                    <Globe className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <h3 className="text-lg font-semibold">Global Satellite Imagery Integration</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Visualizing multispectral satellite data for mineral exploration in {activeRegion === "global" ? "worldwide regions" : activeRegion}
                    </p>
                    <Button asChild>
                      <Link to="/interactive-map">Open Interactive Map</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Simulation of data points */}
                <div className="absolute bottom-20 right-40 w-32 h-32 bg-yellow-500 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-40 left-60 w-48 h-48 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
              </div>
            ) : activeDataType === "geological" ? (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-amber-700 to-red-800 opacity-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4 rounded-lg backdrop-blur-sm border bg-white/80">
                    <Layers className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <h3 className="text-lg font-semibold">Geological Survey Data Integration</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Visualizing lithological and structural features in {activeRegion === "global" ? "worldwide regions" : activeRegion}
                    </p>
                    <Button asChild>
                      <Link to="/interactive-map">Open Interactive Map</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Simulation of geological features */}
                <div className="absolute top-10 right-20 w-3/4 h-1 bg-red-500 rotate-45 blur-sm opacity-60"></div>
                <div className="absolute bottom-40 left-20 w-2/4 h-1 bg-red-500 -rotate-30 blur-sm opacity-60"></div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 via-amber-900 to-yellow-700 opacity-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4 rounded-lg backdrop-blur-sm border bg-white/80">
                    <Database className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <h3 className="text-lg font-semibold">Historical Mining Data Integration</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Visualizing mining history and production data in {activeRegion === "global" ? "worldwide regions" : activeRegion}
                    </p>
                    <Button asChild>
                      <Link to="/interactive-map">Open Interactive Map</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Simulation of mining sites */}
                <div className="absolute top-40 left-1/4 h-4 w-4 rounded-full bg-yellow-300 blur-sm opacity-90"></div>
                <div className="absolute bottom-60 right-1/3 h-4 w-4 rounded-full bg-yellow-300 blur-sm opacity-90"></div>
                <div className="absolute top-80 right-1/4 h-4 w-4 rounded-full bg-yellow-300 blur-sm opacity-90"></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
