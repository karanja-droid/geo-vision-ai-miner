
import { toast } from "@/hooks/use-toast";

// Error severity levels
export type ErrorSeverity = "low" | "medium" | "high" | "critical";

// Error context interface
export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  additionalInfo?: Record<string, any>;
}

/**
 * Centralized error handler function
 * @param error The error object
 * @param userMessage User-friendly message to display
 * @param severity Error severity level
 * @param context Additional context about where the error occurred
 */
export const handleError = (
  error: unknown,
  userMessage: string = "An unexpected error occurred",
  severity: ErrorSeverity = "medium",
  context: ErrorContext = {}
) => {
  // 1. Log the error with context
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorObj = {
    message: errorMessage,
    severity,
    timestamp: new Date().toISOString(),
    ...context,
  };
  
  // Log to console in development
  console.error("Error:", errorObj);
  
  // In a production environment, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // This could be replaced with a call to a logging service
    logErrorToService(errorObj);
  }
  
  // 2. Show user-friendly toast message
  toast({
    title: severity === "critical" ? "Critical Error" : "Error",
    description: userMessage,
    variant: "destructive",
  });
  
  return errorObj;
};

// Function to log errors to a service (placeholder for now)
const logErrorToService = (errorDetails: any) => {
  // In a real implementation, this would send the error to a service like Sentry, LogRocket, etc.
  console.log("Error logged to service:", errorDetails);
  
  // This could be implemented once a logging service is integrated
  // Example with Sentry might look like:
  // Sentry.captureException(error, { extra: errorDetails });
};
