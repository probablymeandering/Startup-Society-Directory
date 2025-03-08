
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const NoSocietySelected: React.FC = () => {
  return (
    <Card className="p-8 text-center">
      <div className="mb-4 text-amber-500">
        <AlertCircle className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Societies Selected</h3>
      <p className="text-muted-foreground mb-4">
        Please select at least one society from the list above to view analysis and visualizations.
      </p>
    </Card>
  );
};

export default NoSocietySelected;
