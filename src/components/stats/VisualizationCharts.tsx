
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Society } from '@/lib/data';
import { COLORS, generatePopulationBreakdownData, generateFootprintData, filterIncomeDataByTimeRange, generateIncomeTrendsData, generateComparativeIncomeData } from './chartData';

interface VisualizationChartsProps {
  visualizationType: string;
  timeRange: string;
  selectedCategory: string;
  societiesByCategory: Society[];
}

const VisualizationCharts: React.FC<VisualizationChartsProps> = ({
  visualizationType,
  timeRange,
  selectedCategory,
  societiesByCategory
}) => {
  const filteredIncomeTrendsData = filterIncomeDataByTimeRange(generateIncomeTrendsData(), timeRange);
  const filteredComparativeIncomeData = filterIncomeDataByTimeRange(generateComparativeIncomeData(), timeRange);
  
  // Generate data for society population comparison
  const societyPopulationData = societiesByCategory.map(society => ({
    name: society.name.split(' ')[0], // First word of society name for brevity
    population: parseInt(society.population.replace(/[^0-9.]/g, '')) * 
              (society.population.includes('K') ? 1 : 0.001)
  }));
  
  const renderContent = () => {
    if (visualizationType === 'population') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={generatePopulationBreakdownData()} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Percentage" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={generatePopulationBreakdownData()}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {generatePopulationBreakdownData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    
    if (visualizationType === 'income') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredIncomeTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'Annual Income ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`$${value}`, 'Average Income']} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Average Income" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredComparativeIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Income']} />
                <Legend />
                <Area type="monotone" dataKey="Tech" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="Sciences" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="Arts" stackId="3" stroke="#ffc658" fill="#ffc658" />
                <Area type="monotone" dataKey="Politics" stackId="4" stroke="#ff8042" fill="#ff8042" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    
    if (visualizationType === 'footprint') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={generateFootprintData()} layout="vertical" margin={{ top: 20, right: 30, left: 90, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="Land Allocation" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={generateFootprintData()}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#82ca9d"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {generateFootprintData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    
    if (visualizationType === 'comparison') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={societyPopulationData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60}
              interval={0}
            />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}`, 'Population (K)']} />
            <Legend />
            <Bar dataKey="population" name="Population (K)" fill="#0088fe" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    return null;
  };
  
  return (
    <div className="h-[400px] w-full">
      {renderContent()}
    </div>
  );
};

export default VisualizationCharts;
