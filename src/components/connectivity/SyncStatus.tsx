
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, WifiOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useConnectivity } from '@/contexts/ConnectivityContext';

export const SyncStatus: React.FC = () => {
  const { isOnline, syncStatus, pendingChanges, sync } = useConnectivity();

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4 text-amber-600" />
        <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
          Offline • {pendingChanges} pending
        </Badge>
      </div>
    );
  }

  if (syncStatus === 'syncing') {
    return (
      <div className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
          Syncing...
        </Badge>
      </div>
    );
  }

  if (pendingChanges > 0) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => sync()}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Sync ({pendingChanges})
        </Button>
      </div>
    );
  }

  if (syncStatus === 'completed') {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
          Synced
        </Badge>
      </div>
    );
  }

  if (syncStatus === 'error') {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <Button 
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-red-600 border-red-200 hover:bg-red-50"
          onClick={() => sync()}
        >
          Retry Sync
        </Button>
      </div>
    );
  }

  return null;
};
