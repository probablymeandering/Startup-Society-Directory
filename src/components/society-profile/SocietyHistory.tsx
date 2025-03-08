
import React from 'react';
import { Society } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Calendar, Milestone, TrendingUp, Flag } from 'lucide-react';

interface SocietyHistoryProps {
  society: Society;
}

// Custom milestone icon
const Milestone = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/>
    <path d="M12 13v8"/>
    <path d="M12 3v3"/>
  </svg>
);

const SocietyHistory = ({ society }: SocietyHistoryProps) => {
  // Parse establishment date
  const established = new Date(society.established);
  const establishedYear = established.getFullYear();
  const currentYear = new Date().getFullYear();
  
  // Generate fictional milestones based on society data
  const milestones = [
    {
      year: establishedYear,
      title: "Society Foundation",
      description: `${society.name} was established by ${society.organizer} in ${society.location}.`,
    },
    {
      year: establishedYear + 1,
      title: "Initial Growth Phase",
      description: `Population reached ${parseInt(society.population) * 0.3}${society.population.includes('M') ? 'M' : 'K'} residents.`,
    },
    {
      year: establishedYear + 2,
      title: "Infrastructure Development",
      description: `Major infrastructure projects covering ${parseInt(society.footprint) * 0.5} sq km were completed.`,
    },
    {
      year: establishedYear + 3,
      title: "Economic Milestone",
      description: `Average income reached ${parseInt(society.income) * 0.7}K, showing strong economic development.`,
    }
  ];
  
  // Population growth data for the chart
  const growthData = Array.from({ length: 5 }, (_, i) => {
    const yearOffset = i;
    const popValue = parseFloat(society.population.replace(/[^0-9.]/g, ''));
    const multiplier = society.population.includes('M') ? 1000000 : 1000;
    
    // Create a growth curve that starts slow, accelerates, then stabilizes
    let growthFactor;
    if (i <= 1) growthFactor = 0.3 + (i * 0.2); // Slower initial growth
    else if (i <= 3) growthFactor = 0.5 + (i * 0.15); // Accelerating middle growth
    else growthFactor = 0.9 + (i * 0.025); // Stabilizing later growth
    
    return {
      year: establishedYear + yearOffset,
      population: Math.round(popValue * multiplier * growthFactor),
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            History of {society.name}
          </CardTitle>
          <CardDescription>
            Established {society.established} by {society.organizer}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border-l-2 border-muted pl-6 pb-2 space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
                <div className="mb-1 text-sm text-muted-foreground">
                  <Calendar className="inline-block mr-1 h-3.5 w-3.5" />
                  {milestone.year}
                </div>
                <h3 className="text-base font-semibold">{milestone.title}</h3>
                <p className="mt-1 text-muted-foreground">{milestone.description}</p>
              </div>
            ))}
            
            {/* Current status */}
            <div className="relative">
              <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
              <div className="mb-1 text-sm text-muted-foreground">
                <Calendar className="inline-block mr-1 h-3.5 w-3.5" />
                {currentYear}
              </div>
              <h3 className="text-base font-semibold">Current Status</h3>
              <p className="mt-1 text-muted-foreground">
                {society.name} has grown to a population of {society.population} with an average income of {society.income} and a footprint of {society.footprint}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Growth and Development
          </CardTitle>
          <CardDescription>
            Key growth metrics since establishment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Population Growth</h3>
              <div className="space-y-3">
                {growthData.map((data, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{data.year}</span>
                      <span className="text-sm text-muted-foreground">
                        {data.population >= 1000000 
                          ? `${(data.population / 1000000).toFixed(1)}M` 
                          : `${(data.population / 1000).toFixed(1)}K`}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ 
                          width: `${(data.population / growthData[growthData.length - 1].population) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Development Phases</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flag className="h-4 w-4 text-primary" />
                    <span className="font-medium">Founding Phase</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Initial establishment and foundation building by {society.organizer}.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flag className="h-4 w-4 text-primary" />
                    <span className="font-medium">Growth Phase</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rapid expansion of population and infrastructure development.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flag className="h-4 w-4 text-primary" />
                    <span className="font-medium">Stabilization Phase</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Economic growth and community development focus.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flag className="h-4 w-4 text-primary" />
                    <span className="font-medium">Current Phase</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {society.category === 'Tech Hubs' 
                      ? 'Technology innovation and digital infrastructure expansion.'
                      : society.category === 'Eco-Communities'
                      ? 'Sustainable development and environmental stewardship.'
                      : 'Community growth and cultural development.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocietyHistory;
