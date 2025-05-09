
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface MineData {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    country: string;
    region?: string;
  };
  minerals: string[];
  status: 'active' | 'inactive' | 'planned' | 'closed';
  production?: {
    mineral: string;
    amount: number;
    unit: string;
    year: number;
  }[];
  owner?: string;
  description?: string;
}

interface MinesAnalyticsProps {
  mines: MineData[];
  isLoading: boolean;
}

const MinesAnalytics: React.FC<MinesAnalyticsProps> = ({ mines, isLoading }) => {
  // Calculate statistics
  const totalMines = mines.length;
  const activeMines = mines.filter(mine => mine.status === 'active').length;
  const uniqueCountries = new Set(mines.map(mine => mine.location.country)).size;
  const uniqueMinerals = new Set(mines.flatMap(mine => mine.minerals)).size;

  // Prepare data for charts
  const minesByStatus = [
    { name: 'Active', value: mines.filter(mine => mine.status === 'active').length },
    { name: 'Inactive', value: mines.filter(mine => mine.status === 'inactive').length },
    { name: 'Planned', value: mines.filter(mine => mine.status === 'planned').length },
    { name: 'Closed', value: mines.filter(mine => mine.status === 'closed').length },
  ];

  const countryData = mines.reduce((acc, mine) => {
    const country = mine.location.country;
    const existingEntry = acc.find(item => item.name === country);
    
    if (existingEntry) {
      existingEntry.value++;
    } else {
      acc.push({ name: country, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);
  
  // Sort by number of mines descending and limit to top 10
  const topCountries = [...countryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Get minerals distribution
  const mineralsCount = mines.flatMap(mine => mine.minerals).reduce((acc, mineral) => {
    acc[mineral] = (acc[mineral] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mineralsData = Object.entries(mineralsCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Chart colors
  const COLORS = ['#2563eb', '#e11d48', '#eab308', '#22c55e', '#8b5cf6'];
  const STATUS_COLORS = {
    'Active': '#22c55e',
    'Inactive': '#eab308',
    'Planned': '#2563eb',
    'Closed': '#94a3b8'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mines Overview</CardTitle>
          <CardDescription>Distribution by status</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{totalMines}</div>
              <div className="text-sm text-muted-foreground">Total Mines</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{activeMines}</div>
              <div className="text-sm text-muted-foreground">Active Mines</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-600">{uniqueCountries}</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-indigo-600">{uniqueMinerals}</div>
              <div className="text-sm text-muted-foreground">Mineral Types</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={minesByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {minesByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Mining Countries</CardTitle>
          <CardDescription>Number of mining operations by country</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountries} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Minerals</CardTitle>
          <CardDescription>Most common minerals in mining operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {mineralsData.map((mineral, index) => (
              <div 
                key={mineral.name} 
                className="flex items-center justify-between p-2 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{mineral.name}</span>
                </div>
                <Badge variant="outline">{mineral.value} mines</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mineralsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mineralsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="col-span-2 flex items-center justify-center p-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-3">Loading analytics data...</span>
        </div>
      )}
    </div>
  );
};

export default MinesAnalytics;
