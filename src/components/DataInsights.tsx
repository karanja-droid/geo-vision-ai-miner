
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChartLine, Database, Globe, Layers, Search, Download, Share2 } from "lucide-react";
import { 
  ArrowUp, 
  PlusCircle, 
  AlertCircle, 
  BoxSelect, 
  GanttChart, 
  Network, 
  RollingPin 
} from './IconComponents';

export const DataInsights: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<string>('predictions');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mineral Deposit Prediction Analysis</CardTitle>
            <CardDescription>AI-powered geological predictions based on integrated data</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={analysisType} onValueChange={setAnalysisType}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="predictions">Deposit Predictions</TabsTrigger>
                <TabsTrigger value="correlations">Data Correlations</TabsTrigger>
                <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="predictions">
                <div className="rounded-lg overflow-hidden border">
                  <div className="aspect-[16/9] relative bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-amber-800/50 to-red-800/50">
                      {/* Simulated heatmap visualization */}
                      <div className="w-full h-full">
                        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-yellow-500 rounded-full blur-xl opacity-60"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-400 rounded-full blur-xl opacity-50"></div>
                        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-600 rounded-full blur-xl opacity-70"></div>
                        
                        {/* Continent outlines (simulated) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-4/5 h-4/5 border-2 border-white/20 rounded-full">
                            {/* Legend */}
                            <div className="absolute top-4 right-4 bg-white/90 p-3 rounded shadow-md">
                              <h3 className="text-sm font-medium mb-2">Deposit Probability</h3>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                                <span className="text-xs">High (80-100%)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span className="text-xs">Medium (50-80%)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <span className="text-xs">Low (20-50%)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Global Copper Deposit Predictions</h3>
                        <p className="text-sm text-muted-foreground">Based on integrated geological, geophysical, and historical mining data</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                        <Button size="sm">
                          <Search className="h-4 w-4 mr-2" /> Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-xs">Total Predictions</div>
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="text-xs flex items-center mt-1 text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>12% from previous analysis</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-xs">High Confidence</div>
                      <div className="text-2xl font-bold">386</div>
                      <div className="text-xs flex items-center mt-1 text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>23% from previous analysis</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-xs">AI Confidence</div>
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-xs flex items-center mt-1 text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>5% from previous analysis</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-xs">Data Sources Used</div>
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs flex items-center mt-1 text-blue-600">
                        <PlusCircle className="h-3 w-3 mr-1" />
                        <span>8 new sources integrated</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="correlations">
                <div className="rounded-lg overflow-hidden border">
                  <div className="aspect-[16/9] relative bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-indigo-800/20 to-purple-800/30">
                      <div className="w-full h-full">
                        {/* Simulated correlation matrix or network graph */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                            {/* Create a visual network of connections */}
                            <div className="absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-white"></div>
                            <div className="absolute top-1/3 left-1/2 h-3 w-3 rounded-full bg-white"></div>
                            <div className="absolute top-2/3 left-1/3 h-3 w-3 rounded-full bg-white"></div>
                            <div className="absolute top-1/2 left-2/3 h-3 w-3 rounded-full bg-white"></div>
                            <div className="absolute top-1/5 left-3/4 h-3 w-3 rounded-full bg-white"></div>
                            
                            {/* Connections */}
                            <div className="absolute top-[25%] left-[25%] h-[8%] w-[25%] border-t border-white/40 rotate-12"></div>
                            <div className="absolute top-[33%] left-[50%] h-[33%] w-[17%] border-r border-white/40"></div>
                            <div className="absolute top-[50%] left-[67%] h-[0%] w-[17%] border-t border-white/40 -rotate-12"></div>
                            <div className="absolute top-[20%] left-[75%] h-[13%] w-[25%] border-l border-white/40 rotate-45"></div>
                            
                            {/* Legend */}
                            <div className="absolute top-4 right-4 bg-white/90 p-3 rounded shadow-md">
                              <h3 className="text-sm font-medium mb-2">Correlation Strength</h3>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-blue-600"></div>
                                <span className="text-xs">Strong Positive</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-green-500"></div>
                                <span className="text-xs">Moderate Positive</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-red-500"></div>
                                <span className="text-xs">Negative</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Feature Correlation Analysis</h3>
                        <p className="text-sm text-muted-foreground">Relationships between geological features and mineral deposits</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                        <Button size="sm">
                          <Search className="h-4 w-4 mr-2" /> Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-6 bg-muted/50">
                  <ChartLine className="h-4 w-4" />
                  <AlertTitle>Key Correlation Insights</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li className="text-sm">Strong correlation (87%) between magnetic anomalies and copper deposits</li>
                      <li className="text-sm">Moderate correlation (72%) between satellite thermal signatures and gold mineralization</li>
                      <li className="text-sm">Negative correlation (-63%) between high vegetation coverage and surface mineral expressions</li>
                      <li className="text-sm">Regional variations detected in feature importance for different mineral types</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="anomalies">
                <div className="rounded-lg overflow-hidden border">
                  <div className="aspect-[16/9] relative bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-red-800/30 to-amber-800/20">
                      <div className="w-full h-full">
                        {/* Simulated anomaly visualization */}
                        <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-red-500 rounded-full blur-xl opacity-80 animate-pulse"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-red-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
                        <div className="absolute top-1/2 left-2/3 w-12 h-12 bg-amber-500 rounded-full blur-xl opacity-80 animate-pulse"></div>
                        
                        {/* Legend */}
                        <div className="absolute top-4 right-4 bg-white/90 p-3 rounded shadow-md">
                          <h3 className="text-sm font-medium mb-2">Anomaly Type</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-xs">Spectral</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-xs">Geophysical</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs">Geochemical</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Detected Geological Anomalies</h3>
                        <p className="text-sm text-muted-foreground">AI-identified anomalous features with high mineral potential</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                        <Button size="sm">
                          <Search className="h-4 w-4 mr-2" /> Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Top Detected Anomalies</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Spectral Anomaly #A128</h4>
                            <p className="text-sm text-muted-foreground">Unusual infrared signature consistent with porphyry copper systems</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">Confidence: 94%</Badge>
                              <Badge variant="outline" className="text-xs">Copper</Badge>
                              <Badge variant="outline" className="text-xs">Eastern Africa</Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Geophysical Anomaly #G073</h4>
                            <p className="text-sm text-muted-foreground">Strong magnetic and gravity anomaly indicative of iron oxide copper-gold deposits</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">Confidence: 88%</Badge>
                              <Badge variant="outline" className="text-xs">Gold</Badge>
                              <Badge variant="outline" className="text-xs">South America</Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Geochemical Anomaly #C215</h4>
                            <p className="text-sm text-muted-foreground">Elevated pathfinder elements consistent with lithium-bearing pegmatites</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">Confidence: 91%</Badge>
                              <Badge variant="outline" className="text-xs">Lithium</Badge>
                              <Badge variant="outline" className="text-xs">Western Africa</Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" size="sm">View All Anomalies</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis Reports</CardTitle>
            <CardDescription>Recent geological insights and analyses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Global Copper Potential Analysis</h4>
                    <p className="text-xs text-muted-foreground mt-1">Advanced predictive modeling of copper deposit potential based on integrated datasets</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">Generated 2 days ago</Badge>
                      <Button size="sm" variant="ghost" className="h-7 px-2">View</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Critical Mineral Exploration Roadmap</h4>
                    <p className="text-xs text-muted-foreground mt-1">Strategic analysis of global critical mineral potential with investment prioritization</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">Generated 1 week ago</Badge>
                      <Button size="sm" variant="ghost" className="h-7 px-2">View</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">African Gold Belt Reassessment</h4>
                    <p className="text-xs text-muted-foreground mt-1">Updated analysis of gold potential across major African geological provinces</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">Generated 2 weeks ago</Badge>
                      <Button size="sm" variant="ghost" className="h-7 px-2">View</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Lithium Resources Forecast 2025-2030</h4>
                    <p className="text-xs text-muted-foreground mt-1">Predictive analysis of global lithium resources with supply-demand projections</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">Generated 3 weeks ago</Badge>
                      <Button size="sm" variant="ghost" className="h-7 px-2">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" /> Generate New Report
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">AI Processing Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Average prediction accuracy</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '94.2%' }}></div>
            </div>
            <div className="mt-2 grid grid-cols-2 text-xs">
              <div>Min: 89%</div>
              <div className="text-right">Max: 97%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Processing Speed</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">1.8M</div>
            <p className="text-xs text-muted-foreground">Data points processed per second</p>
            <div className="mt-4 grid grid-cols-4 gap-1">
              <div className="h-8 bg-primary/20 rounded"></div>
              <div className="h-8 bg-primary/40 rounded"></div>
              <div className="h-8 bg-primary/60 rounded"></div>
              <div className="h-8 bg-primary/80 rounded"></div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">32% faster</span> than previous version
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Analyses</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Analysis jobs currently running</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span>Copper Prediction Model</span>
                <span>86%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '86%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span>Lithium Potential Analysis</span>
                <span>52%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Data Integration Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">97.4%</div>
            <p className="text-xs text-muted-foreground">Dataset integration completeness</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '97.4%' }}></div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className="text-center border rounded p-1">
                <div className="text-xs font-medium">42</div>
                <div className="text-xs text-muted-foreground">Sources</div>
              </div>
              <div className="text-center border rounded p-1">
                <div className="text-xs font-medium">187</div>
                <div className="text-xs text-muted-foreground">Datasets</div>
              </div>
              <div className="text-center border rounded p-1">
                <div className="text-xs font-medium">1.7 TB</div>
                <div className="text-xs text-muted-foreground">Volume</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartLine className="h-5 w-5 mr-2" /> Advanced Analytics Tools
          </CardTitle>
          <CardDescription>
            Specialized tools for deeper analysis of integrated geological data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <BoxSelect className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Machine Learning Workbench</span>
              <span className="text-xs text-muted-foreground mt-1">Train custom ML models</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <GanttChart className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Advanced Visualization</span>
              <span className="text-xs text-muted-foreground mt-1">3D & 4D data visualization</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Network className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Feature Correlation</span>
              <span className="text-xs text-muted-foreground mt-1">Find key data relationships</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <RollingPin className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Geological Modeler</span>
              <span className="text-xs text-muted-foreground mt-1">Create 3D subsurface models</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
