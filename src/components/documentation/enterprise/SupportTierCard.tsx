
import React from 'react';
import { Check } from 'lucide-react';

interface SupportTierCardProps {
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const SupportTierCard: React.FC<SupportTierCardProps> = ({ 
  title, 
  description, 
  features, 
  highlighted = false 
}) => (
  <div className={`border rounded-lg overflow-hidden ${
    highlighted ? "shadow-md border-primary" : ""
  }`}>
    <div className={`p-4 ${
      highlighted ? "bg-primary text-primary-foreground" : "bg-muted"
    }`}>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
    <div className="p-4">
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SupportTierCard;
