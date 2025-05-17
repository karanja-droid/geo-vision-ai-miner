import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { FeedbackDialog } from "../feedback/FeedbackDialog";
import { initErrorMonitoring } from "@/utils/monitoring/core/initErrorMonitoring";

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

const GlobalErrorHandler: React.FC<GlobalErrorHandlerProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Initialize error monitoring
    initErrorMonitoring();
    
    // Save the original console.error
    const originalConsoleError = console.error;

    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setError(event.reason);
      setOpen(true);
    };

    // Handler for uncaught errors
    const handleError = (event: ErrorEvent) => {
      setError(event.error || new Error(event.message));
      setOpen(true);
      event.preventDefault();
    };

    // Override console.error to detect React errors
    console.error = (...args: any[]) => {
      // Check if this is a React error
      const errorString = args.join(' ');
      if (
        errorString.includes('The above error occurred in') || 
        errorString.includes('React will try to recreate this component tree')
      ) {
        // Extract the actual error message if present
        const errorMessage = args.find(arg => arg instanceof Error) || new Error('An error occurred in a React component');
        setError(errorMessage);
        setOpen(true);
      }
      originalConsoleError(...args);
    };

    // Add global event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    // Clean up
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      {children}
      
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
              An unexpected error occurred
            </AlertDialogTitle>
            <AlertDialogDescription className="text-destructive/90">
              {error?.message || "Something went wrong in the application."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-2 p-2 bg-muted/30 rounded-md text-xs font-mono max-h-32 overflow-auto">
            {error?.stack || "No stack trace available"}
          </div>
          <AlertDialogFooter className="flex justify-between items-center">
            <div>
              <FeedbackDialog buttonVariant="outline" buttonSize="sm" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Dismiss
              </Button>
              <Button onClick={handleReload}>
                Reload Page
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GlobalErrorHandler;
