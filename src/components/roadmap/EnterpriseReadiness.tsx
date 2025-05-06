
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Server, Headset, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnterpriseReadiness: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <EnterpriseReadinessCard 
          title="Security & Compliance" 
          icon={<ShieldCheck className="h-6 w-6 text-green-600" />}
          description="Enterprise-grade security that meets international standards"
          items={[
            "ISO 27001 certification (in progress)",
            "GDPR and POPIA compliant data handling",
            "SOC 2 Type II compliance (Q4 2025)",
            "End-to-end encryption for sensitive data",
            "Regular third-party security audits"
          ]}
        />
        
        <EnterpriseReadinessCard 
          title="Deployment Options" 
          icon={<Server className="h-6 w-6 text-blue-600" />}
          description="Flexible deployment solutions for any organization"
          items={[
            "Private cloud deployment capability",
            "On-premises installation for sensitive operations",
            "Air-gapped solutions for high-security environments",
            "Hybrid deployment models",
            "Seamless integration with existing infrastructure"
          ]}
        />

        <EnterpriseReadinessCard 
          title="Support & SLAs" 
          icon={<Headset className="h-6 w-6 text-purple-600" />}
          description="Dedicated support tailored to enterprise needs"
          items={[
            "24/7 technical support for critical issues",
            "Guaranteed 99.9% uptime SLAs",
            "Dedicated customer success manager",
            "Priority issue resolution for enterprise clients",
            "Regular system health checks and preventative maintenance"
          ]}
        />
        
        <EnterpriseReadinessCard 
          title="Documentation & Training" 
          icon={<FileText className="h-6 w-6 text-amber-600" />}
          description="Comprehensive resources for seamless adoption"
          items={[
            "Extensive technical documentation",
            "Custom training programs for teams",
            "Regular webinars and knowledge sharing",
            "Implementation playbooks for specific industries",
            "Access to our expert geologist network"
          ]}
        />
      </div>

      <div className="bg-muted/50 rounded-lg p-6 border border-muted">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Lock className="mr-2 h-5 w-5 text-primary" /> 
            Enterprise Early Access Program
          </h3>
          <p className="text-muted-foreground">
            Join our Enterprise Early Access Program to help shape our enterprise features and receive priority access to new capabilities.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/documentation#enterprise-readiness">
              View Enterprise Documentation
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signup?plan=enterprise">
              Register for Early Access
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper component for enterprise readiness cards
interface EnterpriseReadinessCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
}

const EnterpriseReadinessCard: React.FC<EnterpriseReadinessCardProps> = ({ 
  title, 
  icon, 
  description, 
  items 
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-muted p-2 rounded-md">{icon}</div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

import { Award } from 'lucide-react';

export default EnterpriseReadiness;
