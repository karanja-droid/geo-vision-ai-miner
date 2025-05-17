
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 mb-4">
        <TabsTrigger value="zambia">Zambia</TabsTrigger>
        <TabsTrigger value="drc">DRC</TabsTrigger>
        <TabsTrigger value="other">Other African</TabsTrigger>
        <TabsTrigger value="global">Global</TabsTrigger>
        <TabsTrigger value="all">All Datasets</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
