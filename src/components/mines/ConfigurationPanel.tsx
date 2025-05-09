
import React, { useState } from 'react';
import { useMines } from '@/contexts/MinesContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';

const ConfigurationPanel: React.FC = () => {
  const { configureApi, isConfigured, error } = useMines();
  const [deploymentName, setDeploymentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      configureApi({ deploymentName });
    } catch (error) {
      console.error('Failed to configure API:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>Convex API Configuration</CardTitle>
          <CardDescription>
            Connect to your Convex deployment to access mines data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConfigured && (
            <Alert className="mb-6 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Connected</AlertTitle>
              <AlertDescription>
                Your application is successfully connected to the Convex API.
              </AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deployment-name">Deployment Name</Label>
              <Input 
                id="deployment-name"
                placeholder="your-deployment-name"
                value={deploymentName}
                onChange={(e) => setDeploymentName(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter your Convex deployment name. Your API URL will be:<br />
                https://<span className="font-mono">{deploymentName || 'your-deployment-name'}</span>.convex.cloud/api/mines
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !deploymentName}
            className="w-full"
          >
            {isSubmitting ? 'Connecting...' : isConfigured ? 'Update Configuration' : 'Connect to API'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfigurationPanel;
