
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { WifiOff, Wifi } from "lucide-react";
import { useConnectivity } from '@/contexts/ConnectivityContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ConnectionStatusIndicator: React.FC = () => {
  const { isOnline, lastOnlineTime } = useConnectivity();

  if (isOnline) {
    return (
      <div className="flex items-center space-x-2 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                <span>Online</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>You are connected to the internet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 py-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 flex items-center gap-1">
              <WifiOff className="h-3 w-3" />
              <span>Offline</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>You are working offline. {lastOnlineTime && `Last online: ${lastOnlineTime.toLocaleTimeString()}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ConnectionStatusIndicator;
