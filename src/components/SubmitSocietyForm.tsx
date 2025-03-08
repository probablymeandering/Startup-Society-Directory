
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Society, categories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  population: z.string().min(1, { message: 'Population is required' }),
  income: z.string().min(1, { message: 'Income is required' }),
  footprint: z.string().min(1, { message: 'Footprint is required' }),
  location: z.string().min(2, { message: 'Location is required' }),
  established: z.string().min(1, { message: 'Establishment date is required' }),
  organizer: z.string().min(2, { message: 'Organizer is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  coordinates: z.string().refine(
    (value) => {
      const parts = value.split(',').map(part => parseFloat(part.trim()));
      return parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])
        && parts[0] >= -180 && parts[0] <= 180
        && parts[1] >= -90 && parts[1] <= 90;
    },
    { message: 'Enter valid coordinates (longitude,latitude) e.g. "10.5,25.3"' }
  ),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
});

type FormSchema = z.infer<typeof formSchema>;

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
      category: categories[1], // Default to first real category (skip "All Societies")
      coordinates: '',
      description: '',
    },
  });

  const handleSubmit = (data: FormSchema) => {
    try {
      // Parse coordinates from string to number array
      const coordinateParts = data.coordinates.split(',').map(part => parseFloat(part.trim()));
      
      // Create a new society object
      const newSociety: Society = {
        id: Date.now().toString(), // Simple ID generation
        name: data.name,
        population: data.population,
        income: data.income,
        footprint: data.footprint,
        location: data.location,
        established: data.established,
        organizer: data.organizer,
        category: data.category,
        coordinates: [coordinateParts[0], coordinateParts[1]],
        description: data.description,
      };
      
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Society Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New Tech Society" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="population"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Population</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1.2M" {...field} />
                  </FormControl>
                  <FormDescription>
                    Population size with unit (K, M)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Income</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $65K avg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="footprint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footprint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 480 sq km" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Central Europe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="established"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Mar 10, 2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Future Builders" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinates</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 10.5,51.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter as "longitude,latitude"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="A brief description of the society..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Society
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitSocietyForm;
