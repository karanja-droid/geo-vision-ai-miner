
import React from 'react';
import { AnalysisResult } from '@/types/analysis';

// Import the new components
import SummaryStatCard from './summary/SummaryStatCard';
import MineralDistributionChart from './summary/MineralDistributionChart';
import RecentAnalysisCard from './summary/RecentAnalysisCard';
import AnalysisBreakdownCard from './summary/AnalysisBreakdownCard';
import ExportSummaryButton from './summary/ExportSummaryButton';

interface AnalysisSummaryProps {
  results: AnalysisResult[];
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ results }) => {
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

  // Prepare summary statistics
  const totalAnomalies = results.reduce((acc, result) => acc + result.data.anomalies, 0);
  const avgConfidence = results.length > 0 
    ? parseFloat((results.reduce((acc, result) => acc + Number(result.confidence), 0) / results.length * 100).toFixed(1)) 
    : 0;
  const hotspotCount = results.reduce((acc, result) => acc + (result.data.hotspots?.length || 0), 0);
  const mostRecentDate = results.length > 0 
    ? formatDate(results.reduce((latest, result) => 
        new Date(result.timestamp) > new Date(latest) ? result.timestamp : latest, 
        results[0].timestamp)) 
    : 'N/A';

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryStatCard value={totalAnomalies} label="Total Anomalies" />
        <SummaryStatCard value={`${avgConfidence}%`} label="Avg. Confidence" />
        <SummaryStatCard value={hotspotCount} label="Hotspots" />
        <SummaryStatCard value={results.length} label="Analyses" />
      </div>
      
      <MineralDistributionChart results={results} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentAnalysisCard results={results} mostRecentDate={mostRecentDate} />
        <AnalysisBreakdownCard results={results} />
      </div>
      
      <ExportSummaryButton />
    </div>
  );
};

export default AnalysisSummary;
