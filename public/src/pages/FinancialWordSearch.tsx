import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';

interface WordSearchGame {
  id: number;
  words: string[];
  grid: string[][];
  foundWords: string[];
}

const wordDefinitions: { [key: string]: string } = {
  'INVEST': 'To put money into financial schemes, shares, or property with the expectation of achieving a profit',
  'STOCKS': 'Shares in the ownership of a company, representing a claim on part of the company\'s assets and earnings',
  'BONDS': 'Fixed income securities that represent a loan made by an investor to a borrower',
  'MUTUAL': 'Investment vehicle made up of a pool of money collected from many investors',
  'FUNDS': 'Pool of money set aside for a specific purpose, often for investment',
  'RETURN': 'The gain or loss on an investment over a specified period',
  'PROFIT': 'Financial gain, especially the difference between revenue and expenses',
  'MARKET': 'A place where buyers and sellers can meet to facilitate exchange of goods and services',
  'TRADE': 'The action of buying and selling goods and services',
  'EQUITY': 'The value of shares issued by a company; ownership interest in a corporation',
  'SAVINGS': 'Money that is not spent or used, typically kept for future use',
  'BUDGET': 'An estimate of income and expenditure for a set period of time',
  'INCOME': 'Money received, especially on a regular basis, for work or through investments',
  'EXPENSE': 'The cost required for something; money spent on something',
  'CREDIT': 'The ability to borrow money or access goods with the promise of future payment',
  'DEBIT': 'An entry recording an amount owed, or a payment made from a bank account',
  'ASSET': 'A useful or valuable thing, person, or quality; property owned by a person or company',
  'LOAN': 'A sum of money that is borrowed and is expected to be paid back with interest',
  'RATE': 'A measure, quantity, or frequency, typically one measured against another quantity',
  'BANK': 'A financial institution that accepts deposits and channels money into lending activities',
  'PENSION': 'A regular payment made during a person\'s retirement from an investment fund',
  'RETIRE': 'To stop working permanently, typically due to reaching a certain age',
  'CORPUS': 'The principal sum of money or property that forms the foundation of an investment',
  'GOAL': 'A specific financial target or objective that one aims to achieve',
  'PLAN': 'A detailed proposal for achieving financial objectives',
  'RISK': 'The possibility of loss or injury; exposure to danger in investments',
  'HEDGE': 'An investment position intended to offset potential losses in another investment',
  'YIELD': 'Income return on an investment, expressed as a percentage',
  'GAIN': 'An increase in wealth or resources; profit from an investment',
  'LOSS': 'The state of having less money or being financially worse off',
  'RUPEE': 'The basic monetary unit of India, Pakistan, and several other countries',
  'DOLLAR': 'The basic monetary unit of the US, Canada, Australia, and several other countries',
  'FOREX': 'The foreign exchange market where currencies are traded',
  'GOLD': 'A precious metal used as a store of value and hedge against inflation',
  'SILVER': 'A precious metal used for investment and industrial purposes',
  'OIL': 'A liquid petroleum commodity traded in global markets',
  'CRYPTO': 'Digital or virtual currencies secured by cryptography',
  'SHARE': 'A unit of ownership interest in a corporation or financial asset',
  'PRICE': 'The amount of money expected, required, or given in payment for something',
  'VALUE': 'The worth of something in terms of money or other goods',
  'TAX': 'A compulsory contribution to state revenue, levied by the government',
  'PPF': 'Public Provident Fund - a long-term investment scheme backed by the Government of India',
  'EPF': 'Employees Provident Fund - a retirement savings scheme for employees',
  'SIP': 'Systematic Investment Plan - a method of investing in mutual funds regularly',
  'EMI': 'Equated Monthly Installment - fixed payment amount made by borrower to lender',
  'KYC': 'Know Your Customer - process of verifying the identity of clients',
  'PAN': 'Permanent Account Number - unique alphanumeric identifier for tax purposes in India',
  'GST': 'Goods and Services Tax - indirect tax levied on supply of goods and services',
  'TDS': 'Tax Deducted at Source - method of collecting tax at the source of income',
  'ITR': 'Income Tax Return - form used to file information about income and tax'
};

const wordSearchBatches = [
  {
    id: 1,
    words: ['INVEST', 'STOCKS', 'BONDS', 'MUTUAL', 'FUNDS', 'RETURN', 'PROFIT', 'MARKET', 'TRADE', 'EQUITY'],
  },
  {
    id: 2,
    words: ['SAVINGS', 'BUDGET', 'INCOME', 'EXPENSE', 'CREDIT', 'DEBIT', 'ASSET', 'LOAN', 'RATE', 'BANK'],
  },
  {
    id: 3,
    words: ['PENSION', 'RETIRE', 'CORPUS', 'GOAL', 'PLAN', 'RISK', 'HEDGE', 'YIELD', 'GAIN', 'LOSS'],
  },
  {
    id: 4,
    words: ['RUPEE', 'DOLLAR', 'FOREX', 'GOLD', 'SILVER', 'OIL', 'CRYPTO', 'SHARE', 'PRICE', 'VALUE'],
  },
  {
    id: 5,
    words: ['TAX', 'PPF', 'EPF', 'SIP', 'EMI', 'KYC', 'PAN', 'GST', 'TDS', 'ITR'],
  }
];

export default function FinancialWordSearch() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentBatch, setCurrentBatch] = useState(0);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{row: number, col: number}[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationWord, setCelebrationWord] = useState('');

  const currentWords = wordSearchBatches[currentBatch]?.words || [];

  // Generate a random grid with hidden words
  const generateGrid = (words: string[]) => {
    const gridSize = 10;
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('')
    );

    // Place words with forced placement to ensure all words are in grid
    words.forEach((word, index) => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 200) {
        // Prefer horizontal and vertical placement for better findability
        const direction = Math.random() < 0.8 ? (Math.random() < 0.5 ? 4 : 1) : Math.floor(Math.random() * 8);
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        
        if (canPlaceWord(newGrid, word, row, col, direction, gridSize)) {
          placeWord(newGrid, word, row, col, direction);
          placed = true;
        }
        attempts++;
      }
      
      // Force horizontal placement if word couldn't be placed
      if (!placed) {
        const row = index % gridSize;
        const maxCol = Math.max(0, gridSize - word.length);
        const col = Math.floor(Math.random() * (maxCol + 1));
        
        // Place horizontally
        for (let i = 0; i < word.length && col + i < gridSize; i++) {
          newGrid[row][col + i] = word[i];
        }
      }
    });

    // Fill empty cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    return newGrid;
  };

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number, size: number) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      
      if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
        return false;
      }
      
      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    
    return true;
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      grid[newRow][newCol] = word[i];
    }
  };

  const getSelectedWord = () => {
    if (selectedCells.length === 0) return '';
    return selectedCells.map(cell => grid[cell.row][cell.col]).join('');
  };

  const handleCellClick = (row: number, col: number) => {
    if (selectedCells.length === 0) {
      // Start new selection
      setSelectedCells([{row, col}]);
    } else if (selectedCells.length === 1) {
      // Complete selection with line
      const start = selectedCells[0];
      const line = getLineCells(start.row, start.col, row, col);
      setSelectedCells(line);
      
      // Check word immediately
      const word = line.map(cell => grid[cell.row]?.[cell.col] || '').join('');
      const words = wordSearchBatches[currentBatch]?.words || [];
      
      if (words.includes(word) && !foundWords.includes(word)) {
        setFoundWords([...foundWords, word]);
        setScore(score + 10);
        setStreak(streak + 1);
        
        // Show celebration
        setCelebrationWord(word);
        setShowCelebration(true);
        
        toast({
          title: "🎉 Word Found!",
          description: `${word}: ${wordDefinitions[word]}`,
        });
        
        // Clear celebration and selection
        setTimeout(() => {
          setShowCelebration(false);
          setSelectedCells([]);
        }, 3000);
      } else {
        // If word not found, clear and start new selection
        setTimeout(() => setSelectedCells([{row, col}]), 500);
      }
    } else {
      // Always start fresh selection on any subsequent click
      setSelectedCells([{row, col}]);
    }
  };

  const getLineCells = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    const cells: {row: number, col: number}[] = [];
    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;
    const distance = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    if (distance === 0) {
      return [{row: startRow, col: startCol}];
    }
    
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);
    
    // Only allow straight lines (horizontal, vertical, diagonal)
    if (Math.abs(rowDiff) !== Math.abs(colDiff) && rowDiff !== 0 && colDiff !== 0) {
      return [{row: startRow, col: startCol}];
    }
    
    for (let i = 0; i <= distance; i++) {
      cells.push({
        row: startRow + i * rowStep,
        col: startCol + i * colStep
      });
    }
    
    return cells;
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellInFoundWord = (row: number, col: number) => {
    // This is simplified - in a real implementation, you'd track which cells belong to found words
    return false;
  };

  const handleNextBatch = () => {
    if (currentBatch < wordSearchBatches.length - 1) {
      setCurrentBatch(currentBatch + 1);
      setFoundWords([]);
      setSelectedCells([]);
    }
  };

  const handleBack = () => {
    setLocation("/learning");
  };

  // Generate grid when component mounts or batch changes
  useEffect(() => {
    const words = wordSearchBatches[currentBatch]?.words || [];
    if (words.length > 0) {
      const newGrid = generateGrid(words);
      setGrid(newGrid);
    }
  }, [currentBatch]);

  // Initialize on component mount
  useEffect(() => {
    const words = wordSearchBatches[0]?.words || [];
    if (words.length > 0) {
      const newGrid = generateGrid(words);
      setGrid(newGrid);
    }
  }, []);

  // Check if all words are found
  const allWordsFound = foundWords.length === currentWords.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Financial Word Search | RupeeSmart"
        description="Find hidden financial terms in this interactive word search game."
        keywords="word search, financial terms, financial literacy"
        canonical="https://rupeesmart.com/financial-word-search"
        ogType="website"
      />
      
      <div className="container mx-auto px-6 py-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-base">🔍</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-800">Word Search</h1>
                <p className="text-xs text-gray-500">Master Indian financial markets through interactive learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-sm">🏆</span>
                <span className="text-xs font-medium text-blue-700">Score: {score}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-lg">
                <span className="text-orange-600 text-sm">🔥</span>
                <span className="text-xs font-medium text-orange-700">Streak: {streak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-600 mb-2">Word Found!</h3>
              <p className="text-lg font-semibold text-gray-800 mb-3">{celebrationWord}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {wordDefinitions[celebrationWord]}
              </p>
              <div className="mt-4 text-2xl">✨ +10 points ✨</div>
            </div>
          </div>
        )}

        {/* Game Area */}
        <div className="grid grid-cols-3 gap-4">
          {/* Word Search Grid */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-800">🔍 Word Search</h2>
                <Badge className="bg-blue-100 text-blue-700 text-xs">
                  Batch {currentBatch + 1} of {wordSearchBatches.length}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">
                Find the word <strong>{currentWords.find(word => !foundWords.includes(word)) || 'All words found!'}</strong> in the grid
              </p>

              <div 
                className="grid grid-cols-10 gap-1 mb-4 select-none" 
                onMouseLeave={() => setIsSelecting(false)}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-8 h-8 border border-gray-200 flex items-center justify-center text-xs font-medium cursor-pointer transition-colors user-select-none ${
                        isCellSelected(rowIndex, colIndex)
                          ? 'bg-blue-200 border-blue-400'
                          : isCellInFoundWord(rowIndex, colIndex)
                          ? 'bg-green-100 border-green-300'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      draggable={false}
                      style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}
                    >
                      {cell}
                    </div>
                  ))
                )}
              </div>

              {allWordsFound && (
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600 mb-3">🎉 All words found!</p>
                  {currentBatch < wordSearchBatches.length - 1 ? (
                    <Button 
                      onClick={handleNextBatch}
                      className="bg-blue-600 hover:bg-blue-700 text-xs px-4 py-2"
                    >
                      Next Batch →
                    </Button>
                  ) : (
                    <p className="text-xs text-gray-600">You completed all batches!</p>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button 
                  onClick={handleBack}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-8"
                >
                  ← Dashboard
                </Button>
              </div>
            </div>
          </div>

          {/* Word List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Words to Find</h3>
              <div className="space-y-2">
                {wordSearchBatches[currentBatch]?.words?.map((word, index) => (
                  <div
                    key={word}
                    className={`text-xs p-2 rounded ${
                      foundWords.includes(word)
                        ? 'bg-green-100 text-green-700 line-through'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {word}
                  </div>
                )) || (
                  <div className="text-xs text-gray-500 p-2">
                    No words available
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Found: {foundWords.length} / {currentWords.length}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(foundWords.length / currentWords.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}