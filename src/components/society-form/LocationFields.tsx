
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from './FormSchema';

interface LocationFieldsProps {
  form: UseFormReturn<FormSchema>;
}

const LocationFields = ({ form }: LocationFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default LocationFields;
