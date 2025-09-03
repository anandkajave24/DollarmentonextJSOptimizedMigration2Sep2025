import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Eye, Save, Trash2, Settings, FileText, Layout, Search } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface ContentItem {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  updatedAt: string;
  category?: string;
}

const CMSAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    setContentItems([
      {
        id: 1,
        title: "Complete Guide to 401k Calculators",
        slug: "401k-calculator-guide",
        published: true,
        updatedAt: "2025-01-27",
        category: "retirement"
      },
      {
        id: 2,
        title: "Mortgage Calculator: Everything You Need to Know",
        slug: "mortgage-calculator-guide",
        published: false,
        updatedAt: "2025-01-26",
        category: "loans"
      }
    ]);
  }, []);

  const ContentEditor = () => {
    const [formData, setFormData] = useState({
      title: '',
      slug: '',
      metaDescription: '',
      content: '',
      keywords: '',
      published: false,
      category: 'financial-tips'
    });

    const handleSave = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "Content Saved",
          description: "Your content has been saved successfully.",
        });
        setFormData({
          title: '',
          slug: '',
          metaDescription: '',
          content: '',
          keywords: '',
          published: false,
          category: 'financial-tips'
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter content title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">URL Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="url-friendly-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="financial-tips">Financial Tips</option>
                <option value="calculator-guides">Calculator Guides</option>
                <option value="retirement">Retirement Planning</option>
                <option value="loans">Loans & Mortgages</option>
                <option value="investment">Investment Strategies</option>
                <option value="tax">Tax Planning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <Textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="SEO meta description (150-160 characters)"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.metaDescription.length}/160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <Input
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <label className="text-sm font-medium">
                {formData.published ? 'Published' : 'Draft'}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your content here... (Supports Markdown)"
              rows={15}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="space-x-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Publish'}
          </Button>
        </div>
      </div>
    );
  };

  const ContentList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search content..."
            className="w-64"
          />
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">/{item.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">{item.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={item.published ? "default" : "outline"}>
                      {item.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.updatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SEOSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculator Pages SEO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Page</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>/mortgage-calculator</option>
                  <option>/401k-calculator</option>
                  <option>/loan-calculator</option>
                  <option>/retirement-calculator</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <Input placeholder="Page title for search engines" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Focus Keyword</label>
                <Input placeholder="mortgage calculator" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <Textarea
                placeholder="SEO meta description for this calculator page"
                rows={3}
              />
            </div>
            
            <Button>Update SEO Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Edit className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">SEO Pages</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Badge>Published</Badge>
              <span className="text-sm">401k Calculator Guide updated by SEO Team</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">Draft</Badge>
              <span className="text-sm">New landing page: Best Mortgage Calculators</span>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge>SEO Update</Badge>
              <span className="text-sm">Meta descriptions updated for 5 calculator pages</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Content Management System - DollarMento CMS Admin Panel</title>
        <meta name="description" content="DollarMento CMS Admin Panel for managing website content, SEO settings, and financial calculator pages. Content management system for financial education platform." />
        <meta name="keywords" content="CMS admin, content management, SEO settings, financial content, admin panel, website management" />
        <link rel="canonical" href="https://dollarmento.com/cms-admin" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management System</h1>
              <p className="text-sm text-gray-600">Manage website content and SEO settings</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Content Editor</Badge>
              <div className="text-sm text-gray-600">Welcome, SEO Team</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <ContentList />
          </TabsContent>
          
          <TabsContent value="editor" className="mt-6">
            <ContentEditor />
          </TabsContent>
          
          <TabsContent value="seo" className="mt-6">
            <SEOSettings />
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </>
  );
};

export default CMSAdmin;