
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import CategoryTabs from '@/components/CategoryTabs';
import SocietyCard from '@/components/SocietyCard';
import MapboxGlobe from '@/components/MapboxGlobe';
import Footer from '@/components/Footer';
import { societies, categories } from '@/lib/data';
import { Society } from '@/lib/data';

const Index = () => {
  const [filteredSocieties, setFilteredSocieties] = useState<Society[]>(societies);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeFilters, setActiveFilters] = useState({
    region: 'All Regions',
    population: 'Any Population',
    income: 'Any Income'
  });
  const [activeSociety, setActiveSociety] = useState<Society | null>(null);

  // Apply filters and search
  useEffect(() => {
    let result = [...societies];
    
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        society => 
          society.name.toLowerCase().includes(searchLower) || 
          society.location.toLowerCase().includes(searchLower) ||
          society.organizer.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (activeCategory !== 'All Societies') {
      result = result.filter(society => society.category === activeCategory);
    }
    
    // Apply region filter
    if (activeFilters.region !== 'All Regions') {
      result = result.filter(society => 
        society.location.includes(activeFilters.region)
      );
    }
    
    // Apply population filter
    if (activeFilters.population !== 'Any Population') {
      // Very simple filtering logic for demonstration
      const popNumberOnly = society => 
        parseFloat(society.population.replace(/[^0-9.]/g, ''));
      
      if (activeFilters.population === 'Under 500K') {
        result = result.filter(society => popNumberOnly(society) < 0.5);
      } else if (activeFilters.population === '500K - 1M') {
        result = result.filter(society => 
          popNumberOnly(society) >= 0.5 && popNumberOnly(society) <= 1
        );
      } else if (activeFilters.population === '1M - 5M') {
        result = result.filter(society => 
          popNumberOnly(society) > 1 && popNumberOnly(society) <= 5
        );
      } else if (activeFilters.population === 'Over 5M') {
        result = result.filter(society => popNumberOnly(society) > 5);
      }
    }
    
    // Apply income filter - similar simplified logic
    if (activeFilters.income !== 'Any Income') {
      const incomeNumberOnly = society => 
        parseFloat(society.income.replace(/[^0-9.]/g, ''));
      
      if (activeFilters.income === 'Under $30K') {
        result = result.filter(society => incomeNumberOnly(society) < 30);
      } else if (activeFilters.income === '$30K - $50K') {
        result = result.filter(society => 
          incomeNumberOnly(society) >= 30 && incomeNumberOnly(society) <= 50
        );
      } else if (activeFilters.income === '$50K - $70K') {
        result = result.filter(society => 
          incomeNumberOnly(society) > 50 && incomeNumberOnly(society) <= 70
        );
      } else if (activeFilters.income === 'Over $70K') {
        result = result.filter(society => incomeNumberOnly(society) > 70);
      }
    }
    
    setFilteredSocieties(result);
  }, [searchTerm, activeCategory, activeFilters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleCardClick = (society: Society) => {
    setActiveSociety(society);
  };

  const handleMarkerClick = (society: Society) => {
    setActiveSociety(society);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col pt-[72px]">
        <SearchFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />
        
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        {/* Mapbox Globe visualization replacing the previous GlobeVisualization */}
        <div className="w-full px-6 pt-6">
          <div className="h-[400px] w-full rounded-xl overflow-hidden">
            <MapboxGlobe 
              societies={societies} 
              activeSociety={activeSociety} 
              onMarkerClick={handleMarkerClick} 
            />
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <h2 className="text-lg font-semibold mb-4">
            {filteredSocieties.length} Societies Found
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSocieties.length > 0 ? (
              filteredSocieties.map((society) => (
                <SocietyCard 
                  key={society.id} 
                  society={society} 
                  onClick={() => handleCardClick(society)} 
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center bg-muted/30 rounded-xl py-10">
                <p className="text-muted-foreground">No societies match your criteria</p>
                <button 
                  className="mt-2 text-primary text-sm"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory(categories[0]);
                    setActiveFilters({
                      region: 'All Regions',
                      population: 'Any Population',
                      income: 'Any Income'
                    });
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
