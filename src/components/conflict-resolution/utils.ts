
import { Conflict } from '@/types';

export const getStatusIcon = (status: string) => {
  // This function was moved to ConflictCard.tsx
  // It's left here as a placeholder in case we need to share it among components
};

export const getSeverityColor = (severity: string) => {
  // This function was moved to ConflictCard.tsx
  // It's left here as a placeholder in case we need to share it among components
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Sample data that was in the original file
export const initialConflicts: Conflict[] = [
  {
    id: '1',
    type: 'claim-overlap',
    severity: 'high',
    description: 'Mining license claim overlap between Pacific Mining Corp and Sierra Explorations',
    partiesInvolved: ['Mining Company', 'Mining Company'],
    status: 'reviewing',
    resolutionSuggestions: [
      'Adjust boundary of claim A by 2.5km eastward',
      'Establish shared access zone for both companies',
      'Negotiate time-based access agreement'
    ],
    createdAt: '2024-04-10T08:00:00Z',
    updatedAt: '2024-04-12T14:30:00Z'
  },
  {
    id: '2',
    type: 'regulatory',
    severity: 'medium',
    description: 'Water usage permit requirement conflict with existing drilling plan',
    partiesInvolved: ['Mining Company', 'Environmental Regulator', 'Environmental Regulator'],
    status: 'resolving',
    resolutionSuggestions: [
      'Reduce water consumption by implementing closed-loop system',
      'Obtain additional permit for temporary increased usage',
      'Adjust drilling schedule to non-drought season'
    ],
    createdAt: '2024-04-05T10:15:00Z',
    updatedAt: '2024-04-15T09:45:00Z'
  },
  {
    id: '3',
    type: 'environmental',
    severity: 'high',
    description: 'Potential impact on protected wetland area from exploration activities',
    partiesInvolved: ['Environmental Regulator', 'Mining Company', 'Academic Institution'],
    status: 'identified',
    resolutionSuggestions: [],
    createdAt: '2024-04-20T11:30:00Z',
    updatedAt: '2024-04-20T11:30:00Z'
  }
];
