
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle, Check, Download, FileText, ShieldCheck, Server, Users } from 'lucide-react';
import ModuleCard from '../documentation/ModuleCard';

const EnterpriseReadinessDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Readiness Documentation</CardTitle>
          <CardDescription>
            Comprehensive information about GeoVision AI Miner's enterprise capabilities, security features, and deployment options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Enterprise Early Access Program</AlertTitle>
            <AlertDescription>
              Our Enterprise features are currently in development and available through our Early Access Program. 
              <Link to="/signup?plan=enterprise" className="underline ml-1">Apply to join the program</Link>.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="security">Security & Compliance</TabsTrigger>
              <TabsTrigger value="deployment">Deployment Options</TabsTrigger>
              <TabsTrigger value="support">Support & SLAs</TabsTrigger>
            </TabsList>
            
            {/* Security & Compliance Tab */}
            <TabsContent value="security" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Security Certifications & Compliance</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <CertificationCard 
                    title="ISO 27001"
                    status="In Progress"
                    description="International standard for information security management systems (ISMS)."
                    estimatedCompletion="Q4 2025"
                  />
                  <CertificationCard 
                    title="SOC 2 Type II"
                    status="Planned"
                    description="Service Organizations Control report focusing on security, availability, and confidentiality."
                    estimatedCompletion="Q1 2026"
                  />
                  <CertificationCard 
                    title="GDPR Compliance"
                    status="Implemented"
                    description="Full compliance with European data protection regulations."
                    estimatedCompletion="Complete"
                  />
                  <CertificationCard 
                    title="POPIA Compliance"
                    status="Implemented"
                    description="Compliance with South Africa's Protection of Personal Information Act."
                    estimatedCompletion="Complete"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Security Features</h3>
                <ul className="space-y-3">
                  <SecurityFeature 
                    title="End-to-end Encryption" 
                    description="All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols."
                  />
                  <SecurityFeature 
                    title="Role-Based Access Control (RBAC)" 
                    description="Granular permission system allowing organizations to control exactly who has access to specific data and features."
                  />
                  <SecurityFeature 
                    title="Multi-factor Authentication" 
                    description="Additional security layer requiring multiple verification methods to access sensitive data."
                  />
                  <SecurityFeature 
                    title="Security Audit Logging" 
                    description="Comprehensive logging of all system access and changes for security monitoring and compliance."
                  />
                  <SecurityFeature 
                    title="Regular Security Assessments" 
                    description="Periodic third-party security audits and penetration testing to identify and address vulnerabilities."
                  />
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Button className="gap-2" asChild>
                  <Link to="/documentation/security-whitepaper.pdf">
                    <Download className="h-4 w-4" /> Download Security Whitepaper
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            {/* Deployment Options Tab */}
            <TabsContent value="deployment" className="space-y-6">
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
            </TabsContent>
            
            {/* Support & SLAs Tab */}
            <TabsContent value="support" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Enterprise Support Tiers</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <SupportTierCard
                    title="Standard"
                    description="Included with all enterprise subscriptions"
                    features={[
                      "8/5 email and portal support",
                      "12-hour response time for critical issues",
                      "Monthly system health checks",
                      "Access to knowledge base",
                      "Regular software updates"
                    ]}
                  />
                  <SupportTierCard
                    title="Premium"
                    description="Enhanced support for mission-critical deployments"
                    features={[
                      "24/7 email, portal, and phone support",
                      "4-hour response time for critical issues",
                      "Weekly system health checks",
                      "Named support contacts",
                      "Priority bug fixes",
                      "Quarterly review meetings"
                    ]}
                    highlighted
                  />
                  <SupportTierCard
                    title="Platinum"
                    description="Maximum support for enterprise operations"
                    features={[
                      "24/7 email, portal, and phone support",
                      "1-hour response time for critical issues",
                      "Dedicated support team",
                      "Weekly review meetings",
                      "Direct access to engineering team",
                      "Custom feature prioritization",
                      "On-site support (as needed)"
                    ]}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Service Level Agreements</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted text-left">
                      <th className="p-3 border">Service Level</th>
                      <th className="p-3 border">Standard</th>
                      <th className="p-3 border">Premium</th>
                      <th className="p-3 border">Platinum</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-3 border font-medium">System Availability</td>
                      <td className="p-3 border">99.9%</td>
                      <td className="p-3 border">99.95%</td>
                      <td className="p-3 border">99.99%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium">Critical Issue Response</td>
                      <td className="p-3 border">12 hours</td>
                      <td className="p-3 border">4 hours</td>
                      <td className="p-3 border">1 hour</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium">High Priority Issue Response</td>
                      <td className="p-3 border">24 hours</td>
                      <td className="p-3 border">8 hours</td>
                      <td className="p-3 border">4 hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium">Medium Priority Issue Response</td>
                      <td className="p-3 border">48 hours</td>
                      <td className="p-3 border">24 hours</td>
                      <td className="p-3 border">12 hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium">Low Priority Issue Response</td>
                      <td className="p-3 border">72 hours</td>
                      <td className="p-3 border">48 hours</td>
                      <td className="p-3 border">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button className="gap-2" asChild>
                  <Link to="/signup?plan=enterprise">
                    <Users className="h-4 w-4" /> Request Enterprise Support
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <Link to="/documentation/enterprise-sla.pdf">
                    <FileText className="h-4 w-4" /> View Sample SLA
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="bg-slate-50 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Enterprise Registration Process</h3>
        <p className="mb-6 text-muted-foreground">
          Join our Enterprise Early Access Program to help shape our enterprise features and get priority access to new capabilities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md border">
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
              <span className="font-semibold">1</span>
            </div>
            <h4 className="font-medium text-center mb-2">Register Interest</h4>
            <p className="text-sm text-center text-muted-foreground">
              Complete our enterprise registration form with your organization's information
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md border">
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
              <span className="font-semibold">2</span>
            </div>
            <h4 className="font-medium text-center mb-2">Initial Consultation</h4>
            <p className="text-sm text-center text-muted-foreground">
              Our enterprise team will contact you to discuss your specific requirements
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md border">
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
              <span className="font-semibold">3</span>
            </div>
            <h4 className="font-medium text-center mb-2">Tailored Solution</h4>
            <p className="text-sm text-center text-muted-foreground">
              Receive a customized plan and access to enterprise features and support
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button className="gap-2" asChild>
            <Link to="/signup?plan=enterprise">
              Register for Enterprise Access
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper Components

const CertificationCard: React.FC<{
  title: string;
  status: string;
  description: string;
  estimatedCompletion: string;
}> = ({ title, status, description, estimatedCompletion }) => {
  const isComplete = estimatedCompletion === "Complete";
  
  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold">{title}</h4>
        <div className={`px-2 py-1 text-xs rounded-full ${
          isComplete ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}>
          {status}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <p className="text-xs font-medium">
        {isComplete ? (
          <span className="flex items-center text-green-600">
            <Check className="h-3 w-3 mr-1" /> Complete
          </span>
        ) : (
          <span>Estimated completion: {estimatedCompletion}</span>
        )}
      </p>
    </div>
  );
};

const SecurityFeature: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <li className="flex items-start gap-3 border-b pb-3 last:border-b-0">
    <div className="mt-1">
      <ShieldCheck className="h-5 w-5 text-green-600" />
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </li>
);

const SupportTierCard: React.FC<{
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}> = ({ title, description, features, highlighted = false }) => (
  <div className={`border rounded-lg overflow-hidden ${
    highlighted ? "shadow-md border-primary" : ""
  }`}>
    <div className={`p-4 ${
      highlighted ? "bg-primary text-primary-foreground" : "bg-muted"
    }`}>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
    <div className="p-4">
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default EnterpriseReadinessDocs;
