
import React from 'react';
import { Link } from 'react-router-dom';

const CollapsedSidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-center px-2 py-4 space-y-4">
      <Link to="/" className="p-2 rounded-md hover:bg-accent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      </Link>
      {/* Add more collapsed icons here */}
    </div>
  );
};

export default CollapsedSidebar;
