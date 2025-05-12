
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database, Home, FileText, Info } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="mockly-container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-mockly-purple" />
          <span className="text-xl font-bold text-mockly-slate">Mockly</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-mockly-purple flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/generator" className="text-gray-600 hover:text-mockly-purple flex items-center gap-1">
            <Database className="h-4 w-4" />
            <span>Generator</span>
          </Link>
          <Link to="/templates" className="text-gray-600 hover:text-mockly-purple flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Templates</span>
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-mockly-purple flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>About</span>
          </Link>
        </div>

        <div className="md:hidden">
          {/* Mobile menu button - implement dropdown in the future */}
          <Button variant="ghost" size="icon">
            <span className="sr-only">Open menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
