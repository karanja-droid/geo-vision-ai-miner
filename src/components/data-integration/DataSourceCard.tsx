
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DataSourceCardProps {
  title: string;
  description: string;
  status: string;
  icon: React.ReactNode;
  formats: string[];
  source: string;
}

export const DataSourceCard: React.FC<DataSourceCardProps> = ({ 
  title, 
  description, 
  status, 
  icon, 
  formats, 
  source 
}) => {
  const isConnected = status.toLowerCase().includes('connected');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <p className="text-sm font-medium">Supported Formats:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {formats.map((format, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">
                {format}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          <p>Source: {source}</p>
        </div>
      </CardContent>
    </Card>
  );
};
