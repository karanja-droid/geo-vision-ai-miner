
import React from 'react';
import ProductRoadmap from '@/components/ProductRoadmap';

const ProductRoadmapPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Strategic Vision & Product Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Our evolving plan to enhance GeoMiner's capabilities and address market needs.
      </p>
      <ProductRoadmap />
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Share Your Feedback</h2>
        <p className="text-muted-foreground mb-4">
          We're continuously improving our platform based on user feedback and industry trends.
          If you have suggestions for our roadmap or additional features you'd like to see,
          please share them with our product team.
        </p>
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-center text-muted-foreground">
            Feedback form coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductRoadmapPage;
