
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Channel, UserRole } from '@/types';
import { Users, Slack } from 'lucide-react';

interface ChannelsListProps {
  channels: Channel[];
  selectedChannel: string;
  setSelectedChannel: (channelId: string) => void;
  role: UserRole;
}

const ChannelsList: React.FC<ChannelsListProps> = ({ 
  channels, 
  selectedChannel, 
  setSelectedChannel,
  role
}) => {
  // Filter channels based on role
  const availableChannels = role === 'admin' 
    ? channels
    : channels.filter(channel => 
        (role === 'geologist' && ['Project Alpha', 'Geological Team'].includes(channel.name)) ||
        (role === 'drill-team' && ['Project Alpha', 'Field Operations'].includes(channel.name))
      );

  return (
    <div className="h-[300px] overflow-y-auto border rounded-md p-2">
      {availableChannels.length > 0 ? (
        <div className="space-y-2">
          {availableChannels.map((channel) => (
            <div 
              key={channel.id} 
              className={`p-2.5 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                channel.id === selectedChannel ? 'bg-muted border' : ''
              }`}
              onClick={() => setSelectedChannel(channel.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-muted-foreground" />
                  <h4 className="font-medium">{channel.name}</h4>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(channel.lastActivity).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {channel.members.length} members
                </p>
                {channel.slackChannel && (
                  <Badge variant="outline" className="text-xs flex items-center h-5 bg-blue-50">
                    <Slack size={10} className="mr-1" />
                    {channel.slackChannel}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>No channels available</p>
        </div>
      )}
    </div>
  );
};

export default ChannelsList;
