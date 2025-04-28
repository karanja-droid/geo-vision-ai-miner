
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div>
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <Button asChild variant="outline">
          <Link to="/next-steps">View Next Steps</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/data-integration">Data Integration</Link>
        </Button>
        <Button asChild>
          <Link to="/project-details">Project Details</Link>
        </Button>
      </div>
      <Dashboard />
    </div>
  );
};

export default Index;
