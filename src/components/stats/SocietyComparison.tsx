
import React from 'react';
import { Society } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Users, DollarSign, MapPin, Calendar } from 'lucide-react';

interface SocietyComparisonProps {
  societies: Society[];
}

const SocietyComparison = ({ societies }: SocietyComparisonProps) => {
  // Extract numeric values for visualization
  const societiesData = societies.map(society => {
    const populationValue = parseFloat(society.population.replace(/[^0-9.]/g, ''));
    const incomeValue = parseFloat(society.income.replace(/[^0-9.]/g, ''));
    const footprintValue = parseFloat(society.footprint.replace(/[^0-9.]/g, ''));
    
    return {
      name: society.name,
      population: populationValue,
      income: incomeValue,
      footprint: footprintValue,
      established: new Date(society.established).getFullYear(),
      category: society.category,
      location: society.location
    };
  });
  
  // Prepare data for charts
  const populationData = societiesData.map(s => ({
    name: s.name.split(' ').slice(0, 2).join(' '), // Shorter name
    Population: s.population
  }));
  
  const incomeData = societiesData.map(s => ({
    name: s.name.split(' ').slice(0, 2).join(' '),
    Income: s.income
  }));
  
  const footprintData = societiesData.map(s => ({
    name: s.name.split(' ').slice(0, 2).join(' '),
    Footprint: s.footprint
  }));
  
  // Colors for the bars
  const barColors = ['#000000', '#555555', '#888888'];

  return (
    <div className="space-y-6">
      {/* Society Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Attribute</th>
              {societies.map(society => (
                <th key={society.id} className="text-left p-2">{society.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Population
              </td>
              {societies.map(society => (
                <td key={society.id} className="p-2">{society.population}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Average Income
              </td>
              {societies.map(society => (
                <td key={society.id} className="p-2">{society.income}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Footprint
              </td>
              {societies.map(society => (
                <td key={society.id} className="p-2">{society.footprint}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Established
              </td>
              {societies.map(society => (
                <td key={society.id} className="p-2">{society.established}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2">Category</td>
              {societies.map(society => (
                <td key={society.id} className="p-2">{society.category}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2">Location</td>
              {societies.map(society => (
                <td key={society.id} className="p-2">{society.location}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Visual Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Population Chart */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Population Comparison
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Population" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Income Chart */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Income Comparison
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Income" fill="#555555" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocietyComparison;
