
import React from 'react';
import { Society } from '@/lib/data';
import { Users, DollarSign, MapPin, Calendar, User } from 'lucide-react';

interface SocietyCardProps {
  society: Society;
  onClick: () => void;
}

const SocietyCard = ({ society, onClick }: SocietyCardProps) => {
  return (
    <div 
      className="glass-card p-4 rounded-xl transition-all hover:shadow-md hover:translate-y-[-2px] cursor-pointer animate-in"
      onClick={onClick}
      style={{ animationDelay: `${parseInt(society.id) * 50}ms` }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-foreground text-lg">{society.name}</h3>
          <span className="text-xs font-medium px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
            {society.category}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm text-primary font-medium">Pop: {society.population}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm text-primary font-medium">Income: {society.income}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm text-primary font-medium">Footprint: {society.footprint}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{society.location}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Est: {society.established}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 mt-1">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">By {society.organizer}</span>
        </div>
      </div>
    </div>
  );
};

export default SocietyCard;
