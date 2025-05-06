
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Server } from 'lucide-react';
import ModuleCard from '@/components/documentation/ModuleCard';

const DeploymentOptionsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <ModuleCard
          icon={<Server className="h-5 w-5 text-blue-600" />}
          title="Cloud Deployment"
          description="Standard multi-tenant SaaS deployment with enterprise-grade security and isolation between customer environments."
        />
        <ModuleCard
          icon={<Server className="h-5 w-5 text-purple-600" />}
          title="Private Cloud Deployment"
          description="Dedicated cloud instance of GeoVision AI Miner deployed in your preferred cloud environment (AWS, Azure, GCP)."
        />
        <ModuleCard
          icon={<Server className="h-5 w-5 text-emerald-600" />}
          title="On-Premises Deployment"
          description="Full deployment within your organization's own infrastructure for maximum data sovereignty and control."
        />
        <ModuleCard
          icon={<Server className="h-5 w-5 text-amber-600" />}
          title="Air-Gapped Deployment"
          description="Specialized deployment for high-security environments with no external network connectivity."
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Enterprise Deployment Process</h3>
        <ol className="space-y-4 pl-6 list-decimal">
          <li>
            <p className="font-medium">Initial Assessment</p>
            <p className="text-sm text-muted-foreground">Our team works with your IT department to understand your specific requirements and infrastructure.</p>
          </li>
          <li>
            <p className="font-medium">Architecture Planning</p>
            <p className="text-sm text-muted-foreground">Custom deployment architecture designed to meet your organization's security and performance needs.</p>
          </li>
          <li>
            <p className="font-medium">Deployment & Configuration</p>
            <p className="text-sm text-muted-foreground">Expert implementation team handles installation and configuration of all components.</p>
          </li>
          <li>
            <p className="font-medium">Integration</p>
            <p className="text-sm text-muted-foreground">Connection with existing systems and data sources through our comprehensive API and connectors.</p>
          </li>
          <li>
            <p className="font-medium">Testing & Validation</p>
            <p className="text-sm text-muted-foreground">Thorough testing of all functionality, security controls, and performance optimization.</p>
          </li>
          <li>
            <p className="font-medium">Knowledge Transfer</p>
            <p className="text-sm text-muted-foreground">Training for your technical team on maintaining and administering the system.</p>
          </li>
        </ol>
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2" asChild>
          <Link to="/signup?plan=enterprise&deployment=consultation">
            <Server className="h-4 w-4" /> Schedule Deployment Consultation
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DeploymentOptionsTab;
