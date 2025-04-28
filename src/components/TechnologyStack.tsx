
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, BarChart, Users } from 'lucide-react';

const TechnologyStack: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Technology Stack</CardTitle>
        <CardDescription>Tools and frameworks powering our solutions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="data-tools" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="data-tools" className="flex items-center gap-2">
              <Database size={16} />
              <span>Data Tools</span>
            </TabsTrigger>
            <TabsTrigger value="ai-ml" className="flex items-center gap-2">
              <BarChart size={16} />
              <span>AI/ML Frameworks</span>
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Users size={16} />
              <span>Collaboration</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="data-tools" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">GIS Tools</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Industry-standard spatial analysis platforms for geological data visualization and processing.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    ArcGIS
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    QGIS
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    MapInfo
                  </span>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Geoscience Software</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Specialized tools for geochemical and geophysical data analysis and 3D modeling.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    Leapfrog
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    ioGAS
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    Geosoft
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-ml" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Deep Learning</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Frameworks for building and training neural networks for complex spatial and temporal patterns.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    TensorFlow
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    PyTorch
                  </span>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Traditional ML</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Libraries for classical machine learning algorithms and statistical modeling.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                    Scikit-learn
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    XGBoost
                  </span>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">AutoML</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Automated machine learning platforms for rapid model development and iteration.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                    H2O.ai
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                    Google AutoML
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaboration" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Communication Tools</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Platforms for real-time communication and information sharing across teams and stakeholders.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Slack
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Microsoft Teams
                  </span>
                </div>
              </div>
              
              <div className="analysis-card">
                <h3 className="font-semibold mb-2">Analysis Sharing</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Tools for collaborative data analysis, code sharing, and documentation.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    Jupyter Notebooks
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Google Colab
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    GitHub
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TechnologyStack;
