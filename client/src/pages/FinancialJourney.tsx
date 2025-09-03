"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  Home, 
  GraduationCap, 
  CreditCard, 
  User, 
  Shield, 
  Target, 
  PiggyBank,
  Trophy,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  DollarSign,
  BarChart3,
  Calculator,
  BookOpen,
  Video,
  FileText,
  Award,
  Zap,
  Calendar,
  Eye,
  Edit3,
  Save,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SEO } from '../components/SEO';
import FinancialDisclaimer from '../components/FinancialDisclaimer';

interface Milestone {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
  completion: number;
  nextStep: string;
  description: string;
  icon: React.ReactNode;
  estimatedTimeline: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  requirement: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  estimated_months: number;
  priority: number;
}

// Initialize with sample data that users can edit
const initialProgressData = [
  { month: 'Jan', netWorth: 5000, debt: 15000, savings: 2000 },
  { month: 'Feb', netWorth: 5500, debt: 14200, savings: 2800 },
  { month: 'Mar', netWorth: 6200, debt: 13500, savings: 3500 },
  { month: 'Apr', netWorth: 6800, debt: 12800, savings: 4200 },
  { month: 'May', netWorth: 7500, debt: 12000, savings: 5000 },
  { month: 'Jun', netWorth: 8200, debt: 11200, savings: 5800 }
];

const FinancialJourney: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'roadmap' | 'timeline'>('dashboard');
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null);
  const [userMilestones, setUserMilestones] = useState<Milestone[]>([]);
  const [userProgressData, setUserProgressData] = useState(() => [
    { month: 'Jan', netWorth: 5000, debt: 15000, savings: 2000 },
    { month: 'Feb', netWorth: 5500, debt: 14200, savings: 2800 },
    { month: 'Mar', netWorth: 6200, debt: 13500, savings: 3500 },
    { month: 'Apr', netWorth: 6800, debt: 12800, savings: 4200 },
    { month: 'May', netWorth: 7500, debt: 12000, savings: 5000 },
    { month: 'Jun', netWorth: 8200, debt: 11200, savings: 5800 }
  ]);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    category: 'Security',
    estimatedTimeline: ''
  });



  React.useEffect(() => {
    // Clear any potentially corrupted data on initial load
    try {
      const savedMilestones = localStorage.getItem('financial-journey-milestones');
      const savedProgressData = localStorage.getItem('financial-journey-progress');
      
      if (savedMilestones && savedMilestones !== 'undefined') {
        const parsedMilestones = JSON.parse(savedMilestones);
        // Restore icons based on milestone IDs or use default icons
        const milestonesWithIcons = parsedMilestones.map((milestone: any) => {
          const originalMilestone = milestones.find(m => m.id === milestone.id);
          return {
            ...milestone,
            icon: originalMilestone?.icon || <Target className="w-5 h-5 text-blue-600" />
          };
        });
        setUserMilestones(milestonesWithIcons);
      } else {
        setUserMilestones(milestones);
      }
      
      if (savedProgressData && savedProgressData !== 'undefined') {
        setUserProgressData(JSON.parse(savedProgressData));
      }
    } catch (error) {
      console.error('Error loading saved data, clearing localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('financial-journey-milestones');
      localStorage.removeItem('financial-journey-progress');
      setUserMilestones(milestones);
    }
  }, []);

  const saveMilestones = (updatedMilestones: Milestone[]) => {
    setUserMilestones(updatedMilestones);
    try {
      // Save without the React icons to avoid circular reference
      const serializableMilestones = updatedMilestones.map(({ icon, ...milestone }) => milestone);
      localStorage.setItem('financial-journey-milestones', JSON.stringify(serializableMilestones));
    } catch (error) {
      console.error('Error saving milestones:', error);
    }
  };

  const saveProgressData = (updatedData: any[]) => {
    setUserProgressData(updatedData);
    try {
      localStorage.setItem('financial-journey-progress', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving progress data:', error);
    }
  };

  const toggleMilestoneStatus = (milestoneId: string) => {
    const updatedMilestones = userMilestones.map(milestone => {
      if (milestone.id === milestoneId) {
        let newStatus = milestone.status;
        let newCompletion = milestone.completion;
        
        if (milestone.status === 'not-started') {
          newStatus = 'in-progress';
          newCompletion = 25;
        } else if (milestone.status === 'in-progress') {
          newStatus = 'completed';
          newCompletion = 100;
        } else {
          newStatus = 'not-started';
          newCompletion = 0;
        }
        
        return { ...milestone, status: newStatus, completion: newCompletion };
      }
      return milestone;
    });
    saveMilestones(updatedMilestones);
  };

  const updateMilestoneCompletion = (milestoneId: string, completion: number) => {
    const updatedMilestones = userMilestones.map(milestone => {
      if (milestone.id === milestoneId) {
        let newStatus = milestone.status;
        if (completion === 0) newStatus = 'not-started';
        else if (completion === 100) newStatus = 'completed';
        else newStatus = 'in-progress';
        
        return { ...milestone, completion, status: newStatus };
      }
      return milestone;
    });
    saveMilestones(updatedMilestones);
  };

  const addCustomMilestone = () => {
    if (!newMilestone.title.trim()) return;
    
    const customMilestone: Milestone = {
      id: `custom-${Date.now()}`,
      title: newMilestone.title,
      description: newMilestone.description,
      icon: <Target className="w-5 h-5 text-blue-600" />,
      status: 'not-started',
      completion: 0,
      nextStep: 'Define action plan',
      estimatedTimeline: newMilestone.estimatedTimeline,
      category: newMilestone.category,
      priority: newMilestone.priority
    };
    
    saveMilestones([...userMilestones, customMilestone]);
    setNewMilestone({
      title: '',
      description: '',
      priority: 'medium',
      category: 'Security',
      estimatedTimeline: ''
    });
    setShowAddMilestone(false);
  };

  const deleteMilestone = (milestoneId: string) => {
    const updatedMilestones = userMilestones.filter(m => m.id !== milestoneId);
    saveMilestones(updatedMilestones);
  };

  // Financial milestones with detailed tracking
  const milestones: Milestone[] = [
    {
      id: 'emergency-fund',
      title: 'Emergency Fund',
      status: 'completed',
      completion: 100,
      nextStep: 'Continue building to 6 months',
      description: 'Build 3-6 months of expenses in savings',
      icon: <Shield className="w-5 h-5" />,
      estimatedTimeline: 'Completed',
      priority: 'high',
      category: 'Security'
    },
    {
      id: 'credit-score',
      title: 'Credit Score Boost',
      status: 'in-progress',
      completion: 60,
      nextStep: 'Pay off 2 credit cards',
      description: 'Improve credit score to 750+',
      icon: <CreditCard className="w-5 h-5" />,
      estimatedTimeline: '4 months',
      priority: 'high',
      category: 'Credit'
    },
    {
      id: 'retirement-savings',
      title: 'Retirement Savings',
      status: 'not-started',
      completion: 0,
      nextStep: 'Open a Roth IRA',
      description: 'Start investing 15% for retirement',
      icon: <User className="w-5 h-5" />,
      estimatedTimeline: '6 months',
      priority: 'medium',
      category: 'Investment'
    },
    {
      id: 'debt-free',
      title: 'Debt-Free Goal',
      status: 'in-progress',
      completion: 40,
      nextStep: 'Increase monthly payment',
      description: 'Pay off all high-interest debt',
      icon: <Target className="w-5 h-5" />,
      estimatedTimeline: '18 months',
      priority: 'high',
      category: 'Debt'
    },
    {
      id: 'home-ownership',
      title: 'Home Ownership',
      status: 'not-started',
      completion: 0,
      nextStep: 'Start saving for down payment',
      description: 'Save 20% down payment for home',
      icon: <Home className="w-5 h-5" />,
      estimatedTimeline: '3 years',
      priority: 'medium',
      category: 'Investment'
    },
    {
      id: 'investment-portfolio',
      title: 'Investment Portfolio',
      status: 'not-started',
      completion: 0,
      nextStep: 'Open brokerage account',
      description: 'Build diversified investment portfolio',
      icon: <TrendingUp className="w-5 h-5" />,
      estimatedTimeline: '2 years',
      priority: 'medium',
      category: 'Investment'
    }
  ];

  // Smart financial roadmap steps
  const roadmapSteps: RoadmapStep[] = [
    {
      id: 'debt-payoff',
      title: 'Pay off high-interest debt',
      description: 'Focus on credit cards and personal loans first',
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      completed: false,
      estimated_months: 12,
      priority: 1
    },
    {
      id: 'emergency-fund',
      title: 'Build 3-month emergency fund',
      description: 'Save $15,000 in high-yield savings account',
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      completed: true,
      estimated_months: 8,
      priority: 2
    },
    {
      id: 'investment-start',
      title: 'Invest 15% in diversified portfolio',
      description: 'Open Roth IRA and start with index funds',
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      completed: false,
      estimated_months: 6,
      priority: 3
    },
    {
      id: 'home-saving',
      title: 'Save for home down payment',
      description: 'Target $80,000 for 20% down payment',
      icon: <Home className="w-6 h-6 text-purple-500" />,
      completed: false,
      estimated_months: 36,
      priority: 4
    },
    {
      id: 'retirement-max',
      title: 'Max out 401(k) + Roth IRA',
      description: 'Contribute maximum amounts annually',
      icon: <User className="w-6 h-6 text-orange-500" />,
      completed: false,
      estimated_months: 24,
      priority: 5
    }
  ];

  // Achievement badges system
  const badges: Badge[] = [
    {
      id: 'debt-destroyer',
      title: 'Debt Destroyer',
      description: 'Pay off 3 credit card balances',
      icon: <Trophy className="w-5 h-5" />,
      earned: false,
      progress: 33,
      requirement: '1/3 credit cards paid off'
    },
    {
      id: 'investor-rookie',
      title: 'Investor Rookie',
      description: 'First $500 invested in ETFs',
      icon: <Star className="w-5 h-5" />,
      earned: false,
      progress: 0,
      requirement: '$0 / $500 invested'
    },
    {
      id: 'emergency-ready',
      title: 'Emergency Ready',
      description: '3-month emergency fund built',
      icon: <Shield className="w-5 h-5" />,
      earned: true,
      progress: 100,
      requirement: 'Completed!'
    },
    {
      id: 'credit-champion',
      title: 'Credit Champion',
      description: 'Reach 750+ credit score',
      icon: <Award className="w-5 h-5" />,
      earned: false,
      progress: 60,
      requirement: '720 / 750 credit score'
    }
  ];

  // Educational resources
  const resources = [
    {
      id: 'tax-planning',
      title: 'Tax Planning Guide',
      description: 'Maximize deductions and save on taxes',
      icon: <Calculator className="w-5 h-5" />,
      type: 'calculator',
      link: '/tax-calculator'
    },
    {
      id: 'retirement-explained',
      title: 'Retirement Explained Simply',
      description: '401(k) vs Roth IRA comparison',
      icon: <Video className="w-5 h-5" />,
      type: 'video',
      link: '#'
    },
    {
      id: 'investment-strategies',
      title: 'Investment Strategies',
      description: 'Build wealth with index funds',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'article',
      link: '#'
    },
    {
      id: 'budget-planner',
      title: 'Budget Planner',
      description: 'Track income and expenses',
      icon: <PiggyBank className="w-5 h-5" />,
      type: 'calculator',
      link: '/budget-planner-calculator'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'not-started':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'not-started':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="px-4 py-6">
      <SEO 
        title="Financial Journey Tracker - Milestone Progress & Roadmap Planning"
        description="Track your financial progress with milestone tracking, achievement badges, and personalized roadmaps. Set goals, visualize progress, and build your path to financial success."
        keywords="financial journey, milestone tracking, financial goals, progress tracking, financial roadmap, achievement badges, financial planning, budget milestones"
        canonical="https://dollarmento.com/financial-journey"
      />
      
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Journey</h1>
        <p className="text-gray-600">
          Track your progress, set milestones, and build your roadmap to financial success.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'roadmap', label: 'Smart Roadmap', icon: <Target className="w-4 h-4" /> },
              { id: 'timeline', label: 'Timeline View', icon: <Calendar className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 py-3 border-b-2 transition-colors ${
                  activeView === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {userMilestones.filter(m => m.status === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-600">Completed Milestones</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {userMilestones.filter(m => m.status === 'in-progress').length}
                    </p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Target className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-600">
                      {Math.round(userMilestones.reduce((sum, m) => sum + m.completion, 0) / userMilestones.length) || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>My Financial Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Milestone</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Completion</th>
                        <th className="text-left p-3">Next Step</th>
                        <th className="text-left p-3">Timeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userMilestones.map((milestone) => (
                        <tr key={milestone.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              {milestone.icon}
                              <div>
                                <div className="font-medium">{milestone.title}</div>
                                <div className="text-sm text-gray-500">{milestone.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleMilestoneStatus(milestone.id)}
                                className="p-1"
                              >
                                {getStatusIcon(milestone.status)}
                              </Button>
                              <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                                {milestone.status === 'completed' ? 'Completed' : 
                                 milestone.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1">
                              <Input
                                type="range"
                                min="0"
                                max="100"
                                value={milestone.completion}
                                onChange={(e) => updateMilestoneCompletion(milestone.id, parseInt(e.target.value))}
                                className="w-24 h-2"
                              />
                              <span className="text-sm text-gray-500">{milestone.completion}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{milestone.nextStep}</td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{milestone.estimatedTimeline}</span>
                              {milestone.id.startsWith('custom-') && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteMilestone(milestone.id)}
                                  className="p-1 text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Add Custom Milestone Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Dialog open={showAddMilestone} onOpenChange={setShowAddMilestone}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Milestone
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Custom Financial Milestone</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Milestone Title</Label>
                          <Input
                            id="title"
                            value={newMilestone.title}
                            onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                            placeholder="e.g., Build vacation fund"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newMilestone.description}
                            onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                            placeholder="Describe your financial goal..."
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={newMilestone.category} onValueChange={(value) => setNewMilestone({...newMilestone, category: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Security">Security</SelectItem>
                              <SelectItem value="Growth">Growth</SelectItem>
                              <SelectItem value="Protection">Protection</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="timeline">Estimated Timeline</Label>
                          <Input
                            id="timeline"
                            value={newMilestone.estimatedTimeline}
                            onChange={(e) => setNewMilestone({...newMilestone, estimatedTimeline: e.target.value})}
                            placeholder="e.g., 6 months"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowAddMilestone(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addCustomMilestone}>
                          <Save className="w-4 h-4 mr-2" />
                          Create Milestone
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Financial Progress Over Time</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingMilestone(editingMilestone ? null : 'progress')}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {editingMilestone === 'progress' ? 'Done Editing' : 'Edit Data'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingMilestone === 'progress' ? (
                  <div className="space-y-4 mb-6">
                    <div className="text-sm text-gray-600 mb-4">
                      Edit your financial data by updating the values below. Changes will be reflected in the chart instantly.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userProgressData.map((data, index) => (
                        <div key={data.month} className="p-4 border border-gray-200 rounded-lg space-y-3">
                          <h4 className="font-medium text-center">{data.month}</h4>
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs text-gray-600">Net Worth</Label>
                              <Input
                                type="number"
                                value={data.netWorth}
                                onChange={(e) => {
                                  const newData = [...userProgressData];
                                  newData[index].netWorth = parseInt(e.target.value) || 0;
                                  saveProgressData(newData);
                                }}
                                className="h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Debt</Label>
                              <Input
                                type="number"
                                value={data.debt}
                                onChange={(e) => {
                                  const newData = [...userProgressData];
                                  newData[index].debt = parseInt(e.target.value) || 0;
                                  saveProgressData(newData);
                                }}
                                className="h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Savings</Label>
                              <Input
                                type="number"
                                value={data.savings}
                                onChange={(e) => {
                                  const newData = [...userProgressData];
                                  newData[index].savings = parseInt(e.target.value) || 0;
                                  saveProgressData(newData);
                                }}
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Line type="monotone" dataKey="netWorth" stroke="#3b82f6" strokeWidth={3} name="Net Worth" />
                      <Line type="monotone" dataKey="debt" stroke="#ef4444" strokeWidth={2} name="Debt" />
                      <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} name="Savings" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className="text-blue-600 mt-0.5">💡</div>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Chart Analysis:</p>
                      <p>This chart shows your <strong>financial progress trends</strong>. The red line (debt) should generally decrease, while blue (net worth) and green (savings) should increase over time. Click "Edit Data" to customize with your actual financial numbers.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Achievement Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-4 rounded-lg border-2 ${
                        badge.earned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${badge.earned ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                          {badge.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{badge.title}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                      </div>
                      <Progress value={badge.progress} className="mb-2" />
                      <p className="text-xs text-gray-500">{badge.requirement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Roadmap View */}
        {activeView === 'roadmap' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Your Smart Financial Path</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {roadmapSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`p-3 rounded-full ${step.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {step.icon}
                        </div>
                        {index < roadmapSteps.length - 1 && (
                          <div className={`w-0.5 h-16 mt-2 ${step.completed ? 'bg-green-400' : 'bg-gray-300'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <Card className={`${step.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">
                                  Step {step.priority}: {step.title}
                                </h3>
                                <p className="text-gray-600 mb-3">{step.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{step.estimated_months} months</span>
                                  </span>
                                  {step.completed && (
                                    <Badge className="bg-green-100 text-green-800">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {!step.completed && (
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Learn More
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Timeline View */}
        {activeView === 'timeline' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Timeline Mode</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  
                  <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start space-x-6">
                        {/* Timeline Dot */}
                        <div className={`w-4 h-4 rounded-full border-4 border-white ${getStatusColor(milestone.status)} shadow-lg z-10`}></div>
                        
                        {/* Milestone Card */}
                        <Card 
                          className={`flex-1 cursor-pointer transition-all hover:shadow-md border-l-4 ${getPriorityColor(milestone.priority)}`}
                          onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {milestone.icon}
                                <div>
                                  <h3 className="font-semibold">{milestone.title}</h3>
                                  <p className="text-sm text-gray-600">{milestone.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={milestone.priority === 'high' ? 'destructive' : 'secondary'}>
                                  {milestone.priority} priority
                                </Badge>
                                <div className="text-sm text-gray-500 mt-1">{milestone.estimatedTimeline}</div>
                              </div>
                            </div>
                            
                            {selectedMilestone === milestone.id && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Progress</h4>
                                    <Progress value={milestone.completion} className="mb-2" />
                                    <p className="text-sm text-gray-600">{milestone.completion}% complete</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Next Action</h4>
                                    <p className="text-sm">{milestone.nextStep}</p>
                                    <Button size="sm" className="mt-2">
                                      Take Action
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Resources Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Learn More. Grow Faster.</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      {resource.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <Badge variant="outline">{resource.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Disclaimer */}
        <div className="mt-8">
          <FinancialDisclaimer 
            variant="compact" 
            calculatorType="generic"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialJourney;