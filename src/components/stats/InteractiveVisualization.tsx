
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { societies } from '@/lib/data';
import SocietySelector from './SocietySelector';
import VisualizationControls from './VisualizationControls';
import NoSocietySelected from './NoSocietySelected';
import VisualizationCharts from './VisualizationCharts';
import KeyInsights from './KeyInsights';

const InteractiveVisualization: React.FC = () => {
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);
  const [visualizationType, setVisualizationType] = useState('population');
  const [timeRange, setTimeRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  
  const toggleSocietySelection = (id: string) => {
    if (selectedSocieties.includes(id)) {
      setSelectedSocieties(selectedSocieties.filter(sid => sid !== id));
    } else if (selectedSocieties.length < 3) {
      setSelectedSocieties([...selectedSocieties, id]);
    }
  };

  // Check if at least one society is selected
  useEffect(() => {
    if (selectedSocieties.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [selectedSocieties]);
  
  // Filter society data based on category and selected societies
  const societiesByCategory = societies
    .filter(society => selectedCategory === 'all' || society.category.toLowerCase() === selectedCategory.toLowerCase())
    .filter(society => selectedSocieties.length === 0 || selectedSocieties.includes(society.id));
  
  return (
    <div className="space-y-6">
      <SocietySelector 
        societies={societies}
        selectedSocieties={selectedSocieties}
        toggleSocietySelection={toggleSocietySelection}
        showAlert={showAlert}
      />

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Interactive Data Visualization</h2>
          <p className="text-muted-foreground">Explore society metrics through dynamic visualizations</p>
        </div>
        
        <VisualizationControls
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isDisabled={selectedSocieties.length === 0}
        />
      </div>
      
      {selectedSocieties.length > 0 ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>
              {visualizationType === 'population' && 'Population Age Distribution'}
              {visualizationType === 'income' && 'Income Trends Over Time'}
              {visualizationType === 'footprint' && 'Land Use Distribution'}
              {visualizationType === 'comparison' && 'Society Comparison'}
            </CardTitle>
            <CardDescription>
              {visualizationType === 'population' && 'Breakdown of population by age groups'}
              {visualizationType === 'income' && `Income trends ${timeRange === 'all' ? 'since 2017' : `for the last ${timeRange === 'last3' ? '3' : '5'} years`}`}
              {visualizationType === 'footprint' && 'Analysis of land use allocation across society footprints'}
              {visualizationType === 'comparison' && `Comparing ${selectedCategory === 'all' ? 'all societies' : selectedCategory + ' societies'} by key metrics`}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <VisualizationCharts 
              visualizationType={visualizationType}
              timeRange={timeRange}
              selectedCategory={selectedCategory}
              societiesByCategory={societiesByCategory}
            />
            
            <KeyInsights visualizationType={visualizationType} />
          </CardContent>
        </Card>
      ) : (
        <NoSocietySelected />
      )}
    </div>
  );
};

export default InteractiveVisualization;
