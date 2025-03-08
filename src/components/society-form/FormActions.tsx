
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions = ({ onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel} className="font-medium">
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-2 font-medium"
      >
        Submit Society
      </Button>
    </div>
  );
};

export default FormActions;
