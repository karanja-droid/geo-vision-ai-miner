
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, FileText, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  
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

  const standards = [
    {
      id: 'jorc-code',
      name: 'JORC Code',
      fullName: 'Joint Ore Reserves Committee Code',
      region: 'Australia/International',
      description: 'Sets minimum standards for public reporting of Exploration Results, Mineral Resources and Ore Reserves.',
      keyPoints: [
        'Transparency in reporting mineral exploration data',
        'Competent Person requirements for technical assessment',
        'Classification system for resource confidence levels',
        'Mandatory technical documentation standards'
      ]
    },
    {
      id: 'ni-43-101',
      name: 'NI 43-101',
      fullName: 'National Instrument 43-101',
      region: 'Canada/International',
      description: 'Standards of disclosure for mineral projects to ensure public has accurate technical information.',
      keyPoints: [
        'Qualified Person certification requirements',
        'Technical report format standards',
        'Material change disclosure requirements',
        'Strict guidelines on resource classification'
      ]
    },
    {
      id: 'samrec',
      name: 'SAMREC Code',
      fullName: 'South African Mineral Resource Committee Code',
      region: 'South Africa',
      description: 'Standards for reporting of mineral exploration results, mineral resources and mineral reserves.',
      keyPoints: [
        'Similar principles to JORC with local adaptations',
        'Competent Person requirements',
        'Focus on environmental and social considerations',
        'Clear guidelines for technical documentation'
      ]
    },
    {
      id: 'unfc',
      name: 'UNFC',
      fullName: 'United Nations Framework Classification for Resources',
      region: 'International',
      description: 'Global standard for the classification and reporting of energy and mineral resources.',
      keyPoints: [
        'Three-dimensional classification system',
        'Compatible with other national reporting standards',
        'Focuses on socio-economic viability, technical feasibility, and geological knowledge',
        'Global application across resource types'
      ]
    }
  ];

  const policies = [
    {
      id: 'eiti',
      name: 'EITI',
      fullName: 'Extractive Industries Transparency Initiative',
      type: 'Global Standard',
      description: 'Global standard for the good governance of oil, gas, and mineral resources requiring disclosure of information along the extractive industry value chain.',
      keyPoints: [
        'Revenue transparency requirements',
        'Contract disclosure',
        'Beneficial ownership disclosure',
        'Multi-stakeholder governance approach'
      ]
    },
    {
      id: 'icmm',
      name: 'ICMM Principles',
      fullName: 'International Council on Mining and Metals Principles',
      type: 'Industry Framework',
      description: 'Set of 10 principles that member companies must implement to ensure responsible mining and metals production.',
      keyPoints: [
        'Application of ethical business practices',
        'Integration of sustainable development in decision-making',
        'Respect for human rights',
        'Proactive risk management approaches'
      ]
    },
    {
      id: 'irma',
      name: 'IRMA Standard',
      fullName: 'Initiative for Responsible Mining Assurance',
      type: 'Certification System',
      description: 'Independent third-party verification and certification system for mine sites globally.',
      keyPoints: [
        'Comprehensive social and environmental requirements',
        'Supply chain traceability',
        'Community engagement protocols',
        'Progressive improvement framework'
      ]
    },
    {
      id: 'oecd-due-diligence',
      name: 'OECD Due Diligence',
      fullName: 'OECD Due Diligence Guidance for Responsible Supply Chains',
      type: 'International Guidelines',
      description: 'Framework for companies to identify, address and mitigate risks in their mineral supply chains.',
      keyPoints: [
        'Five-step framework for risk-based due diligence',
        'Supply chain traceability requirements',
        'Conflict minerals focus',
        'Regular public reporting on due diligence'
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
        <CardTitle>Implementation Framework</CardTitle>
        <CardDescription>Challenges, standards, and policies for mineral exploration AI systems</CardDescription>
        <TabsList className="grid grid-cols-3 mt-2">
          <TabsTrigger value="challenges" onClick={() => setActiveTab('challenges')}>Challenges</TabsTrigger>
          <TabsTrigger value="standards" onClick={() => setActiveTab('standards')}>Standards</TabsTrigger>
          <TabsTrigger value="policies" onClick={() => setActiveTab('policies')}>Policies</TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTab === 'challenges' && challenges.map(challenge => (
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

        {activeTab === 'standards' && standards.map(standard => (
          <div key={standard.id} className="analysis-card border border-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                <h3 className="font-semibold">{standard.name}</h3>
              </div>
              <Badge variant="outline">{standard.region}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              {standard.fullName}
            </p>
            <p className="text-sm mb-3">
              {standard.description}
            </p>
            
            <div className="mt-3 bg-muted/30 p-3 rounded">
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle size={16} className="text-green-500" />
                <h4 className="text-sm font-medium">Key Requirements</h4>
              </div>
              <ul className="space-y-1 text-sm pl-6 list-disc">
                {standard.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {activeTab === 'policies' && policies.map(policy => (
          <div key={policy.id} className="analysis-card border border-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-500" />
                <h3 className="font-semibold">{policy.name}</h3>
              </div>
              <Badge variant="secondary">{policy.type}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              {policy.fullName}
            </p>
            <p className="text-sm mb-3">
              {policy.description}
            </p>
            
            <div className="mt-3 bg-muted/30 p-3 rounded">
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle size={16} className="text-green-500" />
                <h4 className="text-sm font-medium">Key Requirements</h4>
              </div>
              <ul className="space-y-1 text-sm pl-6 list-disc">
                {policy.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
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
