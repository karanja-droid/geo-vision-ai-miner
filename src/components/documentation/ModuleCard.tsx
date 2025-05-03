
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ icon, title, description, link }) => {
  const cardContent = (
    <Card className="overflow-hidden border-2 h-full">
      <CardHeader className="bg-slate-50 p-4 flex flex-row items-center space-y-0 gap-3">
        <div className="bg-white p-2 rounded-md border">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return link ? (
    <Link to={link} className="block h-full hover:no-underline">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default ModuleCard;
