
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message, User, Channel } from '@/types';
import { Paperclip, Send, Slack } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { sendToSlack } from '@/utils/slackIntegration';

interface MessagesListProps {
  messages: Message[];
  users: User[];
  currentUser: User;
  selectedChannel: Channel;
  messageInput: string;
  setMessageInput: (value: string) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  users, 
  currentUser, 
  selectedChannel, 
  messageInput, 
  setMessageInput 
}) => {
  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      // In a real app, would send to backend
      console.log('Sending message:', messageInput);

      // For demonstration, also send to Slack if it's configured
      if (selectedChannel.slackChannel) {
        const slackSent = await sendToSlack(
          `${currentUser.name}: ${messageInput}`,
          selectedChannel.slackChannel
        );
        
        if (slackSent) {
          toast({
            title: "Message Shared",
            description: "Your message was also sent to the connected Slack channel",
          });
        }
      }
      
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col h-[300px]">
      <div className="overflow-y-auto flex-grow mb-2 border rounded-md p-2">
        {messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((msg) => {
              const sender = users.find(u => u.id === msg.senderId);
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
                        {msg.sentToSlack && (
                          <span className="text-xs flex items-center text-blue-500">
                            <Slack size={10} className="mr-1" />
                            Slack
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
  );
};

export default MessagesList;
