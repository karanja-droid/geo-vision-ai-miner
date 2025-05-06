
import React from 'react';

interface CoverageStatisticsProps {
  statistics: {
    areaAnalyzed: string;
    anomaliesDetected: number;
    featurePoints: number;
    confidenceScore: string;
  };
}

const CoverageStatistics: React.FC<CoverageStatisticsProps> = ({ statistics }) => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-2">Coverage Statistics</h4>
      <ul className="space-y-1 text-sm">
        <li className="flex justify-between">
          <span>Area Analyzed:</span>
          <span>{statistics.areaAnalyzed} km²</span>
        </li>
        <li className="flex justify-between">
          <span>Anomalies Detected:</span>
          <span>{statistics.anomaliesDetected}</span>
        </li>
        <li className="flex justify-between">
          <span>Feature Points:</span>
          <span>{statistics.featurePoints}</span>
        </li>
        <li className="flex justify-between">
          <span>Confidence Score:</span>
          <span className="font-medium text-green-600">{statistics.confidenceScore}%</span>
        </li>
      </ul>
    </div>
  );
};

export default CoverageStatistics;
