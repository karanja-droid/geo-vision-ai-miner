
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionSelectionProps {
  activeRegion: string;
  setActiveRegion: (region: string) => void;
}

export const RegionSelection: React.FC<RegionSelectionProps> = ({ 
  activeRegion, 
  setActiveRegion 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Globe className="h-5 w-5 mr-2" />
          Region Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={activeRegion} onValueChange={setActiveRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global View</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="north-america">North America</SelectItem>
            <SelectItem value="south-america">South America</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="australia">Australia</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Active Region Information:</h4>
          <div className="text-sm">
            {activeRegion === "global" ? (
              <p>Viewing global geological data across all continents</p>
            ) : activeRegion === "africa" ? (
              <p>Africa contains 30% of the world's mineral reserves including 40% of gold and 90% of platinum resources</p>
            ) : activeRegion === "north-america" ? (
              <p>North America hosts significant copper, gold, and rare earth element deposits</p>
            ) : activeRegion === "south-america" ? (
              <p>South America contains the world's largest lithium reserves and major copper deposits</p>
            ) : activeRegion === "europe" ? (
              <p>Europe features diverse mineral resources and historical mining infrastructure</p>
            ) : activeRegion === "asia" ? (
              <p>Asia hosts major reserves of rare earth elements, gold, and copper</p>
            ) : (
              <p>Australia is rich in iron ore, gold, and critical minerals</p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="secondary">
              {activeRegion === "global" ? "All Regions" : activeRegion.charAt(0).toUpperCase() + activeRegion.slice(1)}
            </Badge>
            <Badge variant="outline">
              {activeRegion === "global" ? "7 Continents" : 
              activeRegion === "africa" ? "54 Countries" :
              activeRegion === "north-america" ? "23 Countries" :
              activeRegion === "south-america" ? "12 Countries" :
              activeRegion === "europe" ? "44 Countries" :
              activeRegion === "asia" ? "48 Countries" :
              "6 States"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
