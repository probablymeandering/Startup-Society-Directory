
// Data for population breakdown chart
export const generatePopulationBreakdownData = () => {
  return [
    { name: '0-18', value: 22 },
    { name: '19-35', value: 38 },
    { name: '36-50', value: 25 },
    { name: '51-65', value: 10 },
    { name: '65+', value: 5 },
  ];
};

// Data for income trends
export const generateIncomeTrendsData = () => {
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
export const generateFootprintData = () => {
  return [
    { name: 'Residential', value: 45 },
    { name: 'Commercial', value: 20 },
    { name: 'Green Space', value: 15 },
    { name: 'Infrastructure', value: 12 },
    { name: 'Industrial', value: 8 },
  ];
};

// Comparative data for income trends across society categories
export const generateComparativeIncomeData = () => {
  return [
    { year: 2019, Tech: 35000, Sciences: 32000, Arts: 28000, Politics: 34000 },
    { year: 2020, Tech: 38000, Sciences: 30000, Arts: 26000, Politics: 36000 },
    { year: 2021, Tech: 42000, Sciences: 34000, Arts: 29000, Politics: 38000 },
    { year: 2022, Tech: 48000, Sciences: 38000, Arts: 32000, Politics: 41000 },
    { year: 2023, Tech: 54000, Sciences: 42000, Arts: 36000, Politics: 45000 },
    { year: 2024, Tech: 61000, Sciences: 46000, Arts: 41000, Politics: 49000 },
  ];
};

export const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

// Filter income data based on time range
export const filterIncomeDataByTimeRange = (data: any[], timeRange: string) => {
  if (timeRange === 'all') return data;
  const currentYear = new Date().getFullYear();
  const yearThreshold = 
    timeRange === 'last3' ? currentYear - 3 : 
    timeRange === 'last5' ? currentYear - 5 : 0;
  
  return data.filter(item => item.year >= yearThreshold);
};
