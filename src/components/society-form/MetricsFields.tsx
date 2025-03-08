
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

interface MetricsFieldsProps {
  form: UseFormReturn<FormSchema>;
}

const MetricsFields = ({ form }: MetricsFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default MetricsFields;
