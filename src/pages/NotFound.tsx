
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Database } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Database className="h-16 w-16 text-mockly-purple mb-6" />
        <h1 className="text-5xl font-bold mb-4 text-mockly-slate">404</h1>
        <h2 className="text-2xl font-medium mb-6 text-gray-600">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mockly-button-primary">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
