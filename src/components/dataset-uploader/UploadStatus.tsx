
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Database, FileType } from 'lucide-react';
import { useUploaderContext } from './UploaderContext';

export const UploadStatus: React.FC = () => {
  const {
    file,
    uploadStatus,
    uploadProgress,
    validationMessage
  } = useUploaderContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Status</CardTitle>
      </CardHeader>
      <CardContent>
        {uploadStatus === 'idle' && !file && (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Database size={40} className="text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Complete the form and upload a file</p>
            <p className="text-xs text-muted-foreground mt-1">
              File information and status will appear here
            </p>
          </div>
        )}
        
        {file && uploadStatus === 'idle' && (
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <div className="flex items-center">
                <FileType size={20} className="text-primary mr-2" />
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'Unknown type'}
                  </p>
                </div>
              </div>
            </div>
            
            <Alert>
              <AlertCircle size={16} />
              <AlertDescription>
                Complete the form and click "Upload Dataset" to begin the upload process
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {uploadStatus === 'uploading' && (
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <div className="flex items-center">
                <FileType size={20} className="text-primary mr-2" />
                <div>
                  <h3 className="font-medium">{file?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              
              {uploadProgress >= 30 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  Dataset record created
                </div>
              )}
              
              {uploadProgress >= 60 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  File uploaded to storage
                </div>
              )}
              
              {uploadProgress >= 90 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  File processing complete
                </div>
              )}
            </div>
          </div>
        )}
        
        {uploadStatus === 'success' && (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 size={16} className="text-green-500" />
              <AlertDescription className="text-green-800">
                Dataset uploaded successfully
              </AlertDescription>
            </Alert>
            
            {validationMessage && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
                <p className="font-medium">Validation result:</p>
                <p>{validationMessage}</p>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <p className="text-sm">Your dataset is now available in the Dataset Library</p>
            </div>
          </div>
        )}
        
        {uploadStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle size={16} />
            <AlertDescription>
              {validationMessage || "An error occurred during the upload process. Please try again."}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
