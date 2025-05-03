
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Steps, StepItem } from "@/components/ui/steps";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Image, Database, BarChart } from "lucide-react";

const SatelliteVisionDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Image className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-1">SatelliteVision CNN</h2>
          <p className="text-muted-foreground">
            Deep learning model for identifying mineral signatures from satellite imagery
          </p>
        </div>
      </div>
      
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Recommended for mineral exploration teams</AlertTitle>
        <AlertDescription>
          SatelliteVision CNN is designed for geological exploration teams who need to analyze large areas 
          for potential mineral deposits without extensive ground surveys.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Overview & Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            SatelliteVision CNN is a convolutional neural network model specialized in detecting mineral signatures 
            from multispectral satellite imagery. The model can identify potential deposit locations by analyzing 
            subtle spectral patterns that indicate the presence of various minerals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-md p-4 space-y-2">
              <h4 className="font-medium">Key Features</h4>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                <li>Multispectral band analysis across visible and infrared spectra</li>
                <li>Attention mechanisms to highlight regions of interest</li>
                <li>Transfer learning from pre-trained vision models</li>
                <li>Works with Landsat, Sentinel-2, and WorldView data</li>
                <li>93.5% accuracy on benchmark mineral identification tasks</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <h4 className="font-medium">Detectable Minerals</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">Iron Oxide</Badge>
                <Badge variant="secondary">Copper Sulfides</Badge>
                <Badge variant="secondary">Gold Indicators</Badge>
                <Badge variant="secondary">Silicates</Badge>
                <Badge variant="secondary">Clay Minerals</Badge>
                <Badge variant="secondary">Carbonates</Badge>
                <Badge variant="secondary">Zinc Minerals</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>How to Use SatelliteVision CNN</CardTitle>
        </CardHeader>
        <CardContent>
          <Steps>
            <StepItem step={1} title="Select Data Source">
              <p>Choose the satellite data source you want to analyze:</p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li><strong>Landsat 8/9:</strong> 30m resolution, good for large area surveys</li>
                <li><strong>Sentinel-2:</strong> 10-20m resolution, better spectral range</li>
                <li><strong>WorldView-3:</strong> Higher resolution (1-5m) for detailed analysis</li>
              </ul>
            </StepItem>
            
            <StepItem step={2} title="Configure Analysis Parameters">
              <p>Set the parameters for your analysis:</p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li><strong>Resolution:</strong> Higher resolution provides more detail but processes slower</li>
                <li><strong>Analysis Depth:</strong> Controls how thoroughly the model analyzes the data</li>
                <li><strong>Spectral Bands:</strong> Select which wavelength ranges to include in analysis</li>
              </ul>
              <div className="mt-2 text-sm">
                <p><strong>Recommended:</strong> Start with medium resolution and moderate depth for initial surveys.</p>
              </div>
            </StepItem>
            
            <StepItem step={3} title="Run the Analysis">
              <p>Click "Run Satellite Vision Analysis" to start processing. The model will:</p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li>Preprocess the imagery data and calibrate spectral bands</li>
                <li>Apply the CNN to detect patterns indicative of mineral presence</li>
                <li>Generate heatmaps showing likelihood of mineral deposits</li>
                <li>Calculate confidence scores for each identified anomaly</li>
              </ul>
            </StepItem>
            
            <StepItem step={4} title="Interpret Results">
              <p>After processing completes, you'll get:</p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li>List of detected minerals with confidence percentages</li>
                <li>Coverage statistics showing analyzed area and detected anomalies</li>
                <li>Option to download a detailed report</li>
                <li>Ability to view the full analysis with interactive maps</li>
              </ul>
              <div className="mt-2 text-sm">
                <p><strong>Best Practice:</strong> Validate high-confidence findings with ground truth data when available.</p>
              </div>
            </StepItem>
          </Steps>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Model Architecture</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Architecture:</span>
                  <span>MobileNetV3 + Custom Layers</span>
                </li>
                <li className="flex justify-between">
                  <span>Input Size:</span>
                  <span>224×224 pixels</span>
                </li>
                <li className="flex justify-between">
                  <span>Training Dataset:</span>
                  <span>25,000+ labeled spectral samples</span>
                </li>
                <li className="flex justify-between">
                  <span>Training Method:</span>
                  <span>Transfer Learning + Fine-tuning</span>
                </li>
                <li className="flex justify-between">
                  <span>Validation Accuracy:</span>
                  <span>93.5%</span>
                </li>
                <li className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>April 15, 2024</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Processing Requirements</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>CPU:</span>
                  <span>4+ cores recommended</span>
                </li>
                <li className="flex justify-between">
                  <span>RAM:</span>
                  <span>8GB minimum, 16GB+ recommended</span>
                </li>
                <li className="flex justify-between">
                  <span>GPU:</span>
                  <span>NVIDIA with CUDA support (optional)</span>
                </li>
                <li className="flex justify-between">
                  <span>Storage:</span>
                  <span>500MB for model, 5GB+ for datasets</span>
                </li>
                <li className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>1-15 minutes per analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Integration with GeoVision AI Miner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            SatelliteVision CNN integrates seamlessly with other modules in the GeoVision AI Miner platform:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-muted p-2 rounded">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Dataset Management</h4>
                <p className="text-sm text-muted-foreground">
                  Import satellite imagery from the Dataset Management module directly into SatelliteVision CNN for analysis.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-muted p-2 rounded">
                <Image className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Interactive Map</h4>
                <p className="text-sm text-muted-foreground">
                  Export analysis results directly to the Interactive Map module to visualize mineral potential across your exploration area.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-muted p-2 rounded">
                <BarChart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Reporting & Data Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Generate comprehensive reports from model results and integrate findings with other geological data sources.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SatelliteVisionDocs;
