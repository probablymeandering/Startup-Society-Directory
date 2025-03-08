
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown 
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { regions, populationFilters, incomeFilters } from '@/lib/data';

interface SearchFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState(regions[0]);
  const [population, setPopulation] = useState(populationFilters[0]);
  const [income, setIncome] = useState(incomeFilters[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    onFilterChange('region', value);
  };

  const handlePopulationChange = (value: string) => {
    setPopulation(value);
    onFilterChange('population', value);
  };

  const handleIncomeChange = (value: string) => {
    setIncome(value);
    onFilterChange('income', value);
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm py-4 px-6 border-b border-border/50 slide-down">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for societies"
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-sm bg-background"
                  size="sm"
                >
                  {region}
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="flex flex-col gap-1">
                  {regions.map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      size="sm"
                      className="justify-start font-normal"
                      onClick={() => handleRegionChange(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-sm bg-background"
                  size="sm"
                >
                  {population}
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="flex flex-col gap-1">
                  {populationFilters.map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      size="sm"
                      className="justify-start font-normal"
                      onClick={() => handlePopulationChange(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-sm bg-background"
                  size="sm"
                >
                  {income}
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="flex flex-col gap-1">
                  {incomeFilters.map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      size="sm"
                      className="justify-start font-normal"
                      onClick={() => handleIncomeChange(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <Button 
            type="submit" 
            className="ml-auto md:ml-2"
            size="sm"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchFilters;
