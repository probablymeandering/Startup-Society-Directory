
import React from 'react';

interface KeyInsightsProps {
  visualizationType: string;
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ visualizationType }) => {
  return (
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
  );
};

export default KeyInsights;
