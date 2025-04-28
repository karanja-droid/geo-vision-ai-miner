
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Challenges: React.FC = () => {
  const challenges = [
    {
      id: 'data-silos',
      title: 'Data Silos',
      description: 'Information fragmentation across agencies and private companies makes comprehensive analysis difficult.',
      severity: 'high',
      mitigation: [
        'Government mandates for data sharing',
        'Partnership incentives with data contributors',
        'Secure data sharing protocols',
        'Standardized data formats'
      ]
    },
    {
      id: 'model-accuracy',
      title: 'Model Accuracy',
      description: 'Geological predictions require validation against real-world conditions through ground-truth verification.',
      severity: 'medium',
      mitigation: [
        'Regular field validation campaigns',
        'Continuous model retraining with new drill results',
        'Uncertainty quantification in predictions',
        'Expert review of high-stakes recommendations'
      ]
    },
    {
      id: 'resource-constraints',
      title: 'Resource Constraints',
      description: 'Limited financial and technical resources for implementation and maintenance of advanced systems.',
      severity: 'medium',
      mitigation: [
        'Open-source tool integration',
        'Phased implementation approach',
        'World Bank and international grant funding',
        'Public-private partnerships'
      ]
    },
    {
      id: 'connectivity',
      title: 'Connectivity Issues',
      description: 'Limited internet access in remote exploration areas impacts data collection and system usage.',
      severity: 'low',
      mitigation: [
        'Offline-capable mobile applications',
        'Asynchronous data synchronization',
        'Satellite communication integration',
        'Edge computing for critical functions'
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Challenges & Mitigation Strategies</CardTitle>
        <CardDescription>Key obstacles and approaches to overcome them</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map(challenge => (
          <div key={challenge.id} className="analysis-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                <h3 className="font-semibold">{challenge.title}</h3>
              </div>
              <Badge className={getSeverityColor(challenge.severity)}>
                {challenge.severity} impact
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {challenge.description}
            </p>
            
            <div className="mt-3">
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle size={16} className="text-green-500" />
                <h4 className="text-sm font-medium">Mitigation Strategy</h4>
              </div>
              <ul className="space-y-1 text-sm pl-6 list-disc">
                {challenge.mitigation.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Challenges;
