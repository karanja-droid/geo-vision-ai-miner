
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartBar, ChartPie, Users, Globe, ChartLine, Database, Download, Search } from "lucide-react";
import { 
  Share2, 
  ArrowUp, 
  ArrowRight,
  Scale,
  CircleDollarSign,
  LineChart,
  CircleCheck,
  ExternalLink,
  FileText,
  FolderArchive,
  Play,
  VideoIcon,
  CheckCircle,
  Leaf,
  ShieldCheck
} from './IconComponents';

export const InvestorDashboard: React.FC = () => {
  const [selectedMineral, setSelectedMineral] = useState<string>('copper');
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Investment Opportunity Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button size="sm">
            <Users className="h-4 w-4 mr-2" /> Present
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="grid grid-cols-2 gap-2">
          <Select value={selectedMineral} onValueChange={setSelectedMineral}>
            <SelectTrigger className="w-[160px]">
              <Database className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select mineral" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Copper</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="lithium">Lithium</SelectItem>
              <SelectItem value="rare-earths">Rare Earth Elements</SelectItem>
              <SelectItem value="nickel">Nickel</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[160px]">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <div className="bg-muted/30 p-2 rounded-lg border">
            <div className="flex items-center">
              <strong className="text-sm mr-2">Current Selection:</strong>
              <Badge className="mr-2">
                {selectedMineral.charAt(0).toUpperCase() + selectedMineral.slice(1)}
              </Badge>
              <Badge variant="outline">
                {selectedRegion === "global" ? "Global" : selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto">Updated: 2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Investment Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-primary/10 rounded-full p-2">
                <ChartBar className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500">+24%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Value</p>
              <p className="text-2xl font-bold">$4.7B</p>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">24.3%</span>
              <span className="mx-1">from previous year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-primary/10 rounded-full p-2">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500">+12.5%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Demand Forecast</p>
              <p className="text-2xl font-bold">28.3 Mt</p>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">12.5%</span>
              <span className="mx-1">projected growth by 2025</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-primary/10 rounded-full p-2">
                <CircleDollarSign className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-amber-500">Stable</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg. Cost/Tonne</p>
              <p className="text-2xl font-bold">$8,412</p>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 text-amber-500 mr-1" />
              <span className="text-amber-500">+0.5%</span>
              <span className="mx-1">cost stability in last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-primary/10 rounded-full p-2">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500">High</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ROI Potential</p>
              <p className="text-2xl font-bold">27.3%</p>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">5.2%</span>
              <span className="mx-1">increase in average project returns</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        {/* Market Analysis */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChartLine className="h-5 w-5 mr-2" />
              {selectedMineral.charAt(0).toUpperCase() + selectedMineral.slice(1)} Market Analysis
            </CardTitle>
            <CardDescription>
              Market trends and forecast for {selectedMineral} in {selectedRegion === "global" ? "global markets" : selectedRegion}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] bg-muted rounded-md relative overflow-hidden">
              {/* Simulated Chart */}
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end">
                  <div className="w-1/12 h-[20%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[30%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[25%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[40%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[35%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[50%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[60%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[55%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[70%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[80%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[75%] bg-primary/60 mx-0.5"></div>
                  <div className="w-1/12 h-[90%] bg-primary/60 mx-0.5"></div>
                </div>
                
                {/* Trend line */}
                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-blue-500/50"></div>
                
                <div className="absolute top-0 left-0 right-0 p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium">5-Year Price Trend</div>
                      <div className="text-xl font-bold">$8,412/tonne</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">2020-2025</Badge>
                      <Badge>Yearly</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Chart labels */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-muted-foreground px-4">
                  <div>2020</div>
                  <div>2021</div>
                  <div>2022</div>
                  <div>2023</div>
                  <div>2024</div>
                  <div>2025</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-sm font-medium">Key Market Insights</h3>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm flex items-start">
                    <CircleCheck className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Demand projected to grow 24% by 2025 driven by renewable energy tech</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <CircleCheck className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Supply constraints in traditional mining regions creating new opportunities</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <CircleCheck className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Premium pricing for high-grade deposits with low environmental impact</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Risk Assessment</h3>
                <div className="space-y-2 mt-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Market Volatility</span>
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Political Risk</span>
                      <span className="text-sm font-medium">Low-Medium</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Supply Risk</span>
                      <span className="text-sm font-medium">Low</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Investment Opportunities */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChartBar className="h-5 w-5 mr-2" />
              Investment Opportunities
            </CardTitle>
            <CardDescription>
              Top-ranked projects based on AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Zambian Copperbelt Extension</h4>
                    <div className="text-sm text-muted-foreground">Exploration project with advanced AI targeting</div>
                  </div>
                  <Badge className="bg-green-500">A+</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Est. ROI</div>
                    <div className="font-medium">32.7%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Capital Req.</div>
                    <div className="font-medium">$22M</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Risk Level</div>
                    <div className="font-medium text-amber-500">Medium</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Atacama Lithium Expansion</h4>
                    <div className="text-sm text-muted-foreground">Production expansion in high-grade lithium field</div>
                  </div>
                  <Badge className="bg-green-500">A</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Est. ROI</div>
                    <div className="font-medium">28.3%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Capital Req.</div>
                    <div className="font-medium">$45M</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Risk Level</div>
                    <div className="font-medium text-green-500">Low</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">West African Gold Project</h4>
                    <div className="text-sm text-muted-foreground">Advanced exploration in high-potential zone</div>
                  </div>
                  <Badge className="bg-amber-500">B+</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Est. ROI</div>
                    <div className="font-medium">24.1%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Capital Req.</div>
                    <div className="font-medium">$18M</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Risk Level</div>
                    <div className="font-medium text-amber-600">Medium-High</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Australian REE Development</h4>
                    <div className="text-sm text-muted-foreground">Rare earth elements project with processing facility</div>
                  </div>
                  <Badge className="bg-green-500">A-</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Est. ROI</div>
                    <div className="font-medium">26.5%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Capital Req.</div>
                    <div className="font-medium">$74M</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Risk Level</div>
                    <div className="font-medium text-amber-500">Medium</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4 mr-2" /> View All Projects
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Global Production Distribution
            </CardTitle>
            <CardDescription>
              {selectedMineral.charAt(0).toUpperCase() + selectedMineral.slice(1)} production by region with AI-predicted growth hotspots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] bg-muted rounded-md relative overflow-hidden">
              {/* World map simulation */}
              <div className="absolute inset-0 bg-slate-900/20">
                <div className="h-full flex items-center justify-center">
                  <div className="w-4/5 h-4/5 relative">
                    {/* Africa */}
                    <div className="absolute top-[40%] left-[45%] w-[15%] h-[25%] rounded-full bg-primary/30 animate-pulse"></div>
                    
                    {/* South America */}
                    <div className="absolute top-[55%] left-[25%] w-[8%] h-[15%] rounded-full bg-blue-500/50 animate-pulse"></div>
                    
                    {/* Asia */}
                    <div className="absolute top-[35%] left-[65%] w-[12%] h-[12%] rounded-full bg-green-500/40 animate-pulse"></div>
                    
                    {/* North America */}
                    <div className="absolute top-[30%] left-[15%] w-[10%] h-[10%] rounded-full bg-amber-500/40 animate-pulse"></div>
                    
                    {/* Australia */}
                    <div className="absolute top-[65%] left-[75%] w-[8%] h-[8%] rounded-full bg-purple-500/40 animate-pulse"></div>
                    
                    {/* Legend */}
                    <div className="absolute top-2 right-2 bg-white/90 p-2 rounded shadow-sm text-xs">
                      <div className="font-medium mb-1">Production Volume</div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                        <span>Africa (32%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                        <span>S. America (24%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                        <span>Asia (18%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500/40"></div>
                        <span>N. America (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500/40"></div>
                        <span>Australia (11%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium">Regional Growth Projections</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Africa</span>
                    <span className="text-sm font-medium">+28%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">South America</span>
                    <span className="text-sm font-medium">+22%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Asia</span>
                    <span className="text-sm font-medium">+15%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">North America</span>
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Australia</span>
                    <span className="text-sm font-medium">+8%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Europe</span>
                    <span className="text-sm font-medium">+5%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Investor Resources
            </CardTitle>
            <CardDescription>
              Key materials and tools for investment decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <FileText className="h-5 w-5 mb-2 text-primary" />
                <h3 className="font-medium">Geological Investment Guide</h3>
                <p className="text-sm text-muted-foreground mb-3">Comprehensive overview of mining investment strategies</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">PDF (4.2 MB)</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <ChartPie className="h-5 w-5 mb-2 text-primary" />
                <h3 className="font-medium">Portfolio Optimization Tool</h3>
                <p className="text-sm text-muted-foreground mb-3">Interactive tool for mineral investment optimization</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Web App</Badge>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer">
                <VideoIcon className="h-5 w-5 mb-2 text-primary" />
                <h3 className="font-medium">Expert Analysis Webinar</h3>
                <p className="text-sm text-muted-foreground mb-3">Market outlook and investment opportunities</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Video (48 min)</Badge>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-2">
                <FolderArchive className="h-4 w-4 mr-2" /> View All Resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartPie className="h-5 w-5 mr-2" />
            ESG Performance Metrics
          </CardTitle>
          <CardDescription>
            Environmental, Social, and Governance metrics for mineral projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                Environmental Impact
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Carbon Footprint</span>
                    <Badge variant="outline" className="bg-green-50">Low</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Water Usage</span>
                    <Badge variant="outline" className="bg-amber-50">Medium</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Land Disturbance</span>
                    <Badge variant="outline" className="bg-green-50">Low</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-xs">
                    Projects use 35% less water than industry average
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Social Responsibility
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Community Relations</span>
                    <Badge variant="outline" className="bg-blue-50">Excellent</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Labor Practices</span>
                    <Badge variant="outline" className="bg-blue-50">Good</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Local Employment</span>
                    <Badge variant="outline" className="bg-blue-50">Excellent</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs">
                    85% of workforce hired from local communities
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-purple-600" />
                Governance & Compliance
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Transparency</span>
                    <Badge variant="outline" className="bg-purple-50">Excellent</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Regulatory Compliance</span>
                    <Badge variant="outline" className="bg-purple-50">High</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Board Independence</span>
                    <Badge variant="outline" className="bg-purple-50">Good</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <Alert className="bg-purple-50 border-purple-200 text-purple-800">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-xs">
                    All projects adhere to EITI standards for transparency
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
