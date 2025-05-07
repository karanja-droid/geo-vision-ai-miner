
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Navigation, MapPin } from "lucide-react";

interface LocationsTabProps {
  flyToLocation: (location: string) => void;
  highlightCountry: (country: string) => void;
  hasAfricaCountries: boolean;
  africaPolygons: {id: string, name: string, paths: {lat: number, lng: number}[], fillColor: string}[];
}

export const LocationsTab: React.FC<LocationsTabProps> = ({
  flyToLocation,
  highlightCountry,
  hasAfricaCountries,
  africaPolygons
}) => {
  return (
    <>
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <Navigation className="h-4 w-4 mr-2" />
            Navigate To
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-left flex items-center justify-start" 
            onClick={() => flyToLocation('africa')}
          >
            <Globe className="h-4 w-4 mr-2" /> All Africa
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-left flex items-center justify-start" 
            onClick={() => highlightCountry('Zambia')}
          >
            <MapPin className="h-4 w-4 mr-2" /> Zambia
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-left flex items-center justify-start" 
            onClick={() => highlightCountry('Congo, DRC')}
          >
            <MapPin className="h-4 w-4 mr-2" /> Democratic Republic of Congo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-left flex items-center justify-start" 
            onClick={() => flyToLocation('usa')}
          >
            <MapPin className="h-4 w-4 mr-2" /> North America
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-left flex items-center justify-start" 
            onClick={() => flyToLocation('europe')}
          >
            <MapPin className="h-4 w-4 mr-2" /> Europe
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-left flex items-center justify-start" 
            onClick={() => flyToLocation('australia')}
          >
            <MapPin className="h-4 w-4 mr-2" /> Australia
          </Button>
        </CardContent>
      </Card>

      {hasAfricaCountries && (
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Africa Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <p className="text-xs text-muted-foreground mb-2">
              Africa Countries dataset has been integrated.
            </p>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              onClick={() => {
                flyToLocation('africa');
              }}
            >
              <Globe className="h-4 w-4 mr-2" /> Show Africa Countries
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};
