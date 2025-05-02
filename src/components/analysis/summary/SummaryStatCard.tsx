
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SummaryStatCardProps {
  value: string | number;
  label: string;
}

const SummaryStatCard: React.FC<SummaryStatCardProps> = ({ value, label }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-4xl font-bold">{value}</div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryStatCard;
