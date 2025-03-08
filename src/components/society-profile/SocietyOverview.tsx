
import React from 'react';
import { Society } from '@/lib/data';
import { Users, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer 
} from 'recharts';

interface SocietyOverviewProps {
  society: Society;
}

const SocietyOverview = ({ society }: SocietyOverviewProps) => {
  // Extract numeric values for visualization
  const populationValue = parseFloat(society.population.replace(/[^0-9.]/g, ''));
  const incomeValue = parseFloat(society.income.replace(/[^0-9.]/g, ''));
  const footprintValue = parseFloat(society.footprint.replace(/[^0-9.]/g, ''));
  
  // Comparison data (fictional average values)
  const comparisonData = [
    {
      name: 'Population',
      society: populationValue,
      average: populationValue * 0.7, // Fictional average
      unit: society.population.includes('M') ? 'Million' : 'Thousand'
    },
    {
      name: 'Income',
      society: incomeValue,
      average: incomeValue * 0.85, // Fictional average
      unit: 'K USD'
    },
    {
      name: 'Footprint',
      society: footprintValue,
      average: footprintValue * 0.9, // Fictional average
      unit: 'sq km'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Population Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Population
            </CardTitle>
            <CardDescription>Total community size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{society.population}</div>
            <p className="text-muted-foreground text-sm mt-1">
              Distributed across {Math.round(footprintValue/10)} settlements
            </p>
          </CardContent>
        </Card>
        
        {/* Income Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Income
            </CardTitle>
            <CardDescription>Average annual income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-3xl font-bold">
              {society.income}
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              {incomeValue > 50 ? 'Above' : 'Below'} global average
            </p>
          </CardContent>
        </Card>
        
        {/* Footprint Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Footprint
            </CardTitle>
            <CardDescription>Physical area covered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-3xl font-bold">
              {society.footprint}
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Population density: {Math.round(populationValue/footprintValue * 100) / 100} per sq km
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Metrics Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics Comparison</CardTitle>
          <CardDescription>
            Comparing {society.name} metrics to global averages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="society" name={society.name} fill="#000000" radius={[4, 4, 0, 0]} />
                <Bar dataKey="average" name="Global Average" fill="#bbbbbb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Society Description */}
      <Card>
        <CardHeader>
          <CardTitle>About {society.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {society.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocietyOverview;
