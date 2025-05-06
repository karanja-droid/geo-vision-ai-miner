
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnterpriseTabs from './enterprise/EnterpriseTabs';
import EnterpriseRegistration from './enterprise/EnterpriseRegistration';

const EnterpriseReadinessDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Readiness Documentation</CardTitle>
          <CardDescription>
            Comprehensive information about GeoVision AI Miner's enterprise capabilities, security features, and deployment options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Enterprise Early Access Program</AlertTitle>
            <AlertDescription>
              Our Enterprise features are currently in development and available through our Early Access Program. 
              <Link to="/signup?plan=enterprise" className="underline ml-1">Apply to join the program</Link>.
            </AlertDescription>
          </Alert>

          <EnterpriseTabs />
        </CardContent>
      </Card>
      
      <EnterpriseRegistration />
    </div>
  );
};

export default EnterpriseReadinessDocs;
