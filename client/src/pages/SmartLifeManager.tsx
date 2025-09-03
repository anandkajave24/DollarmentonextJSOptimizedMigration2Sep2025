import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { SEO } from '../components/SEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Calendar,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle,
  Home,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

interface LifeRecord {
  id: string;
  title: string;
  category: string;
  provider: string;
  importantNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  issueDate: string;
  expiryDate: string;
  notes: string;
  documentUrl?: string;
  reminderEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  "Finance",
  "Health", 
  "Family",
  "Legal",
  "Property",
  "Education",
  "Utility",
  "Insurance",
  "Other"
];

const categoryColors = {
  Finance: "bg-green-100 text-green-800",
  Health: "bg-red-100 text-red-800", 
  Family: "bg-blue-100 text-blue-800",
  Legal: "bg-purple-100 text-purple-800",
  Property: "bg-orange-100 text-orange-800",
  Education: "bg-yellow-100 text-yellow-800",
  Utility: "bg-gray-100 text-gray-800",
  Insurance: "bg-indigo-100 text-indigo-800",
  Other: "bg-pink-100 text-pink-800"
};

export default function SmartLifeManager() {
  return (
    <>
      <SEO 
        title="Smart Life Manager - Organize Important Documents & Records"
        description="Smart life management system to organize and track important documents, records, and personal information. Never lose track of important life records and documents again."
        keywords="life manager, document organizer, personal records, important documents, life organization, record keeping, document management, smart life manager"
        canonical="https://dollarmento.com/smart-life-manager"
      />
      <SmartLifeManagerContent />
    </>
  );
}

function SmartLifeManagerContent() {
  const [records, setRecords] = useState<LifeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<LifeRecord | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<LifeRecord>>({
    title: "",
    category: "",
    provider: "",
    importantNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    issueDate: "",
    expiryDate: "",
    notes: "",
    reminderEnabled: false
  });

  // Initialize with empty records - users will add their own data
  useEffect(() => {
    setRecords([]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRecord) {
      // Update existing record
      setRecords(prev => prev.map(record => 
        record.id === editingRecord.id 
          ? { ...record, ...formData, updatedAt: new Date().toISOString() }
          : record
      ));
    } else {
      // Add new record
      const { id, createdAt, updatedAt, ...formDataWithoutMeta } = formData as any;
      const newRecord: LifeRecord = {
        ...formDataWithoutMeta,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as LifeRecord;
      setRecords(prev => [...prev, newRecord]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      provider: "",
      importantNumber: "",
      contactPerson: "",
      phone: "",
      email: "",
      issueDate: "",
      expiryDate: "",
      notes: "",
      reminderEnabled: false
    });
    setEditingRecord(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (record: LifeRecord) => {
    setFormData(record);
    setEditingRecord(record);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.importantNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || record.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getExpiryStatus = (expiryDate: string) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: "expired", color: "text-red-600", days: Math.abs(diffDays) };
    if (diffDays <= 30) return { status: "expiring", color: "text-orange-600", days: diffDays };
    if (diffDays <= 90) return { status: "warning", color: "text-yellow-600", days: diffDays };
    return { status: "valid", color: "text-green-600", days: diffDays };
  };

  return (
    <>
      <Helmet>
        <title>Smart Life Manager - Personal Document & Life Records Organizer | USA</title>
        <meta name="description" content="Organize and manage all your important life documents, insurance policies, bank accounts, legal documents, and family records in one secure place. Track expiry dates and set reminders for USA residents." />
        <meta name="keywords" content="personal document organizer, life insurance manager, bank account tracker, legal document storage, family records organizer, expiry date tracker, personal finance organizer, document management, USA residents, important papers tracker" />
        <meta property="og:title" content="Smart Life Manager - Personal Document & Life Records Organizer" />
        <meta property="og:description" content="Keep track of all your important documents, insurance policies, and family records with expiry reminders and secure organization for USA residents." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smart Life Manager - Personal Document Organizer" />
        <meta name="twitter:description" content="Organize important documents, track expiry dates, and manage family records securely." />
        <link rel="canonical" href="/smart-life-manager" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart Life Manager</h1>
              <p className="text-gray-600">One place to store everything that matters</p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingRecord(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Record
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-fit overflow-hidden">
                <DialogHeader className="pb-2">
                  <DialogTitle className="text-base">
                    {editingRecord ? "Edit Record" : "Add New Record"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="title" className="text-xs">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., State Farm Life Policy"
                        className="h-7 text-xs mt-0.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-xs">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="h-7 text-xs mt-0.5">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat} className="text-xs">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="provider" className="text-xs">Provider</Label>
                      <Input
                        id="provider"
                        value={formData.provider}
                        onChange={(e) => setFormData({...formData, provider: e.target.value})}
                        placeholder="e.g., State Farm, Allstate"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="importantNumber" className="text-xs">Number (only last 4 digits)</Label>
                      <Input
                        id="importantNumber"
                        value={formData.importantNumber}
                        onChange={(e) => {
                          // Only allow digits and limit to 4 characters
                          const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setFormData({...formData, importantNumber: value});
                        }}
                        placeholder="Policy/Account No."
                        maxLength={4}
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="contactPerson" className="text-xs">Contact</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        placeholder="Agent/Provider name"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-xs">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="contact@example.com"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="issueDate" className="text-xs">Issue Date</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate" className="text-xs">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-xs">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Beneficiary details, conditions..."
                      rows={2}
                      className="text-xs mt-0.5 min-h-[3rem]"
                    />
                  </div>

                  <div className="flex items-center space-x-2 py-1">
                    <Checkbox
                      checked={formData.reminderEnabled}
                      onCheckedChange={(checked) => setFormData({...formData, reminderEnabled: !!checked})}
                      className="h-3 w-3"
                    />
                    <Label className="text-xs">Enable reminder</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" onClick={resetForm} className="h-7 px-2 text-xs">
                      Cancel
                    </Button>
                    <Button type="submit" className="h-7 px-2 text-xs">
                      {editingRecord ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, provider, or number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Records Table - Clean & Compact */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide border-r border-gray-300">
                    TITLE
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide border-r border-gray-300">
                    PROVIDER
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide border-r border-gray-300">
                    NUMBER
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide border-r border-gray-300">
                    CONTACT
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide border-r border-gray-300">
                    EXPIRES
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-800 uppercase tracking-wide">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredRecords.map((record, index) => {
                  const expiryStatus = getExpiryStatus(record.expiryDate);
                  const isEven = index % 2 === 0;
                  
                  return (
                    <tr key={record.id} className={`hover:bg-gray-50 transition-colors border-b border-gray-100 ${isEven ? 'bg-gray-50/30' : 'bg-white'}`}>
                      <td className="px-3 py-2 border-r border-gray-100">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium text-gray-900 text-xs leading-tight truncate max-w-[180px]" title={record.title}>
                            {record.title}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[record.category as keyof typeof categoryColors]}`}>
                              {record.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100">
                        <div className="text-xs text-gray-700 truncate max-w-[100px]" title={record.provider}>
                          {record.provider}
                        </div>
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100">
                        <div className="text-xs text-gray-700 font-mono truncate max-w-[120px]" title={record.importantNumber}>
                          {record.importantNumber}
                        </div>
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100">
                        <div className="flex flex-col gap-0.5">
                          <div className="text-xs text-gray-700 truncate max-w-[120px]" title={record.contactPerson}>
                            {record.contactPerson}
                          </div>
                          {record.phone && (
                            <div className="text-xs text-gray-500 truncate max-w-[120px]" title={record.phone}>
                              {record.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100">
                        {record.expiryDate ? (
                          <div className="flex flex-col">
                            <div className={`text-xs font-medium ${expiryStatus?.color || 'text-gray-700'}`}>
                              {new Date(record.expiryDate).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: '2-digit'
                              })}
                            </div>
                            {expiryStatus && expiryStatus.status !== "valid" && (
                              <div className={`text-xs ${expiryStatus.color}`}>
                                {expiryStatus.status === "expired" 
                                  ? `${expiryStatus.days}d ago`
                                  : `${expiryStatus.days}d`
                                }
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1 justify-center">
                          <button
                            onClick={() => handleEdit(record)}
                            className="h-5 w-5 flex items-center justify-center rounded hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="h-5 w-5 flex items-center justify-center rounded hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRecords.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterCategory !== "all" ? "No records found" : "Welcome to Smart Life Manager"}
            </h3>
            
            {searchTerm || filterCategory !== "all" ? (
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
            ) : (
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  One place to store everything that matters. Examples of what you can manage:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-500 max-w-2xl mx-auto">
                  <div className="text-left space-y-1">
                    <div>• Life Insurance Policies</div>
                    <div>• Bank Account Details</div>
                    <div>• Passport & Legal Documents</div>
                    <div>• School Admissions</div>
                  </div>
                  <div className="text-left space-y-1">
                    <div>• Health Records & Reports</div>
                    <div>• Investment Accounts (401k, IRA)</div>
                    <div>• Utility Connections</div>
                    <div>• Family Important Numbers</div>
                  </div>
                </div>
              </div>
            )}
            
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {searchTerm || filterCategory !== "all" ? "Add New Record" : "Add Your First Record"}
            </Button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}