
import React from 'react';
import { Society } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Camera, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface SocietyGalleryProps {
  society: Society;
}

const SocietyGallery = ({ society }: SocietyGalleryProps) => {
  // Generate placeholder images based on society characteristics
  // In a real app, these would be actual images from a database or API
  const generateImageUrl = (type: string, index: number): string => {
    // Create deterministic but different image for each society
    const seed = parseInt(society.id) + index;
    
    let category = '';
    if (society.category === 'Tech Hubs') category = 'city';
    else if (society.category === 'Eco-Communities') category = 'nature';
    else category = 'architecture';
    
    // Use unsplash source for placeholder images
    return `https://source.unsplash.com/featured/800x600?${category},${type}&sig=${seed}`;
  };
  
  // Generate a set of gallery images with captions
  const galleryImages = [
    {
      src: generateImageUrl('aerial', 1),
      caption: "Aerial view of " + society.name,
      location: "Central District"
    },
    {
      src: generateImageUrl('street', 2),
      caption: "Street level perspective",
      location: "Main Avenue"
    },
    {
      src: generateImageUrl('building', 3),
      caption: "Landmark architecture",
      location: "Innovation Quarter"
    },
    {
      src: generateImageUrl('people', 4),
      caption: "Community gathering",
      location: "Community Center"
    },
    {
      src: generateImageUrl('landscape', 5),
      caption: "Surrounding landscape",
      location: "Outskirts"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="mr-2 h-5 w-5" />
            {society.name} Gallery
          </CardTitle>
          <CardDescription>
            Visual exploration of the society
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src={image.src} 
                        alt={image.caption} 
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="p-3 bg-card/90 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Camera className="h-4 w-4 text-primary" />
                          <span className="font-medium">{image.caption}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{image.location}, {society.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img 
              src={image.src} 
              alt={image.caption} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocietyGallery;
