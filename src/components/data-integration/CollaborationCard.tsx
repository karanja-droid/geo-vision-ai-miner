
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CollaborationCardProps {
  platform: string;
  status: string;
  icon: React.ReactNode;
  features: string[];
}

export const CollaborationCard: React.FC<CollaborationCardProps> = ({ 
  platform, 
  status, 
  icon, 
  features 
}) => {
  const isConnected = status.toLowerCase().includes('connected');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{platform}</CardTitle>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button size="sm" variant={isConnected ? "outline" : "default"}>
            {isConnected ? 'Configure Webhooks' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
