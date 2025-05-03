
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CloudServiceCardProps {
  name: string;
  status: string;
  services: string[];
}

export const CloudServiceCard: React.FC<CloudServiceCardProps> = ({ 
  name, 
  status, 
  services 
}) => {
  const isConfigured = status.toLowerCase().includes('configured');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle>{name}</CardTitle>
          <Badge variant={isConfigured ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1">
          {services.map((service, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{service}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button size="sm" variant={isConfigured ? "outline" : "default"}>
            {isConfigured ? 'Manage' : 'Configure'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
