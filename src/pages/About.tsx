
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="mockly-container py-8">
        <h1 className="text-3xl font-bold mb-6 text-mockly-slate">About Mockly</h1>

        <div className="max-w-3xl">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-mockly-slate">What is Mockly?</h2>
            <p className="text-gray-700 mb-4">
              Mockly is a powerful fake data generator built for developers, testers, and designers who need realistic data for their projects. Whether you're building a prototype, testing an application, or just need placeholder content, Mockly helps you generate customized mock data in seconds.
            </p>
            <p className="text-gray-700">
              With an intuitive interface and flexible options, you can create exactly the data you need without any hassle.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-mockly-slate">Who is it for?</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-lg mb-2">Developers</h3>
                <p className="text-gray-700">
                  Generate test data for your applications quickly, without having to write custom scripts or use complicated APIs.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-lg mb-2">Designers</h3>
                <p className="text-gray-700">
                  Create realistic content for your UI/UX designs and prototypes, so your mockups look authentic.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-lg mb-2">QA Engineers</h3>
                <p className="text-gray-700">
                  Get consistent test data for your quality assurance processes and testing scenarios.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-lg mb-2">Data Analysts</h3>
                <p className="text-gray-700">
                  Create sample datasets for testing your data processing and visualization workflows.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-mockly-slate">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Generate various types of fake data: names, emails, addresses, phone numbers, and more</li>
              <li>Customize the number of records and which fields to include</li>
              <li>Export data in multiple formats (CSV, JSON)</li>
              <li>Save templates for frequent use cases</li>
              <li>Simple, intuitive interface with instant preview</li>
              <li>No account required - works right in your browser</li>
              <li>Completely free and open source</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-mockly-slate">Contact & Contribute</h2>
            <p className="text-gray-700 mb-4">
              Mockly is an open source project. If you have suggestions, found a bug, or want to contribute to the development, visit our GitHub repository.
            </p>
            
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Visit GitHub Repository
              </a>
            </Button>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
