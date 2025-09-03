import React from 'react';

interface CalculatorHeaderVisualProps {
  title: string;
  description: string;
  currentValue?: number;
  targetValue?: number;
  category: 'investment' | 'savings' | 'loan' | 'retirement' | 'tax' | 'default';
}

const CalculatorHeaderVisual: React.FC<CalculatorHeaderVisualProps> = ({
  title,
  description,
  currentValue = 0,
  targetValue = 100000,
  category = 'default'
}) => {
  const progress = Math.min((currentValue / targetValue) * 100, 100);
  
  // Category-specific colors and icons
  const categoryConfig = {
    investment: {
      primaryColor: '#3b82f6',
      secondaryColor: '#1d4ed8',
      accentColor: '#10b981',
      icon: '📈',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    savings: {
      primaryColor: '#10b981',
      secondaryColor: '#059669',
      accentColor: '#f59e0b',
      icon: '💰',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    loan: {
      primaryColor: '#f59e0b',
      secondaryColor: '#d97706',
      accentColor: '#dc2626',
      icon: '🏠',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    retirement: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#7c3aed',
      accentColor: '#10b981',
      icon: '🎯',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    tax: {
      primaryColor: '#dc2626',
      secondaryColor: '#b91c1c',
      accentColor: '#059669',
      icon: '📋',
      bgGradient: 'from-red-50 to-rose-50'
    },
    default: {
      primaryColor: '#6b7280',
      secondaryColor: '#4b5563',
      accentColor: '#3b82f6',
      icon: '💼',
      bgGradient: 'from-gray-50 to-slate-50'
    }
  };

  const config = categoryConfig[category];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${config.bgGradient} rounded-lg border border-gray-200 mb-8`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={config.primaryColor} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
          </div>
          
          {/* Progress Indicator */}
          <div className="hidden md:flex flex-col items-center">
            <div className="relative">
              <svg width="120" height="120" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={config.primaryColor}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${progress * 3.14} 314`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: config.primaryColor }}>
                    {Math.round(progress)}%
                  </div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar with Milestone */}
        <div className="relative">
          {/* Main Progress Track */}
          <div className="relative h-4 bg-white rounded-full shadow-inner border border-gray-200">
            {/* Progress Fill */}
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${config.primaryColor}, ${config.secondaryColor})`
              }}
            />
            
            {/* Milestone Markers */}
            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gray-300 rounded-full" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300 rounded-full" />
            <div className="absolute top-0 left-3/4 w-0.5 h-full bg-gray-300 rounded-full" />
          </div>

          {/* Moving Calculator Icon */}
          <div 
            className="absolute -top-2 transition-all duration-1000 ease-out"
            style={{ left: `calc(${progress}% - 16px)` }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: config.accentColor }}
            >
              <span className="text-lg">🧮</span>
            </div>
          </div>

          {/* Current Value Display */}
          <div 
            className="absolute -top-12 transition-all duration-1000 ease-out"
            style={{ left: `calc(${progress}% - 40px)` }}
          >
            <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
              <div className="text-sm font-semibold text-gray-800">
                ${currentValue.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Goal Flag at End */}
          <div className="absolute -top-6 right-0">
            <div className="flex flex-col items-center">
              <div 
                className="px-3 py-1 rounded-lg text-white text-sm font-semibold shadow-md"
                style={{ backgroundColor: config.accentColor }}
              >
                Goal: ${targetValue.toLocaleString()}
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" 
                   style={{ borderTopColor: config.accentColor }} />
            </div>
          </div>
        </div>

        {/* Milestone Labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span>Start</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>Goal</span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Progress</div>
            <div className="text-lg font-semibold" style={{ color: config.primaryColor }}>
              {Math.round(progress)}%
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Current</div>
            <div className="text-lg font-semibold text-gray-800">
              ${currentValue.toLocaleString()}
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Remaining</div>
            <div className="text-lg font-semibold text-gray-800">
              ${Math.max(0, targetValue - currentValue).toLocaleString()}
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Target</div>
            <div className="text-lg font-semibold" style={{ color: config.accentColor }}>
              ${targetValue.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorHeaderVisual;