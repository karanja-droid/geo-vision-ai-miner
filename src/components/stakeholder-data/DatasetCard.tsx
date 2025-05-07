
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Building, BookOpen, BadgeCheck, FileText, Check, Clock } from 'lucide-react';
import { DatasetInfo, StakeholderOrganization } from '@/types';

interface DatasetCardProps {
  dataset: DatasetInfo;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  const getOrganizationIcon = (org?: StakeholderOrganization) => {
    switch (org) {
      case 'Geological Survey Department':
        return <Map size={16} />;
      case 'Mining Company':
        return <Building size={16} />;
      case 'Remote Sensing Agency':
        return <Map size={16} />;
      case 'Environmental Regulator':
        return <BadgeCheck size={16} />;
      case 'Academic Institution':
        return <BookOpen size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="analysis-card">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <div className="p-1.5 rounded-md bg-primary/10 text-primary mt-0.5">
            {getOrganizationIcon(dataset.organization)}
          </div>
          <div>
            <h3 className="font-medium">{dataset.name}</h3>
            <p className="text-xs text-muted-foreground">
              {dataset.type} • {formatFileSize(dataset.size)} • {formatDate(dataset.uploadDate)}
            </p>
            {dataset.source && (
              <p className="text-xs mt-1">Source: {dataset.source}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Badge 
            variant={dataset.validated ? "default" : "outline"}
            className={dataset.validated ? 'bg-green-500' : 'text-amber-500'}
          >
            {dataset.validated ? (
              <div className="flex items-center gap-1">
                <Check size={12} />
                <span>Validated</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>Pending</span>
              </div>
            )}
          </Badge>
          <Button variant="outline" size="sm">
            Use
          </Button>
        </div>
      </div>
      {dataset.description && (
        <p className="text-sm mt-2 text-muted-foreground">{dataset.description}</p>
      )}
      {dataset.contributors && dataset.contributors.length > 0 && (
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <span>Contributors: {dataset.contributors.length}</span>
        </div>
      )}
    </div>
  );
};

export default DatasetCard;
