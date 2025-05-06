
import React from 'react';
import ProductRoadmap from '@/components/ProductRoadmap';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductRoadmapPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Strategic Vision & Product Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Our evolving plan to enhance GeoMiner's capabilities, address market needs, 
        and deliver an enterprise-ready platform for government and mining industry clients.
      </p>
      <ProductRoadmap />
      
      <div className="mt-12 space-y-8">
        <div className="bg-slate-50 rounded-lg p-6 border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Enterprise Registration</h2>
              <p className="text-muted-foreground">
                Register your organization for our Enterprise Early Access Program and help shape the future of GeoVision AI Miner's enterprise features.
              </p>
            </div>
            <Button size="lg" asChild className="shrink-0">
              <Link to="/signup?plan=enterprise">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Share Your Feedback</h2>
          <p className="text-muted-foreground mb-4">
            We're continuously improving our platform based on user feedback and industry trends.
            If you have suggestions for our roadmap or additional enterprise features you'd like to see,
            please share them with our product team.
          </p>
          <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-center text-muted-foreground">
              Feedback form coming soon...
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/documentation#enterprise-readiness">
              <FileText className="h-4 w-4" />
              Enterprise Documentation
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/documentation#faq">
              <FileText className="h-4 w-4" />
              Enterprise FAQ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductRoadmapPage;
