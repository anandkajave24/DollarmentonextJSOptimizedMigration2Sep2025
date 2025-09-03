import { SmsMessage, FinancialTransaction } from "@shared/schema";
import { storage } from "../storage";

// Bank keywords for identifying financial institutions
const BANK_IDENTIFIERS = [
  'icici', 'hdfc', 'sbi', 'axis', 'kotak', 'pnb', 'idfc', 'indusind', 'yes bank', 'rbl',
  'canara', 'union bank', 'bob', 'bank of baroda', 'bank of india', 'idbi', 'federal',
  'indian bank', 'indian overseas bank', 'ucb', 'citibank', 'hsbc', 'standard chartered',
  'dbs', 'deutsche', 'credit card', 'debit card', 'account', 'acct', 'a/c', 'atm',
  'transaction', 'upi', 'neft', 'rtgs', 'imps', 'credited', 'debited', 'transfer'
];

// Common patterns to extract transaction details
const AMOUNT_PATTERNS = [
  /rs\.?\s*([0-9,.]+)/i,
  /inr\s*([0-9,.]+)/i,
  /amount\s*(?:of|:)?\s*(?:rs\.?|inr)?\s*([0-9,.]+)/i,
  /(?:rs\.?|inr)\s*([0-9,.]+)(?:\s*has been|\s*is|\s*was)/i,
  /([0-9,.]+)(?:\s*rs\.?|\s*inr)/i
];

const DEBIT_KEYWORDS = [
  'debited', 'debit', 'spent', 'purchased', 'payment', 'paid', 'pay', 'withdrawal', 
  'withdrawn', 'withdraw', 'sent', 'charged', 'expense', 'spent', 'used'
];

const CREDIT_KEYWORDS = [
  'credited', 'credit', 'received', 'deposited', 'deposit', 'added', 'transferred to', 
  'cashback', 'refund', 'salary', 'income'
];

/**
 * Process an SMS message to extract financial transaction information
 * @param message The SMS message to process
 * @returns A new financial transaction if one was detected, undefined otherwise
 */
export async function processSmsMessage(message: SmsMessage): Promise<FinancialTransaction | undefined> {
  try {
    // Skip if message is already processed
    if (message.isProcessed) {
      return undefined;
    }

    // Check if this is a financial message
    const isFinancial = isBankOrFinancialMessage(message.body);
    if (!isFinancial) {
      // Mark as processed but non-financial
      await storage.updateSMSMessage(message.id.toString(), { isProcessed: true });
      return undefined;
    }

    // Extract transaction details
    const transactionDetails = extractTransactionDetails(message.body);
    if (!transactionDetails) {
      // Mark as processed but couldn't extract details
      await storage.updateSMSMessage(message.id.toString(), { isProcessed: true });
      return undefined;
    }

    // Get date from message or use received time
    const transactionDate = transactionDetails.date || message.receivedAt;

    // Create a new financial transaction
    const newTransaction = await storage.createFinancialTransaction({
            userId: message.userId,
            transactionDate,
      description: transactionDetails.description || message.body.substring(0, 100),
      amount: transactionDetails.amount,
      category: categorizeTransaction(message.body),
      transactionType: transactionDetails.type,
            accountType: transactionDetails.accountInfo || 'checking',
      source: determineTrxSource(message.body),
          });

    // Mark SMS as processed
    await storage.updateSMSMessage(message.id.toString(), { isProcessed: true });

    return newTransaction;
  } catch (error) {
    console.error('Error processing SMS message:', error);
    return undefined;
  }
}

/**
 * Determines if a message is from a bank or financial institution
 */
function isBankOrFinancialMessage(messageBody: string): boolean {
  const lowerMessage = messageBody.toLowerCase();
  
  // Check if any bank identifier is present
  return BANK_IDENTIFIERS.some(identifier => lowerMessage.includes(identifier));
}

/**
 * Extracts transaction details from the message body
 */
function extractTransactionDetails(messageBody: string): {
  amount: number;
  type: string;
  description?: string;
  date?: Date;
  merchantName?: string;
  accountInfo?: string;
} | undefined {
  // Extract amount
  let amount = 0;
  for (const pattern of AMOUNT_PATTERNS) {
    const match = messageBody.match(pattern);
    if (match && match[1]) {
      // Remove commas and convert to number
      amount = parseFloat(match[1].replace(/,/g, ''));
      break;
    }
  }

  if (amount <= 0) {
    return undefined;
  }

  // Determine transaction type
  const lowerMessage = messageBody.toLowerCase();
  let type = 'expense'; // Default to expense
  
  // Check for credit keywords
  if (CREDIT_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    type = 'income';
  }
  // Check for debit keywords
  else if (DEBIT_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    type = 'expense';
  }

  // Extract merchant name
  let merchantName: string | undefined;
  
  // Look for common patterns like "at MERCHANT_NAME" or "to MERCHANT_NAME"
  const merchantMatch = messageBody.match(/(?:at|to|in|for|@)\s+([\w\s&.'-]+?)(?:\s+on|\s+for|\s+of|\s+via|\s+using|\.|$)/i);
  if (merchantMatch && merchantMatch[1]) {
    merchantName = merchantMatch[1].trim();
  }

  // Extract date if available
  let date: Date | undefined;
  
  // Look for common date formats
  const dateMatch = messageBody.match(/(?:on|dated)\s+(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*(?:\s+\d{2,4})?)/i);
  if (dateMatch && dateMatch[1]) {
    // Try to parse the date
    try {
      date = new Date(dateMatch[1]);
      // Check if valid date
      if (isNaN(date.getTime())) {
        date = undefined;
      }
    } catch (e) {
      date = undefined;
    }
  }

  // Extract account info
  let accountInfo: string | undefined;
  
  // Common patterns for account numbers
  const acctMatch = messageBody.match(/(?:a\/c|acct|account|card)(?:\s+ending|\s+no|\s+number|\s+#)?\s*:?\s*(?:[Xx*]+)?(\d{4})/i);
  if (acctMatch && acctMatch[1]) {
    accountInfo = `xxxx${acctMatch[1]}`;
  }

  // Extract a basic description
  let description = messageBody.slice(0, 100);
  if (merchantName) {
    description = `${type === 'income' ? 'Received from' : 'Paid to'} ${merchantName}`;
  }

  return {
    amount,
    type,
    description,
    date,
    merchantName,
    accountInfo
  };
}

/**
 * Categorizes a transaction based on the message content
 */
function categorizeTransaction(messageBody: string): string {
  const lowerMessage = messageBody.toLowerCase();
  
  // Define category detection rules
  const categories: Record<string, string[]> = {
    'Food & Dining': ['restaurant', 'cafe', 'food', 'swiggy', 'zomato', 'dining', 'eat', 'pizza', 'burger'],
    'Shopping': ['amazon', 'flipkart', 'myntra', 'shopping', 'mall', 'retail', 'store', 'market', 'purchase'],
    'Transportation': ['uber', 'ola', 'taxi', 'cab', 'bus', 'train', 'metro', 'transport', 'travel', 'flight', 'airline'],
    'Entertainment': ['movie', 'theatre', 'netflix', 'prime', 'hotstar', 'entertainment', 'ticket', 'show', 'game'],
    'Utilities': ['electricity', 'water', 'gas', 'power', 'bill', 'utility', 'recharge', 'mobile', 'phone', 'broadband', 'internet'],
    'Groceries': ['grocery', 'supermarket', 'bigbasket', 'grofers', 'food', 'vegetable', 'fruit'],
    'Healthcare': ['hospital', 'doctor', 'medical', 'pharmacy', 'health', 'medicine', 'clinic', 'consultation', 'treatment'],
    'Education': ['school', 'college', 'university', 'course', 'education', 'tuition', 'class', 'fee', 'books'],
    'Rent': ['rent', 'house', 'apartment', 'flat', 'accommodation', 'lease'],
    'Investment': ['investment', 'mutual fund', 'stock', 'share', 'equity', 'demat', 'trading', 'dividend', 'securities'],
    'Salary': ['salary', 'income', 'wage', 'payroll', 'stipend', 'remuneration'],
    'Transfer': ['transfer', 'sent', 'received', 'neft', 'rtgs', 'imps', 'upi']
  };
  
  // Default category
  let matchedCategory = 'Miscellaneous';
  
  // Find the best matching category
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        matchedCategory = category;
        break;
      }
    }
  }
  
  return matchedCategory;
}

/**
 * Determines the transaction source (bank or credit card)
 */
function determineTrxSource(messageBody: string): 'bank' | 'credit' {
  const lowerMessage = messageBody.toLowerCase();
  
  // Check if it's a credit card message
  if (lowerMessage.includes('credit card') || 
      lowerMessage.includes('credit a/c') || 
      lowerMessage.includes('card ending') ||
      lowerMessage.includes('card no.')) {
    return 'credit';
  }
  
  return 'bank'; // Default to bank
}