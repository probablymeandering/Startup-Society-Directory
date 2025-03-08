
import React, { useEffect, useRef, useState } from 'react';
import { Society } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Map as MapIcon } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use the same Mapbox token from MapboxGlobe
mapboxgl.accessToken = 'pk.eyJ1IjoicHJvYmFibHltZWFuZGVyaW5nIiwiYSI6ImNtN3p1c3MxNjBwNWEycnNqbGhnYTBjeTIifQ.eAL86HreYl3njBfRYI2_yg';

interface SocietyMapProps {
  society: Society;
}

const SocietyMap = ({ society }: SocietyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Calculate a bounding box around the society's location
  // This is fictional since we don't have actual boundaries
  const boundaryRadius = Math.sqrt(parseFloat(society.footprint.replace(/[^0-9.]/g, ''))) / 20;
  
  // Society center coordinates
  const [lng, lat] = society.coordinates;
  
  // Initialize map
  useEffect(() => {
    if (map.current) return;
    
    if (!mapContainer.current) {
      console.error('Map container ref is null');
      return;
    }
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 10,
        pitch: 45,
        bearing: 0
      });
      
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      
      // Add a scale control
      map.current.addControl(new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      }), 'bottom-left');
      
      map.current.on('style.load', () => {
        if (!map.current) return;
        
        // Add society marker
        const marker = new mapboxgl.Marker({ color: '#000000' })
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${society.name}</h3><p>${society.location}</p>`))
          .addTo(map.current);
        
        // Generate a fictional boundary circle
        map.current.addSource('society-area', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                // Create a rough circle of points around the center
                Array.from({ length: 64 }, (_, i) => {
                  const angle = (i / 64) * (Math.PI * 2);
                  return [
                    lng + Math.cos(angle) * boundaryRadius,
                    lat + Math.sin(angle) * boundaryRadius
                  ];
                })
              ]
            },
            properties: {}
          }
        });
        
        // Add a fill layer for the society area
        map.current.addLayer({
          id: 'society-area-fill',
          type: 'fill',
          source: 'society-area',
          paint: {
            'fill-color': '#000000',
            'fill-opacity': 0.1
          }
        });
        
        // Add an outline for the society area
        map.current.addLayer({
          id: 'society-area-outline',
          type: 'line',
          source: 'society-area',
          paint: {
            'line-color': '#000000',
            'line-width': 2,
            'line-dasharray': [3, 3]
          }
        });
        
        setLoaded(true);
      });
      
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
    }
  }, [lng, lat, boundaryRadius, society.name, society.location]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            {society.name} Location
          </CardTitle>
          <CardDescription>
            Geographic location and boundaries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full rounded-md overflow-hidden">
            <div ref={mapContainer} className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapIcon className="mr-2 h-5 w-5" />
            Geographic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Location Details</h3>
              <p className="text-muted-foreground mb-1">Region: {society.location}</p>
              <p className="text-muted-foreground mb-1">Coordinates: {society.coordinates[0].toFixed(4)}, {society.coordinates[1].toFixed(4)}</p>
              <p className="text-muted-foreground">Area Coverage: {society.footprint}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Terrain & Climate</h3>
              <p className="text-muted-foreground mb-1">
                {society.category === 'Tech Hubs' 
                  ? 'Urban and developed terrain with modern infrastructure.' 
                  : society.category === 'Eco-Communities' 
                  ? 'Natural landscapes with sustainable development patterns.'
                  : 'Mixed urban and natural environment.'}
              </p>
              <p className="text-muted-foreground">
                {society.location.includes('North') 
                  ? 'Northern climate with seasonal variations.' 
                  : society.location.includes('South') 
                  ? 'Southern climate with warm temperatures.'
                  : 'Temperate climate with moderate conditions.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocietyMap;
