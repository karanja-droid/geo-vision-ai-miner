
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Database, FileType, Loader2 } from 'lucide-react';
import { useUploaderContext } from './UploaderContext';
import { Badge } from '@/components/ui/badge';

export const UploadStatus: React.FC = () => {
  const {
    file,
    uploadStatus,
    uploadProgress,
    validationMessage,
    fileValidation,
    processingStage,
    fileMetadata
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
              
              {fileValidation && (
                <div className="mt-2 pt-2 border-t">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium mr-2">Validation:</span>
                    <Badge variant={fileValidation.isValid ? "success" : "destructive"}>
                      {fileValidation.isValid ? "Valid" : "Invalid"}
                    </Badge>
                  </div>
                  
                  {fileValidation.warnings.length > 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      {fileValidation.warnings[0]} 
                      {fileValidation.warnings.length > 1 && `(+${fileValidation.warnings.length - 1} more)`}
                    </p>
                  )}
                  
                  {fileValidation.errors.length > 0 && (
                    <p className="text-xs text-red-600 mt-1">
                      {fileValidation.errors[0]}
                      {fileValidation.errors.length > 1 && `(+${fileValidation.errors.length - 1} more)`}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <Alert>
              <AlertCircle size={16} />
              <AlertDescription>
                Complete the form and click "Upload Dataset" to begin the upload process
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {(uploadStatus === 'validating' || uploadStatus === 'uploading' || uploadStatus === 'processing') && (
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
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center">
                  {uploadStatus === 'processing' ? (
                    <Loader2 size={12} className="mr-1 animate-spin" />
                  ) : null}
                  <span>{processingStage || 'Processing...'}</span>
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              
              {uploadProgress >= 15 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  Dataset record created
                </div>
              )}
              
              {uploadProgress >= 40 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  File uploaded to storage
                </div>
              )}
              
              {uploadProgress >= 70 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  {fileValidation?.isValid ? 'File validated successfully' : 'File validation complete'}
                </div>
              )}
              
              {uploadProgress >= 90 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="mr-1 text-green-500" />
                  Processing complete
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
            
            {fileMetadata && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
                <h4 className="font-medium mb-2">File Information</h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <span className="text-blue-700">Format:</span>
                  <span>{fileMetadata.fileType}</span>
                  
                  {fileValidation?.features !== undefined && (
                    <>
                      <span className="text-blue-700">Features:</span>
                      <span>{fileValidation.features}</span>
                    </>
                  )}
                  
                  {fileValidation?.crs && (
                    <>
                      <span className="text-blue-700">CRS:</span>
                      <span>{fileValidation.crs}</span>
                    </>
                  )}
                </div>
              </div>
            )}
            
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
