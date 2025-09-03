/**
 * Utility functions for formatting different types of data
 */

/**
 * Format a number as Indian currency (Rupees)
 * @param value The value to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  // Format as Indian currency (Rupees)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

/**
 * Format a percentage value with 2 decimal places by default
 * @param value The percentage value to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a number with commas as thousand separators
 * @param value The number to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export function formatNumber(value: number, decimals: number = 2): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
  return formatter.format(value);
}

/**
 * Format a date as a string
 * @param date The date to format
 * @param format The format to use (short, medium, long)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    year: 'numeric',
  };
  
  if (format === 'long') {
    options.weekday = 'long';
  }
  
  return dateObj.toLocaleDateString('en-IN', options);
}

/**
 * Format a date to show time elapsed (e.g., "2 hours ago")
 * @param date The date to format
 * @returns Formatted time elapsed string
 */
export function formatTimeElapsed(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);
  
  if (diffSec < 60) {
    return `${diffSec} second${diffSec !== 1 ? 's' : ''} ago`;
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateObj);
  }
}

/**
 * Format a number to show abbreviated form with K, L, Cr
 * @param value The number to format
 * @returns Abbreviated number string
 */
export function formatAbbreviatedNumber(value: number): string {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `${(value / 100000).toFixed(2)} L`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} K`;
  } else {
    return value.toString();
  }
}
