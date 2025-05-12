
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Trash, 
  Edit, 
  Plus 
} from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  fields: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  rowCount: number;
  createdAt: string;
}

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const navigate = useNavigate();

  // Load templates from local storage
  useEffect(() => {
    const storedTemplates = localStorage.getItem('mocklyTemplates');
    if (storedTemplates) {
      try {
        setTemplates(JSON.parse(storedTemplates));
      } catch (error) {
        console.error("Failed to parse templates:", error);
        toast.error("Failed to load templates");
      }
    }
  }, []);

  // Delete a template
  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(template => template.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem('mocklyTemplates', JSON.stringify(updatedTemplates));
    toast.success("Template deleted");
  };

  // Load a template in the generator
  const loadTemplate = (template: Template) => {
    // Store the selected template in sessionStorage to be loaded in the generator
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
    navigate('/generator');
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="mockly-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-mockly-slate">Saved Templates</h1>
          <Button 
            onClick={() => navigate('/generator')} 
            className="mockly-button-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-md bg-gray-50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Templates Yet</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Save your configurations as templates to quickly generate data with the same fields later.
            </p>
            <Button 
              onClick={() => navigate('/generator')} 
              className="mockly-button-primary"
            >
              Create Your First Template
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden border hover:border-mockly-purple/50 hover:shadow-md transition">
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-mockly-slate">{template.name}</h3>
                        <p className="text-sm text-gray-500">
                          {template.fields.length} fields • {template.rowCount} rows
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => deleteTemplate(template.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      Created {formatDate(template.createdAt)}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.fields.slice(0, 3).map((field) => (
                        <span 
                          key={field.id}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs"
                        >
                          {field.name}
                        </span>
                      ))}
                      {template.fields.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                          +{template.fields.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 border-t flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => loadTemplate(template)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      className="mockly-button-primary"
                      size="sm"
                      onClick={() => loadTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Templates;
