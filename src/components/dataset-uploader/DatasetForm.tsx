
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUploaderContext } from './UploaderContext';
import { sendToSlack } from '@/utils/slack/sender';
import { DatasetInfo } from '@/types';
import { z } from "zod";

const datasetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  source: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const DatasetForm: React.FC = () => {
  const { toast } = useToast();
  const { uploadFiles, isUploading } = useUploaderContext();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'geological',
    source: '',
    organization: '',
    country: 'Zambia',
    tags: ['mining', 'geological'],
  });
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  const validateForm = () => {
    try {
      datasetSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      }
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Upload the files
      await uploadFiles(files, formData);
      
      // Clear form after successful upload
      setFormData({
        name: '',
        description: '',
        type: 'geological',
        source: '',
        organization: '',
        country: 'Zambia',
        tags: ['mining', 'geological'],
      });
      setFiles([]);
      
      // Send notification via Slack
      const dataset: Partial<DatasetInfo> = {
        name: formData.name,
        type: formData.type,
        size: files.reduce((total, file) => total + file.size, 0),
        description: formData.description,
      };
      
      sendDatasetUploadNotification(dataset);
      
    } catch (error) {
      console.error('Error uploading dataset:', error);
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading the dataset.",
        variant: "destructive"
      });
    }
  };
  
  const sendDatasetUploadNotification = async (dataset: Partial<DatasetInfo>) => {
    try {
      const message = `🆕 *NEW DATASET UPLOADED*: ${dataset.name}\n${dataset.description || 'No description'}\nType: ${dataset.type}\nSize: ${(Number(dataset.size) / 1024 / 1024).toFixed(2)} MB`;
      
      await sendToSlack(message, 'data-sharing', [
        {
          color: "#36a64f",
          title: "New Dataset Upload",
          text: dataset.description || 'No description',
          fields: [
            { title: "Name", value: dataset.name || '', short: true },
            { title: "Type", value: dataset.type || '', short: true },
            { title: "Size", value: `${(Number(dataset.size) / 1024 / 1024).toFixed(2)} MB`, short: true },
            { title: "Uploaded At", value: new Date().toLocaleString(), short: true }
          ]
        }
      ]);
    } catch (error) {
      console.error("Failed to send Slack notification:", error);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Dataset</CardTitle>
        <CardDescription>
          Fill in the details and select files to upload a new geological dataset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Dataset Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter dataset name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the dataset"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Dataset Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geological">Geological</SelectItem>
                  <SelectItem value="geochemical">Geochemical</SelectItem>
                  <SelectItem value="geophysical">Geophysical</SelectItem>
                  <SelectItem value="remote_sensing">Remote Sensing</SelectItem>
                  <SelectItem value="mining">Mining</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zambia">Zambia</SelectItem>
                  <SelectItem value="Congo, DRC">Congo, DRC</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="Botswana">Botswana</SelectItem>
                  <SelectItem value="Namibia">Namibia</SelectItem>
                  <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Data Source</Label>
              <Input
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Source of dataset"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Select
                value={formData.organization}
                onValueChange={(value) => handleSelectChange("organization", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Geological Survey Department">Geological Survey Department</SelectItem>
                  <SelectItem value="Mining Company">Mining Company</SelectItem>
                  <SelectItem value="Remote Sensing Agency">Remote Sensing Agency</SelectItem>
                  <SelectItem value="Environmental Regulator">Environmental Regulator</SelectItem>
                  <SelectItem value="Academic Institution">Academic Institution</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload Files</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              multiple
              accept=".csv,.xls,.xlsx,.geojson,.shp,.dbf,.prj,.zip,.tif,.tiff,.jpg,.jpeg,.png"
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: CSV, Excel, GeoJSON, Shapefiles, GeoTIFF, JPEG, PNG
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium mb-2">Selected Files ({files.length})</p>
              <ul className="list-disc list-inside space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="text-xs">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Dataset"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
