
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Database, Globe } from 'lucide-react';

const FeatureTimeline: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard 
        title="Q3 2025" 
        icon={<Clock className="h-5 w-5 text-teal-500" />}
        items={[
          "Advanced satellite imagery analysis",
          "Multi-source data integration",
          "Enhanced 3D visualization of geological structures",
          "Real-time collaboration tools"
        ]}
      />
      <FeatureCard 
        title="Q4 2025" 
        icon={<Database className="h-5 w-5 text-indigo-500" />}
        items={[
          "Expanded mineral detection models",
          "API for custom data pipelines",
          "Enterprise-grade data security compliance",
          "Custom reporting templates"
        ]}
      />
      <FeatureCard 
        title="Q1 2026" 
        icon={<Globe className="h-5 w-5 text-amber-500" />}
        items={[
          "Global geological reference database",
          "Predictive mineral deposit modeling",
          "Mobile field collection integration",
          "Advanced AI training tools"
        ]}
      />
    </div>
  );
};

// Helper component for feature cards
interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, items }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureTimeline;
