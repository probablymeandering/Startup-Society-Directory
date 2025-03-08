
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Society, societies } from '@/lib/data';

interface SimilarSocietiesProps {
  type: 'population' | 'income' | 'location';
}

const SimilarSocieties: React.FC<SimilarSocietiesProps> = ({ type }) => {
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

export default SimilarSocieties;
