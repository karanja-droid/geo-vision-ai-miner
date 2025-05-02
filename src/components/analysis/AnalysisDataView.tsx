import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { AnalysisResult } from '@/types/analysis';

interface AnalysisDataViewProps {
  results: AnalysisResult[];
}

const AnalysisDataView: React.FC<AnalysisDataViewProps> = ({ results }) => {
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

  // Handle exporting data
  const handleExportCSV = () => {
    console.log('Exporting data as CSV');
    // Implementation would go here
  };

  const handleExportGeoJSON = () => {
    console.log('Exporting data as GeoJSON');
    // Implementation would go here
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
