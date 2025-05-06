
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportFormat, ExportOptions, ReportTemplate } from '@/types/datasets';
import { FileText, Table, MapIcon, BarChart, FileBarChart, FileLineChart, FileBarChart2 } from "lucide-react";

interface FormatTabProps {
  options: ExportOptions;
  exportFormats: ExportFormat[];
  reportTemplates: ReportTemplate[];
  format: string;
  handleFormatChange: (value: string) => void;
  handleOptionChange: (optionName: keyof ExportOptions, value: any) => void;
}

const FormatTab: React.FC<FormatTabProps> = ({ 
  options, 
  exportFormats, 
  reportTemplates, 
  format, 
  handleFormatChange, 
  handleOptionChange 
}) => {
  const renderFormatIcon = (format: string) => {
    switch (format) {
      case 'geojson':
        return <MapIcon className="h-4 w-4 mr-2" />;
      case 'csv':
        return <Table className="h-4 w-4 mr-2" />;
      case 'shapefile':
        return <FileLineChart className="h-4 w-4 mr-2" />;
      case 'kml':
        return <MapIcon className="h-4 w-4 mr-2" />;
      case 'geotiff':
        return <FileBarChart2 className="h-4 w-4 mr-2" />;
      case 'chart':
        return <BarChart className="h-4 w-4 mr-2" />;
      case 'visualization':
        return <FileBarChart className="h-4 w-4 mr-2" />;
      case 'excel':
        return <Table className="h-4 w-4 mr-2" />;
      case 'web':
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Report Format</label>
        <Select value={format} onValueChange={handleFormatChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {exportFormats.map((exportFormat) => (
              <SelectItem key={exportFormat.type} value={exportFormat.type}>
                <div className="flex items-center">
                  {renderFormatIcon(exportFormat.type)}
                  <span>{exportFormat.type.toUpperCase()}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          {exportFormats.find(f => f.type === format)?.description}
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Report Template</label>
        <Select 
          value={options.template} 
          onValueChange={(value) => handleOptionChange('template', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {reportTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          {reportTemplates.find(t => t.id === options.template)?.description}
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Resolution Settings</label>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">Image Quality</span>
            <span className="text-xs text-muted-foreground">
              {options.resolution === 'low' ? 'Low' : 
               options.resolution === 'medium' ? 'Medium' : 'High'}
            </span>
          </div>
          <Select
            value={options.resolution}
            onValueChange={(value) => handleOptionChange('resolution', value as 'low' | 'medium' | 'high')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (Faster)</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High (Detailed)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FormatTab;
