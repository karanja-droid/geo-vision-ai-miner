
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Server, Headset, Lock, Clock, Globe, Database, FileText, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('timeline');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Feature Timeline</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise Readiness</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
        </TabsList>
        
        {/* Feature Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
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
        </TabsContent>
        
        {/* Enterprise Readiness Tab */}
        <TabsContent value="enterprise" className="space-y-6">
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
        </TabsContent>
        
        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Gaps & Opportunities</CardTitle>
              <CardDescription>
                Key areas where GeoVision AI Miner addresses industry needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MarketGap 
                title="Enterprise Security & Compliance"
                description="Many geological platforms lack the security certifications required by government and large mining operations. GeoVision AI Miner is pursuing top-tier security compliance to meet these enterprise-level requirements."
              />
              
              <MarketGap 
                title="Flexible Deployment Options"
                description="Current solutions are often limited to cloud-only deployments. We're building flexible deployment options including private cloud, on-premises, and air-gapped solutions for sensitive operations."
              />
              
              <MarketGap 
                title="Africa-Focused Solutions"
                description="Existing platforms often lack optimizations for African geological landscapes and mining operations. Our solution incorporates specialized models and data sources relevant to African mineral exploration."
              />
              
              <MarketGap 
                title="Integration Capabilities"
                description="Many tools operate in silos with limited connection to existing enterprise systems. GeoVision AI Miner focuses on robust API integration capabilities to connect with existing mining operation software."
              />
              
              <MarketGap 
                title="Comprehensive SLAs"
                description="Current market offerings often lack enterprise-grade service level agreements. We're establishing clear SLAs with guaranteed uptime and support response times to meet enterprise expectations."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for feature cards
const FeatureCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: string[];
}> = ({ title, icon, items }) => {
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

// Helper component for enterprise readiness cards
const EnterpriseReadinessCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
}> = ({ title, icon, description, items }) => {
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

// Helper component for market gaps
const MarketGap: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ProductRoadmap;
