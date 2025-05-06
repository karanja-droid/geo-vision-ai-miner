
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MarketAnalysis: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Gaps & Opportunities</CardTitle>
        <CardDescription>
          Key areas where GeoVision AI Miner addresses industry needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MarketGap 
          title="Enterprise Security & Compliance"
          description="Many geological platforms lack the security certifications required by government and large mining operations. GeoVision AI Miner is pursuing top-tier security compliance to meet these enterprise-level requirements."
        />
        
        <MarketGap 
          title="Flexible Deployment Options"
          description="Current solutions are often limited to cloud-only deployments. We're building flexible deployment options including private cloud, on-premises, and air-gapped solutions for sensitive operations."
        />
        
        <MarketGap 
          title="Africa-Focused Solutions"
          description="Existing platforms often lack optimizations for African geological landscapes and mining operations. Our solution incorporates specialized models and data sources relevant to African mineral exploration."
        />
        
        <MarketGap 
          title="Integration Capabilities"
          description="Many tools operate in silos with limited connection to existing enterprise systems. GeoVision AI Miner focuses on robust API integration capabilities to connect with existing mining operation software."
        />
        
        <MarketGap 
          title="Comprehensive SLAs"
          description="Current market offerings often lack enterprise-grade service level agreements. We're establishing clear SLAs with guaranteed uptime and support response times to meet enterprise expectations."
        />
      </CardContent>
    </Card>
  );
};

// Helper component for market gaps
interface MarketGapProps {
  title: string;
  description: string;
}

const MarketGap: React.FC<MarketGapProps> = ({ title, description }) => {
  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default MarketAnalysis;
