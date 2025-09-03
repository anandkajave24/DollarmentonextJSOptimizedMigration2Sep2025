import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare, Target, FileCheck, AlertCircle, Baby, Users, Home, Plus, BarChart3, Map, Calendar, Clock, CreditCard, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface ChecklistItem {
  id: number;
  item: string;
  status: 'select' | 'yes' | 'no' | 'partially';
  category: string;
  comment?: string;
}

interface ChecklistSection {
  level: string;
  title: string;
  icon: any;
  items: Omit<ChecklistItem, 'category'>[];
}

export default function SmartFinancialChecklist() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [checklistData, setChecklistData] = useState<ChecklistItem[]>([]);
  const [completionStats, setCompletionStats] = useState({
    total: 0,
    yes: 0,
    no: 0,
    partially: 0,
    select: 0
  });
  const [customItems, setCustomItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('HIGH PRIORITY');
  const [showAddForm, setShowAddForm] = useState(false);
  const [nextCustomId, setNextCustomId] = useState(1000);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDefaultDeleteConfirm, setShowDefaultDeleteConfirm] = useState<{id: number, type: string} | null>(null);
  const [itemComments, setItemComments] = useState<{[key: number]: string}>({});
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [tempComment, setTempComment] = useState('');

  // Priority-ordered questions with sequence numbers - USA FINANCIAL SYSTEM
  const sections: ChecklistSection[] = [
    {
      level: "HIGH PRIORITY",
      title: "Essential Financial Foundation",
      icon: Target,
      items: [
        { id: 1, item: "Monthly income-expense budget created", status: 'select' },
        { id: 2, item: "Emergency fund built (3-6 months expenses)", status: 'select' },
        { id: 3, item: "Term life insurance purchased (10x income)", status: 'select' },
        { id: 4, item: "Credit score monitored regularly (FICO/VantageScore)", status: 'select' }
      ]
    },
    {
      level: "MEDIUM PRIORITY",
      title: "Banking & Investment Setup",
      icon: FileCheck,
      items: [
        { id: 5, item: "Brokerage account opened (Fidelity/Schwab/Vanguard)", status: 'select' },
        { id: 6, item: "Investment in index funds/ETFs started", status: 'select' },
        { id: 7, item: "Financial goals defined (short/medium/long-term)", status: 'select' },
        { id: 8, item: "Tax-advantaged accounts reviewed (401k, IRA, HSA)", status: 'select' }
      ]
    },
    {
      level: "DEBT & TAX",
      title: "Debt Management & Tax Planning",
      icon: AlertCircle,
      items: [
        { id: 9, item: "All loans tracked (mortgage, student, personal)", status: 'select' },
        { id: 10, item: "Monthly payments automated via bank auto-pay", status: 'select' },
        { id: 11, item: "Credit card usage & rewards optimized", status: 'select' },
        { id: 12, item: "Federal tax return filed for current year", status: 'select' },
        { id: 13, item: "Tax deductions maximized (401k, HSA, mortgage interest)", status: 'select' }
      ]
    },
    {
      level: "WEALTH BUILDING",
      title: "Investment & Growth",
      icon: CheckSquare,
      items: [
        { id: 14, item: "Stock market investments started (S&P 500/Total Market)", status: 'select' },
        { id: 15, item: "Asset allocation aligned with age and risk tolerance", status: 'select' },
        { id: 16, item: "Annual investment portfolio review completed", status: 'select' }
      ]
    },
    {
      level: "PROTECTION",
      title: "Insurance & Risk Management",
      icon: Users,
      items: [
        { id: 17, item: "Health insurance coverage secured (employer/ACA)", status: 'select' },
        { id: 18, item: "Auto insurance with adequate liability coverage", status: 'select' },
        { id: 19, item: "Homeowner's/renter's insurance purchased", status: 'select' }
      ]
    }
  ];

  const majorLifeEvents: Array<{ id: number; event: string; checklist: string; status: 'select' | 'yes' | 'no' | 'partially' }> = [
    { id: 20, event: "Buying a house", checklist: "Mortgage pre-approval + down payment planning", status: 'select' as const },
    { id: 21, event: "Retirement", checklist: "401k/IRA maximization + Social Security planning", status: 'select' as const },
    { id: 22, event: "Estate planning", checklist: "Will creation + beneficiary designations + power of attorney", status: 'select' as const }
  ];

  const documentationItems: Array<{ id: number; item: string; status: 'select' | 'yes' | 'no' | 'partially' }> = [
    { id: 23, item: "Cloud storage for financial documents secured", status: 'select' as const },
    { id: 24, item: "Insurance policies and investment statements organized", status: 'select' as const }
  ];

  const monitoringItems: Array<{ id: number; item: string; status: 'select' | 'yes' | 'no' | 'partially' }> = [
    { id: 25, item: "Annual financial health checkup completed", status: 'select' as const },
    { id: 26, item: "Investment portfolio rebalanced quarterly", status: 'select' as const },
    { id: 27, item: "Financial goals reviewed and updated annually", status: 'select' as const }
  ];

  useEffect(() => {
    const allItems: ChecklistItem[] = [];
    sections.forEach(section => {
      section.items.forEach(item => {
        allItems.push({
          ...item,
          category: section.title
        });
      });
    });
    
    // Add all other items (major life events, documentation, monitoring)
    majorLifeEvents.forEach(event => {
      allItems.push({
        id: event.id,
        item: event.event + ' - ' + event.checklist,
        status: event.status,
        category: 'LIFE EVENTS'
      });
    });
    
    documentationItems.forEach(item => {
      allItems.push({
        id: item.id,
        item: item.item,
        status: item.status,
        category: 'DOCUMENTATION'
      });
    });
    
    monitoringItems.forEach(item => {
      allItems.push({
        id: item.id,
        item: item.item,
        status: item.status,
        category: 'MONITORING'
      });
    });
    
    setChecklistData(allItems);
    calculateStats([...allItems, ...customItems]);
  }, [customItems]);

  const calculateStats = (items: ChecklistItem[]) => {
    const stats = {
      total: items.length,
      yes: items.filter(item => item.status === 'yes').length,
      no: items.filter(item => item.status === 'no').length,
      partially: items.filter(item => item.status === 'partially').length,
      select: items.filter(item => item.status === 'select').length
    };
    setCompletionStats(stats);
  };

  const updateItemStatus = (id: number, newStatus: 'yes' | 'no' | 'partially' | 'select') => {
    const updatedData = checklistData.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    setChecklistData(updatedData);
    calculateStats([...updatedData, ...customItems]);
  };

  // Function to save comment for an item
  const saveComment = (id: number, comment: string) => {
    setItemComments(prev => ({
      ...prev,
      [id]: comment
    }));
    setEditingComment(null);
    setTempComment('');
  };

  // Function to start editing comment
  const startEditingComment = (id: number) => {
    setEditingComment(id);
    setTempComment(itemComments[id] || '');
  };

  const getRowClassName = (status: string) => {
    switch (status) {
      case 'yes':
        return 'bg-green-50 border-l-4 border-green-400';
      case 'partially':
        return 'bg-orange-50 border-l-4 border-orange-400';
      case 'no':
        return 'bg-red-50 border-l-4 border-red-400';
      default:
        return 'bg-gray-50 hover:bg-gray-100';
    }
  };

  // Function to get relevant financial tool for each task - USA Financial System
  const getRecommendedTool = (taskText: string): { name: string, link: string } => {
    const task = taskText.toLowerCase();
    
    if (task.includes('income') || task.includes('expense') || task.includes('budget')) {
      return { name: 'Budget Tracker', link: '/budget-buddy' };
    } else if (task.includes('emergency fund') || task.includes('life insurance')) {
      return { name: 'Budget Tracker', link: '/budget-buddy' };
    } else if (task.includes('credit score') || task.includes('fico')) {
      return { name: 'Credit Score Calculator', link: '/credit-score-simulator' };
    } else if (task.includes('brokerage') || task.includes('index funds') || task.includes('etf')) {
      return { name: 'Investment Calculator', link: '/mutual-fund-calculator' };
    } else if (task.includes('investment') || task.includes('stock')) {
      return { name: 'Investment Hub', link: '/portfolio-simulator' };
    } else if (task.includes('goals') || task.includes('financial goals')) {
      return { name: 'Goal Planner', link: '/financial-journey' };
    } else if (task.includes('tax') || task.includes('401k') || task.includes('ira')) {
      return { name: 'Tax Calculator', link: '/tax-calculator' };
    } else if (task.includes('loans') || task.includes('mortgage')) {
      return { name: 'Loan Calculator', link: '/emi-calculator' };
    } else if (task.includes('credit card')) {
      return { name: 'Credit Calculator', link: '/credit-card-payoff' };
    } else if (task.includes('equity') || task.includes('asset allocation') || task.includes('review')) {
      return { name: 'Investment Hub', link: '/portfolio-simulator' };
    } else if (task.includes('insurance') || task.includes('critical illness') || task.includes('vehicle') || task.includes('home')) {
      return { name: 'Insurance Guide', link: '/insurance-hub' };
    } else if (task.includes('house') || task.includes('home loan')) {
      return { name: 'Smart Life Manager', link: '/smart-life-manager' };
    } else if (task.includes('retirement')) {
      return { name: 'Retirement Planner', link: '/retirement-calculator' };
    } else if (task.includes('document') || task.includes('digital locker')) {
      return { name: 'Document Hub', link: '/smart-life-manager' };
    } else {
      return { name: 'Smart Life Manager', link: '/smart-life-manager' };
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'yes':
        return '✅';
      case 'partially':
        return '🔄';
      case 'no':
        return '❌';
      default:
        return '⭕';
    }
  };

  // Function to get status text for tooltip
  const getStatusText = (status: string) => {
    switch (status) {
      case 'yes':
        return 'Completed';
      case 'partially':
        return 'In Progress';
      case 'no':
        return 'Not Started';
      default:
        return 'Not Set - Click to mark as completed';
    }
  };

  // Function to cycle status on click
  const cycleStatus = (currentStatus: 'select' | 'yes' | 'no' | 'partially'): 'select' | 'yes' | 'no' | 'partially' => {
    switch (currentStatus) {
      case 'select':
        return 'yes';
      case 'yes':
        return 'partially';
      case 'partially':
        return 'no';
      case 'no':
        return 'select';
      default:
        return 'yes';
    }
  };

  // Function to add custom item
  const addCustomItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: nextCustomId,
        item: newItemText.trim(),
        status: 'select',
        category: selectedCategory
      };
      
      setCustomItems(prev => [...prev, newItem]);
      setNewItemText('');
      setNextCustomId(prev => prev + 1);
      setShowAddForm(false);
    }
  };

  // Function to remove custom item
  const removeCustomItem = (id: number) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };

  // Function to reset all data to default
  const resetToDefault = () => {
    setCustomItems([]);
    setChecklistData([]);
    setShowAddForm(false);
    setNewItemText('');
    setShowResetConfirm(false);
    
    // Reset all sections to default status
    sections.forEach(section => {
      section.items.forEach(item => {
        item.status = 'select' as const;
      });
    });
    
    // Reset major life events
    majorLifeEvents.forEach(event => {
      event.status = 'select' as const;
    });
    
    // Reset documentation items
    documentationItems.forEach(item => {
      item.status = 'select' as const;
    });
    
    // Reset monitoring items
    monitoringItems.forEach(item => {
      item.status = 'select' as const;
    });
    
    calculateStats([]);
  };

  const completionPercentage = Math.round((completionStats.yes / completionStats.total) * 100);

  // Tab configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'smart-roadmap', label: 'Smart Roadmap', icon: Map },
    { id: 'timeline', label: 'Timeline View', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <Helmet>
        <title>Smart Financial Checklist - USA Personal Finance Tasks | Financial Planning</title>
        <meta name="description" content="Complete USA-focused financial checklist with priority-ordered tasks including emergency fund, 401k setup, credit score monitoring, and insurance planning. Track your financial progress with interactive tools." />
        <meta name="keywords" content="financial checklist, personal finance tasks, financial planning, emergency fund, 401k, credit score, financial goals, USA finance, budgeting checklist" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Financial Checklist</h1>
          <p className="text-gray-600">Priority-ordered financial tasks for USA households</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{completionStats.yes}</div>
                    <div className="text-sm text-green-700">Completed Milestones</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{completionStats.partially}</div>
                    <div className="text-sm text-blue-700">In Progress</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-purple-50 border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
                    <div className="text-sm text-purple-700">Overall Progress</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* My Financial Timeline Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  My Financial Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 font-medium text-gray-700">Milestone</th>
                        <th className="pb-3 font-medium text-gray-700">Status</th>
                        <th className="pb-3 font-medium text-gray-700">Completion</th>
                        <th className="pb-3 font-medium text-gray-700">Next Step</th>
                        <th className="pb-3 font-medium text-gray-700">Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sections.slice(0, 5).map((section) => 
                        section.items.slice(0, 1).map((item) => {
                          const currentItem = checklistData.find(data => data.id === item.id);
                          const status = currentItem?.status || item.status;
                          const isCompleted = status === 'yes';
                          const isInProgress = status === 'partially';
                          const completion = isCompleted ? 100 : isInProgress ? 60 : 0;
                          
                          return (
                            <tr key={item.id} className="py-4">
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-100' : isInProgress ? 'bg-blue-100' : 'bg-gray-100'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckSquare className="w-4 h-4 text-green-600" />
                                    ) : isInProgress ? (
                                      <Clock className="w-4 h-4 text-blue-600" />
                                    ) : (
                                      <Target className="w-4 h-4 text-gray-600" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{item.item.split(' ').slice(0, 3).join(' ')}</div>
                                    <div className="text-sm text-gray-500">{item.item.split(' ').slice(3).join(' ')}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  isCompleted ? 'bg-green-100 text-green-800' : 
                                  isInProgress ? 'bg-blue-100 text-blue-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                                </span>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-500' : 'bg-gray-300'
                                      }`}
                                      style={{ width: `${completion}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600">{completion}%</span>
                                </div>
                              </td>
                              <td className="py-4 text-sm text-gray-600">
                                {isCompleted ? 'Continue building to 6 months' : 
                                 isInProgress ? 'Complete current task' : 
                                 'Start planning and setup'}
                              </td>
                              <td className="py-4 text-sm text-gray-500">
                                {isCompleted ? 'Completed' : 
                                 isInProgress ? '2 months' : 
                                 '3-6 months'}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}



        {/* Smart Roadmap Tab */}
        {activeTab === 'smart-roadmap' && (
          <>
            {/* Reset Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Modern Checklist Sections */}
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="shadow-sm mb-1 border border-gray-200">
                <CardHeader className="bg-gray-100 border-b border-gray-200 py-2">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <section.icon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">{section.level}</div>
                      <div className="text-xs text-blue-600">{section.title}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white p-0">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-2 px-3 font-medium text-gray-700 w-12">#</th>
                        <th className="text-left py-2 px-3 font-medium text-gray-700">Task</th>
                        <th className="text-center py-2 px-3 font-medium text-gray-700 w-20">Status</th>
                        <th className="text-left py-2 px-3 font-medium text-gray-700 w-32">Tool</th>
                        <th className="text-center py-2 px-3 font-medium text-gray-700 w-24">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, itemIndex) => {
                        const currentItem = checklistData.find(data => data.id === item.id);
                        const status = currentItem?.status || item.status;
                        
                        const tool = getRecommendedTool(item.item);
                        const sequenceNumber = sections.slice(0, sectionIndex).reduce((acc, sec) => acc + sec.items.length, 0) + itemIndex + 1;
                        
                        return (
                          <tr key={item.id} className={`${getRowClassName(status)} transition-colors border-b`}>
                            <td className="py-2 px-3 font-medium text-gray-700">{sequenceNumber}</td>
                            <td className="py-2 px-3 text-gray-900">{item.item}</td>
                            <td className="py-2 px-3 text-center">
                              <button
                                onClick={() => updateItemStatus(item.id, cycleStatus(status))}
                                className="text-lg hover:scale-110 transition-transform cursor-pointer"
                                title={getStatusText(status)}
                              >
                                {getStatusIcon(status)}
                              </button>
                            </td>
                            <td className="py-2 px-3">
                              <a
                                href={tool.link}
                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                              >
                                {tool.name}
                              </a>
                            </td>
                            <td className="py-2 px-3 text-center relative">
                              {editingComment === item.id ? (
                                <div className="flex gap-1">
                                  <input
                                    type="text"
                                    value={tempComment}
                                    onChange={(e) => setTempComment(e.target.value)}
                                    className="text-xs border rounded px-1 py-0.5 w-20"
                                    placeholder="Add note..."
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        saveComment(item.id, tempComment);
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={() => saveComment(item.id, tempComment)}
                                    className="text-xs bg-green-600 text-white px-1 py-0.5 rounded"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingComment(null);
                                      setTempComment('');
                                    }}
                                    className="text-xs bg-gray-600 text-white px-1 py-0.5 rounded"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => startEditingComment(item.id)}
                                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                  title={itemComments[item.id] || "Add personal comment"}
                                >
                                  {itemComments[item.id] ? '💬' : '+💬'}
                                </button>
                              )}
                              {itemComments[item.id] && (
                                <div className="absolute z-10 bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                  {itemComments[item.id]}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ))}

            {/* Major Life Events */}
            <Card className="shadow-sm mb-1 border border-gray-200">
              <CardHeader className="bg-gray-100 border-b border-gray-200 py-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                    <Home className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700">LIFE EVENTS</div>
                    <div className="text-xs text-gray-600">Major Life Planning & Events</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-0">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-2 px-3 font-medium text-gray-700 w-12">#</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Event</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Planning</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 w-20">Status</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 w-32">Tool</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 w-24">Comment</th>
              </tr>
            </thead>
            <tbody>
              {majorLifeEvents.map((event, index) => {
                const tool = getRecommendedTool(event.event);
                const totalPreviousItems = sections.reduce((acc, sec) => acc + sec.items.length, 0);
                const sequenceNumber = totalPreviousItems + index + 1;
                
                return (
                  <tr key={event.id} className={`${getRowClassName(event.status)} transition-colors border-b`}>
                    <td className="py-2 px-3 font-medium text-gray-700">{sequenceNumber}</td>
                    <td className="py-2 px-3 font-medium text-gray-900">{event.event}</td>
                    <td className="py-2 px-3 text-gray-700">{event.checklist}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => {
                          const newStatus = cycleStatus(event.status);
                          majorLifeEvents[index].status = newStatus;
                          setChecklistData([...checklistData]);
                        }}
                        className="text-lg hover:scale-110 transition-transform cursor-pointer"
                        title={getStatusText(event.status)}
                      >
                        {getStatusIcon(event.status)}
                      </button>
                    </td>
                    <td className="py-2 px-3">
                      <a
                        href={tool.link}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        {tool.name}
                      </a>
                    </td>
                    <td className="py-2 px-3 text-center relative">
                      {editingComment === event.id ? (
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={tempComment}
                            onChange={(e) => setTempComment(e.target.value)}
                            className="text-xs border rounded px-1 py-0.5 w-20"
                            placeholder="Add note..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                saveComment(event.id, tempComment);
                              }
                            }}
                          />
                          <button
                            onClick={() => saveComment(event.id, tempComment)}
                            className="text-xs bg-green-600 text-white px-1 py-0.5 rounded"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => {
                              setEditingComment(null);
                              setTempComment('');
                            }}
                            className="text-xs bg-gray-600 text-white px-1 py-0.5 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditingComment(event.id)}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                          title={itemComments[event.id] || "Add personal comment"}
                        >
                          {itemComments[event.id] ? '💬' : '+💬'}
                        </button>
                      )}
                      {itemComments[event.id] && (
                        <div className="absolute z-10 bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                          {itemComments[event.id]}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Documentation Section */}
      <Card className="shadow-sm mb-1 border border-gray-200">
        <CardHeader className="bg-gray-100 border-b border-gray-200 py-2">
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <FileCheck className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">DOCUMENTATION</div>
              <div className="text-xs text-gray-600">Document Storage & Management</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-0">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-2 px-3 font-medium text-gray-700 w-12">#</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Task</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 w-20">Status</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 w-32">Tool</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 w-24">Comment</th>
              </tr>
            </thead>
            <tbody>
              {documentationItems.map((item, index) => {
                const tool = getRecommendedTool(item.item);
                const totalPreviousItems = sections.reduce((acc, sec) => acc + sec.items.length, 0) + majorLifeEvents.length;
                const sequenceNumber = totalPreviousItems + index + 1;
                
                return (
                  <tr key={item.id} className={`${getRowClassName(item.status)} transition-colors border-b`}>
                    <td className="py-2 px-3 font-medium text-gray-700">{sequenceNumber}</td>
                    <td className="py-2 px-3 text-gray-900">{item.item}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => {
                          const index = documentationItems.findIndex(i => i.id === item.id);
                          const newStatus = cycleStatus(item.status);
                          documentationItems[index].status = newStatus;
                          setChecklistData([...checklistData]);
                        }}
                        className="text-lg hover:scale-110 transition-transform cursor-pointer"
                        title={getStatusText(item.status)}
                      >
                        {getStatusIcon(item.status)}
                      </button>
                    </td>
                    <td className="py-2 px-3">
                      <a
                        href={tool.link}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        {tool.name}
                      </a>
                    </td>
                    <td className="py-2 px-3 text-center relative">
                      {editingComment === item.id ? (
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={tempComment}
                            onChange={(e) => setTempComment(e.target.value)}
                            className="text-xs border rounded px-1 py-0.5 w-20"
                            placeholder="Add note..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                saveComment(item.id, tempComment);
                              }
                            }}
                          />
                          <button
                            onClick={() => saveComment(item.id, tempComment)}
                            className="text-xs bg-green-600 text-white px-1 py-0.5 rounded"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => {
                              setEditingComment(null);
                              setTempComment('');
                            }}
                            className="text-xs bg-gray-600 text-white px-1 py-0.5 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditingComment(item.id)}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                          title={itemComments[item.id] || "Add personal comment"}
                        >
                          {itemComments[item.id] ? '💬' : '+💬'}
                        </button>
                      )}
                      {itemComments[item.id] && (
                        <div className="absolute z-10 bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                          {itemComments[item.id]}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Monitoring Section */}
      <Card className="shadow-sm mb-1 border border-gray-200">
        <CardHeader className="bg-gray-100 border-b border-gray-200 py-2">
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
              <Target className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">MONITORING</div>
              <div className="text-xs text-gray-600">Annual Reviews & Tracking</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-0">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-2 px-3 font-medium text-gray-700 w-12">#</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Task</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 w-20">Status</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 w-32">Tool</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 w-24">Comment</th>
              </tr>
            </thead>
            <tbody>
              {monitoringItems.map((item, index) => {
                const tool = getRecommendedTool(item.item);
                const totalPreviousItems = sections.reduce((acc, sec) => acc + sec.items.length, 0) + majorLifeEvents.length + documentationItems.length;
                const sequenceNumber = totalPreviousItems + index + 1;
                
                return (
                  <tr key={item.id} className={`${getRowClassName(item.status)} transition-colors border-b`}>
                    <td className="py-2 px-3 font-medium text-gray-700">{sequenceNumber}</td>
                    <td className="py-2 px-3 text-gray-900">{item.item}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => {
                          const index = monitoringItems.findIndex(i => i.id === item.id);
                          const newStatus = cycleStatus(item.status);
                          monitoringItems[index].status = newStatus;
                          setChecklistData([...checklistData]);
                        }}
                        className="text-lg hover:scale-110 transition-transform cursor-pointer"
                        title={getStatusText(item.status)}
                      >
                        {getStatusIcon(item.status)}
                      </button>
                    </td>
                    <td className="py-2 px-3">
                      <a
                        href={tool.link}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        {tool.name}
                      </a>
                    </td>
                    <td className="py-2 px-3 text-center relative">
                      {editingComment === item.id ? (
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={tempComment}
                            onChange={(e) => setTempComment(e.target.value)}
                            className="text-xs border rounded px-1 py-0.5 w-20"
                            placeholder="Add note..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                saveComment(item.id, tempComment);
                              }
                            }}
                          />
                          <button
                            onClick={() => saveComment(item.id, tempComment)}
                            className="text-xs bg-green-600 text-white px-1 py-0.5 rounded"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => {
                              setEditingComment(null);
                              setTempComment('');
                            }}
                            className="text-xs bg-gray-600 text-white px-1 py-0.5 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditingComment(item.id)}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                          title={itemComments[item.id] || "Add personal comment"}
                        >
                          {itemComments[item.id] ? '💬' : '+💬'}
                        </button>
                      )}
                      {itemComments[item.id] && (
                        <div className="absolute z-10 bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                          {itemComments[item.id]}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Custom Items Section - Moved to Bottom */}
      {(customItems.length > 0 || showAddForm) && (
        <Card className="shadow-sm mb-4 border border-gray-200">
          <CardHeader className="bg-gray-100 border-b border-gray-200 py-2">
            <CardTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <Plus className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">CUSTOM ITEMS</div>
                  <div className="text-xs text-blue-600">Your Personalized Tasks</div>
                </div>
              </div>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Add Item
                </button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-0">
            {showAddForm && (
              <div className="p-4 border-b bg-blue-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      placeholder="Enter your custom financial task..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                    />
                  </div>
                  <div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="HIGH PRIORITY">High Priority</option>
                      <option value="MEDIUM PRIORITY">Medium Priority</option>
                      <option value="DEBT & TAX">Debt & Tax</option>
                      <option value="WEALTH BUILDING">Wealth Building</option>
                      <option value="PROTECTION">Protection</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={addCustomItem}
                    disabled={!newItemText.trim()}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewItemText('');
                    }}
                    className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {customItems.length > 0 && (
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-2 px-3 font-medium text-gray-700 w-12">#</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Task</th>
                    <th className="text-center py-2 px-3 font-medium text-gray-700 w-20">Status</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700 w-32">Tool</th>
                    <th className="text-center py-2 px-3 font-medium text-gray-700 w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customItems.map((item, index) => {
                    const tool = getRecommendedTool(item.item);
                    const totalPreviousItems = sections.reduce((acc, sec) => acc + sec.items.length, 0) + 
                                             majorLifeEvents.length + documentationItems.length + monitoringItems.length;
                    const sequenceNumber = totalPreviousItems + index + 1;
                    
                    return (
                      <tr key={item.id} className={`${getRowClassName(item.status)} transition-colors border-b`}>
                        <td className="py-2 px-3 font-medium text-gray-700">{sequenceNumber}</td>
                        <td className="py-2 px-3 text-gray-900">{item.item}</td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => {
                              const newStatus = cycleStatus(item.status);
                              setCustomItems(prev => 
                                prev.map(ci => ci.id === item.id ? { ...ci, status: newStatus as 'select' | 'yes' | 'no' | 'partially' } : ci)
                              );
                            }}
                            className="text-lg hover:scale-110 transition-transform cursor-pointer"
                            title={getStatusText(item.status)}
                          >
                            {getStatusIcon(item.status)}
                          </button>
                        </td>
                        <td className="py-2 px-3">
                          <a
                            href={tool.link}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            {tool.name}
                          </a>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                            onClick={() => setShowDeleteConfirm(item.id)}
                            title="Delete custom item"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Custom Item Button - Show when no custom items and form is hidden */}
      {customItems.length === 0 && !showAddForm && (
        <Card className="shadow-sm mb-4 border border-dashed border-blue-300 bg-blue-50">
          <CardContent className="p-4 text-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="text-base">Add Custom Financial Task</span>
            </button>
            <p className="text-sm text-gray-600 mt-2">Personalize your checklist with your own financial goals</p>
          </CardContent>
        </Card>
          )}

          {/* Smart Tips */}
          <Card className="bg-blue-50 shadow-sm">
            <CardHeader className="py-2">
              <CardTitle className="text-blue-800 text-sm">Smart Financial Planning Tips</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-2 text-xs text-blue-700">
                <div>• Use financial calculators to review and plan each task</div>
                <div>• Items change color based on your completion status</div>
                <div>• Your progress is automatically saved and tracked</div>
                <div>• Set target dates for critical items like insurance and 401k setup</div>
              </div>
            </CardContent>
          </Card>
          </>
        )}

        {/* Timeline View Tab */}
        {activeTab === 'timeline' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Financial Timeline View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-l-2 border-gray-200 pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.level}</p>
                      </div>
                      <div className="space-y-3">
                        {section.items.map((item) => {
                          const currentItem = checklistData.find(data => data.id === item.id);
                          const status = currentItem?.status || item.status;
                          const isCompleted = status === 'yes';
                          const isInProgress = status === 'partially';
                          
                          return (
                            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <button
                                onClick={() => updateItemStatus(item.id, cycleStatus(status))}
                                className="text-lg hover:scale-110 transition-transform cursor-pointer"
                                title={getStatusText(status)}
                              >
                                {getStatusIcon(status)}
                              </button>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{item.item}</p>
                              </div>
                              <div className="text-right">
                                <div className={`text-xs px-2 py-1 rounded ${
                                  isCompleted ? 'bg-green-100 text-green-800' : 
                                  isInProgress ? 'bg-blue-100 text-blue-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Planned'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this custom item? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showDeleteConfirm) {
                    removeCustomItem(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Default Item Delete Confirmation Dialog */}
      {showDefaultDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cannot Delete Default Item</h3>
            <p className="text-gray-600 mb-6">
              This is a core financial checklist item that cannot be deleted. Default items are essential for comprehensive financial planning.
            </p>
            <p className="text-blue-600 text-sm mb-6 font-medium">
              You can change the status of this item or use the "Reset All" option to restore default settings.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDefaultDeleteConfirm(null)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset all checklist items to their default state? This will:
            </p>
            <ul className="text-sm text-gray-600 mb-6 list-disc list-inside space-y-1">
              <li>Reset all status selections to "Not Set"</li>
              <li>Remove all custom items</li>
              <li>Clear all progress data</li>
            </ul>
            <p className="text-red-600 text-sm mb-6 font-medium">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={resetToDefault}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}