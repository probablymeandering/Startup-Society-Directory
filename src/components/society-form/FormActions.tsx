
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions = ({ onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="px-6"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="bg-black text-white hover:bg-black/90 px-6"
      >
        Submit Society
      </Button>
    </div>
  );
};

export default FormActions;
