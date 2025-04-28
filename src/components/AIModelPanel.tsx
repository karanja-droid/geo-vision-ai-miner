
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Database, BarChart, Map, LineChart, AlertTriangle } from 'lucide-react';
import { MineralProspectivityMap, DrillRecommendation } from '@/types';

// Mock data
const initialMaps: MineralProspectivityMap[] = [
  {
    id: '1',
    name: 'Copper Deposit Prediction',
    mineralType: 'copper',
    confidence: 0.87,
    generatedAt: '2024-04-15T10:30:00Z',
    features: {
      geological: true,
      geochemical: true,
      remoteSensing: true
    },
    modelType: 'random-forest',
    dataSourceIds: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Cobalt Concentration Map',
    mineralType: 'cobalt',
    confidence: 0.79,
    generatedAt: '2024-04-10T14:45:00Z',
    features: {
      geological: true,
      geochemical: true,
      remoteSensing: false
    },
    modelType: 'cnn',
    dataSourceIds: ['2', '5']
  }
];

const initialDrillRecommendations: DrillRecommendation[] = [
  {
    id: '1',
    location: {
      id: '1-loc',
      latitude: 37.7749,
      longitude: -122.4194,
      elevation: 100
    },
    priority: 'high',
    expectedMineralType: 'copper',
    expectedGrade: 0.85,
    depth: 120,
    costEstimate: 75000,
    createdAt: '2024-04-18T09:00:00Z',
    aiConfidence: 0.88
  },
  {
    id: '2',
    location: {
      id: '2-loc',
      latitude: 37.8049,
      longitude: -122.4294,
      elevation: 150
    },
    priority: 'medium',
    expectedMineralType: 'cobalt',
    expectedGrade: 0.72,
    depth: 90,
    costEstimate: 62000,
    createdAt: '2024-04-17T11:15:00Z',
    aiConfidence: 0.76
  },
  {
    id: '3',
    location: {
      id: '3-loc',
      latitude: 37.7649,
      longitude: -122.4094,
      elevation: 80
    },
    priority: 'low',
    expectedMineralType: 'copper',
    expectedGrade: 0.64,
    depth: 150,
    costEstimate: 85000,
    createdAt: '2024-04-16T15:30:00Z',
    aiConfidence: 0.68
  }
];

interface AIModelPanelProps {
  className?: string;
}

const AIModelPanel: React.FC<AIModelPanelProps> = ({ className }) => {
  const [maps] = useState<MineralProspectivityMap[]>(initialMaps);
  const [recommendations] = useState<DrillRecommendation[]>(initialDrillRecommendations);
  const [selectedMap, setSelectedMap] = useState<string>(maps[0]?.id || '');
  
  const getMineralColor = (mineral: string): string => {
    switch(mineral) {
      case 'copper': return 'bg-mineral-copper text-white';
      case 'cobalt': return 'bg-mineral-cobalt text-white';
      case 'gold': return 'bg-mineral-gold text-black';
      case 'iron': return 'bg-mineral-iron text-white';
      case 'zinc': return 'bg-mineral-zinc text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-400 text-white';
      case 'low': return 'bg-yellow-500 text-black';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCoordinates = (lat: number, lng: number): string => {
    return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
  };

  const selectedMapData = maps.find(map => map.id === selectedMap);

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>AI Mineral Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prospectivity">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prospectivity">Prospectivity Maps</TabsTrigger>
            <TabsTrigger value="drilling">Drilling Optimization</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prospectivity" className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Select Prospectivity Map</label>
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a map" />
                  </SelectTrigger>
                  <SelectContent>
                    {maps.map((map) => (
                      <SelectItem key={map.id} value={map.id}>
                        {map.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedMapData && (
                <>
                  <div className="aspect-video relative w-full rounded-lg overflow-hidden border">
                    <div className="absolute inset-0 grid-pattern"></div>
                    
                    {/* Simulated heatmap visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {selectedMapData.mineralType === 'copper' ? (
                          <>
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 gradient-copper opacity-70 rounded-full blur-md"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 gradient-copper opacity-60 rounded-full blur-md"></div>
                            <div className="absolute top-1/2 right-1/3 w-40 h-40 gradient-copper opacity-50 rounded-full blur-md"></div>
                          </>
                        ) : (
                          <>
                            <div className="absolute top-1/3 left-1/3 w-28 h-28 gradient-cobalt opacity-70 rounded-full blur-md"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-36 h-36 gradient-cobalt opacity-50 rounded-full blur-md"></div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Map controls and info */}
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded text-sm">
                      <div className="flex items-center gap-1">
                        <Badge className={getMineralColor(selectedMapData.mineralType)}>
                          {selectedMapData.mineralType}
                        </Badge>
                        <span className="text-xs">
                          Confidence: {(selectedMapData.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm p-2 rounded text-xs">
                      <div>Model: {selectedMapData.modelType}</div>
                      <div>Generated: {formatDate(selectedMapData.generatedAt)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className={`p-2 rounded ${selectedMapData.features.geological ? 'bg-primary/10' : 'bg-muted'}`}>
                      <div className="font-medium">Geological</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedMapData.features.geological ? 'Features included' : 'Not included'}
                      </div>
                    </div>
                    <div className={`p-2 rounded ${selectedMapData.features.geochemical ? 'bg-primary/10' : 'bg-muted'}`}>
                      <div className="font-medium">Geochemical</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedMapData.features.geochemical ? 'Features included' : 'Not included'}
                      </div>
                    </div>
                    <div className={`p-2 rounded ${selectedMapData.features.remoteSensing ? 'bg-primary/10' : 'bg-muted'}`}>
                      <div className="font-medium">Remote Sensing</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedMapData.features.remoteSensing ? 'Features included' : 'Not included'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button>
                      <Map size={16} className="mr-1" />
                      View Full Map
                    </Button>
                    <Button variant="outline">
                      <Database size={16} className="mr-1" />
                      Data Sources ({selectedMapData.dataSourceIds.length})
                    </Button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="drilling" className="mt-4">
            <div className="space-y-4">
              <div className="aspect-video relative w-full rounded-lg overflow-hidden border mb-4">
                <div className="absolute inset-0 grid-pattern"></div>
                
                {/* Simulated drilling locations */}
                {recommendations.map((rec, index) => (
                  <div 
                    key={rec.id} 
                    className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2" 
                    style={{ 
                      top: `${30 + (index * 20)}%`, 
                      left: `${25 + (index * 25)}%` 
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      rec.priority === 'high' ? 'bg-red-500 border-red-700 text-white' :
                      rec.priority === 'medium' ? 'bg-orange-400 border-orange-600 text-white' :
                      'bg-yellow-500 border-yellow-700 text-black'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                ))}
                
                <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm p-2 rounded text-xs">
                  <div>AI-recommended drill locations</div>
                </div>
              </div>
              
              <h3 className="font-medium mb-2">Recommended Drill Locations</h3>
              
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={rec.id} className="analysis-card">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          rec.priority === 'high' ? 'bg-red-500 text-white' :
                          rec.priority === 'medium' ? 'bg-orange-400 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {index + 1}
                        </div>
                        <h3 className="font-medium ml-2">Drill Location {index + 1}</h3>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                        <Badge className={getMineralColor(rec.expectedMineralType)}>
                          {rec.expectedMineralType}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Coordinates: </span>
                        <span>{formatCoordinates(rec.location.latitude, rec.location.longitude)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Depth: </span>
                        <span>{rec.depth}m</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected Grade: </span>
                        <span>{(rec.expectedGrade * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost Estimate: </span>
                        <span>${rec.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs flex justify-between">
                      <span>
                        <span className="text-muted-foreground">AI Confidence: </span>
                        <span>{(rec.aiConfidence * 100).toFixed(1)}%</span>
                      </span>
                      <span className="text-muted-foreground">
                        Generated: {formatDate(rec.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button>
                <BarChart size={16} className="mr-1" />
                View Cost-Benefit Analysis
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-4">
            <div className="space-y-4">
              <div className="analysis-card">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={20} className="text-yellow-500" />
                  <h3 className="font-medium">Water Scarcity Risk</h3>
                </div>
                <p className="text-sm mb-3">
                  AI analysis has detected potential water scarcity issues in the northern exploration area during dry season (June-September).
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                  <h4 className="font-medium text-sm mb-1">Mitigation Suggestions:</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Implement water recycling system for drilling operations</li>
                    <li>Schedule water-intensive activities during wet season</li>
                    <li>Consult with local community representatives for water access agreements</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-yellow-600">Medium Risk</Badge>
                  <Badge variant="outline" className="text-muted-foreground">Environmental</Badge>
                  <Badge variant="outline" className="text-muted-foreground">Operational</Badge>
                </div>
              </div>
              
              <div className="analysis-card">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={20} className="text-red-500" />
                  <h3 className="font-medium">Community Displacement Risk</h3>
                </div>
                <p className="text-sm mb-3">
                  Potential impact on local communities if exploration expands eastward beyond current boundaries.
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                  <h4 className="font-medium text-sm mb-1">Mitigation Suggestions:</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Conduct detailed social impact assessment before expansion</li>
                    <li>Develop comprehensive community engagement plan</li>
                    <li>Consider alternative exploration areas with lower community impact</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-red-600">High Risk</Badge>
                  <Badge variant="outline" className="text-muted-foreground">Social</Badge>
                </div>
              </div>
              
              <Button>
                <LineChart size={16} className="mr-1" />
                View Full Risk Analysis
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-3 border-t flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Brain size={14} className="mr-1" />
            <span>AI models continuously updated with new data</span>
          </div>
          <Button size="sm" variant="outline">
            Model Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIModelPanel;
