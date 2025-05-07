
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Conflict } from '@/types';
import { MessageSquare } from 'lucide-react';

interface ConflictDetailsProps {
  conflict: Conflict;
}

const ConflictDetails: React.FC<ConflictDetailsProps> = ({ conflict }) => {
  return (
    <div className="pt-3 border-t">
      <h3 className="font-medium mb-2">Conflict Details</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-1">Parties Involved:</h4>
        <div className="flex flex-wrap gap-1">
          {conflict.partiesInvolved.map((party, index) => (
            <Badge key={index} variant="outline">
              {party}
            </Badge>
          ))}
        </div>
      </div>
      
      {conflict.resolutionSuggestions && conflict.resolutionSuggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">AI Resolution Suggestions:</h4>
          <ul className="text-sm space-y-1 pl-5 list-disc">
            {conflict.resolutionSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-x-2 mt-4">
        <Button size="sm">
          <MessageSquare size={14} className="mr-1" />
          Contact Parties
        </Button>
        <Button size="sm" variant="outline">
          View Location
        </Button>
      </div>
    </div>
  );
};

export default ConflictDetails;
