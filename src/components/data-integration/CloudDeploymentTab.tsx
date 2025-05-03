
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { CloudServiceCard } from './CloudServiceCard';

export const CloudDeploymentTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <CloudUpload className="h-5 w-5" />
        <AlertTitle>Cloud Infrastructure</AlertTitle>
        <AlertDescription>
          Deploy on scalable cloud platforms to handle large datasets and computation needs
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CloudServiceCard
          name="AWS"
          status="Configured"
          services={[
            "S3 for geospatial data storage",
            "EC2 for computational workloads",
            "SageMaker for ML model training",
            "Lambda for serverless processing"
          ]}
        />
        
        <CloudServiceCard
          name="Azure"
          status="Ready to deploy"
          services={[
            "Azure Blob Storage for data",
            "Azure Machine Learning",
            "Azure Kubernetes Service",
            "Azure Functions"
          ]}
        />
        
        <CloudServiceCard
          name="GCP"
          status="Not configured"
          services={[
            "Google Cloud Storage",
            "Vertex AI for ML workflows",
            "BigQuery for analytics",
            "Earth Engine for geospatial analysis"
          ]}
        />
      </div>

      <div className="p-4 border rounded-md bg-muted/50 mt-4">
        <h3 className="font-semibold mb-2">Deployment Architecture</h3>
        <ul className="space-y-1 list-disc pl-5">
          <li>Containerized microservices for data processing pipelines</li>
          <li>Kubernetes for orchestration and autoscaling</li>
          <li>Serverless functions for event-triggered workflows</li>
          <li>CDN for global delivery of visualization assets</li>
          <li>Database replication for high availability</li>
        </ul>
        <div className="mt-4">
          <Button>Deploy Infrastructure</Button>
        </div>
      </div>
    </div>
  );
};
