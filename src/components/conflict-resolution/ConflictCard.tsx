
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Conflict } from '@/types';
import { AlertTriangle, CheckCircle, HelpCircle, Users } from 'lucide-react';

interface ConflictCardProps {
  conflict: Conflict;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ConflictCard: React.FC<ConflictCardProps> = ({ conflict, isSelected, onSelect }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'reviewing':
        return <HelpCircle size={16} className="text-amber-500" />;
      case 'resolving':
        return <Users size={16} className="text-blue-500" />;
      case 'identified':
      default:
        return <AlertTriangle size={16} className="text-red-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-500 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getConflictTypeLabel = (type: string): string => {
    switch (type) {
      case 'claim-overlap': return 'Claim Overlap';
      case 'regulatory': return 'Regulatory Conflict';
      case 'environmental': return 'Environmental Issue';
      case 'stakeholder': return 'Stakeholder Dispute';
      default: return 'Conflict';
    }
  };

  return (
    <div 
      className={`analysis-card cursor-pointer ${isSelected ? 'ring-2 ring-primary/50' : ''}`}
      onClick={() => onSelect(conflict.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getStatusIcon(conflict.status)}
          <h3 className="font-medium ml-2">
            {getConflictTypeLabel(conflict.type)}
          </h3>
        </div>
        <Badge className={getSeverityColor(conflict.severity)}>
          {conflict.severity} severity
        </Badge>
      </div>
      <p className="text-sm mt-1.5">
        {conflict.description}
      </p>
      <div className="mt-2 text-xs flex justify-between items-center">
        <span>
          <span className="text-muted-foreground">Status: </span>
          <span className="capitalize">{conflict.status}</span>
        </span>
        <span className="text-muted-foreground">
          Identified: {formatDate(conflict.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ConflictCard;
