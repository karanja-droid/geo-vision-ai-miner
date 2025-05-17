
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SecurityBannerProps {
  variant?: 'default' | 'destructive' | 'development';
  showHelp?: boolean;
}

const SecurityBanner: React.FC<SecurityBannerProps> = ({ 
  variant = 'development',
  showHelp = true
}) => {
  return (
    <Alert 
      variant={variant === 'development' ? 'destructive' : variant} 
      className="mb-4"
    >
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>
        {variant === 'development' ? 'Development Environment' : 'Security Notice'}
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          {variant === 'development' 
            ? 'This is a demonstration environment with mock authentication and data. In production, this app implements:' 
            : 'This application implements the following security measures:'}
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Secure authentication with email verification</li>
          <li>Row-level security policies for database access</li>
          <li>HTTPS encrypted connections</li>
          <li>Security audit logging</li>
          <li>Input validation and sanitization</li>
        </ul>
        {showHelp && (
          <div className="text-sm mt-2 flex items-center">
            <Link to="/security-policy" className="flex items-center hover:underline text-primary">
              <ExternalLink className="h-3 w-3 mr-1" />
              View our security policy
            </Link>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default SecurityBanner;
