
import { z } from 'zod';
import { Society } from '@/lib/data';

// Form schema for validation
export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  population: z.string().min(1, { message: 'Population is required' })
    .refine(value => {
      // Extract numeric part and validate between 2,000 and 100,000
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const unit = value.replace(/[0-9.]/g, '').trim();
      
      if (unit.toLowerCase() === 'k') {
        return numericValue >= 2 && numericValue <= 100;
      } else {
        return numericValue >= 2000 && numericValue <= 100000;
      }
    }, { message: 'Population must be between 2,000 and 100,000' }),
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

export type FormSchema = z.infer<typeof formSchema>;

export const createSocietyFromFormData = (data: FormSchema): Society => {
  // Parse coordinates from string to number array
  const coordinateParts = data.coordinates.split(',').map(part => parseFloat(part.trim()));
  
  // Create a new society object
  return {
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
};
