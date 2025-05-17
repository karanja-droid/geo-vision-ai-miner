
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const { resetPassword } = useAuth();
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { toast } = useToast();

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await resetPassword(forgotEmail);
      
      setResetEmailSent(true);
      toast({
        title: "Email sent",
        description: "If an account exists with this email, you'll receive password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Request failed",
        description: "Could not send password reset email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      {resetEmailSent ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 flex items-start text-xs">
          <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium">Password reset email sent!</p>
            <p className="mt-1">Please check your inbox.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <FormLabel htmlFor="forgot-email" className="text-xs">Email</FormLabel>
            <Input 
              id="forgot-email"
              type="email"
              placeholder="example@example.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              disabled={isSubmitting}
              className="h-8 text-sm"
            />
          </div>
          <Button 
            onClick={handleForgotPassword} 
            className="w-full h-8 text-xs"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </>
      )}
      <div className="text-center mt-2">
        <button
          type="button" 
          onClick={onBackToLogin}
          className="text-xs text-primary hover:underline"
          disabled={isSubmitting}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};
