
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { societies, Society } from '@/lib/data';

const SocietyComparisonTool: React.FC = () => {
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleSocietySelection = (id: string) => {
    if (selectedSocieties.includes(id)) {
      setSelectedSocieties(selectedSocieties.filter(sid => sid !== id));
    } else if (selectedSocieties.length < 3) {
      setSelectedSocieties([...selectedSocieties, id]);
    }
  };

  const comparisonData = selectedSocieties.map(id => {
    const society = societies.find(s => s.id === id);
    if (!society) return null;
    
    // Convert string values to numbers for chart
    const population = parseInt(society.population.replace(/[^0-9.]/g, ''));
    const income = parseInt(society.income.replace(/[^0-9.]/g, ''));
    const footprint = parseInt(society.footprint.replace(/[^0-9.]/g, ''));
    
    return {
      name: society.name,
      population,
      income,
      footprint,
      category: society.category,
      id: society.id
    };
  }).filter(Boolean) as any[];

  // Data for population comparison chart
  const populationData = comparisonData.map(society => ({
    name: society?.name.split(' ')[0] || '', // Use first word of name for brevity
    Population: society?.population || 0
  }));

  // Data for income comparison chart
  const incomeData = comparisonData.map(society => ({
    name: society?.name.split(' ')[0] || '',
    Income: society?.income || 0
  }));

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Select Societies to Compare (max 3)</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {societies.map(society => (
            <div 
              key={society.id} 
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                selectedSocieties.includes(society.id) 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => toggleSocietySelection(society.id)}
            >
              <div className="font-medium">{society.name}</div>
              <div className="text-sm text-muted-foreground">{society.category} • {society.location}</div>
            </div>
          ))}
        </div>
        <Button 
          className="mt-4" 
          disabled={selectedSocieties.length < 2} 
          onClick={() => setShowComparison(true)}
        >
          Compare Selected ({selectedSocieties.length})
        </Button>
      </div>

      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Society Comparison</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonData.map(society => (
                <Card key={society?.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{society?.name}</CardTitle>
                    <CardDescription>{society?.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Population:</span>
                        <span className="font-medium">{society?.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Income:</span>
                        <span className="font-medium">{society?.income}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Footprint:</span>
                        <span className="font-medium">{society?.footprint}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Population Comparison</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={populationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Population" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Income Comparison</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Income" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocietyComparisonTool;
