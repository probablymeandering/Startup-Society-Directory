
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Society } from '@/lib/data';

interface SocietySelectorProps {
  societies: Society[];
  selectedSocieties: string[];
  toggleSocietySelection: (id: string) => void;
  showAlert: boolean;
}

const SocietySelector: React.FC<SocietySelectorProps> = ({
  societies,
  selectedSocieties,
  toggleSocietySelection,
  showAlert
}) => {
  return (
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
  );
};

export default SocietySelector;
