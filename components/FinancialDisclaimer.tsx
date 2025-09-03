import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface FinancialDisclaimerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'subtle' | 'compact';
  calculatorType?: 'sip' | 'ppf' | 'homeloan' | 'retirement' | 'generic';
}

const FinancialDisclaimer: React.FC<FinancialDisclaimerProps> = ({
  className = '',
  size = 'md',
  variant = 'default',
  calculatorType = 'generic'
}) => {
  // Define text sizes based on the size prop
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Customize disclaimer based on calculator type
  let textContent = '';
  
  switch (calculatorType) {
    case 'sip':
      textContent = 'For educational purposes only. investment calculations are based on projected returns. Actual investment returns might vary significantly due to market fluctuations and fund performance. The calculator assumes a fixed rate of return compounded annually. Past performance is not indicative of future returns. We strongly recommend consulting with a SEBI-registered financial adviser before making investment decisions.';
      break;
    case 'ppf':
      textContent = 'For educational purposes only. PPF calculations show hypothetical scenarios based on current interest rates. Actual returns might vary as PPF interest rates are subject to periodic revision by the government. These projections should not be considered a guarantee of future performance. We recommend consulting with a SEBI-registered financial adviser for personalized savings guidance.';
      break;
    case 'homeloan':
      textContent = 'For educational purposes only. Home loan EMI calculations are based on current interest rate scenarios. Actual loan terms, eligibility, and interest rates might vary based on lender policies, credit score, and other factors. We strongly recommend consulting with a financial adviser and comparing multiple lenders before making borrowing decisions.';
      break;
    case 'retirement':
      textContent = 'For educational purposes only. Retirement calculations are projections based on assumptions about inflation, investment returns, and life expectancy. Actual retirement needs might vary significantly based on future economic conditions and personal circumstances. We strongly recommend consulting with a SEBI-registered financial adviser for personalized retirement planning.';
      break;
    default:
      textContent = 'For educational purposes only. These calculations present hypothetical scenarios based on historical data. Actual returns might vary significantly. We strongly recommend consulting with a SEBI-registered financial adviser for personalized guidance tailored to your specific situation.';
  }

  // Style can still vary based on variant
  let styling = '';
  switch (variant) {
    case 'subtle':
      styling = 'bg-amber-50 text-amber-800 border-amber-200';
      break;
    case 'compact':
      styling = 'bg-slate-50 text-slate-700 border-slate-200';
      break;
    default:
      styling = 'bg-blue-50 text-blue-800 border-blue-200';
  }

  return (
    <Alert className={`${styling} ${className}`}>
      <div className="flex items-start">
        <InfoIcon className={`h-4 w-4 mr-2 mt-0.5 flex-shrink-0 ${variant === 'compact' ? 'hidden' : ''}`} />
        <AlertDescription className={textSizes[size]}>
          {textContent}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default FinancialDisclaimer;