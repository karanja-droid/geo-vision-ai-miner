
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { BackgroundGallery } from '@/components/auth/BackgroundGallery';
import { LoginHeader } from '@/components/auth/LoginHeader';
import { LoginForm } from '@/components/auth/LoginForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { LoginPageFooter } from '@/components/auth/LoginPageFooter';

const Login: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image gallery with animation */}
      <BackgroundGallery />
      
      {/* App name/branding */}
      <LoginHeader />
      
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
          {showForgotPassword ? (
            <ForgotPasswordForm 
              onBackToLogin={() => {
                setShowForgotPassword(false);
                setResetEmailSent(false);
              }}
            />
          ) : (
            <LoginForm onShowForgotPassword={() => setShowForgotPassword(true)} />
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
      <LoginPageFooter />
    </div>
  );
};

export default Login;
