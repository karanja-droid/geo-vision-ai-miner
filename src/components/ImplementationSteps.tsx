
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ImplementationSteps: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Implementation Roadmap</CardTitle>
        <CardDescription>Phased approach to system deployment</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pilot" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pilot">Pilot Phase</TabsTrigger>
            <TabsTrigger value="scale-up">Scale-Up</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pilot">
            <div className="space-y-4">
              <div className="analysis-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Focus Area</h3>
                  <Badge className="bg-amber-500">High Priority</Badge>
                </div>
                <p className="text-sm mb-3">
                  Initial deployment in high-potential Copperbelt region with established geological data and active mining operations.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Extensive historical data</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Existing infrastructure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Multiple stakeholders</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Known outcomes</span>
                  </div>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Model Training</h3>
                <p className="text-sm mb-3">
                  Train AI models using historical exploration data, validated against known deposits and field reports.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">1</div>
                    <span className="text-sm">Data collection and preprocessing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">2</div>
                    <span className="text-sm">Feature engineering for geological contexts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">3</div>
                    <span className="text-sm">Model selection and hyperparameter tuning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">4</div>
                    <span className="text-sm">Field validation with drill teams</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scale-up">
            <div className="space-y-4">
              <div className="analysis-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Regional Expansion</h3>
                  <Badge className="bg-blue-500">Phase 2</Badge>
                </div>
                <p className="text-sm mb-3">
                  Expand system coverage to Northwestern Province for cobalt exploration and other mineral-rich regions.
                </p>
                <div className="border rounded-md p-3 bg-blue-50 dark:bg-blue-900/20 text-sm">
                  <p className="font-medium mb-1">Target timeline:</p>
                  <p>6-12 months after successful pilot validation</p>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Agency Integration</h3>
                <p className="text-sm mb-3">
                  Integration with additional agencies and stakeholders to expand data sources and system capabilities.
                </p>
                <ul className="space-y-2 text-sm pl-5 list-disc">
                  <li>Zambia Environmental Management Agency</li>
                  <li>Ministry of Water Development</li>
                  <li>Local community representatives</li>
                  <li>Additional mining companies and exploration firms</li>
                </ul>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Feature Enhancement</h3>
                <p className="text-sm mb-3">
                  Add advanced capabilities based on pilot feedback and stakeholder requirements.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Real-time monitoring
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Advanced risk modeling
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Community impact assessment
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Predictive maintenance
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="regulatory">
            <div className="space-y-4">
              <div className="analysis-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Legal Framework Alignment</h3>
                  <Badge className="bg-emerald-500">Continuous</Badge>
                </div>
                <p className="text-sm mb-3">
                  Ensure all system operations comply with Zambia's Mining and Minerals Development Act and related regulations.
                </p>
                <div className="border rounded-md p-3 bg-emerald-50 dark:bg-emerald-900/20 text-sm">
                  <p className="font-medium">Key compliance areas:</p>
                  <ul className="mt-1 space-y-1 list-disc pl-5">
                    <li>Licensing requirements</li>
                    <li>Environmental protection standards</li>
                    <li>Community engagement protocols</li>
                    <li>Data privacy and sovereignty</li>
                  </ul>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Ethical AI Framework</h3>
                <p className="text-sm mb-3">
                  Implementation of ethical AI guidelines to ensure fair, transparent, and accountable system operation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">Bias mitigation</p>
                      <p className="text-xs text-muted-foreground">Prevent unfair site selection or resource allocation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">Model explainability</p>
                      <p className="text-xs text-muted-foreground">Transparent decision-making processes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">Human oversight</p>
                      <p className="text-xs text-muted-foreground">Critical decisions reviewed by domain experts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">Regular auditing</p>
                      <p className="text-xs text-muted-foreground">Periodic review of system performance and impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ImplementationSteps;
