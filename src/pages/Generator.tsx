
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Copy, 
  Trash, 
  Plus,
  Save,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';

// Field types for the generator
const FIELD_TYPES = [
  { id: 'fullName', label: 'Full Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email Address' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'address', label: 'Street Address' },
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State/Province' },
  { id: 'country', label: 'Country' },
  { id: 'zipCode', label: 'Zip/Postal Code' },
  { id: 'company', label: 'Company Name' },
  { id: 'jobTitle', label: 'Job Title' },
  { id: 'avatar', label: 'Avatar URL' },
  { id: 'username', label: 'Username' },
  { id: 'dateOfBirth', label: 'Date of Birth' },
  { id: 'age', label: 'Age' },
];

interface Field {
  id: string;
  name: string;
  type: string;
}

interface MockData {
  [key: string]: string | number;
}

const Generator = () => {
  const [rowCount, setRowCount] = useState(5);
  const [fields, setFields] = useState<Field[]>([
    { id: crypto.randomUUID(), name: 'fullName', type: 'fullName' },
    { id: crypto.randomUUID(), name: 'email', type: 'email' },
    { id: crypto.randomUUID(), name: 'phone', type: 'phone' },
  ]);
  const [mockData, setMockData] = useState<MockData[]>([]);
  const [templateName, setTemplateName] = useState('');

  // Generate fake data based on field type
  const generateFakeValue = (type: string) => {
    switch (type) {
      case 'fullName':
        const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Linda'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      
      case 'firstName':
        const fNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Linda'];
        return fNames[Math.floor(Math.random() * fNames.length)];
        
      case 'lastName':
        const lNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia'];
        return lNames[Math.floor(Math.random() * lNames.length)];
        
      case 'email':
        const emailFirsts = ['john', 'jane', 'michael', 'emily', 'david', 'sarah', 'robert', 'linda'];
        const emailLasts = ['smith', 'johnson', 'williams', 'brown', 'jones', 'miller', 'davis', 'garcia'];
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'mail.com'];
        return `${emailFirsts[Math.floor(Math.random() * emailFirsts.length)]}.${emailLasts[Math.floor(Math.random() * emailLasts.length)]}@${domains[Math.floor(Math.random() * domains.length)]}`;
        
      case 'phone':
        return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
        
      case 'address':
        const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Park Lane'];
        return `${Math.floor(Math.random() * 9000) + 1000} ${streets[Math.floor(Math.random() * streets.length)]}`;
        
      case 'city':
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
        return cities[Math.floor(Math.random() * cities.length)];
        
      case 'state':
        const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA'];
        return states[Math.floor(Math.random() * states.length)];
        
      case 'country':
        const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Brazil'];
        return countries[Math.floor(Math.random() * countries.length)];
        
      case 'zipCode':
        return `${Math.floor(Math.random() * 90000) + 10000}`;
        
      case 'company':
        const companyTypes = ['Inc', 'LLC', 'Corp', 'Co', 'Group'];
        const companyNames = ['Tech', 'Digital', 'Global', 'Advanced', 'Modern', 'Smart', 'Future', 'Prime'];
        return `${companyNames[Math.floor(Math.random() * companyNames.length)]} ${companyTypes[Math.floor(Math.random() * companyTypes.length)]}`;
        
      case 'jobTitle':
        const positions = ['Manager', 'Director', 'Developer', 'Analyst', 'Designer', 'Engineer', 'Specialist', 'Coordinator'];
        const departments = ['Marketing', 'Sales', 'Engineering', 'Product', 'HR', 'Operations', 'Finance', 'IT'];
        return `${positions[Math.floor(Math.random() * positions.length)]}, ${departments[Math.floor(Math.random() * departments.length)]}`;
        
      case 'avatar':
        const avatarId = Math.floor(Math.random() * 100);
        return `https://i.pravatar.cc/150?img=${avatarId}`;
        
      case 'username':
        const userFirst = ['cool', 'super', 'awesome', 'tech', 'code', 'dev', 'pro', 'digital'];
        const userLast = ['user', 'coder', 'ninja', 'guru', 'master', 'hero', 'star', 'expert'];
        return `${userFirst[Math.floor(Math.random() * userFirst.length)]}${userLast[Math.floor(Math.random() * userLast.length)]}${Math.floor(Math.random() * 1000)}`;
        
      case 'dateOfBirth':
        const start = new Date(1960, 0, 1);
        const end = new Date(2005, 0, 1);
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
        
      case 'age':
        return Math.floor(Math.random() * 70) + 18;
        
      default:
        return 'Unknown Type';
    }
  };

  // Generate mock data
  const generateData = () => {
    const data = [];
    for (let i = 0; i < rowCount; i++) {
      const rowData: MockData = {};
      
      fields.forEach((field) => {
        rowData[field.name] = generateFakeValue(field.type);
      });
      
      data.push(rowData);
    }
    
    setMockData(data);
    toast.success("Data generated successfully!");
  };

  // Add a new field
  const addField = () => {
    const newField = {
      id: crypto.randomUUID(),
      name: `field${fields.length + 1}`,
      type: 'fullName',
    };
    
    setFields([...fields, newField]);
  };

  // Remove a field
  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  // Update a field
  const updateField = (id: string, key: string, value: string) => {
    setFields(fields.map(field => {
      if (field.id === id) {
        return { ...field, [key]: value };
      }
      return field;
    }));
  };

  // Export as CSV
  const exportAsCSV = () => {
    if (mockData.length === 0) {
      toast.error("No data to export!");
      return;
    }
    
    const headers = Object.keys(mockData[0]).join(',');
    const rows = mockData.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mockly-data.csv';
    a.click();
    
    toast.success("Data exported as CSV!");
  };

  // Export as JSON
  const exportAsJSON = () => {
    if (mockData.length === 0) {
      toast.error("No data to export!");
      return;
    }
    
    const json = JSON.stringify(mockData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mockly-data.json';
    a.click();
    
    toast.success("Data exported as JSON!");
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (mockData.length === 0) {
      toast.error("No data to copy!");
      return;
    }
    
    const json = JSON.stringify(mockData, null, 2);
    navigator.clipboard.writeText(json)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard!"));
  };

  // Save as template
  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name!");
      return;
    }
    
    const template = {
      id: crypto.randomUUID(),
      name: templateName,
      fields: fields,
      rowCount: rowCount,
      createdAt: new Date().toISOString(),
    };
    
    // Get existing templates from local storage
    const existingTemplates = JSON.parse(localStorage.getItem('mocklyTemplates') || '[]');
    
    // Add new template and save
    localStorage.setItem('mocklyTemplates', JSON.stringify([...existingTemplates, template]));
    
    toast.success(`Template "${templateName}" saved successfully!`);
    setTemplateName('');
  };

  // Initialize data when component mounts or fields change
  useEffect(() => {
    generateData();
  }, [fields, rowCount]);

  return (
    <Layout>
      <div className="mockly-container py-8">
        <h1 className="text-3xl font-bold mb-8 text-mockly-slate">Data Generator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Configure Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Row Count */}
                  <div>
                    <label htmlFor="rowCount" className="block mb-2 text-sm font-medium text-gray-700">
                      Number of Rows
                    </label>
                    <Input
                      id="rowCount"
                      type="number"
                      min={1}
                      max={1000}
                      value={rowCount}
                      onChange={(e) => setRowCount(parseInt(e.target.value) || 5)}
                      className="w-full"
                    />
                  </div>

                  {/* Fields */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Fields</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-mockly-purple hover:text-mockly-purple hover:bg-mockly-purple/10"
                        onClick={addField}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Field
                      </Button>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {fields.map((field) => (
                        <div key={field.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                          <div className="flex-1">
                            <Input
                              placeholder="Field name"
                              value={field.name}
                              onChange={(e) => updateField(field.id, 'name', e.target.value)}
                              className="mb-2"
                            />
                            <Select
                              value={field.type}
                              onValueChange={(value) => updateField(field.id, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {FIELD_TYPES.map(type => (
                                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => removeField(field.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <Button 
                      className="w-full mockly-button-primary"
                      onClick={generateData}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate Data
                    </Button>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2">Save as Template</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Template name"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                        />
                        <Button 
                          className="mockly-button-secondary"
                          onClick={saveTemplate}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Preview and Export */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Data Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={exportAsCSV}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={exportAsJSON}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <Tabs defaultValue="table">
                    <div className="px-4 py-2 bg-gray-50 border-b">
                      <TabsList className="grid grid-cols-2 w-48">
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="json">JSON</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="table" className="p-0">
                      <div className="overflow-x-auto max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {fields.map((field) => (
                                <th 
                                  key={field.id}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {field.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mockData.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {fields.map((field) => (
                                  <td 
                                    key={field.id} 
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                  >
                                    {String(row[field.name] || '')}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="json" className="p-0">
                      <div className="overflow-x-auto max-h-[500px]">
                        <pre className="p-4 text-xs bg-gray-50 text-gray-800">
                          {JSON.stringify(mockData, null, 2)}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Generator;
