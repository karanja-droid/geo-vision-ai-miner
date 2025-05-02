import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserRound, Mail, Key, Shield, Building, Calendar } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SubscriptionTier } from '@/contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isPremiumUser, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    organization: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  useEffect(() => {
    if (user) {
      setUserForm({
        name: user.name || '',
        email: user.email || '',
        // Since 'organization' is not in the AuthUser type, use a safe fallback
        organization: user.organization ?? '',
      });
    }
  }, [user]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need to be logged in to access your profile.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/login">Log In</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('profiles')
          .update({
            name: userForm.name,
            organization: userForm.organization,
          })
          .eq('id', user.id);
        
        if (error) throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.updateUser({
          password: passwordForm.newPassword,
        });
        
        if (error) throw error;
      }
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getSubscriptionBadgeColor = (tier: SubscriptionTier) => {
    switch(tier) {
      case 'premium':
        return "bg-primary";
      case 'basic':
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <UserRound className="mr-2 h-8 w-8 text-primary" />
        User Profile
      </h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and account settings
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex">
                      <UserRound className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="name"
                        value={userForm.name}
                        onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="email"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                        placeholder="Your email address"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email address cannot be changed. Contact support if needed.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <div className="flex">
                      <Building className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="organization"
                        value={userForm.organization}
                        onChange={(e) => setUserForm({...userForm, organization: e.target.value})}
                        placeholder="Your organization"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline" className="text-primary">
                        {user?.role || 'User'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and password
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordChange}>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="flex">
                      <Key className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="currentPassword"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        placeholder="Enter your current password"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="flex">
                      <Key className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="flex">
                      <Key className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  })}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Sign out from all devices</h3>
                <p className="text-sm text-muted-foreground">
                  This will sign you out from all devices where you're currently logged in.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={async () => {
                    if (isSupabaseConfigured()) {
                      await supabase.auth.signOut({ scope: 'global' });
                      signOut();
                    } else {
                      signOut();
                    }
                    toast({
                      title: "Signed out",
                      description: "You've been signed out from all devices",
                    });
                  }}
                >
                  Sign Out Everywhere
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button 
                  variant="destructive" 
                  className="mt-2"
                  onClick={() => {
                    toast({
                      title: "Account deletion",
                      description: "Please contact support to delete your account.",
                    });
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Manage your subscription plan and billing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="flex items-center space-x-2">
                  <Badge className={getSubscriptionBadgeColor(user?.subscription.tier || 'free')}>
                    {user?.subscription.tier === 'premium' ? 'Premium' : 
                     user?.subscription.tier === 'basic' ? 'Basic' : 'Free'}
                  </Badge>
                  {user?.subscription.trialEnd && (
                    <Badge variant="outline">
                      Trial ends: {formatDate(user.subscription.trialEnd)}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Basic data analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Standard visualizations</span>
                  </li>
                  {isPremiumUser ? (
                    <>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Advanced AI analysis</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Custom data integrations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Priority support</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center text-muted-foreground">
                        <span className="mr-2">✗</span>
                        <span>Advanced AI analysis</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <span className="mr-2">✗</span>
                        <span>Custom data integrations</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <span className="mr-2">✗</span>
                        <span>Priority support</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href="/upgrade">
                  {user?.subscription.tier === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your recent transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground opacity-50" />
                <p className="ml-4 text-muted-foreground">
                  No billing history available
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
