
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form";
import { Society } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import refactored components and schema
import { formSchema, FormSchema, createSocietyFromFormData } from './society-form/FormSchema';
import BasicInfoFields from './society-form/BasicInfoFields';
import MetricsFields from './society-form/MetricsFields';
import LocationFields from './society-form/LocationFields';
import DescriptionField from './society-form/DescriptionField';
import FormActions from './society-form/FormActions';

interface SubmitSocietyFormProps {
  onSubmit: (society: Society) => void;
  onCancel: () => void;
}

const SubmitSocietyForm = ({ onSubmit, onCancel }: SubmitSocietyFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      population: '',
      income: '',
      footprint: '',
      location: '',
      established: '',
      organizer: '',
      category: 'Emerging Societies', // Default to first real category (skip "All Societies")
      coordinates: '',
      description: '',
    },
  });

  const handleSubmit = (data: FormSchema) => {
    try {
      const newSociety = createSocietyFromFormData(data);
      
      onSubmit(newSociety);
      
      toast({
        title: "Society Submitted",
        description: `${data.name} has been successfully added.`,
      });
      
      // Reset form after submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem adding your society.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full bg-background rounded-lg">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-background z-10">
        <h2 className="text-xl font-bold">Submit a New Society</h2>
        <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <BasicInfoFields form={form} />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Metrics</h3>
                <MetricsFields form={form} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Location Details</h3>
                <LocationFields form={form} />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Description</h3>
                <DescriptionField form={form} />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <FormActions onCancel={onCancel} />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubmitSocietyForm;
