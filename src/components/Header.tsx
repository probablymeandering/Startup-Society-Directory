
import React from 'react';
import { Button } from '@/components/ui/button';
import SubmitSocietyDialog from './SubmitSocietyDialog';
import { Society } from '@/lib/data';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSubmitSociety?: (society: Society) => void;
}

const Header = ({ onSubmitSociety }: HeaderProps) => {
  return <header className="w-full glass fixed top-0 z-50 px-6 py-4 shadow-sm animate-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight">
            <Link to="/">
              <span className="text-primary">Startup</span> Societies
            </Link>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="nav-item active">Explore</Link>
          <Link to="/stats" className="nav-item">Stats</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          {onSubmitSociety && (
            <SubmitSocietyDialog onSubmit={onSubmitSociety} />
          )}
        </div>
      </div>
    </header>;
};

export default Header;
