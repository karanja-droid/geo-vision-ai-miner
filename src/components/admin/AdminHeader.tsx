
import React from 'react';
import { Users, Shield } from 'lucide-react';
import SecurityBanner from '@/components/SecurityBanner';

const AdminHeader: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Users className="mr-2 h-6 w-6 text-primary" />
        Admin Dashboard
      </h1>
      
      <SecurityBanner />
    </>
  );
};

export default AdminHeader;
