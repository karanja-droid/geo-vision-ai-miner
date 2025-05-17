
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onShowForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onShowForgotPassword }) => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // Security warning
    if (process.env.NODE_ENV === "production" && window.location.protocol !== "https:") {
      toast({
        title: "Security Warning",
        description: "This form should only be submitted over HTTPS.",
        variant: "destructive",
      });
    }

    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await signIn(values.email, values.password);
      navigate('/');
      
      toast({
        title: "Login successful",
        description: "Welcome back to GeoVision AI Miner",
      });
    } catch (error) {
      console.error('Login error:', error);
      
      // Display error message
      const errorMessage = error instanceof Error ? error.message : 'Invalid email or password';
      setAuthError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-2 mb-3 text-xs">
          {authError}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="example@example.com" 
                    {...field} 
                    disabled={isSubmitting}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="******" 
                    {...field} 
                    disabled={isSubmitting}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <div className="text-right">
            <button
              type="button"
              onClick={onShowForgotPassword}
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-8 text-xs"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
    </>
  );
};
