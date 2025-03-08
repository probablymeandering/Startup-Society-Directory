
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
    <div className="max-w-3xl mx-auto p-6 bg-card rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Submit a New Society</h2>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <BasicInfoFields form={form} />
            <MetricsFields form={form} />
            <LocationFields form={form} />
          </div>
          
          <DescriptionField form={form} />
          
          <FormActions onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
};

export default SubmitSocietyForm;
