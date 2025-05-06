
import React from 'react';
import { Check } from 'lucide-react';

interface CertificationCardProps {
  title: string;
  status: string;
  description: string;
  estimatedCompletion: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ 
  title, 
  status, 
  description, 
  estimatedCompletion 
}) => {
  const isComplete = estimatedCompletion === "Complete";
  
  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold">{title}</h4>
        <div className={`px-2 py-1 text-xs rounded-full ${
          isComplete ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}>
          {status}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <p className="text-xs font-medium">
        {isComplete ? (
          <span className="flex items-center text-green-600">
            <Check className="h-3 w-3 mr-1" /> Complete
          </span>
        ) : (
          <span>Estimated completion: {estimatedCompletion}</span>
        )}
      </p>
    </div>
  );
};

export default CertificationCard;
