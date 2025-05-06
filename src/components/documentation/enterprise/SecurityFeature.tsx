
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface SecurityFeatureProps {
  title: string;
  description: string;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({ title, description }) => (
  <li className="flex items-start gap-3 border-b pb-3 last:border-b-0">
    <div className="mt-1">
      <ShieldCheck className="h-5 w-5 text-green-600" />
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </li>
);

export default SecurityFeature;
