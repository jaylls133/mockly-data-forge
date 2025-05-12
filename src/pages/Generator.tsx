
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Download, 
  Copy, 
  Trash, 
  Plus,
  Save,
  RefreshCw,
  CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';

// Locales supported
const LOCALES = [
  { id: 'us', label: 'United States' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'in', label: 'India' },
  { id: 'jp', label: 'Japan' },
  { id: 'br', label: 'Brazil' },
  { id: 'de', label: 'Germany' },
];

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
  { id: 'creditCard', label: 'Credit Card Number' },
  { id: 'creditCardType', label: 'Credit Card Type' },
  { id: 'expiryDate', label: 'Expiry Date' },
  { id: 'cvv', label: 'CVV' },
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
  const [locale, setLocale] = useState('us');
  const [fields, setFields] = useState<Field[]>([
    { id: crypto.randomUUID(), name: 'fullName', type: 'fullName' },
    { id: crypto.randomUUID(), name: 'email', type: 'email' },
    { id: crypto.randomUUID(), name: 'phone', type: 'phone' },
  ]);
  const [mockData, setMockData] = useState<MockData[]>([]);
  const [templateName, setTemplateName] = useState('');

  // Locale-specific data
  const localeData = {
    us: {
      firstNames: ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Linda'],
      lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia'],
      cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
      states: ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA'],
      streetFormats: ['### Main St', '### Oak Ave', '### Maple Rd', '### Washington Blvd', '### Park Lane'],
      phoneFormat: '(###) ###-####',
      zipFormat: '#####',
    },
    uk: {
      firstNames: ['Oliver', 'Amelia', 'Harry', 'Emma', 'George', 'Olivia', 'Noah', 'Isla'],
      lastNames: ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Evans', 'Wilson'],
      cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Edinburgh', 'Bristol', 'Leeds'],
      states: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
      streetFormats: ['### High Street', '### Church Road', '### Park Avenue', '### Victoria Road', '### Station Road'],
      phoneFormat: '07### ######',
      zipFormat: '?# #??',
    },
    in: {
      firstNames: ['Aarav', 'Diya', 'Arjun', 'Aanya', 'Vihaan', 'Ananya', 'Reyansh', 'Ishita'],
      lastNames: ['Sharma', 'Patel', 'Verma', 'Desai', 'Gupta', 'Singh', 'Kumar', 'Shah'],
      cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'],
      states: ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan'],
      streetFormats: ['###, Sector ##', '###, Phase #', 'Flat ###, Building Name', '###, Block #', '###, Main Road'],
      phoneFormat: '+91 ##### #####',
      zipFormat: '######',
    },
    jp: {
      firstNames: ['Haruto', 'Yuna', 'Sota', 'Yui', 'Ren', 'Hina', 'Takumi', 'Mei'],
      lastNames: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura'],
      cities: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto'],
      states: ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Hokkaido', 'Fukuoka', 'Hyogo', 'Kyoto'],
      streetFormats: ['#-#-#, Neighborhood', 'Building Name #F, #-#-#', '#-##-#, Ward'],
      phoneFormat: '0#-####-####',
      zipFormat: '###-####',
    },
    br: {
      firstNames: ['Miguel', 'Sofia', 'Arthur', 'Alice', 'Davi', 'Laura', 'Bernardo', 'Manuela'],
      lastNames: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues', 'Almeida'],
      cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba'],
      states: ['SP', 'RJ', 'DF', 'BA', 'CE', 'MG', 'AM', 'PR'],
      streetFormats: ['Rua ###', 'Avenida ###', 'Travessa ###', 'Alameda ###'],
      phoneFormat: '(##) #####-####',
      zipFormat: '#####-###',
    },
    de: {
      firstNames: ['Maximilian', 'Sophie', 'Alexander', 'Maria', 'Paul', 'Anna', 'Leon', 'Emma'],
      lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker'],
      cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'],
      states: ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony', 'Berlin', 'Hamburg'],
      streetFormats: ['Hauptstraße ###', 'Schulstraße ###', 'Gartenweg ###', 'Bahnhofstraße ###'],
      phoneFormat: '0### ########',
      zipFormat: '#####',
    },
  };

  // Credit card types
  const creditCardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];

  // Format string with random numbers and letters
  const formatString = (format: string) => {
    return format.replace(/#/g, () => Math.floor(Math.random() * 10).toString())
                .replace(/\?/g, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
  };

  // Generate fake data based on field type and locale
  const generateFakeValue = (type: string) => {
    const currentLocale = localeData[locale as keyof typeof localeData] || localeData.us;
    
    switch (type) {
      case 'fullName': {
        const firstName = currentLocale.firstNames[Math.floor(Math.random() * currentLocale.firstNames.length)];
        const lastName = currentLocale.lastNames[Math.floor(Math.random() * currentLocale.lastNames.length)];
        return `${firstName} ${lastName}`;
      }
      
      case 'firstName':
        return currentLocale.firstNames[Math.floor(Math.random() * currentLocale.firstNames.length)];
        
      case 'lastName':
        return currentLocale.lastNames[Math.floor(Math.random() * currentLocale.lastNames.length)];
        
      case 'email': {
        const emailFirsts = currentLocale.firstNames.map(name => name.toLowerCase());
        const emailLasts = currentLocale.lastNames.map(name => name.toLowerCase());
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'mail.com'];
        return `${emailFirsts[Math.floor(Math.random() * emailFirsts.length)]}.${emailLasts[Math.floor(Math.random() * emailLasts.length)]}@${domains[Math.floor(Math.random() * domains.length)]}`;
      }
      
      case 'phone':
        return formatString(currentLocale.phoneFormat);
        
      case 'address':
        return formatString(currentLocale.streetFormats[Math.floor(Math.random() * currentLocale.streetFormats.length)]);
        
      case 'city':
        return currentLocale.cities[Math.floor(Math.random() * currentLocale.cities.length)];
        
      case 'state':
        return currentLocale.states[Math.floor(Math.random() * currentLocale.states.length)];
        
      case 'country':
        return LOCALES.find(l => l.id === locale)?.label || 'United States';
        
      case 'zipCode':
        return formatString(currentLocale.zipFormat);
        
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
      
      case 'creditCard':
        // Generate credit card number based on format
        let ccNumber = '';
        if (Math.random() > 0.7) {
          // Visa: 4xxx xxxx xxxx xxxx
          ccNumber = '4' + formatString('###-####-####-####').replace(/-/g, '').substring(1);
        } else if (Math.random() > 0.4) {
          // MasterCard: 5xxx xxxx xxxx xxxx
          ccNumber = '5' + formatString('###-####-####-####').replace(/-/g, '').substring(1);
        } else if (Math.random() > 0.2) {
          // Amex: 3xxx xxxxxx xxxxx
          ccNumber = '3' + formatString('##-######-#####').replace(/-/g, '').substring(1);
        } else {
          // Discover: 6xxx xxxx xxxx xxxx
          ccNumber = '6' + formatString('###-####-####-####').replace(/-/g, '').substring(1);
        }
        return ccNumber.match(/.{1,4}/g)?.join(' ') || ccNumber;
        
      case 'creditCardType':
        return creditCardTypes[Math.floor(Math.random() * creditCardTypes.length)];
        
      case 'expiryDate':
        const month = Math.floor(Math.random() * 12) + 1;
        const year = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
        return `${month.toString().padStart(2, '0')}/${year.toString().substring(2)}`;
        
      case 'cvv':
        return Math.floor(Math.random() * 900) + 100;
        
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
  }, [fields, rowCount, locale]);

  return (
    <Layout>
      <div className="mockly-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-mockly-slate dark:text-white">Data Generator</h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Configure Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Row Count */}
                  <div>
                    <label htmlFor="rowCount" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Number of Rows
                    </label>
                    <Input
                      id="rowCount"
                      type="number"
                      min={1}
                      max={1000}
                      value={rowCount}
                      onChange={(e) => setRowCount(parseInt(e.target.value) || 5)}
                      className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  {/* Locale Selection */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Locale/Region
                    </label>
                    <Select value={locale} onValueChange={setLocale}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select locale" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCALES.map(localeOption => (
                          <SelectItem key={localeOption.id} value={localeOption.id}>
                            {localeOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fields */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fields</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-mockly-purple hover:text-mockly-purple hover:bg-mockly-purple/10 dark:text-mockly-purple dark:hover:bg-mockly-purple/20"
                        onClick={addField}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Field
                      </Button>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {fields.map((field) => (
                        <div key={field.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <div className="flex-1">
                            <Input
                              placeholder="Field name"
                              value={field.name}
                              onChange={(e) => updateField(field.id, 'name', e.target.value)}
                              className="mb-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                            <Select
                              value={field.type}
                              onValueChange={(value) => updateField(field.id, 'type', value)}
                            >
                              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-600 dark:text-white">
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

                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2 dark:text-gray-300">Save as Template</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Template name"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                        <Button 
                          className="mockly-button-secondary dark:bg-mockly-slate dark:text-white"
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
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">Data Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyToClipboard}
                      className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={exportAsCSV}
                      className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={exportAsJSON}
                      className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border dark:border-gray-700 rounded-md overflow-hidden">
                  <Tabs defaultValue="table">
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                      <TabsList className="grid grid-cols-2 w-48">
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="json">JSON</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="table" className="p-0">
                      <div className="overflow-x-auto max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              {fields.map((field) => (
                                <th 
                                  key={field.id}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  {field.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {mockData.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {fields.map((field) => (
                                  <td 
                                    key={field.id} 
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
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
                        <pre className="p-4 text-xs bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
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
