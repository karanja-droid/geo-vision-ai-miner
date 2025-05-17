
import React from 'react';
import { Container } from "@/components/ui/container";
import { DataInsights } from '@/components/DataInsights';

const Dashboard: React.FC = () => {
  return (
    <Container className="py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DataInsights />
    </Container>
  );
};

export default Dashboard;
