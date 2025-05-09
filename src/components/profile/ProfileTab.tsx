
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { UserRound, Mail, Building, Shield } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';

interface ProfileFormData {
  name: string;
  email: string;
  organization: string;
}

const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState<ProfileFormData>({
    name: '',
    email: '',
    organization: '',
  });
  
  useEffect(() => {
    if (user) {
      setUserForm({
        name: user.name || '',
        email: user.email || '',
        organization: user.organization || '',
      });
    }
  }, [user]);

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
        title: t("profile.updateSuccess"),
        description: t("profile.updateSuccessMessage"),
      });
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t("profile.updateFailed"),
        description: error instanceof Error ? error.message : t("profile.updateFailedMessage"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.profileInfo')}</CardTitle>
        <CardDescription>
          {t('profile.manageInfo')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleProfileUpdate}>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('profile.fullName')}</Label>
              <div className="flex">
                <UserRound className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input 
                  id="name"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  placeholder={t('profile.fullName')}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('profile.email')}</Label>
              <div className="flex">
                <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input 
                  id="email"
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  placeholder={t('profile.email')}
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {t('profile.emailCannotChange')}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">{t('profile.organization')}</Label>
              <div className="flex">
                <Building className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input 
                  id="organization"
                  value={userForm.organization}
                  onChange={(e) => setUserForm({...userForm, organization: e.target.value})}
                  placeholder={t('profile.yourOrganization')}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>{t('profile.role')}</Label>
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
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t('profile.saving') : t('common.save')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileTab;
