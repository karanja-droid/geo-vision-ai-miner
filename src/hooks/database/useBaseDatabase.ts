
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleError, ErrorSeverity } from '@/utils/errorHandler';

export const useBaseDatabase = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDatabaseError = (
    error: unknown, 
    title: string, 
    severity: ErrorSeverity = "medium",
    context: Record<string, any> = {}
  ): null => {
    handleError(error, title, severity, {
      component: "DatabaseOperation",
      ...context,
    });
    return null;
  };

  return {
    loading,
    setLoading,
    handleError: handleDatabaseError,
    toast
  };
};
