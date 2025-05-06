import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  Database, 
  Layers, 
  Brain, 
  ArrowRight,
  Link as LinkIcon,
  Combine,
  Code,
  Shield,
  Cloud,
  HeadsetIcon
} from "lucide-react";

const ProductRoadmap: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Product Roadmap & Strategic Vision</CardTitle>
            <CardDescription>Evolution plan for our geological AI platform</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50">2025-2026 Timeline</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roadmap">Feature Roadmap</TabsTrigger>
            <TabsTrigger value="gaps">Market Analysis</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise Readiness</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roadmap" className="pt-4">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <RoadmapItem 
                  quarter="Q3 2025"
                  title="API Integration Ecosystem"
                  icon={<Code className="h-5 w-5 text-indigo-600" />}
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    Integration with industry-standard mining and geological modeling software to 
                    create a seamless workflow between AI insights and engineering tools.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                    <li>API connections to Datamine and Surpac ecosystems</li>
                    <li>Direct export of resource models to engineering formats</li>
                    <li>Automated block model updates based on drill data</li>
                    <li>Mine plan simulation and optimization feedback loops</li>
                  </ul>
                </RoadmapItem>
                
                <RoadmapItem 
                  quarter="Q4 2025"
                  title="African Geological Data Library"
                  icon={<Database className="h-5 w-5 text-emerald-600" />}
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive geological database focused on African mineral resources, enhancing
                    the platform's predictive capabilities in underexplored regions.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                    <li>Partnership with African geological surveys</li>
                    <li>Regional geophysical and geochemical baseline data</li>
                    <li>Satellite imagery analysis for remote regions</li>
                    <li>Deposit-specific ML models for common African mineralization</li>
                  </ul>
                </RoadmapItem>
                
                <RoadmapItem 
                  quarter="Q1 2026"
                  title="Advanced Resource Modeling"
                  icon={<Layers className="h-5 w-5 text-amber-600" />}
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    Specialized module for detailed geological modeling with industry-compliant resource estimation.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                    <li>AI-assisted geostatistical analysis</li>
                    <li>JORC and NI 43-101 compliant reporting tools</li>
                    <li>Uncertainty quantification in resource models</li>
                    <li>Multi-scenario modeling with confidence metrics</li>
                  </ul>
                </RoadmapItem>
                
                <RoadmapItem 
                  quarter="Q2 2026"
                  title="Knowledge Graph & Continuous Learning"
                  icon={<Brain className="h-5 w-5 text-purple-600" />}
                  last={true}
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    Industry-wide knowledge graph built from anonymized client data to power
                    continually improving ML models while maintaining data privacy.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                    <li>Privacy-preserving federated learning architecture</li>
                    <li>Mineral-specific prediction models by deposit type</li>
                    <li>Automated model tuning based on exploration outcomes</li>
                    <li>Cross-regional pattern recognition for new deposit discovery</li>
                  </ul>
                </RoadmapItem>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gaps" className="pt-4 space-y-6">
            <div className="rounded-lg border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-50 p-3">
                  <Layers className="h-6 w-6 text-amber-600" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Market Gap: Specialized Modeling Functionality</h3>
                  <p className="text-sm text-muted-foreground">
                    While our platform offers broad coverage from exploration through production, 
                    it currently lacks the specialized depth found in traditional tools like Datamine 
                    and Surpac for resource modeling and mine design.
                  </p>
                  <div className="rounded-md bg-amber-50 p-3 mt-2">
                    <p className="text-sm font-medium text-amber-800">Strategic Challenge:</p>
                    <p className="text-sm text-amber-700">
                      Absence of robust geological modeling module for detailed resource estimation 
                      and mine scheduling impacts adoption by technical teams.
                    </p>
                  </div>
                  <div className="border-t border-dashed pt-3 mt-3">
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 text-blue-600 mr-2" />
                      <p className="text-sm font-medium text-blue-700">Strategic Response:</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Develop API integration ecosystem that positions our platform within existing 
                      workflows rather than competing directly with specialized tools. This prevents 
                      GeoMiner from being seen as a disconnected analytics tool – instead it becomes 
                      part of the core workflow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-50 p-3">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Market Gap: Data Library Limitations</h3>
                  <p className="text-sm text-muted-foreground">
                    Competitors like VRIFY AI have proprietary databases of geoscience data and pre-trained 
                    models by deposit type, giving them an advantage in algorithm training and context provision.
                  </p>
                  <div className="rounded-md bg-blue-50 p-3 mt-2">
                    <p className="text-sm font-medium text-blue-800">Strategic Challenge:</p>
                    <p className="text-sm text-blue-700">
                      Limited dataset diversity for insights generation and potential cold start 
                      issues in predictions for areas with limited prior data.
                    </p>
                  </div>
                  <div className="border-t border-dashed pt-3 mt-3">
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 text-blue-600 mr-2" />
                      <p className="text-sm font-medium text-blue-700">Strategic Response:</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Curate a specialized database of regional geological information focused on Africa 
                      to augment client data. Partner with geological surveys to include regional geophysical 
                      surveys, geochemical maps, and remote sensing data layers while implementing privacy-preserving 
                      federated learning to improve models from anonymized client data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-2 border-t">
              <Link 
                to="/next-steps" 
                className="inline-flex items-center text-sm text-primary hover:text-primary/90"
              >
                View complete strategic analysis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="enterprise" className="pt-4 space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Enterprise Readiness Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Our approach to meeting the high standards required by government agencies and large mining houses,
                particularly in African markets where security, compliance, and local support are critical decision factors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-lg border bg-card p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-full bg-blue-50 p-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Security & Compliance</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Achieving industry-leading security standards to protect sensitive geological data and ensure regulatory compliance.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">ISO 27001 Certification</span>
                      <p>Comprehensive information security management system certification (Q4 2025)</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">SOC 2 Type II Compliance</span>
                      <p>Independent audit of security controls, confidentiality and availability (Q2 2026)</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Data Encryption Standards</span>
                      <p>End-to-end encryption for all data at rest and in transit with customer-managed keys</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Regional Compliance Framework</span>
                      <p>Adherence to African mining regulations and data sovereignty requirements</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-full bg-amber-50 p-3">
                    <Cloud className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Deployment Flexibility</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Multiple deployment options to accommodate various security requirements and IT infrastructure preferences.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">Private Cloud Deployment</span>
                      <p>Full platform functionality in client's private cloud environment with complete data isolation</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">On-Premises Solution</span>
                      <p>Containerized deployment for sites with limited connectivity or maximum security requirements</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Air-Gapped Operation</span>
                      <p>Functionality in completely isolated networks for highly sensitive mining operations</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Hybrid Processing Options</span>
                      <p>Configurable data processing boundaries between cloud and on-premises components</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-full bg-green-50 p-3">
                    <HeadsetIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Enterprise Support</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Comprehensive support structures designed for mission-critical mining operations and government partnerships.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">African Regional Support Centers</span>
                      <p>Local technical teams with geological and mining expertise in key African regions</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Enterprise SLA Tiers</span>
                      <p>Guaranteed response times with 99.9% uptime commitments and financial penalties</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Dedicated Technical Account Manager</span>
                      <p>Assigned industry expert for each enterprise client to ensure platform optimization</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Custom Integration Services</span>
                      <p>Professional services team for seamless integration with existing mining systems</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-blue-50 p-4 mt-6">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">Strategic Priority</p>
                  <p className="text-sm text-blue-700">
                    Our enterprise readiness roadmap recognizes that for government agencies and large mining houses in Africa,
                    security certification, deployment flexibility, and robust support can be as critical as the AI technology itself
                    when selecting a platform partner.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

type RoadmapItemProps = {
  quarter: string;
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  last?: boolean;
};

const RoadmapItem: React.FC<RoadmapItemProps> = ({ 
  quarter, 
  title, 
  children, 
  icon,
  last = false 
}) => {
  return (
    <div className={`relative pl-12 pb-8 ${last ? '' : ''}`}>
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-primary z-10">
        {icon}
      </div>
      <div className="mb-1">
        <Badge variant="outline" className="text-xs bg-primary/5 text-primary">
          {quarter}
        </Badge>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default ProductRoadmap;
