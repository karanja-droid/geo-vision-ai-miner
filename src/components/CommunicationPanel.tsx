
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserRole } from '@/types';
import { MessageSquare, Bell, Users, Slack } from 'lucide-react';
import SlackIntegration from './slack/SlackIntegration';
import MessagesList from './communication/MessagesList';
import NotificationsList from './communication/NotificationsList';
import ChannelsList from './communication/ChannelsList';
import { mockUsers, mockMessages, mockNotifications, mockChannels } from './communication/mockData';

interface CommunicationPanelProps {
  className?: string;
  role: UserRole;
}

const CommunicationPanel: React.FC<CommunicationPanelProps> = ({ className, role }) => {
  const [activeTab, setActiveTab] = useState<string>('messages');
  const [messageInput, setMessageInput] = useState<string>('');
  const [currentUser] = useState(mockUsers[0]); // Default to first user
  const [selectedChannel, setSelectedChannel] = useState<string>(mockChannels[0].id);

  const channelMessages = mockMessages.filter(msg => msg.channelId === selectedChannel);
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const selectedChannelData = mockChannels.find(ch => ch.id === selectedChannel);
  
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle>Communication</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="messages">
              <div className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span>Chat</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <div className="flex items-center gap-1">
                <Bell size={14} />
                <span>Alerts</span>
                {unreadNotifications > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="channels">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>Channels</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="slack">
              <div className="flex items-center gap-1">
                <Slack size={14} />
                <span>Slack</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          {/* Messages Tab */}
          <TabsContent value="messages" className="mt-4">
            <MessagesList 
              messages={channelMessages} 
              users={mockUsers} 
              currentUser={currentUser}
              selectedChannel={selectedChannelData!}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
            />
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-4">
            <NotificationsList notifications={mockNotifications} />
          </TabsContent>
          
          {/* Channels Tab */}
          <TabsContent value="channels" className="mt-4">
            <ChannelsList 
              channels={mockChannels}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              role={role}
            />
          </TabsContent>
          
          {/* Slack Integration Tab */}
          <TabsContent value="slack" className="mt-4">
            <SlackIntegration />
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
          <p>Connected as {currentUser.name} · {currentUser.role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
