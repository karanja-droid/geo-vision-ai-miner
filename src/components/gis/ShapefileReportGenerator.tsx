
import React from 'react';
import ReportGenerator from './report-generator/ReportGenerator';

interface ShapefileReportGeneratorProps {
  data: any;
}

const ShapefileReportGenerator: React.FC<ShapefileReportGeneratorProps> = ({ data }) => {
  return <ReportGenerator data={data} />;
};

export default ShapefileReportGenerator;
