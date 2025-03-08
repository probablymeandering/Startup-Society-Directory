
import React from 'react';
import { Society } from '@/lib/data';

interface GlobeVisualizationProps {
  societies: Society[];
  activeSociety: Society | null;
  onMarkerClick: (society: Society) => void;
}

const GlobeVisualization = ({ 
  societies, 
  activeSociety,
  onMarkerClick 
}: GlobeVisualizationProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-secondary to-background rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4KICAgICAgaWQ9InBhdHRlcm4iCiAgICAgIHdpZHRoPSIzMCIKICAgICAgaGVpZ2h0PSIzMCIKICAgICAgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSIKICAgID4KICAgICAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgxNDcsIDE5NywgMjUzLCAwLjA1KSIgLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]"></div>
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 animate-rotate-globe animate-pulse-slow"></div>
      
      {/* Continent Silhouettes */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] max-w-[500px] max-h-[500px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIwMCAxNTBDMjAwIDE1MCAyNTAgMTIwIDMwMCAxNTBDMzUwIDE4MCAzNzAgMjUwIDM3MCAyNTBDMzcwIDI1MCAzNDAgMzAwIDMwMCAzMTBDMjYwIDMyMCAyMzAgMzAwIDIwMCAyOTBDMTcwIDI4MCAxNTAgMjQwIDE1MCAyNDBDMTUwIDI0MCAxNzAgMTkwIDIwMCAxNTBaIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDUpIi8+CiAgPHBhdGggZD0iTTEwMCAyMDBDMTAwIDIwMCAxMzAgMTgwIDE1MCAyMDBDMTcwIDIyMCAxODAgMjcwIDE4MCAyNzBDMTgwIDI3MCAxNjAgMzAwIDE0MCAzMTBDMTIwIDMyMCAxMDAgMzEwIDgwIDMwMEM2MCAyOTAgNTAgMjYwIDUwIDI2MEM1MCAyNjAgNzAgMjIwIDEwMCAyMDBaIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDUpIi8+CiAgPHBhdGggZD0iTTMwMCAzMzBDMzAwIDMzMCAzNDAgMzEwIDM2MCAzMzBDMzgwIDM1MCAzOTAgNDAwIDM5MCA0MDBDMzkwIDQwMCAzNzAgNDMwIDM1MCA0NDBDMzMwIDQ1MCAzMTAgNDQwIDI5MCA0MzBDMjcwIDQyMCAyNjAgMzkwIDI2MCAzOTBDMjYwIDM5MCAyODAgMzUwIDMwMCAzMzBaIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDUpIi8+Cjwvc3ZnPg==')] bg-no-repeat bg-contain opacity-50 animate-rotate-globe"></div>
      
      {/* Society Location Markers */}
      {societies.map((society) => {
        const [longitude, latitude] = society.coordinates;
        
        // Convert lat/long to x/y positions on the globe
        // This is a simplified representation, consider a proper mapping library for accuracy
        const radius = 30; // vh units
        const phi = (90 - latitude) * (Math.PI / 180);
        const theta = (longitude + 180) * (Math.PI / 180);
        
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = -radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        // Only show points on the front half of the globe (z > 0)
        const scale = z > -10 ? Math.max(0.3, (z + 10) / 20) : 0;
        const isActive = activeSociety?.id === society.id;
        
        return (
          <div
            key={society.id}
            className={`absolute left-1/2 top-1/2 h-3 w-3 -ml-1.5 -mt-1.5 rounded-full bg-primary transition-all ${
              isActive ? 'h-4 w-4 -ml-2 -mt-2 ring-4 ring-primary/20' : 'hover:h-4 hover:w-4 hover:-ml-2 hover:-mt-2'
            }`}
            style={{
              transform: `translate(${x}vh, ${y}vh) scale(${scale})`,
              opacity: scale,
              zIndex: Math.floor(z * 10),
              cursor: 'pointer',
            }}
            onClick={() => onMarkerClick(society)}
          />
        );
      })}
      
      {/* Active society info popup */}
      {activeSociety && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md glass p-4 rounded-xl shadow-lg animate-in">
          <h3 className="font-semibold text-lg">{activeSociety.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{activeSociety.description}</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Population</span>
              <span className="text-sm font-medium text-primary">{activeSociety.population}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Income</span>
              <span className="text-sm font-medium text-primary">{activeSociety.income}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Footprint</span>
              <span className="text-sm font-medium text-primary">{activeSociety.footprint}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeVisualization;
