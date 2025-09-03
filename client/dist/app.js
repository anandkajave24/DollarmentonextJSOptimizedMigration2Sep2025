// RupeeSmart Complete Application
const { useState, useEffect, useCallback, useMemo } = React;

// Sample data for financial calculations
const samplePortfolio = {
    totalValue: 1250000,
    monthlyInvestment: 15000,
    totalGains: 180000,
    portfolioItems: [
        { name: 'SIP Mutual Funds', value: 680000, allocation: 54.4 },
        { name: 'Direct Equity', value: 320000, allocation: 25.6 },
        { name: 'Fixed Deposits', value: 150000, allocation: 12.0 },
        { name: 'EPF/PPF', value: 100000, allocation: 8.0 }
    ]
};

// Main Application Component
const RupeeSmart = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [calculationResults, setCalculationResults] = useState({});

    // Navigation configuration
    const navigation = [
        { id: 'dashboard', name: 'Dashboard', icon: '📊', category: 'main' },
        { id: 'tax-calculator', name: 'Tax Calculator', icon: '💰', category: 'calculators' },
        { id: 'sip-calculator', name: 'SIP Calculator', icon: '📈', category: 'calculators' },
        { id: 'emi-calculator', name: 'EMI Calculator', icon: '🏠', category: 'calculators' },
        { id: 'retirement-calculator', name: 'Retirement Calculator', icon: '🏖️', category: 'calculators' },
        { id: 'ppf-calculator', name: 'PPF Calculator', icon: '💼', category: 'calculators' },
        { id: 'budget-buddy', name: 'Budget Buddy', icon: '💸', category: 'budget' },
        { id: 'expense-tracker', name: 'Expense Tracker', icon: '📝', category: 'budget' },
        { id: 'financial-health', name: 'Financial Health Report', icon: '🩺', category: 'reports' },
        { id: 'learning-hub', name: 'Learning Hub', icon: '📚', category: 'education' },
        { id: 'insurance-hub', name: 'Insurance Hub', icon: '🛡️', category: 'insurance' },
        { id: 'government-schemes', name: 'Government Schemes', icon: '🏛️', category: 'schemes' },
        { id: 'investment-puzzles', name: 'Investment Games', icon: '🧩', category: 'games' },
        { id: 'portfolio-analyzer', name: 'Portfolio Analyzer', icon: '📊', category: 'analysis' },
        { id: 'goal-tracker', name: 'Goal Tracker', icon: '🎯', category: 'planning' }
    ];

    // Handle form updates
    const updateFormData = useCallback((page, field, value) => {
        setFormData(prev => ({
            ...prev,
            [page]: {
                ...prev[page],
                [field]: value
            }
        }));
    }, []);

    // Calculator functions
    const calculateTax = useCallback((income, regime, deductions) => {
        const taxableIncome = Math.max(0, income - deductions);
        let tax = 0;
        
        if (regime === 'new') {
            // New tax regime calculation
            if (taxableIncome > 300000) tax += Math.min(taxableIncome - 300000, 300000) * 0.05;
            if (taxableIncome > 600000) tax += Math.min(taxableIncome - 600000, 300000) * 0.10;
            if (taxableIncome > 900000) tax += Math.min(taxableIncome - 900000, 300000) * 0.15;
            if (taxableIncome > 1200000) tax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
            if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
        } else {
            // Old tax regime calculation
            if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
            if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
            if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
        }
        
        return Math.round(tax);
    }, []);

    const calculateSIP = useCallback((monthly, rate, years) => {
        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        const futureValue = monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate);
        const totalInvestment = monthly * months;
        const totalGains = futureValue - totalInvestment;
        
        return {
            futureValue: Math.round(futureValue),
            totalInvestment: Math.round(totalInvestment),
            totalGains: Math.round(totalGains)
        };
    }, []);

    const calculateEMI = useCallback((principal, rate, years) => {
        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        const emi = principal * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1);
        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;
        
        return {
            emi: Math.round(emi),
            totalAmount: Math.round(totalAmount),
            totalInterest: Math.round(totalInterest)
        };
    }, []);

    // Dashboard Component
    const Dashboard = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
                <h1 className="text-4xl font-bold mb-2">Welcome to RupeeSmart</h1>
                <p className="text-xl opacity-90">Your Complete Financial Learning Platform</p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold">45+</div>
                        <div className="text-sm opacity-80">Calculators</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">114</div>
                        <div className="text-sm opacity-80">Pages</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">Free</div>
                        <div className="text-sm opacity-80">Access</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">AI</div>
                        <div className="text-sm opacity-80">Powered</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Portfolio Overview</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Value</span>
                            <span className="font-semibold">₹{samplePortfolio.totalValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Monthly SIP</span>
                            <span className="font-semibold">₹{samplePortfolio.monthlyInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Gains</span>
                            <span className="font-semibold text-green-600">₹{samplePortfolio.totalGains.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                        <button 
                            onClick={() => setCurrentPage('tax-calculator')}
                            className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Calculate Tax
                        </button>
                        <button 
                            onClick={() => setCurrentPage('sip-calculator')}
                            className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Plan SIP Investment
                        </button>
                        <button 
                            onClick={() => setCurrentPage('budget-buddy')}
                            className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Track Budget
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">• Tax Planning Strategies</div>
                        <div className="text-sm text-gray-600">• Investment Basics</div>
                        <div className="text-sm text-gray-600">• Retirement Planning</div>
                        <div className="text-sm text-gray-600">• Insurance Planning</div>
                        <button 
                            onClick={() => setCurrentPage('learning-hub')}
                            className="mt-2 text-blue-600 text-sm hover:underline"
                        >
                            View All Resources →
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {navigation.filter(item => item.category === 'calculators').map((item) => (
                    <div key={item.id} 
                         className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => setCurrentPage(item.id)}>
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-600">Advanced financial tool</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Tax Calculator Component
    const TaxCalculator = () => {
        const [income, setIncome] = useState(formData['tax-calculator']?.income || '');
        const [regime, setRegime] = useState(formData['tax-calculator']?.regime || 'new');
        const [deductions, setDeductions] = useState(formData['tax-calculator']?.deductions || '');
        const [results, setResults] = useState(null);

        const handleCalculate = () => {
            const taxPayable = calculateTax(parseFloat(income) || 0, regime, parseFloat(deductions) || 0);
            const taxableIncome = Math.max(0, (parseFloat(income) || 0) - (parseFloat(deductions) || 0));
            
            setResults({
                grossIncome: parseFloat(income) || 0,
                totalDeductions: parseFloat(deductions) || 0,
                taxableIncome,
                taxPayable
            });
        };

        return (
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Tax Calculator</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
                                <input 
                                    type="number" 
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Enter annual income" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Regime</label>
                                <select 
                                    value={regime}
                                    onChange={(e) => setRegime(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="new">New Tax Regime</option>
                                    <option value="old">Old Tax Regime</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deductions (₹)</label>
                                <input 
                                    type="number" 
                                    value={deductions}
                                    onChange={(e) => setDeductions(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Enter deductions" 
                                />
                            </div>
                            <button 
                                onClick={handleCalculate}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Calculate Tax
                            </button>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-4">Tax Calculation Results</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Gross Income:</span>
                                    <span className="font-semibold">₹{results ? results.grossIncome.toLocaleString() : '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Deductions:</span>
                                    <span className="font-semibold">₹{results ? results.totalDeductions.toLocaleString() : '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxable Income:</span>
                                    <span className="font-semibold">₹{results ? results.taxableIncome.toLocaleString() : '0'}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Tax Payable:</span>
                                    <span className="text-red-600">₹{results ? results.taxPayable.toLocaleString() : '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // SIP Calculator Component
    const SIPCalculator = () => {
        const [monthly, setMonthly] = useState(formData['sip-calculator']?.monthly || '');
        const [rate, setRate] = useState(formData['sip-calculator']?.rate || '12');
        const [years, setYears] = useState(formData['sip-calculator']?.years || '');
        const [results, setResults] = useState(null);

        const handleCalculate = () => {
            const sipResults = calculateSIP(parseFloat(monthly) || 0, parseFloat(rate) || 0, parseFloat(years) || 0);
            setResults(sipResults);
        };

        return (
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">SIP Calculator</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
                                <input 
                                    type="number" 
                                    value={monthly}
                                    onChange={(e) => setMonthly(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Enter monthly SIP amount" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                                <input 
                                    type="number" 
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Enter expected return rate" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                                <input 
                                    type="number" 
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Enter investment duration" 
                                />
                            </div>
                            <button 
                                onClick={handleCalculate}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Calculate SIP
                            </button>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-4">SIP Calculation Results</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Total Investment:</span>
                                    <span className="font-semibold">₹{results ? results.totalInvestment.toLocaleString() : '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Gains:</span>
                                    <span className="font-semibold text-green-600">₹{results ? results.totalGains.toLocaleString() : '0'}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Maturity Value:</span>
                                    <span className="text-blue-600">₹{results ? results.futureValue.toLocaleString() : '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Generic page component for other features
    const GenericPage = ({ title, description, category }) => (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Coming Soon</h3>
                    <p className="text-sm text-gray-600">This feature is part of the complete RupeeSmart platform. Full functionality will be available in the production version.</p>
                </div>
            </div>
        </div>
    );

    // Page renderer
    const renderPage = () => {
        const currentNav = navigation.find(item => item.id === currentPage);
        
        switch(currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'tax-calculator':
                return <TaxCalculator />;
            case 'sip-calculator':
                return <SIPCalculator />;
            default:
                return <GenericPage 
                    title={currentNav?.name || 'Feature'} 
                    description={`Advanced ${currentNav?.name.toLowerCase()} functionality`}
                    category={currentNav?.category}
                />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
                            >
                                ☰
                            </button>
                            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
                                RupeeSmart
                            </h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            {navigation.slice(0, 6).map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                                        currentPage === item.id 
                                            ? 'text-blue-600 bg-blue-50' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">RupeeSmart</h2>
                            <nav className="space-y-2">
                                {navigation.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setCurrentPage(item.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                                            currentPage === item.id 
                                                ? 'bg-blue-50 text-blue-600' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

// Initialize the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(RupeeSmart));
