
import React, { useState } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Upload, FileType, Database } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StakeholderOrganization } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const DatasetUploader = () => {
  const { toast } = useToast();
  const { createDataset, processDatasetFile, loading } = useDatabase();
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [organization, setOrganization] = useState<StakeholderOrganization | ''>('');
  const [file, setFile] = useState<File | null>(null);
  
  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [validationMessage, setValidationMessage] = useState('');
  
  const organizations: StakeholderOrganization[] = [
    'Geological Survey Department',
    'Mining Company',
    'Remote Sensing Agency',
    'Environmental Regulator',
    'Academic Institution'
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Auto-detect type from file extension
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      let detectedType = '';
      
      if (['shp', 'geojson', 'kml'].includes(extension || '')) {
        detectedType = 'Geological';
      } else if (['tif', 'tiff', 'jpg', 'png'].includes(extension || '')) {
        detectedType = 'Remote Sensing';
      } else if (['csv', 'xlsx', 'xls'].includes(extension || '')) {
        detectedType = 'Tabular';
      }
      
      if (detectedType && !type) {
        setType(detectedType);
      }
    }
  };
  
  const validateForm = () => {
    if (!name) {
      toast({
        title: "Missing information",
        description: "Dataset name is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!type) {
      toast({
        title: "Missing information",
        description: "Dataset type is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!file) {
      toast({
        title: "Missing file",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setUploadStatus('uploading');
      setUploadProgress(10);
      
      // Create dataset record first
      const dataset = await createDataset({
        name,
        description,
        type,
        size: file?.size || 0,
        source,
        organization: organization as StakeholderOrganization || undefined
      });
      
      if (!dataset || !file) {
        throw new Error("Failed to create dataset record");
      }
      
      setUploadProgress(30);
      
      // Now upload and process the file
      const uploadResult = await processDatasetFile(file, dataset.id);
      
      setUploadProgress(90);
      
      if (uploadResult?.validationResult) {
        setValidationMessage(
          uploadResult.validationResult.isValid 
            ? "File validated successfully"
            : `Validation failed: ${uploadResult.validationResult.errors.join(', ')}`
        );
      }
      
      setUploadProgress(100);
      setUploadStatus('success');
      
      // Reset form after successful upload
      setTimeout(() => {
        setName('');
        setDescription('');
        setType('');
        setSource('');
        setOrganization('');
        setFile(null);
        setUploadStatus('idle');
        setUploadProgress(0);
        setValidationMessage('');
      }, 3000);
      
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus('error');
      setValidationMessage(error instanceof Error ? error.message : "Unknown error occurred");
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Dataset Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Dataset Name *
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter dataset name"
                disabled={uploadStatus === 'uploading'}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter dataset description"
                disabled={uploadStatus === 'uploading'}
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Dataset Type *
              </label>
              <Select
                value={type}
                onValueChange={setType}
                disabled={uploadStatus === 'uploading'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Geological">Geological</SelectItem>
                  <SelectItem value="Remote Sensing">Remote Sensing</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Drill Results">Drill Results</SelectItem>
                  <SelectItem value="Mining">Mining</SelectItem>
                  <SelectItem value="Historical">Historical</SelectItem>
                  <SelectItem value="Tabular">Tabular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="source" className="block text-sm font-medium mb-1">
                Data Source
              </label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Data source (e.g., survey name, agency)"
                disabled={uploadStatus === 'uploading'}
              />
            </div>
            
            <div>
              <label htmlFor="organization" className="block text-sm font-medium mb-1">
                Organization
              </label>
              <Select
                value={organization}
                onValueChange={(value) => setOrganization(value as StakeholderOrganization)}
                disabled={uploadStatus === 'uploading'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-1">
                Upload File *
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  disabled={uploadStatus === 'uploading'}
                  className="flex-1"
                />
                {file && (
                  <div className="flex items-center">
                    <FileType size={16} className="text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: SHP, GeoJSON, CSV, TIF, KML, XLSX
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={uploadStatus === 'uploading' || loading}
            >
              {uploadStatus === 'uploading' ? (
                <>Uploading...</>
              ) : (
                <>
                  <Upload size={16} className="mr-1" />
                  Upload Dataset
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
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
    </div>
  );
};
