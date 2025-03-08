
import React, { useState } from 'react';
import { Society, societies } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitCompare, Users, Search, ArrowLeftRight } from 'lucide-react';
import SocietyCard from '@/components/SocietyCard';
import SocietyComparison from '@/components/stats/SocietyComparison';

const Stats = () => {
  const [selectedSocieties, setSelectedSocieties] = useState<Society[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('similar-population');

  // Function to find similar societies based on different criteria
  const getSimilarSocieties = (criteria: string): Society[] => {
    switch (criteria) {
      case 'similar-population':
        return societies.slice().sort((a, b) => {
          const popA = parseFloat(a.population.replace(/[^0-9.]/g, ''));
          const popB = parseFloat(b.population.replace(/[^0-9.]/g, ''));
          return Math.abs(popB - popA);
        });
      case 'similar-income':
        return societies.slice().sort((a, b) => {
          const incomeA = parseFloat(a.income.replace(/[^0-9.]/g, ''));
          const incomeB = parseFloat(b.income.replace(/[^0-9.]/g, ''));
          return Math.abs(incomeB - incomeA);
        });
      case 'geographic-proximity':
        return societies.slice().sort((a, b) => {
          // Simple distance calculation based on coordinates
          const [lat1, lon1] = [0, 0]; // Center point (can be changed)
          const [lat2, lon2] = a.coordinates;
          const [lat3, lon3] = b.coordinates;
          
          const distA = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
          const distB = Math.sqrt(Math.pow(lat3 - lat1, 2) + Math.pow(lon3 - lon1, 2));
          
          return distA - distB;
        });
      default:
        return societies;
    }
  };

  const handleSocietySelect = (society: Society) => {
    if (selectedSocieties.find(s => s.id === society.id)) {
      setSelectedSocieties(selectedSocieties.filter(s => s.id !== society.id));
    } else {
      // Limit to 3 societies for comparison
      if (selectedSocieties.length < 3) {
        setSelectedSocieties([...selectedSocieties, society]);
      }
    }
  };

  const handleCompare = () => {
    if (selectedSocieties.length >= 2) {
      setIsCompareModalOpen(true);
    }
  };

  const isSocietySelected = (society: Society) => {
    return !!selectedSocieties.find(s => s.id === society.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-[72px] pb-16">
        <div className="container px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Society Statistics</h1>
          
          {/* Selected Societies for Comparison */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-primary" />
                Society Comparison
              </CardTitle>
              <CardDescription>
                Select up to 3 societies to compare their metrics side by side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                {selectedSocieties.length > 0 ? (
                  selectedSocieties.map(society => (
                    <div key={society.id} className="flex items-center gap-2 bg-accent/50 rounded-lg px-3 py-2">
                      <span>{society.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => handleSocietySelect(society)}
                      >
                        ×
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No societies selected yet. Choose from the lists below.</p>
                )}
              </div>
              
              <Button 
                variant="default" 
                onClick={handleCompare} 
                disabled={selectedSocieties.length < 2}
                className="gap-2"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Compare Selected Societies
              </Button>
            </CardContent>
          </Card>
          
          {/* Similar Societies Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Related Societies
              </CardTitle>
              <CardDescription>
                Find societies with similar characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="similar-population" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="similar-population">Similar Population</TabsTrigger>
                  <TabsTrigger value="similar-income">Similar Income</TabsTrigger>
                  <TabsTrigger value="geographic-proximity">Geographic Proximity</TabsTrigger>
                </TabsList>
                
                {['similar-population', 'similar-income', 'geographic-proximity'].map(tab => (
                  <TabsContent key={tab} value={tab} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getSimilarSocieties(tab).slice(0, 6).map(society => (
                        <div key={society.id} className="relative">
                          {isSocietySelected(society) && (
                            <div className="absolute inset-0 bg-primary/10 rounded-xl z-10 flex items-center justify-center">
                              <span className="bg-background px-3 py-1 rounded-full text-sm font-medium">
                                Selected
                              </span>
                            </div>
                          )}
                          
                          <div className="flex flex-col h-full" onClick={() => handleSocietySelect(society)}>
                            <SocietyCard society={society} onClick={() => {}} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Comparison Modal */}
      <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Society Comparison</DialogTitle>
            <DialogDescription>
              Comparing metrics between {selectedSocieties.map(s => s.name).join(', ')}
            </DialogDescription>
          </DialogHeader>
          
          <SocietyComparison societies={selectedSocieties} />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Stats;
