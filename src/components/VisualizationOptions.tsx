
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Grid3X3, Layers, Settings2 } from "lucide-react";

interface VisualizationOptionsProps {
  onApply: (options: VisualizationSettings) => void;
}

export interface VisualizationSettings {
  colorScheme: string;
  opacity: number;
  showGrid: boolean;
  gridSize: string;
  renderMode: string;
  contourLines: boolean;
  contourInterval: number;
  showLabels: boolean;
  labelSize: string;
  visualization3D: boolean;
  exaggeration: number;
}

const defaultSettings: VisualizationSettings = {
  colorScheme: 'spectrum',
  opacity: 0.8,
  showGrid: true,
  gridSize: 'medium',
  renderMode: 'heatmap',
  contourLines: false,
  contourInterval: 10,
  showLabels: true,
  labelSize: 'medium',
  visualization3D: false,
  exaggeration: 1.5
};

export const VisualizationOptions: React.FC<VisualizationOptionsProps> = ({ onApply }) => {
  const [settings, setSettings] = React.useState<VisualizationSettings>(defaultSettings);

  const handleChange = (key: keyof VisualizationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(settings);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Settings2 className="h-5 w-5 mr-2" />
          Visualization Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
            <TabsTrigger value="3d">3D Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <Select 
                value={settings.colorScheme} 
                onValueChange={(value) => handleChange('colorScheme', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spectrum">Spectrum</SelectItem>
                  <SelectItem value="thermal">Thermal</SelectItem>
                  <SelectItem value="elevation">Elevation</SelectItem>
                  <SelectItem value="geological">Geological</SelectItem>
                  <SelectItem value="grayscale">Grayscale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Opacity</Label>
                <span className="text-sm text-muted-foreground">{Math.round(settings.opacity * 100)}%</span>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={[settings.opacity]}
                onValueChange={(value) => handleChange('opacity', value[0])}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Show Grid</Label>
              <Switch 
                checked={settings.showGrid} 
                onCheckedChange={(checked) => handleChange('showGrid', checked)} 
              />
            </div>
            
            {settings.showGrid && (
              <div className="space-y-2">
                <Label>Grid Size</Label>
                <Select 
                  value={settings.gridSize} 
                  onValueChange={(value) => handleChange('gridSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grid size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="layers" className="space-y-4">
            <div className="space-y-2">
              <Label>Render Mode</Label>
              <Select 
                value={settings.renderMode} 
                onValueChange={(value) => handleChange('renderMode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select render mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heatmap">Heatmap</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="contour">Contour</SelectItem>
                  <SelectItem value="classified">Classified</SelectItem>
                  <SelectItem value="points">Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Contour Lines</Label>
              <Switch 
                checked={settings.contourLines} 
                onCheckedChange={(checked) => handleChange('contourLines', checked)} 
              />
            </div>
            
            {settings.contourLines && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Contour Interval</Label>
                  <span className="text-sm text-muted-foreground">{settings.contourInterval}</span>
                </div>
                <Slider
                  min={1}
                  max={50}
                  step={1}
                  value={[settings.contourInterval]}
                  onValueChange={(value) => handleChange('contourInterval', value[0])}
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label>Show Labels</Label>
              <Switch 
                checked={settings.showLabels} 
                onCheckedChange={(checked) => handleChange('showLabels', checked)} 
              />
            </div>
            
            {settings.showLabels && (
              <div className="space-y-2">
                <Label>Label Size</Label>
                <Select 
                  value={settings.labelSize} 
                  onValueChange={(value) => handleChange('labelSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select label size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="3d" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>3D Visualization</Label>
              <Switch 
                checked={settings.visualization3D} 
                onCheckedChange={(checked) => handleChange('visualization3D', checked)} 
              />
            </div>
            
            {settings.visualization3D && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Vertical Exaggeration</Label>
                  <span className="text-sm text-muted-foreground">{settings.exaggeration}x</span>
                </div>
                <Slider
                  min={0.5}
                  max={5}
                  step={0.1}
                  value={[settings.exaggeration]}
                  onValueChange={(value) => handleChange('exaggeration', value[0])}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-2 mt-4 justify-between">
          <Button variant="outline" onClick={handleReset}>Reset</Button>
          <Button onClick={handleApply}>Apply Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationOptions;
