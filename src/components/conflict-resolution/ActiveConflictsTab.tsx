
import React from 'react';
import { Conflict } from '@/types';
import ConflictCard from './ConflictCard';
import ConflictDetails from './ConflictDetails';

interface ActiveConflictsTabProps {
  conflicts: Conflict[];
  selectedConflict: string | null;
  setSelectedConflict: (id: string) => void;
}

const ActiveConflictsTab: React.FC<ActiveConflictsTabProps> = ({ 
  conflicts, 
  selectedConflict, 
  setSelectedConflict 
}) => {
  const selectedConflictData = conflicts.find(c => c.id === selectedConflict);

  return (
    <div>
      <div className="space-y-3 mb-4">
        {conflicts.map((conflict) => (
          <ConflictCard 
            key={conflict.id} 
            conflict={conflict} 
            isSelected={selectedConflict === conflict.id}
            onSelect={setSelectedConflict}
          />
        ))}
      </div>
      
      {selectedConflictData && <ConflictDetails conflict={selectedConflictData} />}
    </div>
  );
};

export default ActiveConflictsTab;
