import { format } from 'date-fns';

// Types for Account Aggregator data
export interface AATransaction {
  txnId: string;
  txnDate: string;
  description?: string;
  narration?: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  mode?: string;
  reference?: string;
  balance?: {
    amount: number;
    type: string;
  };
  category?: string;
}

export interface AAAccount {
  accountNumber: string;
  maskedAccNumber: string;
  transactions: AATransaction[];
  statements?: Array<{
    year: number;
    month: number;
    data: {
      transactions: AATransaction[];
    };
  }>;
}

export interface AAFinancialInformation {
  fiType: string;
  accounts: AAAccount[];
}

export interface AAData {
  consentId: string;
  fetchedTime: string;
  fiData: AAFinancialInformation[];
}

// Transaction type for the application
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  source: "bank" | "credit";
  status: "credited" | "debited" | "pending";
}

/**
 * Categorizes a bank transaction based on description/narration
 * @param description The transaction description or narration
 * @returns The appropriate category for the transaction
 */
export function categorizeBankTransaction(description: string): string {
  const normalizedDesc = description.toLowerCase();
  
  // Common transaction patterns and their categories
  const patterns: [RegExp, string][] = [
    [/(?:grocery|grocer|supermarket|market|kirana|big basket|bigbasket|dmart|d-mart|reliance fresh|food|vegetables)/i, 'Groceries'],
    [/(?:restaurant|cafe|food|dining|swiggy|zomato|uber eats|ubereats|foodpanda|dine|eat|hotel|bar|pizza|burger)/i, 'Dining'],
    [/(?:uber|ola|cab|taxi|auto|metro|bus|train|petrol|fuel|gas|parking)/i, 'Transportation'],
    [/(?:electricity|power|water|gas|bill|utility|utilities|internet|broadband|wifi|phone|mobile|recharge|tata power|adani|bses|bescom)/i, 'Utilities'],
    [/(?:amazon|flipkart|myntra|ajio|nykaa|clothing|apparel|mall|shop|store|retail|purchase)/i, 'Shopping'],
    [/(?:movie|theatre|netflix|amazon prime|hotstar|disney|subscription|entertainment|game|sport|bookmyshow|ticket)/i, 'Entertainment'],
    [/(?:doctor|hospital|medicine|medical|pharmacy|clinic|health|apollo|practo|dentist)/i, 'Healthcare'],
    [/(?:insurance|policy|premium)/i, 'Insurance'],
    [/(?:investment|mutual fund|stock|share|zerodha|upstox|groww|etmoney)/i, 'Investments'],
    [/(?:rent|housing|accommodation|broker|property)/i, 'Rent/Home EMI'],
    [/(?:emi|loan|repayment|principal|interest)/i, 'Loans'],
    [/(?:salary|income|credit|refund|cashback)/i, 'Income'],
    [/(?:education|tuition|school|college|course|class|tutorial|training)/i, 'Education'],
    [/(?:gift|present|donation|charity|donate)/i, 'Donations'],
  ];
  
  for (const [pattern, category] of patterns) {
    if (pattern.test(normalizedDesc)) {
      return category;
    }
  }
  
  // UPI transactions often hard to categorize
  if (normalizedDesc.includes('upi')) {
    return 'Payment';
  }
  
  // Default category if no patterns match
  return 'Other';
}

/**
 * Converts Account Aggregator data into application transactions
 * @param aaData The Account Aggregator data
 * @returns Array of transactions ready to be used in the application
 */
export function convertAADataToTransactions(aaData: AAData): Transaction[] {
  const transactions: Transaction[] = [];
  
  if (!aaData.fiData || !Array.isArray(aaData.fiData)) {
    return transactions;
  }
  
  // Process each financial information object
  aaData.fiData.forEach(fiData => {
    if (!fiData.accounts || !Array.isArray(fiData.accounts)) {
      return;
    }
    
    // Process each account
    fiData.accounts.forEach(account => {
      // Process regular transactions
      if (account.transactions && Array.isArray(account.transactions)) {
        account.transactions.forEach(txn => {
          if (!txn.txnDate) return; // Skip if no date
          
          try {
            const txnDate = new Date(txn.txnDate);
            if (isNaN(txnDate.getTime())) return; // Skip if invalid date
            
            const description = txn.description || txn.narration || 'Bank Transaction';
            const category = txn.category || categorizeBankTransaction(description);
            
            transactions.push({
              id: txn.txnId || `aa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              date: txnDate,
              description,
              amount: txn.amount,
              category,
              source: 'bank',
              status: txn.type === 'CREDIT' ? 'credited' : 'debited'
            });
          } catch (error) {
            console.error('Error processing AA transaction:', error);
          }
        });
      }
      
      // Process statement transactions if available
      if (account.statements && Array.isArray(account.statements)) {
        account.statements.forEach(statement => {
          if (!statement.data || !statement.data.transactions) return;
          
          statement.data.transactions.forEach(txn => {
            if (!txn.txnDate) return; // Skip if no date
            
            try {
              const txnDate = new Date(txn.txnDate);
              if (isNaN(txnDate.getTime())) return; // Skip if invalid date
              
              const description = txn.description || txn.narration || `Transaction (${format(txnDate, 'dd MMM yyyy')})`;
              const category = txn.category || categorizeBankTransaction(description);
              
              transactions.push({
                id: txn.txnId || `aa-statement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                date: txnDate,
                description,
                amount: txn.amount,
                category,
                source: 'bank',
                status: txn.type === 'CREDIT' ? 'credited' : 'debited'
              });
            } catch (error) {
              console.error('Error processing AA statement transaction:', error);
            }
          });
        });
      }
    });
  });
  
  // Sort transactions by date (newest first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Processes AA data and returns a summary of accounts and their balances
 * @param aaData The Account Aggregator data
 * @returns Summary of accounts and balances
 */
export function getAAAccountSummary(aaData: AAData): { 
  accounts: Array<{ 
    accountNumber: string; 
    balance?: number; 
    type?: string;
    transactions: number;
  }>
} {
  const accounts: Array<{ 
    accountNumber: string; 
    balance?: number; 
    type?: string;
    transactions: number;
  }> = [];
  
  if (!aaData.fiData || !Array.isArray(aaData.fiData)) {
    return { accounts };
  }
  
  aaData.fiData.forEach(fiData => {
    if (!fiData.accounts || !Array.isArray(fiData.accounts)) {
      return;
    }
    
    fiData.accounts.forEach(account => {
      // Get latest balance from transactions if available
      const latestTxn = account.transactions && account.transactions.length > 0 
        ? [...account.transactions].sort((a, b) => 
            new Date(b.txnDate).getTime() - new Date(a.txnDate).getTime()
          )[0]
        : null;
      
      accounts.push({
        accountNumber: account.maskedAccNumber || account.accountNumber,
        balance: latestTxn?.balance?.amount,
        type: fiData.fiType,
        transactions: (account.transactions?.length || 0) + 
          (account.statements?.reduce((sum, stmt) => 
            sum + (stmt.data.transactions?.length || 0), 0) || 0)
      });
    });
  });
  
  return { accounts };
}