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
import { Shield, Check, InfoIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Background images for the rotating gallery
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1624355851366-8c1dc2736c6e?q=80&w=1800",
    alt: "Mining machinery in operation",
    caption: "Advanced mining operations"
  },
  {
    url: "https://images.unsplash.com/photo-1629873981360-17a8f031075c?q=80&w=1800",
    alt: "Geological survey team",
    caption: "Field survey teams collecting data"
  },
  {
    url: "https://images.unsplash.com/photo-1578146055250-a64e7a4382a6?q=80&w=1800",
    alt: "Drone survey equipment",
    caption: "Remote sensing technology"
  },
  {
    url: "https://images.unsplash.com/photo-1614108831136-f8b5d49c10f8?q=80&w=1800",
    alt: "Mining data visualization",
    caption: "AI-powered data analysis"
  }
];

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
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Demo credentials
  const demoCredentials = {
    email: "admin@example.com",
    password: "password123"
  };

  React.useEffect(() => {
    // Rotate background images every 8 seconds
    const intervalId = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fillDemoCredentials = () => {
    form.setValue("email", demoCredentials.email);
    form.setValue("password", demoCredentials.password);
    setCaptchaVerified(true);
  };

  const onSubmit = async (values: LoginFormValues) => {
    if (!captchaVerified) {
      toast({
        title: "Verification required",
        description: "Please complete the reCAPTCHA verification first.",
        variant: "destructive",
      });
      return;
    }

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
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image gallery with animation */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 bg-cover bg-center ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image.url})` }}
            aria-hidden="true"
          />
        ))}
        {/* Overlay with caption */}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-end pb-12">
          <div className="text-white/80 text-sm font-light animate-fade-in max-w-md text-center px-4">
            {backgroundImages[currentBgIndex].caption}
          </div>
        </div>
      </div>
      
      {/* App name/branding */}
      <div className="absolute top-6 left-0 right-0 text-center z-10">
        <h1 className="text-2xl font-bold text-white drop-shadow-md">GeoVision AI Miner</h1>
        <p className="text-white/80 text-xs mt-1">Advanced geological data analysis platform</p>
      </div>
      
      {/* Login Card */}
      <Card className="w-full max-w-sm mx-4 relative z-10 bg-white/90 backdrop-blur-md shadow-2xl border-white/20">
        <CardHeader className="space-y-1 flex flex-col items-center text-center py-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold">
            {showForgotPassword ? "Reset Password" : "Welcome back"}
          </CardTitle>
          <CardDescription className="text-xs">
            {showForgotPassword 
              ? "Enter your email for password reset instructions" 
              : "Sign in to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          {/* Demo credentials alert */}
          {!showForgotPassword && (
            <Alert className="mb-4 bg-blue-50 border-blue-200">
              <InfoIcon className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm">
                <span className="font-medium">Demo Credentials:</span> 
                <div className="mt-1 flex justify-between">
                  <span>Email: <code className="bg-blue-100 px-1 py-0.5 rounded">{demoCredentials.email}</code></span>
                  <Button variant="link" size="sm" className="p-0 h-auto text-blue-600" onClick={fillDemoCredentials}>
                    Auto-fill
                  </Button>
                </div>
                <div>Password: <code className="bg-blue-100 px-1 py-0.5 rounded">{demoCredentials.password}</code></div>
              </AlertDescription>
            </Alert>
          )}

          {authError && !showForgotPassword && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-2 mb-3 text-xs">
              {authError}
            </div>
          )}
          
          {showForgotPassword ? (
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
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                  }}
                  className="text-xs text-primary hover:underline"
                  disabled={isSubmitting}
                >
                  Back to login
                </button>
              </div>
            </div>
          ) : (
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
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <div className="flex justify-center my-2">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a Google-provided test key
                    onChange={onCaptchaChange}
                    size="compact"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-8 text-xs"
                  disabled={isSubmitting || !captchaVerified}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-1 text-center py-3">
          <div className="text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up for free
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      {/* Industry keywords floating in the background */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center flex-wrap gap-1 z-10">
        <span className="bg-white/10 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full text-[10px]">Geological Surveys</span>
        <span className="bg-white/10 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full text-[10px]">Remote Sensing</span>
        <span className="bg-white/10 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full text-[10px]">Mineral Detection</span>
      </div>
    </div>
  );
};

export default Login;
