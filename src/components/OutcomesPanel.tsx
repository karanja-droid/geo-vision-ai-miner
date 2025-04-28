
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Clock, Users, Leaf } from 'lucide-react';

const OutcomesPanel: React.FC = () => {
  const outcomes = [
    {
      id: 'faster-exploration',
      title: 'Faster Exploration',
      icon: <Clock size={20} className="text-blue-500" />,
      description: 'Reduce time and cost of mineral discovery using AI-guided targeting and prioritization.',
      metrics: [
        { name: 'Time reduction', value: '40-60%' },
        { name: 'Cost savings', value: '30-50%' },
        { name: 'Target accuracy', value: '75-85%' }
      ],
      progress: 70,
      benefitText: 'Accelerates discovery cycle from years to months by eliminating low-potential targets early.',
      impact: 'high'
    },
    {
      id: 'improved-collaboration',
      title: 'Improved Collaboration',
      icon: <Users size={20} className="text-purple-500" />,
      description: 'Break down silos between government agencies, private firms, and academic institutions.',
      metrics: [
        { name: 'Data sharing increase', value: '200%+' },
        { name: 'Cross-org workflows', value: '15+' },
        { name: 'Stakeholder engagement', value: '85%' }
      ],
      progress: 55,
      benefitText: 'Creates unified knowledge base and decision framework across traditionally siloed organizations.',
      impact: 'medium'
    },
    {
      id: 'sustainable-mining',
      title: 'Sustainable Mining',
      icon: <Leaf size={20} className="text-green-500" />,
      description: 'Balance economic goals with environmental and social safeguards through data-driven decisions.',
      metrics: [
        { name: 'Environmental risk reduction', value: '25-40%' },
        { name: 'Community conflict decrease', value: '60%' },
        { name: 'Resource efficiency', value: '30%+' }
      ],
      progress: 45,
      benefitText: 'Enables precision exploration that minimizes environmental footprint while maximizing resource discovery.',
      impact: 'high'
    },
    {
      id: 'economic-growth',
      title: 'Economic Growth',
      icon: <BarChart size={20} className="text-amber-500" />,
      description: 'Drive investment, job creation, and government revenue through increased mining sector efficiency.',
      metrics: [
        { name: 'Investment increase', value: '$100M+' },
        { name: 'Job creation', value: '5,000+' },
        { name: 'GDP contribution', value: '2-3%' }
      ],
      progress: 35,
      benefitText: 'Catalyzes economic development by accelerating mineral discoveries and resource development.',
      impact: 'medium'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'low':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Expected Outcomes</CardTitle>
        <CardDescription>Anticipated benefits and impacts of implementation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outcomes.map(outcome => (
            <Card key={outcome.id} className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {outcome.icon}
                    <CardTitle className="text-lg">{outcome.title}</CardTitle>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(outcome.impact)}`}>
                    {outcome.impact} impact
                  </span>
                </div>
                <CardDescription className="text-sm mt-1">
                  {outcome.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {outcome.metrics.map((metric, index) => (
                    <div key={index} className="text-center p-2 bg-muted/50 rounded-md">
                      <p className="text-xs text-muted-foreground">{metric.name}</p>
                      <p className="text-sm font-medium">{metric.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Implementation progress</span>
                    <span className="text-xs font-medium">{outcome.progress}%</span>
                  </div>
                  <Progress value={outcome.progress} className="h-2" />
                </div>
                
                <p className="mt-3 text-xs text-muted-foreground">
                  {outcome.benefitText}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OutcomesPanel;
