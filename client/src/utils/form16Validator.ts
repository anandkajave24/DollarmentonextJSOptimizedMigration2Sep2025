import { Form16Data } from './form16Parser';

export interface ValidationResult {
  isValid: boolean;
  confidence: number;
  warnings: string[];
  suggestions: string[];
}

export class Form16Validator {
  validateExtractedData(data: Form16Data): ValidationResult {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let confidence = 100;

    // Check if basic required fields are present
    if (!data.grossSalary || parseFloat(data.grossSalary) <= 0) {
      warnings.push('Gross salary could not be extracted');
      confidence -= 30;
      suggestions.push('Please verify and enter your gross salary manually');
    }

    if (!data.tdsDeducted || parseFloat(data.tdsDeducted) <= 0) {
      warnings.push('TDS information not found');
      confidence -= 20;
      suggestions.push('Check your Form 16 for TDS deducted amount');
    }

    // Validate employee details
    if (!data.employeeName) {
      warnings.push('Employee name not detected');
      confidence -= 10;
    }

    if (!data.pan || !this.isValidPAN(data.pan)) {
      warnings.push('PAN number not found or invalid');
      confidence -= 15;
      suggestions.push('Ensure your PAN is clearly visible in the Form 16');
    }

    // Check Section 80C investments
    const section80CTotal = [
      data.ppf,
      data.elss,
      data.lifeInsurance,
      data.homeLoanPrincipal,
      data.tuitionFees
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    if (section80CTotal > 150000) {
      warnings.push('Section 80C investments exceed $1.5 thousand limit');
      suggestions.push('Review your 80C investments - the limit is $1,50,000');
    }

    // Check health insurance
    const healthInsuranceTotal = (parseFloat(data.healthInsuranceSelf) || 0) + 
                                (parseFloat(data.healthInsuranceParents) || 0);
    
    if (healthInsuranceTotal > 75000) {
      warnings.push('Health insurance premiums exceed Section 80D limits');
      suggestions.push('Check Section 80D limits: $25K for self/family, $50K for parents');
    }

    // Determine overall confidence
    if (confidence >= 80) {
      confidence = Math.min(95, confidence); // Cap at 95% for real data
    } else if (confidence >= 60) {
      suggestions.push('Some fields may need manual verification');
    } else {
      suggestions.push('Consider entering data manually for better accuracy');
    }

    return {
      isValid: confidence >= 50,
      confidence,
      warnings,
      suggestions
    };
  }

  private isValidPAN(pan: string): boolean {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panRegex.test(pan);
  }

  // Format extracted amounts for display
  formatAmount(amount: string): string {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return '0';
    return Math.round(num).toLocaleString('en-IN');
  }

  // Generate tax optimization suggestions based on extracted data
  generateOptimizationSuggestions(data: Form16Data): string[] {
    const suggestions: string[] = [];
    
    const section80CUsed = [
      data.ppf,
      data.elss,
      data.lifeInsurance,
      data.homeLoanPrincipal,
      data.tuitionFees
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    const section80CRemaining = Math.max(0, 150000 - section80CUsed);
    
    if (section80CRemaining > 0) {
      suggestions.push(`You can save additional $${section80CRemaining.toLocaleString()} under Section 80C`);
    }

    const healthInsuranceUsed = (parseFloat(data.healthInsuranceSelf) || 0);
    if (healthInsuranceUsed < 25000) {
      const remaining = 25000 - healthInsuranceUsed;
      suggestions.push(`Consider health insurance premium of $${remaining.toLocaleString()} for additional tax savings`);
    }

    if (!data.nps || parseFloat(data.nps) === 0) {
      suggestions.push('Consider NPS investment for additional $50,000 deduction under Section 80CCD(1B)');
    }

    return suggestions;
  }
}

export const form16Validator = new Form16Validator();