
import React, { useState, useEffect } from 'react';
import { useMines } from '@/contexts/MinesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, RefreshCw, Settings, Map, Database, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import MinesVisualization from '@/components/mines/MinesVisualization';
import ConfigurationPanel from '@/components/mines/ConfigurationPanel';
import MinesAnalytics from '@/components/mines/MinesAnalytics';

const MinesExplorer: React.FC = () => {
  const { mines, loading, error, refreshMines, isConfigured } = useMines();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("map");
  
  // Load mines data when component mounts
  useEffect(() => {
    if (isConfigured && mines.length === 0 && !loading) {
      refreshMines();
    }
  }, [isConfigured, mines.length, loading, refreshMines]);
  
  const handleRefresh = () => {
    refreshMines();
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'planned': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isConfigured) {
    return <ConfigurationPanel />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mines Explorer</h1>
          <p className="text-muted-foreground">Explore and analyze global mining operations</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load mines data: {error.message}
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Table View
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="mt-4">
          <MinesVisualization mines={mines} isLoading={loading} />
        </TabsContent>
        
        <TabsContent value="table" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mines Database</CardTitle>
              <CardDescription>A comprehensive list of mining operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>List of global mining operations</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Minerals</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                          Loading mines data...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : mines.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No mines data available</TableCell>
                    </TableRow>
                  ) : (
                    mines.map((mine) => (
                      <TableRow key={mine.id}>
                        <TableCell className="font-medium">{mine.name}</TableCell>
                        <TableCell>{mine.location.country} ({mine.location.latitude.toFixed(2)}, {mine.location.longitude.toFixed(2)})</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {mine.minerals.map((mineral, idx) => (
                              <Badge key={idx} variant="outline">{mineral}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(mine.status)} text-white`}>
                            {mine.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{mine.owner || 'Unknown'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-4">
          <MinesAnalytics mines={mines} isLoading={loading} />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <ConfigurationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MinesExplorer;
