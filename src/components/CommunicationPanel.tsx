
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserRole, Message, Notification, Channel, User } from '@/types';
import { MessageSquare, Bell, Users, Send, Paperclip } from 'lucide-react';

// Mock data
const mockUsers: User[] = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'geologist', avatar: 'https://i.pravatar.cc/100?u=1' },
  { id: '2', name: 'Mike Johnson', email: 'mike@example.com', role: 'drill-team', avatar: 'https://i.pravatar.cc/100?u=2' },
  { id: '3', name: 'Sarah Davis', email: 'sarah@example.com', role: 'admin', avatar: 'https://i.pravatar.cc/100?u=3' },
];

const mockMessages: Message[] = [
  { id: '1', content: 'New mineral anomaly detected in sector A4', senderId: '3', channelId: '1', createdAt: '2024-04-27T14:30:00Z', read: true },
  { id: '2', content: 'Can someone verify the soil sample results?', senderId: '1', channelId: '1', createdAt: '2024-04-27T14:45:00Z', read: true },
  { id: '3', content: 'Drill team is preparing to move to new location', senderId: '2', channelId: '1', createdAt: '2024-04-27T15:10:00Z', read: false },
  { id: '4', content: 'Updated analysis report attached', senderId: '3', channelId: '1', createdAt: '2024-04-27T16:05:00Z', read: false, attachments: ['report.pdf'] },
];

const mockNotifications: Notification[] = [
  { id: '1', title: 'Analysis Complete', message: 'AI analysis of Site C data is ready for review', type: 'success', read: false, createdAt: '2024-04-27T13:00:00Z', userId: '1' },
  { id: '2', title: 'New Task Assigned', message: 'You have been assigned a high-priority task', type: 'info', read: true, createdAt: '2024-04-27T10:15:00Z', userId: '1' },
  { id: '3', title: 'System Update', message: 'System maintenance scheduled for tomorrow 2am-4am', type: 'warning', read: false, createdAt: '2024-04-26T16:30:00Z', userId: '1' },
];

const mockChannels: Channel[] = [
  { id: '1', name: 'Project Alpha', members: ['1', '2', '3'], createdAt: '2024-04-01T00:00:00Z', lastActivity: '2024-04-27T16:05:00Z' },
  { id: '2', name: 'Geological Team', members: ['1', '3'], createdAt: '2024-04-05T00:00:00Z', lastActivity: '2024-04-26T11:30:00Z' },
  { id: '3', name: 'Field Operations', members: ['2', '3'], createdAt: '2024-04-10T00:00:00Z', lastActivity: '2024-04-25T09:15:00Z' },
];

interface CommunicationPanelProps {
  className?: string;
  role: UserRole;
}

const CommunicationPanel: React.FC<CommunicationPanelProps> = ({ className, role }) => {
  const [activeTab, setActiveTab] = useState<string>('messages');
  const [messageInput, setMessageInput] = useState<string>('');
  const [currentUser] = useState<User>(mockUsers[0]); // Default to first user
  const [selectedChannel, setSelectedChannel] = useState<string>(mockChannels[0].id);

  const channelMessages = mockMessages.filter(msg => msg.channelId === selectedChannel);
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  
  // Filter channels based on role
  const availableChannels = role === 'admin' 
    ? mockChannels 
    : mockChannels.filter(channel => 
        (role === 'geologist' && ['Project Alpha', 'Geological Team'].includes(channel.name)) ||
        (role === 'drill-team' && ['Project Alpha', 'Field Operations'].includes(channel.name))
      );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, would send to backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-500">✓</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">!</Badge>;
      case 'error':
        return <Badge className="bg-red-500">×</Badge>;
      default:
        return <Badge className="bg-blue-500">i</Badge>;
    }
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle>Communication</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
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
          </TabsList>
          
          {/* Messages Tab */}
          <TabsContent value="messages" className="mt-4">
            <div className="flex flex-col h-[300px]">
              <div className="overflow-y-auto flex-grow mb-2 border rounded-md p-2">
                {channelMessages.length > 0 ? (
                  <div className="space-y-3">
                    {channelMessages.map((msg) => {
                      const sender = mockUsers.find(u => u.id === msg.senderId);
                      const isCurrentUser = msg.senderId === currentUser.id;
                      
                      return (
                        <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] ${isCurrentUser ? 'bg-primary/10 text-primary' : 'bg-muted'} rounded-lg px-3 py-2`}>
                            {!isCurrentUser && (
                              <div className="flex items-center gap-1 mb-1">
                                <span className="font-medium text-xs">{sender?.name}</span>
                              </div>
                            )}
                            <p className="text-sm">{msg.content}</p>
                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center gap-1">
                                {msg.attachments && msg.attachments.length > 0 && (
                                  <span className="text-xs flex items-center">
                                    <Paperclip size={10} className="mr-1" />
                                    {msg.attachments[0]}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs opacity-70">{formatTime(msg.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>No messages yet</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-4">
            <div className="h-[300px] overflow-y-auto border rounded-md p-2">
              {mockNotifications.length > 0 ? (
                <div className="space-y-3">
                  {mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${!notification.read ? 'bg-muted/50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(notification.type)}
                          <h4 className="font-medium">{notification.title}</h4>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm mt-1">
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Channels Tab */}
          <TabsContent value="channels" className="mt-4">
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {channel.members.length} members
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No channels available</p>
                </div>
              )}
            </div>
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
