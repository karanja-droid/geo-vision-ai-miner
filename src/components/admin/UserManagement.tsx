
import React from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';
import { Users } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription_tier: string;
  trial_end_date: string | null;
  created_at: string;
}

interface UserManagementProps {
  profiles: Profile[];
  loading: boolean;
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
}

const UserManagement: React.FC<UserManagementProps> = ({
  profiles,
  loading,
  setProfiles
}) => {
  const { toast } = useToast();

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setProfiles(profiles.map(profile => 
        profile.id === userId ? { ...profile, role: newRole } : profile
      ));
      
      toast({
        title: "Role updated",
        description: `User role has been changed to ${newRole}`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Update failed",
        description: "Could not update user role",
        variant: "destructive",
      });
    }
  };

  const getSubscriptionBadge = (tier: string) => {
    switch(tier) {
      case 'premium':
        return <Badge className="bg-primary">Premium</Badge>;
      case 'basic':
        return <Badge className="bg-blue-500">Basic</Badge>;
      default:
        return <Badge className="bg-gray-500">Free</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user accounts, roles and permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{profile.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {getSubscriptionBadge(profile.subscription_tier)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => changeUserRole(profile.id, 'admin')}
                          disabled={profile.role === 'admin'}
                        >
                          Make Admin
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => changeUserRole(profile.id, 'geologist')}
                          disabled={profile.role === 'geologist'}
                        >
                          Make Geologist
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
