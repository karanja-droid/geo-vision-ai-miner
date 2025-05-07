
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Global Data Integration Platform</h1>
        <p className="text-muted-foreground">
          Integrate and analyze geological data from worldwide sources
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to="/interactive-map">View Interactive Map</Link>
      </Button>
    </div>
  );
};
