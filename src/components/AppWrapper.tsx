
import React from "react";
import GlobalErrorHandler from "./errors/GlobalErrorHandler";
import ErrorBoundary from "./errors/ErrorBoundary";
import { Toaster } from "./ui/toaster";
import FloatingFeedbackButton from "./feedback/FloatingFeedbackButton";

interface AppWrapperProps {
  children: React.ReactNode;
  showFeedbackButton?: boolean;
}

/**
 * AppWrapper component that wraps the entire application with error handling
 * and user feedback mechanisms.
 * 
 * To use this, wrap your App component with it in the main.tsx file:
 * 
 * ```jsx
 * <AppWrapper>
 *   <App />
 * </AppWrapper>
 * ```
 */
const AppWrapper: React.FC<AppWrapperProps> = ({ 
  children,
  showFeedbackButton = true
}) => {
  return (
    <GlobalErrorHandler>
      <ErrorBoundary>
        {children}
        {showFeedbackButton && <FloatingFeedbackButton />}
        <Toaster />
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
};

export default AppWrapper;
