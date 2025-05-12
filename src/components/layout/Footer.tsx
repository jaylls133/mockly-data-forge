
import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-8 mt-16">
      <div className="mockly-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-mockly-slate">Mockly</h3>
            <p className="text-gray-600">
              Generate realistic mock data instantly for your applications, testing, or demos.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-mockly-slate">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-mockly-purple">Home</Link>
              </li>
              <li>
                <Link to="/generator" className="text-gray-600 hover:text-mockly-purple">Generator</Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-600 hover:text-mockly-purple">Templates</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-mockly-purple">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-mockly-slate">Connect</h3>
            <div className="flex items-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mockly-purple">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {year} Mockly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
