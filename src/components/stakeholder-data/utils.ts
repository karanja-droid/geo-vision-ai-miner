
import { StakeholderOrganization } from '@/types';
import { Building, Map, BookOpen, BadgeCheck, FileText } from 'lucide-react';

export const getOrganizationIcon = (org?: StakeholderOrganization) => {
  switch (org) {
    case 'Geological Survey Department':
      return Map;
    case 'Mining Company':
      return Building;
    case 'Remote Sensing Agency':
      return Map;
    case 'Environmental Regulator':
      return BadgeCheck;
    case 'Academic Institution':
      return BookOpen;
    default:
      return FileText;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
