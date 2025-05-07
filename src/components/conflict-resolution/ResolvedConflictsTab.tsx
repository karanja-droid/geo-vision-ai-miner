
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ResolvedConflictsTab: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="text-center p-4 md:p-8 text-muted-foreground">
      <CheckCircle size={isMobile ? 24 : 32} className="mx-auto mb-3 text-green-500" />
      <p className={isMobile ? "text-sm" : ""}>No resolved conflicts yet</p>
      <p className={`${isMobile ? "text-xs" : "text-sm"} mt-2`}>Resolved conflicts will appear here</p>
    </div>
  );
};

export default ResolvedConflictsTab;
