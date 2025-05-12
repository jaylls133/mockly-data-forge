
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-mockly-light to-white">
        <div className="mockly-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-mockly-purple bg-opacity-10 text-mockly-purple text-sm font-medium">
                <span>Fake Data Generator</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-mockly-slate">
                Generate Realistic Mock Data in Seconds
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Create custom datasets with realistic names, emails, addresses and more for your applications, testing, or demos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="mockly-button-primary">
                  <Link to="/generator" className="flex items-center gap-2">
                    Start Generating
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/templates">Browse Templates</Link>
                </Button>
              </div>
            </div>
            <div className="order-first lg:order-last flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-mockly-purple opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-mockly-teal opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="p-4 bg-gray-50 border-b flex items-center gap-2">
                    <Database className="h-5 w-5 text-mockly-purple" />
                    <span className="font-medium">Mockly Generator</span>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="h-8 bg-gray-100 rounded w-full"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-8 bg-gray-100 rounded"></div>
                        <div className="h-8 bg-gray-100 rounded"></div>
                      </div>
                      <div className="h-40 bg-gray-100 rounded"></div>
                      <div className="h-10 bg-mockly-purple rounded w-40"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mockly-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mockly-slate mb-4">Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to generate and manage realistic mock data for your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-12 w-12 bg-mockly-purple bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-mockly-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-mockly-slate">Custom Fields</h3>
              <p className="text-gray-600">
                Create datasets with exactly the fields you need - names, emails, addresses, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-12 w-12 bg-mockly-teal bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-mockly-teal">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-mockly-slate">Export Options</h3>
              <p className="text-gray-600">
                Download your data as CSV, JSON, or just copy to clipboard with a single click.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-12 w-12 bg-mockly-slate bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-mockly-slate">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-mockly-slate">Save Templates</h3>
              <p className="text-gray-600">
                Save your favorite configurations as templates for quick access in future sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-mockly-purple to-mockly-slate text-white">
        <div className="mockly-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to generate some data?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Create custom fake data for your projects in seconds. No signup required.
          </p>
          <Button asChild size="lg" className="bg-white text-mockly-purple hover:bg-gray-100">
            <Link to="/generator" className="flex items-center gap-2">
              Start Generating
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
