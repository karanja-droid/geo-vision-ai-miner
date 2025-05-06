
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FileText, Map, Calculator } from "lucide-react";

const GisShapefilesDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5" />
            GIS Shapefile Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The GIS Shapefile module allows geologists and analysts to process, analyze, 
            and generate reports from geological shapefile data. This documentation covers 
            the key features and how to use them effectively.
          </p>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis Tools</TabsTrigger>
              <TabsTrigger value="reports">Report Generation</TabsTrigger>
              <TabsTrigger value="formats">Supported Formats</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Key Features</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Upload and validate geological shapefiles (SHP, SHX, DBF)</li>
                  <li>Interactive visualization of shapefile data on maps</li>
                  <li>Spatial analysis including buffer, intersect, and query operations</li>
                  <li>Comprehensive report generation in multiple formats</li>
                  <li>Integration with other GeoVision AI Miner modules</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Getting Started</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Navigate to the GIS Shapefile Management page</li>
                  <li>Upload your shapefile (as a ZIP archive or individual files)</li>
                  <li>View your data on the interactive map</li>
                  <li>Perform analysis operations as needed</li>
                  <li>Generate reports in your preferred format</li>
                </ol>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  For optimal performance, we recommend compressing your shapefile files (SHP, SHX, DBF, etc.) into a ZIP archive before uploading.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Spatial Analysis Tools</h3>
                <p className="text-muted-foreground">Our platform offers several spatial analysis tools:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CircleDot className="h-5 w-5 text-blue-500" />
                        <h4 className="font-medium">Buffer Analysis</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Create buffer zones around features with customizable distance and parameters.
                        Useful for proximity analysis and creating zones of influence.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Scissors className="h-5 w-5 text-purple-500" />
                        <h4 className="font-medium">Overlay Operations</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perform spatial overlay operations including union, intersection, 
                        and difference between feature layers.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Map className="h-5 w-5 text-green-500" />
                        <h4 className="font-medium">Spatial Joins</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Combine attributes from one feature to another based on their spatial relationship.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="h-5 w-5 text-amber-500" />
                        <h4 className="font-medium">Attribute Queries</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Filter features using SQL-like queries based on attribute values.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Report Generation</h3>
                <p className="text-muted-foreground mb-4">
                  Generate comprehensive reports from your shapefile data in various formats:
                </p>

                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">PDF Reports</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>High-resolution maps with legends</li>
                      <li>Tabular data from feature attributes</li>
                      <li>Statistical summaries and charts</li>
                      <li>Customizable templates and branding options</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Excel/CSV Reports</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Complete attribute tables with filtering options</li>
                      <li>Statistical calculations and pivot tables</li>
                      <li>Embedded charts and graphs</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Image/Web Reports</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Map exports as PNG or JPEG</li>
                      <li>HTML reports for web embedding</li>
                      <li>Interactive web maps with feature popups</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="formats" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Supported File Formats</h3>
                <p className="text-muted-foreground mb-4">
                  Our platform supports the following GIS file formats:
                </p>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Format</th>
                      <th className="border p-2 text-left">Extensions</th>
                      <th className="border p-2 text-left">Support Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">ESRI Shapefile</td>
                      <td className="border p-2">.shp, .shx, .dbf, .prj</td>
                      <td className="border p-2">Full support</td>
                    </tr>
                    <tr>
                      <td className="border p-2">GeoJSON</td>
                      <td className="border p-2">.geojson, .json</td>
                      <td className="border p-2">Full support</td>
                    </tr>
                    <tr>
                      <td className="border p-2">KML/KMZ</td>
                      <td className="border p-2">.kml, .kmz</td>
                      <td className="border p-2">Read-only</td>
                    </tr>
                    <tr>
                      <td className="border p-2">GeoPackage</td>
                      <td className="border p-2">.gpkg</td>
                      <td className="border p-2">Read-only</td>
                    </tr>
                    <tr>
                      <td className="border p-2">CSV with coordinates</td>
                      <td className="border p-2">.csv</td>
                      <td className="border p-2">Import only</td>
                    </tr>
                  </tbody>
                </table>
                
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    When working with ESRI Shapefiles, all component files (.shp, .shx, .dbf, .prj) should have the same base filename and be included in the upload.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GisShapefilesDocs;
