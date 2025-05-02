
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield } from 'lucide-react';

const AdminAccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You don't have permission to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This area is restricted to administrators only. If you believe you should have access,
            please contact your system administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccessDenied;
