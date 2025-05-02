
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";
import { AnalysisResult } from '@/types/analysis';

interface AnalysisDataViewProps {
  results: AnalysisResult[];
}

const AnalysisDataView: React.FC<AnalysisDataViewProps> = ({ results }) => {
  const { toast } = useToast();

  // Function to format timestamp
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get mineral color
  const getMineralColor = (mineral?: string): string => {
    switch(mineral) {
      case 'copper': return 'bg-mineral-copper text-white';
      case 'cobalt': return 'bg-mineral-cobalt text-white';
      case 'gold': return 'bg-mineral-gold text-black';
      case 'iron': return 'bg-mineral-iron text-white';
      case 'zinc': return 'bg-mineral-zinc text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Handle exporting data as CSV
  const handleExportCSV = () => {
    try {
      // Create CSV header
      let csvContent = "data:text/csv;charset=utf-8,ID,Layer,Type,Mineral,Confidence,Timestamp,Anomalies\n";
      
      // Add data rows
      results.forEach(result => {
        const row = [
          result.id,
          result.layerId,
          result.modelType,
          result.mineralType,
          (Number(result.confidence) * 100).toFixed(1) + "%",
          new Date(result.timestamp).toISOString(),
          result.data.anomalies
        ];
        csvContent += row.join(",") + "\n";
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `analysis-data-${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: "Data has been exported as CSV.",
      });
    } catch (error) {
      console.error("Failed to export as CSV:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the data as CSV.",
        variant: "destructive",
      });
    }
  };
  
  // Handle exporting data as GeoJSON
  const handleExportGeoJSON = () => {
    try {
      // Create GeoJSON structure
      const geoJSON = {
        type: "FeatureCollection",
        features: results.flatMap(result => {
          // Create a feature for each hotspot in the result
          if (result.data?.hotspots) {
            return result.data.hotspots.map((hotspot: any) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [hotspot.lng, hotspot.lat]
              },
              properties: {
                id: result.id,
                layerId: result.layerId,
                modelType: result.modelType,
                mineralType: result.mineralType,
                confidence: result.confidence,
                timestamp: result.timestamp,
                hotspotId: hotspot.id,
                strength: hotspot.strength
              }
            }));
          }
          // If no hotspots, return an empty array
          return [];
        }),
        metadata: {
          generated: new Date().toISOString(),
          count: results.length
        }
      };
      
      // Create download link for GeoJSON
      const jsonString = JSON.stringify(geoJSON, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `analysis-geojson-${new Date().getTime()}.geojson`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Data has been exported as GeoJSON.",
      });
    } catch (error) {
      console.error("Failed to export as GeoJSON:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the data as GeoJSON.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Raw Analysis Data</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportGeoJSON}>
            <Download className="h-4 w-4 mr-2" />
            Export GeoJSON
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Layer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Mineral</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Confidence</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Timestamp</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Anomalies</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-muted/20">
            {results.map((result) => (
              <tr key={result.id}>
                <td className="px-4 py-2 text-sm">{result.id}</td>
                <td className="px-4 py-2 text-sm">{result.layerId}</td>
                <td className="px-4 py-2 text-sm">{result.modelType}</td>
                <td className="px-4 py-2 text-sm">
                  <Badge className={getMineralColor(result.mineralType)}>
                    {result.mineralType}
                  </Badge>
                </td>
                <td className="px-4 py-2 text-sm">{(Number(result.confidence) * 100).toFixed(1)}%</td>
                <td className="px-4 py-2 text-sm">{formatDate(result.timestamp)}</td>
                <td className="px-4 py-2 text-sm">{result.data.anomalies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-2">Raw JSON Data</h3>
        <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[300px]">
          <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDataView;
