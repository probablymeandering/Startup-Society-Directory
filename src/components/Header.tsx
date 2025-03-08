
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const Header = () => {
  return <header className="w-full glass fixed top-0 z-50 px-6 py-4 shadow-sm animate-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-primary">SOCIETY</span> INSIGHTS
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#" className="nav-item active">Topics</a>
          <a href="#" className="nav-item">Map</a>
          <a href="#" className="nav-item">Stats</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg py-2 px-4 text-sm font-medium">
            <PlusIcon className="h-4 w-4" />
            <span>Submit Society</span>
          </Button>
        </div>
      </div>
    </header>;
};

export default Header;
