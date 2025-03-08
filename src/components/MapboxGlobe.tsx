
import React, { useEffect, useRef } from 'react';
import { Society } from '@/lib/data';
import { createClient } from '@/integrations/supabase/client';

interface MapboxGlobeProps {
  societies: Society[];
  activeSociety: Society | null;
  onMarkerClick: (society: Society) => void;
}

const MapboxGlobe = ({ societies, activeSociety, onMarkerClick }: MapboxGlobeProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const popupRef = useRef<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          return;
        }
        
        const mapboxToken = data?.token;
        
        if (!mapboxToken) {
          console.error('No Mapbox token found');
          return;
        }
        
        initializeMap(mapboxToken);
      } catch (error) {
        console.error('Failed to fetch Mapbox token:', error);
      }
    };
    
    const initializeMap = (mapboxToken: string) => {
      if (map.current) return; // Map already initialized
      if (!mapContainer.current) return; // No container to render into
      
      // Initialize Mapbox
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [0, 20],
        pitch: 45,
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );
      
      // Add atmosphere and fog
      map.current.on('style.load', () => {
        map.current.setFog({
          color: 'rgb(30, 30, 30)',
          'high-color': 'rgb(60, 60, 80)',
          'horizon-blend': 0.2,
        });
        
        // Add markers after style has loaded
        addMarkers();
      });
      
      // Globe rotation animation
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;
      
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }
      
      // Interaction handlers
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        setTimeout(spinGlobe, 1000);
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        setTimeout(spinGlobe, 1000);
      });
      
      map.current.on('moveend', () => {
        spinGlobe();
      });
      
      // Start spinning
      spinGlobe();
    };
    
    const addMarkers = () => {
      // Clear existing markers
      if (markers.current.length) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
      }
      
      // Add markers for each society
      societies.forEach(society => {
        const [longitude, latitude] = society.coordinates;
        
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'society-marker';
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = society.id === activeSociety?.id ? '#3b82f6' : '#6366f1';
        el.style.border = '2px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        el.style.transition = 'all 0.3s ease';
        
        // Create the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([longitude, latitude])
          .addTo(map.current);
        
        // Add click handler
        el.addEventListener('click', () => {
          onMarkerClick(society);
        });
        
        // Store marker reference
        markers.current.push(marker);
      });
    };
    
    // Initialize everything
    fetchMapboxToken();
    
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (markers.current.length) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
      }
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    };
  }, [societies]); // Only re-run when societies change
  
  // Update when active society changes
  useEffect(() => {
    if (!map.current) return;
    
    // Update marker styles
    markers.current.forEach(marker => {
      const el = marker.getElement();
      const society = societies.find(s => 
        s.coordinates[0] === marker.getLngLat().lng && 
        s.coordinates[1] === marker.getLngLat().lat
      );
      
      if (society) {
        el.style.backgroundColor = society.id === activeSociety?.id ? '#3b82f6' : '#6366f1';
        el.style.width = society.id === activeSociety?.id ? '18px' : '14px';
        el.style.height = society.id === activeSociety?.id ? '18px' : '14px';
      }
    });
    
    // Fly to active society
    if (activeSociety) {
      const [longitude, latitude] = activeSociety.coordinates;
      map.current.flyTo({
        center: [longitude, latitude],
        zoom: 3,
        duration: 1500,
        essential: true
      });
      
      // Show popup for active society
      if (popupRef.current) {
        popupRef.current.remove();
      }
      
      popupRef.current = new mapboxgl.Popup({ closeButton: false, className: 'society-popup' })
        .setLngLat([longitude, latitude])
        .setHTML(`
          <div class="font-medium text-sm">${activeSociety.name}</div>
          <div class="text-xs text-muted-foreground">${activeSociety.location}</div>
        `)
        .addTo(map.current);
    }
  }, [activeSociety, societies]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/20 rounded-xl" />
      
      {!map.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default MapboxGlobe;
