
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task, UserRole } from '@/types';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock tasks for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review soil sample analysis',
    description: 'Analyze the results from the latest soil samples collected from Site B',
    assignedTo: ['user1', 'user2'],
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-05-10',
    createdAt: '2024-04-15',
    updatedAt: '2024-04-20',
  },
  {
    id: '2',
    title: 'Prepare drill site',
    description: 'Prepare equipment and team for drilling at coordinates 12.345, -67.890',
    assignedTo: ['user3'],
    status: 'pending',
    priority: 'urgent',
    dueDate: '2024-05-05',
    createdAt: '2024-04-18',
    updatedAt: '2024-04-18',
  },
  {
    id: '3',
    title: 'Update mineral prediction model',
    description: 'Incorporate new data into the AI prediction model for copper deposits',
    assignedTo: ['user2'],
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-04-25',
    createdAt: '2024-04-10',
    updatedAt: '2024-04-24',
  },
  {
    id: '4',
    title: 'Submit quarterly report',
    description: 'Compile exploration results for government regulatory filing',
    assignedTo: ['user4'],
    status: 'review',
    priority: 'high',
    dueDate: '2024-04-30',
    createdAt: '2024-04-05',
    updatedAt: '2024-04-25',
  },
];

interface TasksPanelProps {
  className?: string;
  role: UserRole;
}

const TasksPanel: React.FC<TasksPanelProps> = ({ className, role }) => {
  const [tasks] = useState<Task[]>(initialTasks);

  // Filter tasks based on role
  const filteredTasks = tasks.filter(task => {
    if (role === 'admin') return true;
    if (role === 'geologist' && ['Review soil sample analysis', 'Update mineral prediction model'].some(t => task.title.includes(t))) return true;
    if (role === 'drill-team' && task.title.includes('Prepare drill site')) return true;
    return false;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={14} className="text-blue-500" />;
      case 'review':
        return <AlertCircle size={14} className="text-yellow-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Tasks & Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="analysis-card">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <h3 className="font-medium ml-2">{task.title}</h3>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {task.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    Due: {formatDate(task.dueDate)}
                  </span>
                  <Badge variant="outline">
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            <p>No tasks assigned for your role</p>
            <p className="text-sm mt-2">Check back later for new assignments</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksPanel;
