
import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserCheck, Shield, Check, X, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { signIn, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (!captchaVerified) {
      toast({
        title: "Verification required",
        description: "Please complete the reCAPTCHA verification first.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await signIn(values.email, values.password);
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

      // Reset reCAPTCHA on failed login attempt
      recaptchaRef.current?.reset();
      setCaptchaVerified(false);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      // Simulate sending password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const onCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {showForgotPassword ? "Reset Password" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {showForgotPassword 
              ? "Enter your email and we'll send you instructions to reset your password" 
              : "Enter your email and password to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authError && !showForgotPassword && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-4 text-sm">
              {authError}
            </div>
          )}
          
          {showForgotPassword ? (
            <div className="space-y-4">
              {resetEmailSent ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-green-500" />
                  <div>
                    <p className="font-medium">Password reset email sent!</p>
                    <p className="text-sm mt-1">Please check your inbox and follow the instructions.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <FormLabel htmlFor="forgot-email">Email</FormLabel>
                    <Input 
                      id="forgot-email"
                      type="email"
                      placeholder="example@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button 
                    onClick={handleForgotPassword} 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send reset link"}
                  </Button>
                </>
              )}
              <div className="text-center mt-4">
                <button
                  type="button" 
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                  }}
                  className="text-sm text-primary hover:underline"
                  disabled={isSubmitting}
                >
                  Back to login
                </button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="example@example.com" 
                          {...field} 
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <div className="flex justify-center my-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a Google-provided test key
                    onChange={onCaptchaChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting || !captchaVerified}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <div className="text-sm text-muted-foreground">
            Demo credentials: admin@example.com / password123 (Premium account)
          </div>
          <div className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up for a free trial
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
