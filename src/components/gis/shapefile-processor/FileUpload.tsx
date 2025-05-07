
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Upload, Check } from "lucide-react";

interface FileUploadProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessFiles: () => void;
  isProcessing: boolean;
  progress: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  files, 
  onFileChange, 
  onProcessFiles, 
  isProcessing, 
  progress 
}) => {
  console.log("Rendering FileUpload component", { filesCount: files.length, isProcessing, progress });
  
  return (
    <div className="space-y-4">
      <Alert className="bg-muted">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Shapefile Requirements</AlertTitle>
        <AlertDescription>
          Upload individual shapefile components (.shp, .dbf, .shx, .prj), a ZIP archive containing all components, or GeoJSON files
        </AlertDescription>
      </Alert>
      
      <div className="border-2 border-dashed rounded-lg p-8 text-center mt-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">Upload Shapefiles</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop shapefile components or click to browse
        </p>
        <input
          type="file"
          id="shapefile-upload"
          className="hidden"
          onChange={onFileChange}
          multiple
        />
        <Button asChild>
          <label htmlFor="shapefile-upload">Select Files</label>
        </Button>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Selected Files ({files.length})</h4>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index} className="text-sm flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
          
          {!isProcessing && (
            <Button onClick={onProcessFiles} className="w-full">
              Process Shapefiles
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
