
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AIModelCardProps {
  name: string;
  type: string;
  status: string;
  description: string;
  metrics: {
    accuracy: number;
    latency: number;
    lastTrained: string;
  };
  features: string[];
  demoLink?: string;
}

export const AIModelCard: React.FC<AIModelCardProps> = ({ 
  name, 
  type, 
  status, 
  description, 
  metrics, 
  features, 
  demoLink 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'production ready':
      case 'deployed':
        return 'bg-green-500 text-white';
      case 'in development':
        return 'bg-blue-500 text-white';
      case 'research':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-muted text-foreground';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{description}</p>
        
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="font-medium">{metrics.accuracy}%</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Latency</p>
            <p className="font-medium">{metrics.latency}s</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Last Trained</p>
            <p className="text-xs font-medium">{metrics.lastTrained}</p>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-xs font-medium mb-1">Key Features:</p>
          <ul className="text-xs space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {demoLink && (
          <div className="mt-3">
            <Button size="sm" className="w-full" asChild>
              <Link to={demoLink}>
                Try Demo
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
