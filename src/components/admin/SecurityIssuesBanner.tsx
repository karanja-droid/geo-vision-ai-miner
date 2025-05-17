
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SecurityIssuesBannerProps {
  securityIssues: string[];
}

const SecurityIssuesBanner: React.FC<SecurityIssuesBannerProps> = ({ securityIssues }) => {
  if (securityIssues.length === 0) return null;
  
  return (
    <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-md">
      <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
        <AlertTriangle className="h-5 w-5" />
        <h2>Security Issues Detected</h2>
      </div>
      <ul className="list-disc pl-5 text-sm space-y-1 text-amber-700">
        {securityIssues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
    </div>
  );
};

export default SecurityIssuesBanner;
