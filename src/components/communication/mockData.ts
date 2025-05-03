
import { Message, Notification, Channel, User } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'geologist', avatar: 'https://i.pravatar.cc/100?u=1' },
  { id: '2', name: 'Mike Johnson', email: 'mike@example.com', role: 'drill-team', avatar: 'https://i.pravatar.cc/100?u=2' },
  { id: '3', name: 'Sarah Davis', email: 'sarah@example.com', role: 'admin', avatar: 'https://i.pravatar.cc/100?u=3' },
];

// Mock messages data
export const mockMessages: Message[] = [
  { id: '1', content: 'New mineral anomaly detected in sector A4', senderId: '3', channelId: '1', createdAt: '2024-04-27T14:30:00Z', read: true },
  { id: '2', content: 'Can someone verify the soil sample results?', senderId: '1', channelId: '1', createdAt: '2024-04-27T14:45:00Z', read: true },
  { id: '3', content: 'Drill team is preparing to move to new location', senderId: '2', channelId: '1', createdAt: '2024-04-27T15:10:00Z', read: false },
  { id: '4', content: 'Updated analysis report attached', senderId: '3', channelId: '1', createdAt: '2024-04-27T16:05:00Z', read: false, attachments: ['report.pdf'] },
];

// Mock notifications data
export const mockNotifications: Notification[] = [
  { id: '1', title: 'Analysis Complete', message: 'AI analysis of Site C data is ready for review', type: 'success', read: false, createdAt: '2024-04-27T13:00:00Z', userId: '1' },
  { id: '2', title: 'New Task Assigned', message: 'You have been assigned a high-priority task', type: 'info', read: true, createdAt: '2024-04-27T10:15:00Z', userId: '1' },
  { id: '3', title: 'System Update', message: 'System maintenance scheduled for tomorrow 2am-4am', type: 'warning', read: false, createdAt: '2024-04-26T16:30:00Z', userId: '1' },
];

// Mock channels data
export const mockChannels: Channel[] = [
  { id: '1', name: 'Project Alpha', members: ['1', '2', '3'], createdAt: '2024-04-01T00:00:00Z', lastActivity: '2024-04-27T16:05:00Z', slackChannel: 'project-alpha' },
  { id: '2', name: 'Geological Team', members: ['1', '3'], createdAt: '2024-04-05T00:00:00Z', lastActivity: '2024-04-26T11:30:00Z', slackChannel: 'geo-team' },
  { id: '3', name: 'Field Operations', members: ['2', '3'], createdAt: '2024-04-10T00:00:00Z', lastActivity: '2024-04-25T09:15:00Z', slackChannel: 'field-ops' },
];
