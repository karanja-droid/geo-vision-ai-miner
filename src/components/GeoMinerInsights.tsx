
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Link, Layers } from "lucide-react";

const GeoMinerInsights: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">GeoMiner Platform Insights</CardTitle>
            <CardDescription>Key opportunities and gaps in our mining AI platform</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50">Strategic Analysis</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gaps" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gaps">Identified Gaps</TabsTrigger>
            <TabsTrigger value="opportunities">Growth Opportunities</TabsTrigger>
          </TabsList>
          <TabsContent value="gaps" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Limited Depth in Specialized Functions</h3>
                  <p className="text-sm text-muted-foreground">
                    While GeoMiner offers broad coverage from exploration through production, 
                    it lacks the specialized depth found in traditional tools like Datamine 
                    and Surpac for resource modeling and mine design.
                  </p>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <p className="text-sm font-medium">Key Gap:</p>
                    <p className="text-sm">Absence of robust geological modeling module for detailed resource estimation or mine scheduling</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Insufficient Data Library</h3>
                  <p className="text-sm text-muted-foreground">
                    Competing platforms like VRIFY AI have proprietary databases of geoscience data and pre-trained 
                    models by deposit type, giving them an advantage in algorithm training and context provision.
                  </p>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <p className="text-sm font-medium">Key Gap:</p>
                    <p className="text-sm">Limited dataset diversity for insights generation and potential cold start issues in predictions for areas with limited data</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="opportunities" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Link className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">API Integration with Existing Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate or partner with existing mine planning tools through APIs so that AI-generated 
                    targets or optimization suggestions can directly feed into models that engineers use.
                  </p>
                  <div className="rounded-md bg-green-50 p-2 mt-2">
                    <p className="text-sm font-medium">Key Benefit:</p>
                    <p className="text-sm">
                      Prevents GeoMiner from being seen as a disconnected analytics tool – instead it becomes part of the core workflow.
                      AI can rapidly update block models with new drill data or run simulations of different mine plans.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">African-Focused Data Library</h3>
                  <p className="text-sm text-muted-foreground">
                    Curate a specialized database of regional geological information focused on Africa 
                    to augment client data and enhance predictive capabilities in underserved regions.
                  </p>
                  <div className="rounded-md bg-green-50 p-2 mt-2">
                    <p className="text-sm font-medium">Key Benefit:</p>
                    <p className="text-sm">
                      Partner with geological surveys to include regional geophysical surveys, 
                      geochemical maps, and remote sensing data layers. Anonymized data from all clients 
                      can continuously train models while respecting privacy, improving industry-wide accuracy.
                    </p>
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

export default GeoMinerInsights;
