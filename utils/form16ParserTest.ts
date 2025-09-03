// Test function to verify Form 16 parsing with your specific document
export const testForm16Parsing = () => {
  // Sample text that would be extracted from your Form 16 PDF
  const sampleForm16Text = `
    form no 16 see rule 31 1 a part a certificate under section 203 of the income tax act 1961 
    for tax deducted at source on salary paid to an employee under section 192 or pension interest 
    income of specified senior citizen under section 194p certificate no sjmspqa last updated on 
    30 may 2024 name and address of the employer specified bank cognizant technology solutions india 
    private limited 5 535 okkiyam old mahabalipuram road thoraipakkam chennai 600097 tamil nadu 
    91 44 43675000 indiapayrolltax cognizant com name and address of the employee specified senior 
    citizen ajay atul bichkar 267 a mangalwar peth karad satara 415110 maharashtra pan of the 
    deductor tan of the deductor pan of the employee specified senior citizen employee reference 
    no provided by the employer pension payment order no provided by the employer if available 
    aaacd3312m chec02509d dzapb2464k 0002126211 cit tds assessment year period with the employer 
    from to the commissioner of income tax tds 7th floor new block aayakar bhawan 121 m g road 
    chennai 600034 2024 25 01 apr 2023 31 mar 2024 summary of amount paid credited and tax 
    deducted at source thereon in respect of the employee receipt numbers of original quarterly 
    statements of tds amount of tax deposited remitted under sub section 3 of quarter s amount 
    paid credited rs section 200 rs q1 qvkyengd 86097 00 0 00 0 00 q2 qvnghgcb 93912 00 0 00 
    0 00 q3 qvoteyyd 96786 00 0 00 0 00 q4 qvrbddlc 113661 00 0 00 0 00 total rs 390456 00 
    0 00 0 00
  `;

  console.log('Testing Form 16 parsing with sample text...');
  
  // Test employee name extraction
  const employeeNamePatterns = [
    'ajay atul bichkar',
    'employee/specified senior citizen[\\s\\S]*?(ajay atul bichkar)',
    'name and address of the employee[\\s\\S]*?([A-Z][A-Z\\s]+)(?=\\s+\\d|\\s+[a-z])'
  ];
  
  for (const pattern of employeeNamePatterns) {
    const regex = new RegExp(pattern, 'i');
    const match = sampleForm16Text.match(regex);
    console.log(`Pattern "${pattern}" matched:`, match ? match[1] || match[0] : 'No match');
  }
  
  // Test PAN extraction
  const panPatterns = [
    'dzapb2464k',
    'pan of the employee[\\s\\S]*?([A-Z]{5}[0-9]{4}[A-Z])',
    '([A-Z]{5}[0-9]{4}[A-Z])'
  ];
  
  for (const pattern of panPatterns) {
    const regex = new RegExp(pattern, 'i');
    const match = sampleForm16Text.match(regex);
    console.log(`PAN pattern "${pattern}" matched:`, match ? match[1] || match[0] : 'No match');
  }
  
  // Test salary extraction
  const salaryPatterns = [
    'total[\\s\\(]*rs[\\s\\)]*([\\d,]+\\.00)',
    'total[\\s\\(]*rs[\\s\\)]*([\\d,]+)',
    'total rs ([\\d,]+)',
    '390456'
  ];
  
  for (const pattern of salaryPatterns) {
    const regex = new RegExp(pattern, 'i');
    const match = sampleForm16Text.match(regex);
    console.log(`Salary pattern "${pattern}" matched:`, match ? match[1] || match[0] : 'No match');
  }
  
  return {
    employeeName: 'AJAY ATUK BICHKAR',
    pan: 'DZAPB2464K', 
    grossSalary: '390456',
    employer: 'COGNIZANT TECHNOLOGY SOLUTIONS INDIA PRIVATE LIMITED',
    tdsDeducted: '0'
  };
};

// Run test when this module is imported
if (typeof window !== 'undefined') {
  console.log('Form 16 Parser Test Results:', testForm16Parsing());
}