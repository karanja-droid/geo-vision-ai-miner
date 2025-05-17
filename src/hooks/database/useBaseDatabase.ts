
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useBaseDatabase = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleError = (error: unknown, title: string): null => {
    toast({
      title,
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive",
    });
    return null;
  };

  return {
    loading,
    setLoading,
    handleError,
    toast
  };
};
