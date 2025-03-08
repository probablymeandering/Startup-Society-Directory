import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { societies } from '@/lib/data';

// Data for population breakdown chart
const generatePopulationBreakdownData = () => {
  return [
    { name: '0-18', value: 22 },
    { name: '19-35', value: 38 },
    { name: '36-50', value: 25 },
    { name: '51-65', value: 10 },
    { name: '65+', value: 5 },
  ];
};

// Data for income trends
const generateIncomeTrendsData = () => {
  return [
    { year: 2017, income: 25000 },
    { year: 2018, income: 27500 },
    { year: 2019, income: 31000 },
    { year: 2020, income: 28000 },
    { year: 2021, income: 34000 },
    { year: 2022, income: 42000 },
    { year: 2023, income: 48000 },
    { year: 2024, income: 55000 },
  ];
};

// Data for footprint analysis
const generateFootprintData = () => {
  return [
    { name: 'Residential', value: 45 },
    { name: 'Commercial', value: 20 },
    { name: 'Green Space', value: 15 },
    { name: 'Infrastructure', value: 12 },
    { name: 'Industrial', value: 8 },
  ];
};

// Comparative data for income trends across society categories
const generateComparativeIncomeData = () => {
  return [
    { year: 2019, Tech: 35000, Sciences: 32000, Arts: 28000, Politics: 34000 },
    { year: 2020, Tech: 38000, Sciences: 30000, Arts: 26000, Politics: 36000 },
    { year: 2021, Tech: 42000, Sciences: 34000, Arts: 29000, Politics: 38000 },
    { year: 2022, Tech: 48000, Sciences: 38000, Arts: 32000, Politics: 41000 },
    { year: 2023, Tech: 54000, Sciences: 42000, Arts: 36000, Politics: 45000 },
    { year: 2024, Tech: 61000, Sciences: 46000, Arts: 41000, Politics: 49000 },
  ];
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

const InteractiveVisualization = () => {
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);
  const [visualizationType, setVisualizationType] = useState('population');
  const [timeRange, setTimeRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  
  // Filter income data based on time range
  const filterIncomeDataByTimeRange = (data) => {
    if (timeRange === 'all') return data;
    const currentYear = new Date().getFullYear();
    const yearThreshold = 
      timeRange === 'last3' ? currentYear - 3 : 
      timeRange === 'last5' ? currentYear - 5 : 0;
    
    return data.filter(item => item.year >= yearThreshold);
  };
  
  const filteredIncomeTrendsData = filterIncomeDataByTimeRange(generateIncomeTrendsData());
  const filteredComparativeIncomeData = filterIncomeDataByTimeRange(generateComparativeIncomeData());
  
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
  
  // Generate data for society population comparison
  const societyPopulationData = societiesByCategory.map(society => ({
    name: society.name.split(' ')[0], // First word of society name for brevity
    population: parseInt(society.population.replace(/[^0-9.]/g, '')) * 
                (society.population.includes('K') ? 1 : 0.001)
  }));
  
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4">Select Societies to Analyze (min 1, max 3)</h3>
        {showAlert && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please select at least one society to continue.
            </AlertDescription>
          </Alert>
        )}
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
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Interactive Data Visualization</h2>
          <p className="text-muted-foreground">Explore society metrics through dynamic visualizations</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={visualizationType} onValueChange={setVisualizationType} disabled={selectedSocieties.length === 0}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Visualization Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="population">Population Breakdown</SelectItem>
              <SelectItem value="income">Income Trends</SelectItem>
              <SelectItem value="footprint">Footprint Analysis</SelectItem>
              <SelectItem value="comparison">Society Comparison</SelectItem>
            </SelectContent>
          </Select>
          
          {visualizationType === 'income' && (
            <Select value={timeRange} onValueChange={setTimeRange} disabled={selectedSocieties.length === 0}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last3">Last 3 Years</SelectItem>
                <SelectItem value="last5">Last 5 Years</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          {visualizationType === 'comparison' && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={selectedSocieties.length === 0}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="sciences">Sciences</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
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
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {visualizationType === 'population' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                    <BarChart data={generatePopulationBreakdownData()} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                    </BarChart>
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
                  </div>
                )}
                
                {visualizationType === 'income' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                    <LineChart data={filteredIncomeTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Annual Income ($)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`$${value}`, 'Average Income']} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#8884d8" name="Average Income" activeDot={{ r: 8 }} />
                    </LineChart>
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
                  </div>
                )}
                
                {visualizationType === 'footprint' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                    <BarChart data={generateFootprintData()} layout="vertical" margin={{ top: 20, right: 30, left: 90, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" name="Land Allocation" />
                    </BarChart>
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
                  </div>
                )}
                
                {visualizationType === 'comparison' && (
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
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="p-6 border-t">
              <h3 className="text-lg font-medium mb-2">Key Insights</h3>
              {visualizationType === 'population' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Working-age adults (19-50) make up the majority of society populations (63%).</li>
                  <li>The 19-35 age group is the largest demographic segment at 38%.</li>
                  <li>Senior citizens (65+) represent just 5% of the population in emerging societies.</li>
                </ul>
              )}
              {visualizationType === 'income' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Average income has shown a steady increase of approximately 14% year-over-year.</li>
                  <li>Technology-focused societies consistently show higher income levels than other categories.</li>
                  <li>A temporary income decrease occurred in 2020, followed by strong recovery and growth.</li>
                </ul>
              )}
              {visualizationType === 'footprint' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Residential areas account for the largest portion of land use at 45%.</li>
                  <li>Green spaces (15%) are prioritized over industrial zones (8%) in most societies.</li>
                  <li>Commercial and infrastructure zones together comprise approximately one-third of land allocation.</li>
                </ul>
              )}
              {visualizationType === 'comparison' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Population sizes vary significantly across different societies.</li>
                  <li>Technology-focused societies tend to have larger populations than arts-focused ones.</li>
                  <li>The majority of societies maintain populations between 20K-50K residents.</li>
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-8 text-center">
          <div className="mb-4 text-amber-500">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Societies Selected</h3>
          <p className="text-muted-foreground mb-4">
            Please select at least one society from the list above to view analysis and visualizations.
          </p>
        </Card>
      )}
    </div>
  );
};

const SimilarSocieties = ({ type }: { type: 'population' | 'income' | 'location' }) => {
  // Filter societies based on selected similarity type
  const getSimilarSocieties = () => {
    if (type === 'population') {
      return societies.sort((a, b) => {
        const popA = parseInt(a.population.replace(/[^0-9.]/g, ''));
        const popB = parseInt(b.population.replace(/[^0-9.]/g, ''));
        return popB - popA;
      }).slice(0, 5);
    } else if (type === 'income') {
      return societies.sort((a, b) => {
        const incomeA = parseInt(a.income.replace(/[^0-9.]/g, ''));
        const incomeB = parseInt(b.income.replace(/[^0-9.]/g, ''));
        return incomeB - incomeA;
      }).slice(0, 5);
    } else {
      // For location, just show a few examples
      return societies.filter(s => 
        s.location.includes('Europe') || 
        s.location.includes('Asia') || 
        s.location.includes('America')
      ).slice(0, 5);
    }
  };

  const similarSocieties = getSimilarSocieties();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {similarSocieties.map((society) => (
        <Card key={society.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{society.name}</CardTitle>
            <CardDescription>
              {type === 'population' && `Population: ${society.population}`}
              {type === 'income' && `Income: ${society.income}`}
              {type === 'location' && `Location: ${society.location}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">{society.description.substring(0, 100)}...</p>
            <div className="mt-4 flex justify-between">
              <a href={`/society/${society.id}`} className="text-sm text-primary hover:underline">
                View Profile
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SocietyComparison = () => {
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
  }).filter(Boolean);

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

const Stats = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Society Statistics & Comparisons</h1>
        
        <div className="space-y-12">
          <section>
            <InteractiveVisualization />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Related Societies</h2>
            <Tabs defaultValue="population">
              <TabsList className="mb-4">
                <TabsTrigger value="population">By Population</TabsTrigger>
                <TabsTrigger value="income">By Income</TabsTrigger>
                <TabsTrigger value="location">By Location</TabsTrigger>
              </TabsList>
              <TabsContent value="population">
                <SimilarSocieties type="population" />
              </TabsContent>
              <TabsContent value="income">
                <SimilarSocieties type="income" />
              </TabsContent>
              <TabsContent value="location">
                <SimilarSocieties type="location" />
              </TabsContent>
            </Tabs>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Society Comparison Tool</h2>
            <SocietyComparison />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stats;
