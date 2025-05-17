
import React, { useEffect, useState } from 'react';
import { AnalysisResult } from '@/types/analysis';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { sendAnomalyAlert } from '@/utils/slack/notifications';
import { Link } from 'react-router-dom';

// Import the components
import SummaryStatCard from './summary/SummaryStatCard';
import MineralDistributionChart from './summary/MineralDistributionChart';
import RecentAnalysisCard from './summary/RecentAnalysisCard';
import AnalysisBreakdownCard from './summary/AnalysisBreakdownCard';
import ExportSummaryButton from './summary/ExportSummaryButton';

interface AnalysisSummaryProps {
  results: AnalysisResult[];
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ results }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [latestResult, setLatestResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Check if we have a newly generated result in localStorage
    const storedResult = localStorage.getItem('latestAnalysisResult');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult) as AnalysisResult;
      setLatestResult(parsedResult);

      // If the result shows significant anomalies, send a notification
      if (parsedResult.data.anomalies > 3 && parsedResult.confidence > 0.7) {
        sendAnomalyNotification(parsedResult);
      }
    }
  }, []);

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

  const sendAnomalyNotification = async (result: AnalysisResult) => {
    try {
      await sendAnomalyAlert({
        title: `High-Confidence Anomalies Detected`,
        description: `${result.data.anomalies} potential mineral deposits identified in the latest analysis`,
        confidence: Math.round(result.confidence * 100),
        location: "Zambia, Copperbelt Region",
        severity: "medium",
        mineralType: result.mineralType || "mixed"
      });
    } catch (error) {
      console.error("Failed to send anomaly alert:", error);
    }
  };

  const handleViewOnMap = () => {
    navigate('/interactive-map');
    toast({
      title: "Results Loaded on Map",
      description: "Analysis results have been loaded on the interactive map.",
    });
  };

  // Combine passed results with latest result if it exists and isn't already in the array
  const allResults = latestResult 
    ? [latestResult, ...results.filter(r => r.id !== latestResult.id)]
    : results;

  // Prepare summary statistics
  const totalAnomalies = allResults.reduce((acc, result) => acc + result.data.anomalies, 0);
  const avgConfidence = allResults.length > 0 
    ? parseFloat((allResults.reduce((acc, result) => acc + Number(result.confidence), 0) / allResults.length * 100).toFixed(1)) 
    : 0;
  const hotspotCount = allResults.reduce((acc, result) => acc + (result.data.hotspots?.length || 0), 0);
  const mostRecentDate = allResults.length > 0 
    ? formatDate(allResults.reduce((latest, result) => 
        new Date(result.timestamp) > new Date(latest) ? result.timestamp : latest, 
        allResults[0].timestamp)) 
    : 'N/A';

  return (
    <div className="mt-4 space-y-4">
      {latestResult && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-green-800 mb-2">New Analysis Completed</h3>
          <p className="text-sm text-green-700 mb-4">
            Your dataset has been successfully analyzed with {latestResult.data.anomalies} potential anomalies identified.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={handleViewOnMap}>
              View Results on Map
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/dataset-management">
                Explore More Datasets
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryStatCard value={totalAnomalies} label="Total Anomalies" />
        <SummaryStatCard value={`${avgConfidence}%`} label="Avg. Confidence" />
        <SummaryStatCard value={hotspotCount} label="Hotspots" />
        <SummaryStatCard value={allResults.length} label="Analyses" />
      </div>
      
      <MineralDistributionChart results={allResults} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentAnalysisCard results={allResults} mostRecentDate={mostRecentDate} />
        <AnalysisBreakdownCard results={allResults} />
      </div>
      
      <ExportSummaryButton />
    </div>
  );
};

export default AnalysisSummary;
