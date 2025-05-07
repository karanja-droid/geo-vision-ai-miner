
import React from 'react';
import { CheckCircle } from 'lucide-react';

const ResolvedConflictsTab: React.FC = () => {
  return (
    <div className="text-center p-8 text-muted-foreground">
      <CheckCircle size={32} className="mx-auto mb-3 text-green-500" />
      <p>No resolved conflicts yet</p>
      <p className="text-sm mt-2">Resolved conflicts will appear here</p>
    </div>
  );
};

export default ResolvedConflictsTab;
