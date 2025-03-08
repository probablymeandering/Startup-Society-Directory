
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import SubmitSocietyForm from './SubmitSocietyForm';
import { Society } from '@/lib/data';

interface SubmitSocietyDialogProps {
  onSubmit: (society: Society) => void;
}

const SubmitSocietyDialog = ({ onSubmit }: SubmitSocietyDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (society: Society) => {
    onSubmit(society);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg py-2 px-4 text-sm font-medium">
          <PlusIcon className="h-4 w-4" />
          <span>Submit Society</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <SubmitSocietyForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default SubmitSocietyDialog;
