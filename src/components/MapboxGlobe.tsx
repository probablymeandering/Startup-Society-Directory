
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Society } from '@/lib/data';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicHJvYmFibHltZWFuZGVyaW5nIiwiYSI6ImNtN3p1c3MxNjBwNWEycnNqbGhnYTBjeTIifQ.eAL86HreYl3njBfRYI2_yg';

interface MapboxGlobeProps {
  societies: Society[];
  activeSociety: Society | null;
  onMarkerClick: (society: Society) => void;
}

const MapboxGlobe: React.FC<MapboxGlobeProps> = ({ 
  societies, 
  activeSociety, 
  onMarkerClick 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map when the component mounts
  useEffect(() => {
    if (!mapContainer.current) return;

    // Only initialize the map once
    if (map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [0, 20],
        pitch: 45,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Disable scroll zoom for smoother experience
      map.current.scrollZoom.disable();

      // Auto rotation settings
      const secondsPerRevolution = 180;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
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

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        if (!map.current) return;

        map.current.setFog({
          color: 'rgb(20, 26, 41)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.5
        });
        
        setMapLoaded(true);
        spinGlobe();

        // Add markers once the style loads
        addMarkers();
      });

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        spinGlobe();
      });

      map.current.on('moveend', () => {
        spinGlobe();
      });

      // Start the rotation
      spinGlobe();
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Function to add markers
  const addMarkers = () => {
    if (!map.current || !societies.length) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for each society
    societies.forEach(society => {
      try {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'society-marker';
        markerEl.style.width = '12px';
        markerEl.style.height = '12px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = society.id === activeSociety?.id ? '#ffffff' : '#3b82f6';
        markerEl.style.border = '2px solid #ffffff';
        markerEl.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.6)';
        markerEl.style.cursor = 'pointer';
        markerEl.style.transition = 'all 0.3s ease';

        // Create marker
        const marker = new mapboxgl.Marker({
          element: markerEl,
          anchor: 'center'
        })
          .setLngLat(society.coordinates)
          .addTo(map.current!);

        // Add click event
        markerEl.addEventListener('click', () => {
          onMarkerClick(society);
        });

        // Store marker reference
        markersRef.current[society.id] = marker;
      } catch (error) {
        console.error(`Error creating marker for society ${society.id}:`, error);
      }
    });
  };

  // Update markers when societies or activeSociety changes
  useEffect(() => {
    if (mapLoaded && map.current) {
      addMarkers();
    }
  }, [societies, mapLoaded, activeSociety]);

  // Highlight active society
  useEffect(() => {
    if (!mapLoaded || !activeSociety || !map.current) return;

    try {
      // Zoom to active society
      map.current.flyTo({
        center: activeSociety.coordinates,
        zoom: 4,
        duration: 2000,
        essential: true
      });

      // Update marker styling
      Object.entries(markersRef.current).forEach(([id, marker]) => {
        const markerEl = marker.getElement();
        if (id === activeSociety.id) {
          markerEl.style.backgroundColor = '#ffffff';
          markerEl.style.width = '16px';
          markerEl.style.height = '16px';
          markerEl.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
        } else {
          markerEl.style.backgroundColor = '#3b82f6';
          markerEl.style.width = '12px';
          markerEl.style.height = '12px';
          markerEl.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.6)';
        }
      });
    } catch (error) {
      console.error('Error highlighting active society:', error);
    }
  }, [activeSociety, mapLoaded]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/20 rounded-xl" />
    </div>
  );
};

export default MapboxGlobe;
