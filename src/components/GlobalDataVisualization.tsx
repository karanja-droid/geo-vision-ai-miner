
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Layers, ChartLine, Combine, Database, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Share2, Save, RefreshCw, Settings } from './IconComponents';

export const GlobalDataVisualization: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>("global");
  const [activeDataType, setActiveDataType] = useState<string>("satellite");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Globe className="h-5 w-5 mr-2" />
              Region Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={activeRegion} onValueChange={setActiveRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global View</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="south-america">South America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Active Region Information:</h4>
              <div className="text-sm">
                {activeRegion === "global" ? (
                  <p>Viewing global geological data across all continents</p>
                ) : activeRegion === "africa" ? (
                  <p>Africa contains 30% of the world's mineral reserves including 40% of gold and 90% of platinum resources</p>
                ) : activeRegion === "north-america" ? (
                  <p>North America hosts significant copper, gold, and rare earth element deposits</p>
                ) : activeRegion === "south-america" ? (
                  <p>South America contains the world's largest lithium reserves and major copper deposits</p>
                ) : activeRegion === "europe" ? (
                  <p>Europe features diverse mineral resources and historical mining infrastructure</p>
                ) : activeRegion === "asia" ? (
                  <p>Asia hosts major reserves of rare earth elements, gold, and copper</p>
                ) : (
                  <p>Australia is rich in iron ore, gold, and critical minerals</p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary">
                  {activeRegion === "global" ? "All Regions" : activeRegion.charAt(0).toUpperCase() + activeRegion.slice(1)}
                </Badge>
                <Badge variant="outline">
                  {activeRegion === "global" ? "7 Continents" : 
                   activeRegion === "africa" ? "54 Countries" :
                   activeRegion === "north-america" ? "23 Countries" :
                   activeRegion === "south-america" ? "12 Countries" :
                   activeRegion === "europe" ? "44 Countries" :
                   activeRegion === "asia" ? "48 Countries" :
                   "6 States"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Layers className="h-5 w-5 mr-2" />
              Data Layer Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="satellite">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="satellite" onClick={() => setActiveDataType("satellite")}>Satellite</TabsTrigger>
                <TabsTrigger value="geological" onClick={() => setActiveDataType("geological")}>Geological</TabsTrigger>
                <TabsTrigger value="mining" onClick={() => setActiveDataType("mining")}>Mining</TabsTrigger>
              </TabsList>
              
              <TabsContent value="satellite" className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Multispectral Imagery</span>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Thermal Bands</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Near-Infrared</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Satellite data provides surface spectral signatures that can indicate mineral deposits
                </p>
              </TabsContent>
              
              <TabsContent value="geological" className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Lithological Maps</span>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fault Lines</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Geochemical Data</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Geological survey data provides insights into rock formations and structural features
                </p>
              </TabsContent>
              
              <TabsContent value="mining" className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Historical Sites</span>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Production Data</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Reserves Estimates</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Mining history provides context for potential future exploitation
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Combine className="h-5 w-5 mr-2" />
              Data Integration Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Integration Level</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="h-8">Basic</Button>
                  <Button variant="default" size="sm" className="h-8">Advanced</Button>
                  <Button variant="outline" size="sm" className="h-8">Expert</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Integration Method</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-8">AI-Assisted</Button>
                  <Button variant="default" size="sm" className="h-8">Manual</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Data Resolution</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="h-8">Low</Button>
                  <Button variant="default" size="sm" className="h-8">Medium</Button>
                  <Button variant="outline" size="sm" className="h-8">High</Button>
                </div>
              </div>
              
              <Button className="w-full mt-2">Apply Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Visualization Area */}
      <Card className="col-span-full">
        <CardContent className="p-0">
          <div className="aspect-[16/9] relative overflow-hidden rounded-md bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              {activeDataType === "satellite" ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-green-800 to-amber-800 opacity-80">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-4 rounded-lg backdrop-blur-sm border bg-white/80">
                      <Globe className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-lg font-semibold">Global Satellite Imagery Integration</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Visualizing multispectral satellite data for mineral exploration in {activeRegion === "global" ? "worldwide regions" : activeRegion}
                      </p>
                      <Button asChild>
                        <Link to="/interactive-map">Open Interactive Map</Link>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Simulation of data points */}
                  <div className="absolute bottom-20 right-40 w-32 h-32 bg-yellow-500 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                  <div className="absolute top-40 left-60 w-48 h-48 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
                </div>
              ) : activeDataType === "geological" ? (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 via-amber-700 to-red-800 opacity-80">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-4 rounded-lg backdrop-blur-sm border bg-white/80">
                      <Layers className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-lg font-semibold">Geological Survey Data Integration</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Visualizing lithological and structural features in {activeRegion === "global" ? "worldwide regions" : activeRegion}
                      </p>
                      <Button asChild>
                        <Link to="/interactive-map">Open Interactive Map</Link>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Simulation of geological features */}
                  <div className="absolute top-10 right-20 w-3/4 h-1 bg-red-500 rotate-45 blur-sm opacity-60"></div>
                  <div className="absolute bottom-40 left-20 w-2/4 h-1 bg-red-500 -rotate-30 blur-sm opacity-60"></div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 via-amber-900 to-yellow-700 opacity-80">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-4 rounded-lg backdrop-blur-sm border bg-white/80">
                      <Database className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-lg font-semibold">Historical Mining Data Integration</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Visualizing mining history and production data in {activeRegion === "global" ? "worldwide regions" : activeRegion}
                      </p>
                      <Button asChild>
                        <Link to="/interactive-map">Open Interactive Map</Link>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Simulation of mining sites */}
                  <div className="absolute top-40 left-1/4 h-4 w-4 rounded-full bg-yellow-300 blur-sm opacity-90"></div>
                  <div className="absolute bottom-60 right-1/3 h-4 w-4 rounded-full bg-yellow-300 blur-sm opacity-90"></div>
                  <div className="absolute top-80 right-1/4 h-4 w-4 rounded-full bg-yellow-300 blur-sm opacity-90"></div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Integration Statistics</CardTitle>
            <CardDescription>Current data integration metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Sources:</span>
                <span className="font-medium">42</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Connected Datasets:</span>
                <span className="font-medium">187</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Data Volume:</span>
                <span className="font-medium">1.73 TB</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Integration Accuracy:</span>
                <span className="font-medium">94%</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Updated:</span>
                <span className="font-medium">5 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common integration tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                <Download className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs font-medium">Export Data</div>
                  <div className="text-xs text-muted-foreground">Download integrated datasets</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs font-medium">Share View</div>
                  <div className="text-xs text-muted-foreground">Create shareable link</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                <Save className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs font-medium">Save View</div>
                  <div className="text-xs text-muted-foreground">Store current settings</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs font-medium">Refresh Data</div>
                  <div className="text-xs text-muted-foreground">Update all sources</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-2 justify-start col-span-2" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs font-medium">Advanced Settings</div>
                  <div className="text-xs text-muted-foreground">Configure integration parameters</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Data Quality</CardTitle>
            <CardDescription>Integration quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Completeness</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Consistency</span>
                  <span className="text-sm font-medium">86%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Accuracy</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Resolution</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
