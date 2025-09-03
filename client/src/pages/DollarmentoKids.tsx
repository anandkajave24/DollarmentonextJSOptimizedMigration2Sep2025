import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PiggyBank, 
  GraduationCap, 
  DollarSign, 
  Star,
  TrendingUp,
  Shield,
  Heart,
  Target,
  Gift,
  Calculator,
  BookOpen,
  Award,
  Gamepad2,
  ArrowLeft,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  ageGroup: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface GameData {
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
}

const DollarmentoKids: React.FC = () => {
  const router = useRouter();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const learningModules: LearningModule[] = [
    {
      id: 'piggy-bank-basics',
      title: 'Piggy Bank Adventures',
      description: 'Learn the basics of saving money with fun piggy bank activities and games.',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-pink-500',
      ageGroup: '5-8',
      difficulty: 'Beginner',
      duration: '15 mins',
      topics: ['Saving', 'Counting Money', 'Goal Setting']
    },
    {
      id: 'dollar-detective',
      title: 'Dollar Detective',
      description: 'Become a money detective and learn about US coins and bills through interactive games.',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500',
      ageGroup: '6-10',
      difficulty: 'Beginner',
      duration: '20 mins',
      topics: ['US Currency', 'Counting', 'Recognition']
    },
    {
      id: 'allowance-academy',
      title: 'Allowance Academy',
      description: 'Master the art of managing your allowance with smart spending and saving strategies.',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-blue-500',
      ageGroup: '8-12',
      difficulty: 'Intermediate',
      duration: '25 mins',
      topics: ['Budgeting', 'Allowance', 'Smart Spending']
    },
    {
      id: 'entrepreneurship-explorer',
      title: 'Young Entrepreneur',
      description: 'Discover how to start your own small business - from lemonade stands to online ventures.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-500',
      ageGroup: '10-14',
      difficulty: 'Intermediate',
      duration: '30 mins',
      topics: ['Business Basics', 'Profit & Loss', 'Customer Service']
    },
    {
      id: 'banking-buddy',
      title: 'Banking Buddy',
      description: 'Learn about banks, savings accounts, and how your money grows with interest.',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-emerald-500',
      ageGroup: '9-13',
      difficulty: 'Intermediate',
      duration: '25 mins',
      topics: ['Banks', 'Savings Accounts', 'Interest']
    },
    {
      id: 'investment-island',
      title: 'Investment Island',
      description: 'Explore the magical world of investments and learn how money can grow over time.',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-500',
      ageGroup: '12-16',
      difficulty: 'Advanced',
      duration: '35 mins',
      topics: ['Stocks', 'Compound Interest', 'Risk vs Reward']
    },
    {
      id: 'charity-champion',
      title: 'Charity Champion',
      description: 'Discover the joy of giving and learn about charitable donations and community impact.',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-red-500',
      ageGroup: '7-11',
      difficulty: 'Beginner',
      duration: '20 mins',
      topics: ['Giving Back', 'Charity', 'Community Impact']
    },
    {
      id: 'goal-getter',
      title: 'Goal Getter',
      description: 'Set and achieve your financial goals, from saving for toys to planning for college.',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-indigo-500',
      ageGroup: '10-15',
      difficulty: 'Intermediate',
      duration: '30 mins',
      topics: ['Goal Setting', 'Financial Planning', 'Time Management']
    },
    {
      id: 'credit-card-cadet',
      title: 'Credit Card Cadet',
      description: 'Understand credit cards, credit scores, and responsible borrowing for teens.',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-orange-500',
      ageGroup: '14-18',
      difficulty: 'Advanced',
      duration: '40 mins',
      topics: ['Credit Cards', 'Credit Score', 'Responsible Borrowing']
    },
    {
      id: 'college-cash-course',
      title: 'College Cash Course',
      description: 'Plan and save for college expenses, scholarships, and student loans.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-teal-500',
      ageGroup: '14-18',
      difficulty: 'Advanced',
      duration: '45 mins',
      topics: ['College Planning', '529 Plans', 'Scholarships', 'Student Loans']
    }
  ];

  const ageGroups = ['all', '5-8', '6-10', '8-12', '9-13', '10-14', '10-15', '12-16', '14-18'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredModules = learningModules.filter(module => {
    const ageMatch = selectedAgeGroup === 'all' || module.ageGroup === selectedAgeGroup;
    const difficultyMatch = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty;
    return ageMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const gameData: Record<string, GameData> = {
    'piggy-bank-basics': {
      title: 'Piggy Bank Adventures',
      description: 'Learn the basics of saving money with fun activities',
      icon: '🐷',
      color: 'bg-pink-500',
      questions: [
        {
          question: "If you save $2 every week, how much will you have after 4 weeks?",
          options: ["$6", "$8", "$10", "$12"],
          correct: 1,
          explanation: "2 × 4 = 8. If you save $2 each week for 4 weeks, you'll have $8 total!"
        },
        {
          question: "What's the best place to keep your saved money safe?",
          options: ["Under your pillow", "In a piggy bank or savings account", "In your backpack", "Give it to friends"],
          correct: 1,
          explanation: "A piggy bank or savings account keeps your money safe and helps it grow!"
        },
        {
          question: "You want to buy a toy that costs $20. If you save $5 each week, how long will it take?",
          options: ["2 weeks", "3 weeks", "4 weeks", "5 weeks"],
          correct: 2,
          explanation: "$20 ÷ $5 = 4 weeks. You need to save for 4 weeks to afford the toy."
        },
        {
          question: "Which is a good reason to save money?",
          options: ["To buy something you really want", "For emergencies", "For future goals like college", "All of the above"],
          correct: 3,
          explanation: "All of these are great reasons to save! Saving helps you reach goals and be prepared."
        },
        {
          question: "If you get $10 allowance and want to save half, how much should you save?",
          options: ["$3", "$4", "$5", "$6"],
          correct: 2,
          explanation: "Half of $10 is $5. Saving half of your allowance is a great habit!"
        },
        {
          question: "What happens when you put money in a savings account?",
          options: ["The bank loses it", "It earns interest and grows", "You can never get it back", "It turns into coins"],
          correct: 1,
          explanation: "Banks pay you interest for keeping money in savings accounts, so your money grows over time!"
        },
        {
          question: "You have $15 and spend $8 on lunch. How much do you have left?",
          options: ["$6", "$7", "$8", "$9"],
          correct: 1,
          explanation: "$15 - $8 = $7. Always subtract what you spend from what you have."
        },
        {
          question: "Which is the smartest way to use birthday money?",
          options: ["Spend it all immediately", "Save some and spend some", "Hide it under your bed", "Give it all away"],
          correct: 1,
          explanation: "Saving some and spending some teaches you balance and helps build good money habits!"
        },
        {
          question: "If you save $1 every day for a month (30 days), how much will you have?",
          options: ["$25", "$30", "$35", "$40"],
          correct: 1,
          explanation: "$1 × 30 days = $30. Daily saving adds up quickly!"
        },
        {
          question: "What's a good savings goal for a 10-year-old?",
          options: ["Buy a house", "Save for a new bike", "Buy a car", "Pay for college fully"],
          correct: 1,
          explanation: "A new bike is a realistic and achievable savings goal for a 10-year-old!"
        },
        {
          question: "You want to save $50. If you save $2 per week, how many weeks will it take?",
          options: ["20 weeks", "25 weeks", "30 weeks", "35 weeks"],
          correct: 1,
          explanation: "$50 ÷ $2 = 25 weeks. It takes patience, but you'll reach your goal!"
        },
        {
          question: "Which teaches you to be patient with money?",
          options: ["Buying everything right away", "Saving for something special", "Borrowing money", "Asking parents for everything"],
          correct: 1,
          explanation: "Saving for something special teaches patience and makes you appreciate what you buy!"
        },
        {
          question: "If you have $25 and want to save 20%, how much should you save?",
          options: ["$3", "$4", "$5", "$6"],
          correct: 2,
          explanation: "20% of $25 = $5. Moving the decimal point helps with percentage calculations!"
        },
        {
          question: "What's a piggy bank?",
          options: ["A real pig", "A container to save coins and bills", "A type of food", "A game"],
          correct: 1,
          explanation: "A piggy bank is a container, often shaped like a pig, used to save money!"
        },
        {
          question: "Why is it important to set savings goals?",
          options: ["It's boring", "It helps you stay motivated", "It's too hard", "Goals don't matter"],
          correct: 1,
          explanation: "Goals give you something to work toward and keep you motivated to save!"
        },
        {
          question: "You save $3 one week, $5 the next, and $2 the third week. How much total?",
          options: ["$8", "$9", "$10", "$11"],
          correct: 2,
          explanation: "$3 + $5 + $2 = $10. Adding up all your weekly savings gives you the total!"
        },
        {
          question: "What should you do before making a big purchase?",
          options: ["Buy it immediately", "Think about if you really need it", "Ask friends to buy it", "Ignore the price"],
          correct: 1,
          explanation: "Always think carefully before big purchases. Do you really need it or just want it?"
        },
        {
          question: "If you find $5 on the ground, what should you do?",
          options: ["Keep it secretly", "Try to find who lost it", "Spend it right away", "Hide it"],
          correct: 1,
          explanation: "The honest thing is to try to find who lost it or turn it in to a trusted adult."
        },
        {
          question: "How often should you add money to your savings?",
          options: ["Never", "Only when you remember", "Regularly, like weekly", "Only on birthdays"],
          correct: 2,
          explanation: "Regular saving, even small amounts, builds a strong habit and adds up over time!"
        },
        {
          question: "What's compound interest?",
          options: ["Money that disappears", "When your money earns money", "A type of coin", "A bank fee"],
          correct: 1,
          explanation: "Compound interest is when the money you save earns more money over time!"
        },
        {
          question: "You want to buy something that costs $15 but only have $12. What should you do?",
          options: ["Take money from someone", "Save $3 more", "Buy it anyway", "Forget about it"],
          correct: 1,
          explanation: "Save the additional $3 you need. This teaches patience and planning!"
        },
        {
          question: "Which is a need vs. a want?",
          options: ["Food is a want, toys are needs", "Food is a need, toys are wants", "Both are wants", "Both are needs"],
          correct: 1,
          explanation: "Food is a need (necessary for survival), while toys are wants (nice to have but not necessary)."
        },
        {
          question: "What's a good percentage of allowance to save?",
          options: ["0%", "10-20%", "50%", "100%"],
          correct: 1,
          explanation: "Saving 10-20% of your allowance is a great start and leaves money for spending too!"
        },
        {
          question: "If you save quarters and have 20 quarters, how much money is that?",
          options: ["$4", "$5", "$6", "$10"],
          correct: 1,
          explanation: "Each quarter is worth 25 cents. 20 × 25¢ = 500¢ = $5.00!"
        },
        {
          question: "Why shouldn't you keep all your money in one place?",
          options: ["It's safer to spread it out", "It looks messy", "It's harder to count", "No reason"],
          correct: 0,
          explanation: "Keeping money in different safe places (some saved, some for spending) is smart!"
        },
        {
          question: "What happens if you spend more money than you have?",
          options: ["Nothing", "You go into debt", "You get more money", "It's fine"],
          correct: 1,
          explanation: "Spending more than you have creates debt, which means you owe money!"
        },
        {
          question: "How can you earn money as a kid?",
          options: ["Chores around the house", "Lemonade stand", "Pet sitting", "All of the above"],
          correct: 3,
          explanation: "All of these are great ways for kids to earn money and learn about work!"
        },
        {
          question: "What should you do if you break something that belongs to someone else?",
          options: ["Hide it", "Blame someone else", "Tell the truth and offer to pay for it", "Run away"],
          correct: 2,
          explanation: "Being honest and responsible with money means paying for things you break."
        },
        {
          question: "If you save $10 every month for a year, how much will you have?",
          options: ["$100", "$110", "$120", "$130"],
          correct: 2,
          explanation: "$10 × 12 months = $120. Monthly saving really adds up over a year!"
        },
        {
          question: "What's the most important thing about saving money?",
          options: ["Having the most money", "Starting the habit early", "Only saving large amounts", "Saving is impossible"],
          correct: 1,
          explanation: "Starting the savings habit early, even with small amounts, sets you up for success!"
        }
      ]
    },
    'dollar-detective': {
      title: 'Dollar Detective',
      description: 'Become a money detective and learn about US currency',
      icon: '🕵️',
      color: 'bg-green-500',
      questions: [
        {
          question: "How many cents are in a quarter?",
          options: ["10 cents", "25 cents", "50 cents", "100 cents"],
          correct: 1,
          explanation: "A quarter is worth 25 cents. It's called a quarter because it's 1/4 of a dollar!"
        },
        {
          question: "What color is a $20 bill?",
          options: ["Green", "Pink", "Blue", "Red"],
          correct: 0,
          explanation: "All US dollar bills are primarily green in color, including the $20 bill!"
        },
        {
          question: "How many nickels make a quarter?",
          options: ["3", "4", "5", "6"],
          correct: 2,
          explanation: "5 nickels = 5 × 5¢ = 25¢ = 1 quarter!"
        },
        {
          question: "Which president is on the penny?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Theodore Roosevelt"],
          correct: 2,
          explanation: "Abraham Lincoln, the 16th president, is featured on the penny!"
        },
        {
          question: "How many pennies equal one dime?",
          options: ["5", "10", "15", "20"],
          correct: 1,
          explanation: "A dime is worth 10 cents, so it equals 10 pennies!"
        },
        {
          question: "What's the largest coin commonly used in the US?",
          options: ["Penny", "Nickel", "Dime", "Quarter"],
          correct: 3,
          explanation: "The quarter is the largest coin commonly used in everyday transactions!"
        },
        {
          question: "How many dollars equal 400 pennies?",
          options: ["$2", "$3", "$4", "$5"],
          correct: 2,
          explanation: "400 pennies ÷ 100 pennies per dollar = $4!"
        },
        {
          question: "Which coin is worth 5 cents?",
          options: ["Penny", "Nickel", "Dime", "Quarter"],
          correct: 1,
          explanation: "The nickel is worth 5 cents. It's named after the metal nickel!"
        },
        {
          question: "What symbol represents cents?",
          options: ["$", "¢", "#", "&"],
          correct: 1,
          explanation: "The cent symbol (¢) represents cents, while $ represents dollars!"
        },
        {
          question: "How many quarters do you need to make $2?",
          options: ["6", "7", "8", "9"],
          correct: 2,
          explanation: "$2 = 200 cents ÷ 25 cents per quarter = 8 quarters!"
        },
        {
          question: "Which president is on the quarter?",
          options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "Franklin Roosevelt"],
          correct: 2,
          explanation: "George Washington, the first president, is on the quarter!"
        },
        {
          question: "What's the smallest coin by size?",
          options: ["Penny", "Nickel", "Dime", "Quarter"],
          correct: 2,
          explanation: "The dime is the smallest coin by size, even though it's worth more than a penny or nickel!"
        },
        {
          question: "How many cents are in a dollar?",
          options: ["50", "75", "100", "125"],
          correct: 2,
          explanation: "There are 100 cents in one dollar. That's why we use 100 pennies to make $1!"
        },
        {
          question: "If you have 3 quarters, 2 dimes, and 1 nickel, how much money do you have?",
          options: ["95¢", "100¢", "$1.00", "$1.05"],
          correct: 1,
          explanation: "3 quarters (75¢) + 2 dimes (20¢) + 1 nickel (5¢) = 100¢ = $1.00!"
        },
        {
          question: "What's on the back of a penny?",
          options: ["Eagle", "Lincoln Memorial", "Statue of Liberty", "White House"],
          correct: 1,
          explanation: "The Lincoln Memorial is featured on the back of the penny!"
        },
        {
          question: "How many dimes equal 2 quarters?",
          options: ["3", "4", "5", "6"],
          correct: 2,
          explanation: "2 quarters = 50¢, and 5 dimes = 5 × 10¢ = 50¢!"
        },
        {
          question: "Which coin has a torch on the back?",
          options: ["Penny", "Nickel", "Dime", "Quarter"],
          correct: 2,
          explanation: "The dime features a torch (along with olive and oak branches) on the back!"
        },
        {
          question: "What does 'E PLURIBUS UNUM' mean on coins?",
          options: ["In God We Trust", "Out of many, one", "United States", "Liberty"],
          correct: 1,
          explanation: "'E Pluribus Unum' is Latin for 'Out of many, one' - referring to how individual states became one nation!"
        },
        {
          question: "How much is half a dollar?",
          options: ["25 cents", "50 cents", "75 cents", "100 cents"],
          correct: 1,
          explanation: "Half a dollar is 50 cents, which equals 2 quarters!"
        },
        {
          question: "If you buy something for 75¢ and pay with $1, how much change do you get?",
          options: ["15¢", "20¢", "25¢", "30¢"],
          correct: 2,
          explanation: "$1.00 - 75¢ = 25¢ change. That's exactly one quarter!"
        },
        {
          question: "Which building is on the back of a nickel?",
          options: ["White House", "Capitol Building", "Monticello", "Lincoln Memorial"],
          correct: 2,
          explanation: "Monticello, Thomas Jefferson's home, is on the back of the nickel!"
        },
        {
          question: "How many different ways can you make 30 cents using quarters, dimes, nickels, and pennies?",
          options: ["2", "3", "4", "5"],
          correct: 2,
          explanation: "You can make 30¢ with: 1 quarter + 1 nickel, 3 dimes, 6 nickels, or 30 pennies - that's 4 ways!"
        },
        {
          question: "What's the motto on all US coins?",
          options: ["E Pluribus Unum", "In God We Trust", "Liberty", "United States of America"],
          correct: 1,
          explanation: "'In God We Trust' is the official motto and appears on all US coins!"
        },
        {
          question: "If you have 12 nickels, how much money is that?",
          options: ["50¢", "55¢", "60¢", "65¢"],
          correct: 2,
          explanation: "12 nickels × 5¢ each = 60¢!"
        },
        {
          question: "Which president is on the dime?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Franklin D. Roosevelt"],
          correct: 3,
          explanation: "Franklin D. Roosevelt, the 32nd president, is on the dime!"
        },
        {
          question: "How many pennies and nickels together make 15 cents?",
          options: ["1 penny + 1 nickel", "5 pennies + 2 nickels", "10 pennies + 1 nickel", "3 pennies + 3 nickels"],
          correct: 2,
          explanation: "10 pennies (10¢) + 1 nickel (5¢) = 15¢!"
        },
        {
          question: "What metal gives the penny its color?",
          options: ["Gold", "Silver", "Copper", "Nickel"],
          correct: 2,
          explanation: "Copper gives the penny its distinctive reddish-brown color!"
        },
        {
          question: "If you save one quarter every day for a week, how much will you have?",
          options: ["$1.25", "$1.50", "$1.75", "$2.00"],
          correct: 2,
          explanation: "7 days × 25¢ per day = 175¢ = $1.75!"
        },
        {
          question: "Which coin is magnetic?",
          options: ["Penny", "Nickel", "Dime", "None of them"],
          correct: 3,
          explanation: "None of the current US coins are magnetic! They're made of non-magnetic metals."
        },
        {
          question: "How many cents do you need to make your first dollar?",
          options: ["50 cents", "75 cents", "100 cents", "125 cents"],
          correct: 2,
          explanation: "You need 100 cents to make one dollar - that's the foundation of our money system!"
        }
      ]
    },
    'allowance-academy': {
      title: 'Allowance Academy',
      description: 'Master the art of managing your allowance',
      icon: '💰',
      color: 'bg-blue-500',
      questions: [
        {
          question: "If your allowance is $10 and you want to save 30%, how much should you save?",
          options: ["$2", "$3", "$4", "$5"],
          correct: 1,
          explanation: "30% of $10 = $3. To find 30%, multiply by 0.30: $10 × 0.30 = $3!"
        },
        {
          question: "What's a good rule for spending money?",
          options: ["Spend it all right away", "Think before you buy", "Only buy expensive things", "Never save money"],
          correct: 1,
          explanation: "Always think before you buy! Ask yourself: Do I really need this? Will I still want it tomorrow?"
        },
        {
          question: "You get $8 allowance weekly. How much is that per month (4 weeks)?",
          options: ["$24", "$28", "$32", "$36"],
          correct: 2,
          explanation: "$8 × 4 weeks = $32 per month. Monthly planning helps with bigger goals!"
        },
        {
          question: "What should you do with your allowance first?",
          options: ["Spend it all", "Save some of it", "Give it away", "Lose it"],
          correct: 1,
          explanation: "Save some first! Pay yourself first is a key money rule that builds wealth over time."
        },
        {
          question: "If you want to buy a $25 game and get $5 allowance weekly, how long to save?",
          options: ["3 weeks", "4 weeks", "5 weeks", "6 weeks"],
          correct: 2,
          explanation: "$25 ÷ $5 per week = 5 weeks. Planning ahead helps you reach your goals!"
        },
        {
          question: "What's the difference between a need and a want?",
          options: ["There's no difference", "Needs are required, wants are desired", "Wants are more important", "Needs cost more"],
          correct: 1,
          explanation: "Needs are things you must have (food, clothes), wants are things you'd like to have (toys, games)."
        },
        {
          question: "You have $12 allowance. If you save $4, spend $6, how much is left?",
          options: ["$1", "$2", "$3", "$4"],
          correct: 1,
          explanation: "$12 - $4 (saved) - $6 (spent) = $2 left for other things!"
        },
        {
          question: "What's a good way to track your allowance?",
          options: ["Don't track it", "Keep it all in your head", "Write it down or use an app", "Ask parents to track it"],
          correct: 2,
          explanation: "Writing down your money or using an app helps you see where it goes and plan better!"
        },
        {
          question: "If you earn $3 for extra chores plus $7 regular allowance, what's your total?",
          options: ["$9", "$10", "$11", "$12"],
          correct: 1,
          explanation: "$3 + $7 = $10 total. Extra work can boost your income!"
        },
        {
          question: "What should you do if you spend all your allowance too quickly?",
          options: ["Ask for more immediately", "Learn to budget better", "Stop getting allowance", "Borrow from friends"],
          correct: 1,
          explanation: "Learning to budget helps you make your money last longer and reach your goals!"
        },
        {
          question: "If you save 20% of a $15 allowance, how much do you save?",
          options: ["$2", "$3", "$4", "$5"],
          correct: 1,
          explanation: "20% of $15 = $15 × 0.20 = $3. The 20% rule is a great savings habit!"
        },
        {
          question: "What's an emergency fund?",
          options: ["Money for fun", "Money saved for unexpected needs", "Money you hide", "Money for toys"],
          correct: 1,
          explanation: "An emergency fund is money saved for unexpected things like fixing something that breaks."
        },
        {
          question: "You want a $30 bike. With $6 weekly allowance, saving half each week, how long?",
          options: ["8 weeks", "10 weeks", "12 weeks", "15 weeks"],
          correct: 1,
          explanation: "Half of $6 = $3 saved weekly. $30 ÷ $3 = 10 weeks to save for the bike!"
        },
        {
          question: "What happens if you consistently save part of your allowance?",
          options: ["You'll have less fun", "You'll build wealth over time", "You'll forget about it", "Nothing happens"],
          correct: 1,
          explanation: "Consistent saving, even small amounts, builds wealth and teaches great money habits!"
        },
        {
          question: "How should you handle peer pressure to spend money?",
          options: ["Always give in", "Stick to your budget", "Borrow money", "Stop having friends"],
          correct: 1,
          explanation: "Stick to your budget! True friends will respect your money goals and decisions."
        },
        {
          question: "If you get $20 monthly allowance, what's a reasonable amount to save?",
          options: ["$0", "$2-4", "$10", "$20"],
          correct: 1,
          explanation: "$2-4 (10-20%) is a great start! It leaves money for spending while building savings."
        },
        {
          question: "What's the benefit of earning extra money through chores?",
          options: ["More money for goals", "Learning work ethic", "Building responsibility", "All of the above"],
          correct: 3,
          explanation: "Extra chores teach work ethic, responsibility, and give you more money for your goals!"
        },
        {
          question: "You have $50 saved and want to buy a $35 toy. Should you?",
          options: ["Yes, immediately", "Think about it first", "Buy two toys", "Never buy toys"],
          correct: 1,
          explanation: "Always think first! Consider if you really want it and if it fits your goals."
        },
        {
          question: "What's compound growth with allowance savings?",
          options: ["Money disappearing", "Money growing faster over time", "Getting confused", "Spending more"],
          correct: 1,
          explanation: "When money earns interest, your savings grow faster over time - that's compound growth!"
        },
        {
          question: "How can you increase your allowance income?",
          options: ["Do extra chores", "Start a small business", "Sell things you don't need", "All of the above"],
          correct: 3,
          explanation: "All of these are great ways to increase your income and reach goals faster!"
        },
        {
          question: "If you budget $10 for fun and spend $12, what happened?",
          options: ["You stayed on budget", "You went over budget", "You saved money", "Nothing wrong"],
          correct: 1,
          explanation: "You went over budget by $2. This happens sometimes - learn from it and adjust!"
        },
        {
          question: "What's the 50/30/20 rule for money?",
          options: ["50% needs, 30% wants, 20% savings", "50% toys, 30% food, 20% clothes", "50% savings, 30% needs, 20% wants", "It doesn't matter"],
          correct: 0,
          explanation: "50% for needs, 30% for wants, 20% for savings is a simple budgeting rule!"
        },
        {
          question: "You receive $25 birthday money plus $8 allowance. How much total to budget?",
          options: ["$25", "$33", "$8", "$30"],
          correct: 1,
          explanation: "$25 + $8 = $33 total money to budget and plan with!"
        },
        {
          question: "What should you do if you make a money mistake?",
          options: ["Hide it", "Give up on budgeting", "Learn from it and adjust", "Blame others"],
          correct: 2,
          explanation: "Everyone makes money mistakes! The key is learning from them and improving."
        },
        {
          question: "How often should you review your allowance budget?",
          options: ["Never", "Once a year", "Weekly or monthly", "Only when you run out"],
          correct: 2,
          explanation: "Regular review (weekly or monthly) helps you stay on track and adjust as needed!"
        },
        {
          question: "What's opportunity cost?",
          options: ["The cost of opportunities", "What you give up when you choose something", "The price of items", "Money you lose"],
          correct: 1,
          explanation: "Opportunity cost is what you give up when you choose one thing over another!"
        },
        {
          question: "If you want to triple your $9 savings, how much do you need total?",
          options: ["$18", "$27", "$36", "$45"],
          correct: 1,
          explanation: "Triple means 3 times: $9 × 3 = $27 total needed!"
        },
        {
          question: "What's better: getting allowance for nothing or earning it through chores?",
          options: ["Getting it for nothing", "Earning it through chores", "It doesn't matter", "Neither"],
          correct: 1,
          explanation: "Earning allowance through chores teaches work ethic and makes you appreciate money more!"
        },
        {
          question: "You save $5 monthly for 6 months, then spend $20. How much is left?",
          options: ["$5", "$10", "$15", "$20"],
          correct: 1,
          explanation: "$5 × 6 months = $30 saved, then $30 - $20 spent = $10 left!"
        },
        {
          question: "What's the most important allowance management skill?",
          options: ["Spending quickly", "Saving everything", "Finding balance", "Avoiding money"],
          correct: 2,
          explanation: "Finding balance between saving, spending on needs, and enjoying some wants is key!"
        }
      ]
    },
    'entrepreneurship-explorer': {
      title: 'Young Entrepreneur',
      description: 'Discover how to start your own small business',
      icon: '🚀',
      color: 'bg-purple-500',
      questions: [
        {
          question: "What's the first step in starting a lemonade stand?",
          options: ["Buy lemons", "Plan your business", "Set up a table", "Make signs"],
          correct: 1,
          explanation: "Planning is always first! You need to think about costs, location, and what you'll sell."
        },
        {
          question: "If you sell lemonade for $1 and it costs 30 cents to make, what's your profit?",
          options: ["30 cents", "50 cents", "70 cents", "$1"],
          correct: 2,
          explanation: "Profit = Selling price - Cost = $1.00 - $0.30 = $0.70 profit per cup!"
        },
        {
          question: "What's the most important thing for good customer service?",
          options: ["Low prices", "Being friendly and helpful", "Fast service", "Pretty decorations"],
          correct: 1,
          explanation: "Being friendly and helpful keeps customers coming back and telling their friends!"
        },
        {
          question: "You made $20 selling cookies but spent $8 on ingredients. What's your profit?",
          options: ["$8", "$10", "$12", "$14"],
          correct: 2,
          explanation: "$20 revenue - $8 costs = $12 profit. Always subtract your costs from what you earn!"
        },
        {
          question: "Which is a good business idea for kids?",
          options: ["Pet sitting", "Dog walking", "Lemonade stand", "All of the above"],
          correct: 3,
          explanation: "All of these are great businesses kids can start! Pick something you enjoy doing."
        },
        {
          question: "What is marketing?",
          options: ["Going to the grocery store", "Telling people about your business", "Counting money", "Making products"],
          correct: 1,
          explanation: "Marketing is how you let people know about your business and convince them to buy from you!"
        },
        {
          question: "What is startup capital?",
          options: ["A city for businesses", "Money needed to start a business", "A type of chair", "Business rules"],
          correct: 1,
          explanation: "Startup capital is the money you need to get your business started - for supplies, equipment, and other costs!"
        },
        {
          question: "If you sell 20 cookies for $2 each, how much revenue do you make?",
          options: ["$20", "$30", "$40", "$50"],
          correct: 2,
          explanation: "Revenue = Price × Quantity sold. $2 × 20 cookies = $40 total revenue!"
        },
        {
          question: "What is competition?",
          options: ["Other businesses selling similar things", "Your customers", "Your employees", "Your suppliers"],
          correct: 0,
          explanation: "Competition means other businesses that sell similar products or services to the same customers as you!"
        },
        {
          question: "What does 'supply and demand' mean?",
          options: ["How many items you have vs how many people want them", "Your business address", "Your profit margin", "Your employee count"],
          correct: 0,
          explanation: "Supply is how much you have to sell, demand is how much people want to buy. When demand is high and supply is low, prices go up!"
        },
        {
          question: "What is an entrepreneur?",
          options: ["Someone who works for others", "Someone who starts and runs their own business", "Someone who only spends money", "Someone who works in an office"],
          correct: 1,
          explanation: "An entrepreneur is a person who starts their own business and takes risks to make it successful!"
        },
        {
          question: "What are expenses in business?",
          options: ["Money you earn", "Money you spend to run your business", "Number of customers", "Products you sell"],
          correct: 1,
          explanation: "Expenses are all the costs of running your business - like supplies, rent, and other things you need to pay for!"
        },
        {
          question: "What is a target market?",
          options: ["A shooting range", "The specific group of people most likely to buy your product", "Your business location", "Your competitors"],
          correct: 1,
          explanation: "Your target market is the group of people who are most likely to want and buy what you're selling!"
        },
        {
          question: "What is a logo?",
          options: ["A business rule", "A visual symbol that represents your business", "A type of customer", "A way to count money"],
          correct: 1,
          explanation: "A logo is a special design or symbol that helps people recognize and remember your business!"
        },
        {
          question: "What does 'break even' mean?",
          options: ["Your business is making exactly enough to cover costs", "Your business is failing", "You're making lots of profit", "You need to lower prices"],
          correct: 0,
          explanation: "Breaking even means your revenue equals your expenses - you're not losing money, but not making profit yet either!"
        },
        {
          question: "What is customer service?",
          options: ["How you treat and help your customers", "The price of your products", "Your business location", "Your marketing strategy"],
          correct: 0,
          explanation: "Customer service is how well you take care of your customers - being helpful, friendly, and solving their problems!"
        },
        {
          question: "What is a business license?",
          options: ["Permission from the government to operate your business", "A type of customer", "A business plan", "Your profit statement"],
          correct: 0,
          explanation: "A business license is official permission from the government that allows you to legally run your business!"
        },
        {
          question: "What is inventory?",
          options: ["Your customers", "The products you have available to sell", "Your employees", "Your business plan"],
          correct: 1,
          explanation: "Inventory is all the products or materials you have in stock and ready to sell to customers!"
        },
        {
          question: "What is a business partnership?",
          options: ["Working alone", "When two or more people own a business together", "Having many customers", "Selling online only"],
          correct: 1,
          explanation: "A partnership is when two or more people work together to own and run a business, sharing responsibilities and profits!"
        },
        {
          question: "What is profit margin?",
          options: ["How much profit you make as a percentage of sales", "The size of your store", "Number of employees", "Your business age"],
          correct: 0,
          explanation: "Profit margin shows what percentage of your sales is actual profit after paying all your costs!"
        },
        {
          question: "What is a franchise?",
          options: ["A type of customer", "A business model where you pay to use another company's brand and system", "A business expense", "A marketing strategy"],
          correct: 1,
          explanation: "A franchise lets you run a business using another company's proven brand, products, and business methods!"
        },
        {
          question: "What is market research?",
          options: ["Learning about your customers and competitors", "Counting your money", "Hiring employees", "Building a website"],
          correct: 0,
          explanation: "Market research means studying your potential customers and competitors to understand what people want and need!"
        },
        {
          question: "What is a business website?",
          options: ["A place where customers can learn about and buy from your business online", "A physical store", "A business plan", "An employee"],
          correct: 0,
          explanation: "A business website is your online presence where customers can find information about your business and potentially buy your products!"
        },
        {
          question: "What is cash flow?",
          options: ["The money coming in and going out of your business", "Your customer list", "Your product inventory", "Your business location"],
          correct: 0,
          explanation: "Cash flow is the movement of money - how much is coming into your business and how much is going out over time!"
        },
        {
          question: "What is a business mentor?",
          options: ["A customer", "An experienced person who gives you business advice", "A competitor", "A supplier"],
          correct: 1,
          explanation: "A business mentor is an experienced entrepreneur who shares their knowledge and helps guide you in running your business!"
        },
        {
          question: "What is quality control?",
          options: ["Making sure your products meet high standards", "Counting money", "Finding customers", "Hiring employees"],
          correct: 0,
          explanation: "Quality control means checking that your products or services are consistently good and meet your customers' expectations!"
        },
        {
          question: "What is a business goal?",
          options: ["Something specific you want your business to achieve", "A type of customer", "A business expense", "A marketing method"],
          correct: 0,
          explanation: "A business goal is a specific target or achievement you're working toward, like earning a certain amount or serving more customers!"
        },
        {
          question: "What is networking in business?",
          options: ["Using the internet", "Meeting and building relationships with other business people", "Counting inventory", "Setting prices"],
          correct: 1,
          explanation: "Business networking means meeting other entrepreneurs and professionals who can help your business grow through advice, partnerships, or referrals!"
        },
        {
          question: "What is a business model?",
          options: ["A toy business", "The way your business makes money", "Your business location", "Your employee handbook"],
          correct: 1,
          explanation: "A business model is your plan for how your business will make money - what you sell, to whom, and how you deliver value!"
        },
        {
          question: "What is innovation in business?",
          options: ["Doing things the same way always", "Creating new or better ways to solve problems", "Having lots of employees", "Having a big store"],
          correct: 1,
          explanation: "Innovation means coming up with new ideas, products, or better ways of doing things that help your business stand out and succeed!"
        }
      ]
    },
    'banking-buddy': {
      title: 'Banking Buddy',
      description: 'Learn about banks and savings accounts',
      icon: '🏦',
      color: 'bg-emerald-500',
      questions: [
        {
          question: "What is a bank?",
          options: ["A place to play games", "A safe place to keep your money", "A type of store", "A school building"],
          correct: 1,
          explanation: "Banks are safe places where people keep their money and it can grow with interest!"
        },
        {
          question: "What happens to money in a savings account?",
          options: ["It disappears", "It earns interest and grows", "It turns into coins", "Nothing happens"],
          correct: 1,
          explanation: "Money in savings accounts earns interest, which means the bank pays you for keeping money there!"
        },
        {
          question: "If you put $100 in savings and earn 2% interest per year, how much do you earn?",
          options: ["$1", "$2", "$5", "$10"],
          correct: 1,
          explanation: "2% of $100 = $2. So you earn $2 in interest for the year!"
        },
        {
          question: "Why is it safer to keep money in a bank than under your mattress?",
          options: ["Banks are protected and insured", "Mattresses are uncomfortable", "Banks are prettier", "It doesn't matter"],
          correct: 0,
          explanation: "Banks are protected by insurance, so your money is safe even if something happens to the bank!"
        },
        {
          question: "What's an ATM?",
          options: ["A type of car", "A machine that gives you cash from your account", "A video game", "A type of food"],
          correct: 1,
          explanation: "ATM stands for Automated Teller Machine - it lets you get cash from your bank account!"
        },
        {
          question: "What is a checking account?",
          options: ["An account for daily spending", "A savings account", "A type of loan", "A credit card"],
          correct: 0,
          explanation: "A checking account is for everyday transactions like buying things and paying bills!"
        },
        {
          question: "What is a debit card?",
          options: ["A card that borrows money", "A card that uses your own money from your account", "A gift card", "A library card"],
          correct: 1,
          explanation: "A debit card lets you spend money that's already in your bank account!"
        },
        {
          question: "What does FDIC insurance protect?",
          options: ["Your car", "Your house", "Your bank deposits", "Your clothes"],
          correct: 2,
          explanation: "FDIC insurance protects your money in the bank up to $250,000 per account!"
        },
        {
          question: "If you have $200 in savings earning 3% annual interest, how much interest do you earn in one year?",
          options: ["$3", "$6", "$9", "$12"],
          correct: 1,
          explanation: "3% of $200 = 0.03 × $200 = $6 in interest per year!"
        },
        {
          question: "What's the difference between a bank and a credit union?",
          options: ["No difference", "Credit unions are owned by members", "Banks are always bigger", "Credit unions don't give loans"],
          correct: 1,
          explanation: "Credit unions are owned by their members and often offer better rates and lower fees!"
        },
        {
          question: "What is online banking?",
          options: ["Playing games online", "Managing your bank account through the internet", "Shopping online", "Social media"],
          correct: 1,
          explanation: "Online banking lets you check balances, transfer money, and pay bills using a computer or phone!"
        },
        {
          question: "What's a bank routing number?",
          options: ["Your account balance", "A unique number that identifies your bank", "Your PIN number", "Your phone number"],
          correct: 1,
          explanation: "A routing number is a 9-digit code that identifies which bank your account is at!"
        },
        {
          question: "What happens if you overdraw your account?",
          options: ["Nothing", "The bank gives you free money", "You get charged overdraft fees", "Your account closes forever"],
          correct: 2,
          explanation: "Overdrawing means spending more than you have, and banks charge fees for this!"
        },
        {
          question: "What is direct deposit?",
          options: ["Putting coins in a piggy bank", "Having your paycheck automatically put into your account", "Withdrawing cash", "Using a debit card"],
          correct: 1,
          explanation: "Direct deposit automatically puts your paycheck into your bank account instead of giving you a paper check!"
        },
        {
          question: "What's a minimum balance requirement?",
          options: ["The most money you can have", "The least amount you must keep in your account", "Your monthly spending limit", "The interest rate"],
          correct: 1,
          explanation: "Some accounts require you to keep a minimum amount of money to avoid fees!"
        },
        {
          question: "What is compound interest in a savings account?",
          options: ["Interest that's complicated", "Interest earned on both your original money and previous interest", "Monthly fees", "A type of loan"],
          correct: 1,
          explanation: "Compound interest means you earn interest on your money AND on the interest you've already earned!"
        },
        {
          question: "How often is interest usually calculated on savings accounts?",
          options: ["Once a year", "Monthly or daily", "Every 5 years", "Never"],
          correct: 1,
          explanation: "Most banks calculate interest monthly or even daily, so your money grows regularly!"
        },
        {
          question: "What's a bank statement?",
          options: ["A bank's opinion", "A record of all your account activity", "A loan application", "A type of savings account"],
          correct: 1,
          explanation: "A bank statement shows all the money coming in and going out of your account!"
        },
        {
          question: "What's a certificate of deposit (CD)?",
          options: ["A music album", "A savings account where you agree not to touch the money for a set time", "A type of loan", "A credit card"],
          correct: 1,
          explanation: "A CD usually pays higher interest because you promise not to withdraw the money for months or years!"
        },
        {
          question: "What does APY stand for?",
          options: ["Annual Percentage Yield", "Always Pay Yearly", "Account Protection Year", "Average Payment Year"],
          correct: 0,
          explanation: "APY shows how much your money will grow in a year, including compound interest!"
        },
        {
          question: "What's a joint bank account?",
          options: ["An account for one person only", "An account owned by two or more people", "A business account", "A type of loan"],
          correct: 1,
          explanation: "Joint accounts are shared by multiple people, like parents and children or married couples!"
        },
        {
          question: "What's mobile banking?",
          options: ["A bank that moves around", "Banking using your smartphone", "A type of savings account", "Banking while driving"],
          correct: 1,
          explanation: "Mobile banking apps let you manage your money using your smartphone or tablet!"
        },
        {
          question: "What happens to your money if a bank fails?",
          options: ["You lose all your money", "FDIC insurance protects up to $250,000", "The government takes it", "Nothing happens"],
          correct: 1,
          explanation: "FDIC insurance protects your deposits up to $250,000 per account if a bank fails!"
        },
        {
          question: "What's a wire transfer?",
          options: ["Sending money electronically to another bank", "Using wireless internet", "A type of savings account", "Transferring phone service"],
          correct: 0,
          explanation: "Wire transfers send money electronically from one bank to another, usually for a fee!"
        },
        {
          question: "What's the difference between a savings and checking account?",
          options: ["No difference", "Savings earns interest, checking is for daily transactions", "Checking earns more interest", "Savings accounts are for businesses only"],
          correct: 1,
          explanation: "Savings accounts earn interest and are for saving money, checking accounts are for everyday spending!"
        },
        {
          question: "What does it mean to balance your checkbook?",
          options: ["Physically weighing your checkbook", "Making sure your records match the bank's records", "Writing more checks", "Destroying old checks"],
          correct: 1,
          explanation: "Balancing means making sure the money you think you have matches what the bank says you have!"
        },
        {
          question: "What's automatic bill pay?",
          options: ["Bills that pay themselves", "Setting up your bank to automatically pay your bills", "Free bills", "Bills that cost extra"],
          correct: 1,
          explanation: "Automatic bill pay lets your bank pay your regular bills on time without you having to remember!"
        },
        {
          question: "What's a money market account?",
          options: ["A place to buy groceries", "A savings account that usually pays higher interest", "A type of checking account", "A loan"],
          correct: 1,
          explanation: "Money market accounts often pay higher interest than regular savings but may have higher minimum balances!"
        },
        {
          question: "What should you do if you lose your debit card?",
          options: ["Nothing", "Call your bank immediately", "Wait a week", "Use someone else's card"],
          correct: 1,
          explanation: "Call your bank right away to cancel the lost card and get a new one to protect your money!"
        }
      ]
    },
    'investment-island': {
      title: 'Investment Island',
      description: 'Explore the world of investments',
      icon: '🏝️',
      color: 'bg-yellow-500',
      questions: [
        {
          question: "What is an investment?",
          options: ["Spending money on toys", "Putting money into something to grow it", "Giving money away", "Hiding money"],
          correct: 1,
          explanation: "An investment is putting money into something (like stocks or bonds) hoping it will grow over time!"
        },
        {
          question: "What is a stock?",
          options: ["A type of soup", "A small piece of ownership in a company", "A savings account", "A type of loan"],
          correct: 1,
          explanation: "When you buy stock, you own a tiny piece of that company!"
        },
        {
          question: "If you invest $50 and it grows 10%, how much do you have now?",
          options: ["$55", "$60", "$65", "$70"],
          correct: 0,
          explanation: "$50 + (10% of $50) = $50 + $5 = $55 total!"
        },
        {
          question: "What's compound interest?",
          options: ["Interest that's hard to understand", "When your money earns money, and that money earns money too", "A type of bank account", "A way to spend money"],
          correct: 1,
          explanation: "Compound interest is when your money grows, and then the growth also grows! It's like magic!"
        },
        {
          question: "Which investment is generally safer for beginners?",
          options: ["Individual stocks", "Index funds", "Cryptocurrency", "Day trading"],
          correct: 1,
          explanation: "Index funds spread risk across many companies, making them safer for beginners!"
        },
        {
          question: "What is a bond?",
          options: ["A loan you give to a company or government", "A type of stock", "A savings account", "A credit card"],
          correct: 0,
          explanation: "When you buy a bond, you're lending money and they pay you interest!"
        },
        {
          question: "What does 'diversification' mean in investing?",
          options: ["Putting all money in one investment", "Spreading money across different investments", "Only buying expensive stocks", "Never investing"],
          correct: 1,
          explanation: "Diversification means not putting all your eggs in one basket - spread out your investments!"
        },
        {
          question: "What is the S&P 500?",
          options: ["A car model", "An index of 500 large US companies", "A type of bond", "A savings account"],
          correct: 1,
          explanation: "The S&P 500 tracks the performance of 500 of the biggest companies in America!"
        },
        {
          question: "If you invest $100 and it loses 20%, how much do you have?",
          options: ["$70", "$80", "$90", "$95"],
          correct: 1,
          explanation: "$100 - 20% = $100 - $20 = $80. Investments can go down too!"
        },
        {
          question: "What is dollar-cost averaging?",
          options: ["Buying expensive stocks", "Investing the same amount regularly", "Only investing once", "Calculating average prices"],
          correct: 1,
          explanation: "Dollar-cost averaging means investing the same amount regularly, which helps reduce risk!"
        },
        {
          question: "What's a mutual fund?",
          options: ["A bank account", "A pool of money from many investors", "A single stock", "A type of loan"],
          correct: 1,
          explanation: "Mutual funds combine money from many people to buy lots of different investments!"
        },
        {
          question: "What does 'buy low, sell high' mean?",
          options: ["Buy expensive things", "Purchase when prices are down, sell when they're up", "Always buy the cheapest option", "Never sell anything"],
          correct: 1,
          explanation: "This means try to buy investments when they're cheap and sell when they're expensive!"
        },
        {
          question: "What is risk tolerance?",
          options: ["How much risk you're comfortable with", "The maximum you can invest", "Your age", "Your income"],
          correct: 0,
          explanation: "Risk tolerance is how comfortable you are with your investments going up and down!"
        },
        {
          question: "What's a dividend?",
          options: ["A fee you pay", "Money some companies pay to shareholders", "A type of tax", "A bank account"],
          correct: 1,
          explanation: "Dividends are payments some companies make to people who own their stock!"
        },
        {
          question: "What is inflation?",
          options: ["When prices generally go up over time", "When investments always grow", "A type of tax", "A savings account feature"],
          correct: 0,
          explanation: "Inflation means things cost more over time, so your money buys less!"
        },
        {
          question: "What's a 401(k)?",
          options: ["A race distance", "A retirement savings account", "A type of stock", "A bank account"],
          correct: 1,
          explanation: "A 401(k) is a special account where people save money for retirement, often with employer help!"
        },
        {
          question: "What does 'market volatility' mean?",
          options: ["Markets are always stable", "Prices going up and down frequently", "Markets are closed", "Only good investments"],
          correct: 1,
          explanation: "Volatility means investment prices change a lot - sometimes up, sometimes down!"
        },
        {
          question: "What's an ETF?",
          options: ["A type of alien", "Exchange-Traded Fund", "Electronic Transfer Fee", "Emergency Tax Fund"],
          correct: 1,
          explanation: "ETFs are like mutual funds but trade on the stock market like individual stocks!"
        },
        {
          question: "What is asset allocation?",
          options: ["Buying only one type of investment", "Dividing investments among different categories", "Selling all investments", "Only buying stocks"],
          correct: 1,
          explanation: "Asset allocation means deciding how much to put in stocks, bonds, and other investments!"
        },
        {
          question: "What's a bull market?",
          options: ["A market that only sells bulls", "When investment prices are generally going up", "A dangerous market", "When markets are closed"],
          correct: 1,
          explanation: "A bull market is when stock prices are rising and investors are optimistic!"
        },
        {
          question: "What's a bear market?",
          options: ["A market for bears", "When investment prices are generally falling", "The strongest market", "A market in winter"],
          correct: 1,
          explanation: "A bear market is when stock prices are falling and investors are pessimistic!"
        },
        {
          question: "What is a portfolio?",
          options: ["A briefcase", "All of your investments combined", "A type of stock", "A savings account"],
          correct: 1,
          explanation: "Your portfolio is the collection of all your different investments!"
        },
        {
          question: "What's the time value of money?",
          options: ["Money is always worth the same", "Money today is worth more than money later", "Time doesn't affect money", "Money gets heavier over time"],
          correct: 1,
          explanation: "Money today is worth more than the same amount later because you can invest it and earn more!"
        },
        {
          question: "What is market capitalization?",
          options: ["The total value of a company's stock", "The number of employees", "How tall the building is", "The company's age"],
          correct: 0,
          explanation: "Market cap is the total dollar value of all a company's shares of stock!"
        },
        {
          question: "What's a Roth IRA?",
          options: ["A type of car", "A retirement account where you pay taxes now", "A type of stock", "A savings account"],
          correct: 1,
          explanation: "A Roth IRA is a retirement account where you pay taxes now but withdrawals in retirement are tax-free!"
        },
        {
          question: "What does P/E ratio mean?",
          options: ["Price to Earnings ratio", "Profit and Expense", "Personal Experience", "Public Entertainment"],
          correct: 0,
          explanation: "P/E ratio compares a company's stock price to how much money it earns per share!"
        },
        {
          question: "What is compound growth in investing?",
          options: ["Growth that's complicated", "When your returns earn returns too", "Slow growth", "No growth at all"],
          correct: 1,
          explanation: "Compound growth is when your investment gains also start earning money, creating faster growth!"
        },
        {
          question: "What's liquidity in investments?",
          options: ["How wet an investment is", "How quickly you can sell an investment for cash", "The color of money", "How much water stocks contain"],
          correct: 1,
          explanation: "Liquidity means how easily and quickly you can convert an investment back to cash!"
        },
        {
          question: "What's the difference between growth and value investing?",
          options: ["No difference", "Growth focuses on expanding companies, value on underpriced ones", "Growth is always better", "Value is always cheaper"],
          correct: 1,
          explanation: "Growth investing targets fast-growing companies, value investing looks for underpriced quality companies!"
        }
      ]
    },
    'charity-champion': {
      title: 'Charity Champion',
      description: 'Learn about giving back to your community',
      icon: '❤️',
      color: 'bg-red-500',
      questions: [
        {
          question: "What is charity?",
          options: ["Keeping all your money", "Giving money or help to people in need", "Buying expensive things", "A type of game"],
          correct: 1,
          explanation: "Charity means giving money, time, or help to people who need it!"
        },
        {
          question: "If you want to give 10% of your $20 allowance to charity, how much is that?",
          options: ["$1", "$2", "$3", "$4"],
          correct: 1,
          explanation: "10% of $20 = $2. Even small amounts can make a big difference!"
        },
        {
          question: "What are some ways kids can help their community?",
          options: ["Volunteer at food banks", "Donate toys they don't use", "Participate in charity walks", "All of the above"],
          correct: 3,
          explanation: "All of these are wonderful ways to help your community and make a difference!"
        },
        {
          question: "Why is it good to give to charity?",
          options: ["It helps others and makes you feel good", "You get money back", "It's required by law", "It's only for rich people"],
          correct: 0,
          explanation: "Giving to charity helps others and creates a good feeling of making a positive difference!"
        },
        {
          question: "What should you consider when choosing a charity?",
          options: ["What cause you care about", "How the charity uses donations", "If it's a legitimate organization", "All of the above"],
          correct: 3,
          explanation: "Research charities to make sure your donation goes to causes you care about and is used well!"
        },
        {
          question: "What is volunteering?",
          options: ["Getting paid for work", "Giving your time to help others for free", "Shopping for charity", "Asking for donations"],
          correct: 1,
          explanation: "Volunteering means giving your time and effort to help others without getting paid!"
        },
        {
          question: "What percentage of income do many financial experts suggest giving to charity?",
          options: ["1%", "5%", "10%", "50%"],
          correct: 2,
          explanation: "Many suggest giving around 10% of income to charity, but any amount helps!"
        },
        {
          question: "What is a food bank?",
          options: ["A bank that loans food", "A place that collects and gives food to hungry people", "A restaurant", "A grocery store"],
          correct: 1,
          explanation: "Food banks collect donated food and give it to families and individuals who need it!"
        },
        {
          question: "How can kids raise money for charity?",
          options: ["Lemonade stands", "Bake sales", "Sponsored walks", "All of the above"],
          correct: 3,
          explanation: "All of these are great ways for kids to raise money to help others!"
        },
        {
          question: "What is a nonprofit organization?",
          options: ["A business that keeps all profits", "An organization that uses money to help others, not make profit", "A type of bank", "A government office"],
          correct: 1,
          explanation: "Nonprofits use their money to help people and causes, not to make profit for owners!"
        },
        {
          question: "What is anonymous giving?",
          options: ["Giving loudly", "Giving without telling anyone your name", "Never giving", "Only giving to friends"],
          correct: 1,
          explanation: "Anonymous giving means helping others without wanting credit or recognition!"
        },
        {
          question: "What are some examples of community service?",
          options: ["Cleaning up parks", "Reading to elderly people", "Helping at animal shelters", "All of the above"],
          correct: 3,
          explanation: "Community service includes any activity that helps make your community better!"
        },
        {
          question: "What is a matching gift program?",
          options: ["Getting the same gift twice", "When employers donate the same amount as their employees", "Gifts that look the same", "Free gifts"],
          correct: 1,
          explanation: "Some employers will match their workers' charitable donations, doubling the impact!"
        },
        {
          question: "How can giving to charity teach you about money management?",
          options: ["It teaches you to budget for giving", "It shows the value of money", "It helps you prioritize spending", "All of the above"],
          correct: 3,
          explanation: "Charitable giving teaches important lessons about budgeting, priorities, and the value of money!"
        },
        {
          question: "What is a charity drive?",
          options: ["Driving to a charity", "An organized effort to collect donations", "A type of car", "A charity event"],
          correct: 1,
          explanation: "Charity drives organize people to collect donations for specific causes or organizations!"
        },
        {
          question: "What is the difference between charity and investment?",
          options: ["No difference", "Charity gives without expecting return, investment expects growth", "Charity is always better", "Investment is always better"],
          correct: 1,
          explanation: "Charity is giving to help others, investment is putting money into something expecting it to grow!"
        },
        {
          question: "What are some local charities kids might support?",
          options: ["Animal shelters", "Homeless shelters", "Schools and libraries", "All of the above"],
          correct: 3,
          explanation: "Local charities serve your community and are great places to start helping others!"
        },
        {
          question: "What is micro-volunteering?",
          options: ["Volunteering for tiny people", "Small, quick volunteer activities", "Volunteering once a year", "Professional volunteering"],
          correct: 1,
          explanation: "Micro-volunteering means small acts of service that take just a few minutes but still help!"
        },
        {
          question: "How can social media help with charity?",
          options: ["It can't help", "Spreading awareness about causes", "Organizing fundraising events", "Both B and C"],
          correct: 3,
          explanation: "Social media can spread awareness about important causes and help organize charitable activities!"
        },
        {
          question: "What is planned giving?",
          options: ["Giving only when you plan to", "Setting aside money regularly for charity", "Only giving during holidays", "Giving without planning"],
          correct: 1,
          explanation: "Planned giving means regularly setting aside money for charitable purposes as part of your budget!"
        },
        {
          question: "What is peer-to-peer fundraising?",
          options: ["Only rich people fundraising", "Friends raising money together for a cause", "Professional fundraising", "Government fundraising"],
          correct: 1,
          explanation: "Peer-to-peer fundraising is when friends, family, and classmates work together to raise money for charity!"
        },
        {
          question: "How can you research if a charity is trustworthy?",
          options: ["Check online charity rating sites", "Look at their financial reports", "Ask how they use donations", "All of the above"],
          correct: 3,
          explanation: "Always research charities to make sure they use donations effectively and honestly!"
        },
        {
          question: "What is corporate social responsibility?",
          options: ["Companies being responsible to customers", "Companies giving back to communities", "Company rules", "Corporate profits"],
          correct: 1,
          explanation: "Corporate social responsibility means companies have a duty to help society and the environment!"
        },
        {
          question: "What is a donor?",
          options: ["Someone who receives charity", "Someone who gives money or items to charity", "A charity worker", "A volunteer"],
          correct: 1,
          explanation: "A donor is a person who gives money, goods, or time to help charitable causes!"
        },
        {
          question: "How does giving to charity benefit the giver?",
          options: ["Creates good feelings", "Teaches empathy", "Builds community connections", "All of the above"],
          correct: 3,
          explanation: "Giving to charity benefits both the recipients and the givers in many positive ways!"
        },
        {
          question: "What is sustainable giving?",
          options: ["Giving only once", "Giving regularly over time within your means", "Giving everything you have", "Never giving"],
          correct: 1,
          explanation: "Sustainable giving means donating regularly in amounts you can afford long-term!"
        },
        {
          question: "What are some ways to give besides money?",
          options: ["Donating clothes and toys", "Volunteering time", "Using skills to help", "All of the above"],
          correct: 3,
          explanation: "There are many valuable ways to give besides money - time, skills, and items are all helpful!"
        },
        {
          question: "What is a charitable foundation?",
          options: ["The base of a charity building", "An organization created to give money to good causes", "A type of savings account", "A volunteer group"],
          correct: 1,
          explanation: "Foundations are organizations specifically created to donate money to charitable causes and nonprofits!"
        },
        {
          question: "How can kids learn about different causes to support?",
          options: ["Research online", "Visit local organizations", "Talk to family and teachers", "All of the above"],
          correct: 3,
          explanation: "Learning about different causes helps you find ones you're passionate about supporting!"
        }
      ]
    },
    'goal-getter': {
      title: 'Goal Getter',
      description: 'Set and achieve your financial goals',
      icon: '🎯',
      color: 'bg-indigo-500',
      questions: [
        {
          question: "What makes a good financial goal?",
          options: ["Vague and unclear", "Specific and achievable", "Impossible to reach", "Only about spending"],
          correct: 1,
          explanation: "Good goals are specific, achievable, and have a clear timeline!"
        },
        {
          question: "You want to save $60 for a game. If you save $5 per week, how long will it take?",
          options: ["10 weeks", "12 weeks", "15 weeks", "20 weeks"],
          correct: 1,
          explanation: "$60 ÷ $5 per week = 12 weeks to reach your goal!"
        },
        {
          question: "What should you do if your goal seems too big?",
          options: ["Give up", "Break it into smaller steps", "Ask for all the money at once", "Change to an easier goal"],
          correct: 1,
          explanation: "Breaking big goals into smaller steps makes them easier to achieve!"
        },
        {
          question: "Which is a SMART goal?",
          options: ["Save some money", "Save $30 in 6 weeks for a toy", "Get rich quick", "Buy everything"],
          correct: 1,
          explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound!"
        },
        {
          question: "What should you do when you reach a goal?",
          options: ["Celebrate your success", "Set a new goal", "Learn from the experience", "All of the above"],
          correct: 3,
          explanation: "Celebrate success, set new goals, and learn from your experience!"
        },
        {
          question: "What does 'SMART' stand for in goal setting?",
          options: ["Simple, Major, Awesome, Real, Timely", "Specific, Measurable, Achievable, Relevant, Time-bound", "Strong, Money, Amazing, Rich, True", "Save, Make, Always, Ready, Today"],
          correct: 1,
          explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound!"
        },
        {
          question: "What's the difference between short-term and long-term goals?",
          options: ["No difference", "Short-term can be achieved quickly, long-term takes months or years", "Short-term goals are easier", "Long-term goals cost more"],
          correct: 1,
          explanation: "Short-term goals might take days or weeks, long-term goals take months or years to achieve!"
        },
        {
          question: "If you want to save $100 in 10 weeks, how much should you save each week?",
          options: ["$5", "$8", "$10", "$15"],
          correct: 2,
          explanation: "$100 ÷ 10 weeks = $10 per week to reach your goal!"
        },
        {
          question: "What should you do if you're not meeting your savings goal?",
          options: ["Give up completely", "Review and adjust your plan", "Ask for all the money", "Ignore the problem"],
          correct: 1,
          explanation: "Review what's not working and adjust your plan - maybe save less per week or extend the timeline!"
        },
        {
          question: "What's a good first financial goal for kids?",
          options: ["Buy a mansion", "Save for a small toy or treat", "Invest in stocks", "Start a business"],
          correct: 1,
          explanation: "Start with small, achievable goals like saving for a toy to build good habits!"
        },
        {
          question: "Why is it important to write down your goals?",
          options: ["It's not important", "It helps you remember and stay focused", "Teachers require it", "It's just busy work"],
          correct: 1,
          explanation: "Writing goals down helps you remember them and stay motivated to achieve them!"
        },
        {
          question: "What's a milestone in goal setting?",
          options: ["A type of stone", "A checkpoint along the way to your main goal", "The final goal", "A mistake"],
          correct: 1,
          explanation: "Milestones are smaller achievements that show you're making progress toward your bigger goal!"
        },
        {
          question: "How can you track your progress toward a goal?",
          options: ["Charts and graphs", "Savings jars", "Apps or notebooks", "All of the above"],
          correct: 3,
          explanation: "There are many ways to track progress - choose what works best for you!"
        },
        {
          question: "What should you do if your goal becomes impossible?",
          options: ["Keep trying anyway", "Modify the goal to make it realistic", "Give up on all goals", "Blame others"],
          correct: 1,
          explanation: "It's okay to adjust goals if circumstances change - being flexible is smart!"
        },
        {
          question: "What's the 50/30/20 rule for money goals?",
          options: ["50% needs, 30% wants, 20% savings", "50% savings, 30% needs, 20% wants", "50% wants, 30% savings, 20% needs", "It's not a real rule"],
          correct: 0,
          explanation: "This rule suggests 50% for needs, 30% for wants, and 20% for savings and paying off debt!"
        },
        {
          question: "Why might you not reach a goal?",
          options: ["Unrealistic timeline", "Lack of planning", "Getting distracted", "All of the above"],
          correct: 3,
          explanation: "Many things can prevent reaching goals, but learning from these helps you do better next time!"
        },
        {
          question: "What's an emergency fund goal?",
          options: ["Money for emergencies only", "Money for fun activities", "Money to lend friends", "Money for expensive toys"],
          correct: 0,
          explanation: "An emergency fund is money saved specifically for unexpected expenses or problems!"
        },
        {
          question: "How can parents help with your financial goals?",
          options: ["Give you all the money", "Help you make a plan and stay motivated", "Do everything for you", "Tell you goals are silly"],
          correct: 1,
          explanation: "Parents can guide and encourage you while you learn to save and plan for yourself!"
        },
        {
          question: "What's goal accountability?",
          options: ["Blaming others for failures", "Having someone help you stay on track", "Accounting for your money", "Making excuses"],
          correct: 1,
          explanation: "Accountability means having someone (like a parent) check on your progress and encourage you!"
        },
        {
          question: "Should all your goals be about money?",
          options: ["Yes, only money matters", "No, you can have health, education, and fun goals too", "Maybe", "Goals are useless"],
          correct: 1,
          explanation: "You can set goals for many areas of life - health, learning, friendships, and more!"
        },
        {
          question: "What's the best time to set new goals?",
          options: ["Only on New Year's", "Only on birthdays", "Anytime you want to improve something", "Never"],
          correct: 2,
          explanation: "You can set goals anytime you want to achieve something or improve an area of your life!"
        },
        {
          question: "How do you stay motivated when saving takes a long time?",
          options: ["Remember why the goal matters to you", "Track your progress visually", "Celebrate small milestones", "All of the above"],
          correct: 3,
          explanation: "Use all these strategies to stay motivated during long-term saving goals!"
        },
        {
          question: "What's a vision board?",
          options: ["A TV screen", "A visual display of your goals and dreams", "A whiteboard at school", "A computer program"],
          correct: 1,
          explanation: "A vision board displays pictures and words representing your goals to keep you motivated!"
        },
        {
          question: "Should you tell others about your goals?",
          options: ["Never tell anyone", "Tell supportive people who can help", "Tell everyone you meet", "Only tell pets"],
          correct: 1,
          explanation: "Share goals with supportive people who can encourage you and help you stay accountable!"
        },
        {
          question: "What's the difference between a need and a want in goal setting?",
          options: ["No difference", "Needs are essential, wants are nice to have", "Wants are more important", "Needs cost more"],
          correct: 1,
          explanation: "Needs are things you must have (like food), wants are things you'd like but can live without!"
        },
        {
          question: "How can you make saving for goals more fun?",
          options: ["Use colorful savings jars", "Create charts to track progress", "Reward yourself for milestones", "All of the above"],
          correct: 3,
          explanation: "Making savings fun helps you stick with your goals and enjoy the journey!"
        },
        {
          question: "What should you do if you achieve your goal faster than expected?",
          options: ["Stop setting goals", "Set a bigger goal", "Celebrate and set a new goal", "Spend all the money"],
          correct: 2,
          explanation: "Celebrate your success and use the momentum to set and achieve even better goals!"
        },
        {
          question: "Why is it good to have both saving and spending goals?",
          options: ["It's not good", "It teaches balance and planning for both future and present", "Only saving matters", "Only spending matters"],
          correct: 1,
          explanation: "Having both types of goals helps you learn to balance enjoying life now while planning for the future!"
        },
        {
          question: "What's goal visualization?",
          options: ["Drawing pictures of goals", "Imagining yourself achieving your goals", "Using graphs", "Making lists"],
          correct: 1,
          explanation: "Visualization means imagining yourself successfully achieving your goal, which can increase motivation!"
        }
      ]
    },
    'credit-card-cadet': {
      title: 'Credit Card Cadet',
      description: 'Learn about credit and responsible borrowing',
      icon: '💳',
      color: 'bg-slate-500',
      questions: [
        {
          question: "What is credit?",
          options: ["Free money", "Borrowed money you must pay back", "Money you find", "Money from parents"],
          correct: 1,
          explanation: "Credit is borrowed money that you promise to pay back, usually with interest!"
        },
        {
          question: "What happens if you don't pay your credit card bill?",
          options: ["Nothing", "You get more money", "You pay extra fees and hurt your credit score", "The bank gives you a prize"],
          correct: 2,
          explanation: "Not paying credit card bills leads to fees, higher interest, and damages your credit score!"
        },
        {
          question: "What's a good rule for using credit cards?",
          options: ["Max them out immediately", "Only spend what you can afford to pay back", "Use them for everything", "Never check the balance"],
          correct: 1,
          explanation: "Only spend what you can afford to pay back in full each month!"
        },
        {
          question: "What is a credit score?",
          options: ["Your age", "A number showing how well you handle borrowed money", "Your bank account balance", "Your allowance amount"],
          correct: 1,
          explanation: "A credit score shows lenders how responsible you are with borrowed money!"
        },
        {
          question: "When might you need good credit?",
          options: ["Buying a car", "Getting an apartment", "Getting a mortgage", "All of the above"],
          correct: 3,
          explanation: "Good credit helps you get loans for cars, apartments, houses, and better interest rates!"
        },
        {
          question: "What is interest on a credit card?",
          options: ["Free money", "The cost of borrowing money", "A reward", "A bank fee"],
          correct: 1,
          explanation: "Interest is the extra money you pay for borrowing - it's the cost of using credit!"
        },
        {
          question: "What's the minimum payment on a credit card?",
          options: ["The full balance", "The smallest amount you can pay to avoid penalties", "$10", "Nothing"],
          correct: 1,
          explanation: "The minimum payment is the least you must pay each month, but paying more is better!"
        },
        {
          question: "What happens if you only pay the minimum each month?",
          options: ["You save money", "You pay a lot more in interest over time", "Nothing happens", "You get rewards"],
          correct: 1,
          explanation: "Paying only the minimum means you'll pay much more in interest and take longer to pay off debt!"
        },
        {
          question: "What's a credit limit?",
          options: ["How much you can borrow on the card", "Your credit score", "The minimum payment", "Annual fee"],
          correct: 0,
          explanation: "Your credit limit is the maximum amount you're allowed to borrow on that credit card!"
        },
        {
          question: "What's credit utilization?",
          options: ["How useful credit is", "The percentage of your credit limit you're using", "Your credit score", "Interest rate"],
          correct: 1,
          explanation: "Credit utilization is how much of your available credit you're using - lower is better for your score!"
        },
        {
          question: "What's a good credit utilization rate?",
          options: ["100%", "75%", "Under 30%", "Over 50%"],
          correct: 2,
          explanation: "Keeping your credit utilization under 30% (and ideally under 10%) helps your credit score!"
        },
        {
          question: "What is APR on a credit card?",
          options: ["Annual Percentage Rate - the yearly interest cost", "A reward program", "A type of fee", "Your credit score"],
          correct: 0,
          explanation: "APR is the Annual Percentage Rate - it shows how much borrowing costs per year!"
        },
        {
          question: "What's a secured credit card?",
          options: ["A very safe card", "A card that requires a cash deposit", "A card for security guards", "A card with no fees"],
          correct: 1,
          explanation: "Secured cards require a deposit that becomes your credit limit - good for building credit!"
        },
        {
          question: "How long do negative items stay on your credit report?",
          options: ["Forever", "1 year", "About 7 years", "10 years"],
          correct: 2,
          explanation: "Most negative items like late payments stay on your credit report for about 7 years!"
        },
        {
          question: "What's a balance transfer?",
          options: ["Moving debt from one card to another", "Checking your balance", "Paying your bill", "Getting a new card"],
          correct: 0,
          explanation: "Balance transfers move debt from one card to another, often to get a lower interest rate!"
        },
        {
          question: "What are credit card rewards?",
          options: ["Free money", "Points or cash back for using the card", "Lower interest rates", "Higher credit limits"],
          correct: 1,
          explanation: "Many cards offer rewards like cash back or points when you make purchases!"
        },
        {
          question: "What's an annual fee?",
          options: ["Interest charges", "A yearly cost just for having the card", "Reward points", "Late payment fee"],
          correct: 1,
          explanation: "Some credit cards charge an annual fee just for the privilege of having the card!"
        },
        {
          question: "What should you do if your credit card is stolen?",
          options: ["Nothing", "Report it immediately to the card company", "Wait a week", "Use it one more time"],
          correct: 1,
          explanation: "Report stolen cards immediately to limit your liability for fraudulent charges!"
        },
        {
          question: "What's the difference between a debit and credit card?",
          options: ["No difference", "Debit uses your money, credit borrows money", "Credit is always better", "Debit cards have higher fees"],
          correct: 1,
          explanation: "Debit cards use money from your bank account, credit cards let you borrow money!"
        },
        {
          question: "What's a cash advance on a credit card?",
          options: ["Free cash", "Borrowing cash against your credit limit", "A reward", "A type of purchase"],
          correct: 1,
          explanation: "Cash advances let you borrow cash, but they usually have higher fees and interest rates!"
        },
        {
          question: "How can students start building credit?",
          options: ["Student credit cards", "Becoming an authorized user", "Secured credit cards", "All of the above"],
          correct: 3,
          explanation: "Students have several options to start building credit responsibly!"
        },
        {
          question: "What's a grace period on a credit card?",
          options: ["Time to pay without interest", "Late payment forgiveness", "Extra credit limit", "Reward period"],
          correct: 0,
          explanation: "The grace period is time to pay your bill in full without paying interest on new purchases!"
        },
        {
          question: "What happens to your credit score if you miss payments?",
          options: ["It goes up", "It goes down significantly", "Nothing happens", "It stays the same"],
          correct: 1,
          explanation: "Missing payments is one of the worst things for your credit score - always pay on time!"
        },
        {
          question: "What's credit monitoring?",
          options: ["Watching your credit report for changes", "Paying your bills", "Using your credit card", "Getting new credit"],
          correct: 0,
          explanation: "Credit monitoring helps you track changes to your credit report and catch errors or fraud!"
        },
        {
          question: "How often should you check your credit report?",
          options: ["Never", "Once a year", "Monthly", "Daily"],
          correct: 1,
          explanation: "You should check your credit report at least once a year for free from authorized sources!"
        },
        {
          question: "What's identity theft protection in credit?",
          options: ["A type of insurance", "Services that monitor for fraudulent use of your identity", "A credit card feature", "A loan type"],
          correct: 1,
          explanation: "Identity theft protection helps monitor and alert you if someone tries to use your identity fraudulently!"
        },
        {
          question: "What should you do before applying for your first credit card?",
          options: ["Research different cards and terms", "Understand the responsibilities", "Make sure you can pay bills on time", "All of the above"],
          correct: 3,
          explanation: "Do your research and make sure you're ready for the responsibility before getting credit!"
        },
        {
          question: "What's the most important factor in your credit score?",
          options: ["Payment history", "Credit utilization", "Length of credit history", "Types of credit"],
          correct: 0,
          explanation: "Payment history (paying on time) is the most important factor, making up 35% of your credit score!"
        },
        {
          question: "How can you improve a bad credit score?",
          options: ["Pay all bills on time", "Keep credit utilization low", "Don't close old accounts", "All of the above"],
          correct: 3,
          explanation: "Improving credit takes time and consistent good habits - all these strategies help!"
        }
      ]
    },
    'money-math-master': {
      title: 'Money Math Master',
      description: 'Master money calculations and percentages',
      icon: '🧮',
      color: 'bg-orange-500',
      questions: [
        {
          question: "What's 20% of $50?",
          options: ["$5", "$10", "$15", "$20"],
          correct: 1,
          explanation: "20% of $50 = 0.20 × $50 = $10"
        },
        {
          question: "If something costs $80 and is 25% off, what's the sale price?",
          options: ["$60", "$65", "$70", "$75"],
          correct: 0,
          explanation: "25% of $80 = $20 discount. $80 - $20 = $60 sale price!"
        },
        {
          question: "You have 4 quarters, 3 dimes, 2 nickels, and 8 pennies. How much money?",
          options: ["$1.48", "$1.52", "$1.58", "$1.62"],
          correct: 0,
          explanation: "4 quarters ($1.00) + 3 dimes ($0.30) + 2 nickels ($0.10) + 8 pennies ($0.08) = $1.48"
        },
        {
          question: "If you double your money from $25, how much do you have?",
          options: ["$40", "$45", "$50", "$55"],
          correct: 2,
          explanation: "Double means multiply by 2: $25 × 2 = $50"
        },
        {
          question: "What's the tax on a $100 purchase with 8% sales tax?",
          options: ["$6", "$7", "$8", "$9"],
          correct: 2,
          explanation: "8% of $100 = 0.08 × $100 = $8 in tax"
        },
        {
          question: "If you earn $12 per hour and work 5 hours, how much do you earn?",
          options: ["$50", "$55", "$60", "$65"],
          correct: 2,
          explanation: "$12 per hour × 5 hours = $60 total earnings"
        },
        {
          question: "What's 15% of $200?",
          options: ["$25", "$30", "$35", "$40"],
          correct: 1,
          explanation: "15% of $200 = 0.15 × $200 = $30"
        },
        {
          question: "If you save $25 per month for 6 months, how much do you save?",
          options: ["$125", "$150", "$175", "$200"],
          correct: 1,
          explanation: "$25 × 6 months = $150 saved"
        },
        {
          question: "What's half of $90?",
          options: ["$40", "$45", "$50", "$55"],
          correct: 1,
          explanation: "Half of $90 = $90 ÷ 2 = $45"
        },
        {
          question: "If something costs $75 and you have a 40% off coupon, what do you pay?",
          options: ["$35", "$40", "$45", "$50"],
          correct: 2,
          explanation: "40% of $75 = $30 discount. $75 - $30 = $45 final price"
        },
        {
          question: "You buy 3 items at $8.99 each. What's the total before tax?",
          options: ["$26.97", "$27.97", "$28.97", "$29.97"],
          correct: 0,
          explanation: "$8.99 × 3 = $26.97 total"
        },
        {
          question: "What's 5% of $400?",
          options: ["$15", "$20", "$25", "$30"],
          correct: 1,
          explanation: "5% of $400 = 0.05 × $400 = $20"
        },
        {
          question: "If you split $120 equally among 4 people, how much does each get?",
          options: ["$25", "$30", "$35", "$40"],
          correct: 1,
          explanation: "$120 ÷ 4 people = $30 per person"
        },
        {
          question: "What's 10% of $85?",
          options: ["$8.50", "$8.05", "$7.50", "$9.50"],
          correct: 0,
          explanation: "10% of $85 = 0.10 × $85 = $8.50"
        },
        {
          question: "If you owe $60 and pay $15, how much do you still owe?",
          options: ["$40", "$45", "$50", "$55"],
          correct: 1,
          explanation: "$60 - $15 = $45 still owed"
        },
        {
          question: "What's 25% of $80?",
          options: ["$15", "$20", "$25", "$30"],
          correct: 1,
          explanation: "25% of $80 = 0.25 × $80 = $20"
        },
        {
          question: "You have $50 and spend 60% of it. How much did you spend?",
          options: ["$25", "$30", "$35", "$40"],
          correct: 1,
          explanation: "60% of $50 = 0.60 × $50 = $30 spent"
        },
        {
          question: "If you triple your money from $15, how much do you have?",
          options: ["$30", "$40", "$45", "$50"],
          correct: 2,
          explanation: "Triple means multiply by 3: $15 × 3 = $45"
        },
        {
          question: "What's the total cost of $19.99 + $12.99 + $7.99?",
          options: ["$40.97", "$41.97", "$42.97", "$43.97"],
          correct: 0,
          explanation: "$19.99 + $12.99 + $7.99 = $40.97"
        },
        {
          question: "If you get 30% more allowance and currently get $20, what's your new allowance?",
          options: ["$24", "$26", "$28", "$30"],
          correct: 1,
          explanation: "30% of $20 = $6 increase. $20 + $6 = $26 new allowance"
        },
        {
          question: "How many $5 bills make $65?",
          options: ["11", "12", "13", "14"],
          correct: 2,
          explanation: "$65 ÷ $5 = 13 five-dollar bills"
        },
        {
          question: "What's 75% of $40?",
          options: ["$25", "$30", "$35", "$40"],
          correct: 1,
          explanation: "75% of $40 = 0.75 × $40 = $30"
        },
        {
          question: "If you buy something for $45 and sell it for $60, what's your profit?",
          options: ["$10", "$15", "$20", "$25"],
          correct: 1,
          explanation: "Profit = Selling price - Cost = $60 - $45 = $15 profit"
        },
        {
          question: "What's 12% of $150?",
          options: ["$15", "$18", "$21", "$24"],
          correct: 1,
          explanation: "12% of $150 = 0.12 × $150 = $18"
        },
        {
          question: "You need $180 and have saved $120. How much more do you need?",
          options: ["$50", "$60", "$70", "$80"],
          correct: 1,
          explanation: "$180 - $120 = $60 more needed"
        },
        {
          question: "If you invest $100 and it grows by 8%, how much do you have?",
          options: ["$105", "$108", "$110", "$115"],
          correct: 1,
          explanation: "8% of $100 = $8 growth. $100 + $8 = $108 total"
        },
        {
          question: "What's the average of $10, $20, and $30?",
          options: ["$15", "$20", "$25", "$30"],
          correct: 1,
          explanation: "($10 + $20 + $30) ÷ 3 = $60 ÷ 3 = $20 average"
        },
        {
          question: "How much is 2.5 times $24?",
          options: ["$50", "$55", "$60", "$65"],
          correct: 2,
          explanation: "2.5 × $24 = $60"
        },
        {
          question: "If you reduce $80 by 15%, what's the new amount?",
          options: ["$65", "$68", "$70", "$72"],
          correct: 1,
          explanation: "15% of $80 = $12 reduction. $80 - $12 = $68"
        }
      ]
    },
    'college-cash-course': {
      title: 'College Cash Course',
      description: 'Plan and save for college expenses',
      icon: '🎓',
      color: 'bg-teal-500',
      questions: [
        {
          question: "What is a 529 plan?",
          options: ["A type of homework", "A college savings account with tax benefits", "A student loan", "A scholarship program"],
          correct: 1,
          explanation: "A 529 plan is a special savings account that helps families save for college with tax advantages!"
        },
        {
          question: "If college costs $40,000 per year and you start saving $200 monthly at age 10, how much will you save in 8 years?",
          options: ["$19,200", "$20,400", "$21,600", "$22,800"],
          correct: 0,
          explanation: "$200 × 12 months × 8 years = $19,200 saved for college!"
        },
        {
          question: "What's a scholarship?",
          options: ["Money you borrow for college", "Free money awarded based on achievements", "A type of job", "A college course"],
          correct: 1,
          explanation: "Scholarships are free money awarded to students based on grades, talents, or other achievements!"
        },
        {
          question: "What's the difference between a grant and a loan?",
          options: ["No difference", "Grants are free money, loans must be repaid", "Loans are better than grants", "Grants are only for poor students"],
          correct: 1,
          explanation: "Grants are free money that doesn't need to be repaid, while loans must be paid back with interest!"
        },
        {
          question: "What should you do to prepare financially for college?",
          options: ["Start saving early", "Look for scholarships", "Consider community college first", "All of the above"],
          correct: 3,
          explanation: "All these strategies help make college more affordable!"
        },
        {
          question: "What's the average cost of college tuition per year in the US?",
          options: ["$15,000", "$25,000", "$35,000", "$45,000"],
          correct: 2,
          explanation: "Average college costs vary widely, but many schools cost $30,000-$40,000+ per year including room and board!"
        },
        {
          question: "What is FAFSA?",
          options: ["A type of loan", "Free Application for Federal Student Aid", "A scholarship program", "A college entrance exam"],
          correct: 1,
          explanation: "FAFSA is the form you fill out to apply for federal financial aid for college!"
        },
        {
          question: "What's a Pell Grant?",
          options: ["A student loan", "Free federal money for college that doesn't need to be repaid", "A scholarship for athletes", "A work-study program"],
          correct: 1,
          explanation: "Pell Grants are federal grants that don't need to be repaid - they're based on financial need!"
        },
        {
          question: "What's the difference between subsidized and unsubsidized student loans?",
          options: ["No difference", "Subsidized loans don't accrue interest while in school", "Unsubsidized are always better", "Subsidized cost more"],
          correct: 1,
          explanation: "Subsidized loans don't charge interest while you're in school, making them better than unsubsidized loans!"
        },
        {
          question: "What's a work-study program?",
          options: ["A type of scholarship", "Part-time jobs for students to help pay for college", "A student loan", "An academic program"],
          correct: 1,
          explanation: "Work-study programs provide part-time jobs to help students earn money for college expenses!"
        },
        {
          question: "When should you start saving for college?",
          options: ["Senior year of high school", "Junior year of high school", "As early as possible", "After graduation"],
          correct: 2,
          explanation: "The earlier you start saving, the more time your money has to grow through compound interest!"
        },
        {
          question: "What's an education tax credit?",
          options: ["Money you owe for education", "Tax benefits for education expenses", "A type of scholarship", "College entrance fee"],
          correct: 1,
          explanation: "Education tax credits like the American Opportunity Credit can reduce your tax bill for college expenses!"
        },
        {
          question: "What's in-state vs out-of-state tuition?",
          options: ["No difference", "In-state is much cheaper for state residents", "Out-of-state is always cheaper", "In-state is more expensive"],
          correct: 1,
          explanation: "In-state tuition at public colleges is much cheaper for residents of that state!"
        },
        {
          question: "What are the benefits of community college?",
          options: ["Lower cost", "Smaller class sizes", "Transfer opportunities", "All of the above"],
          correct: 3,
          explanation: "Community colleges offer quality education at lower costs and often transfer credits to 4-year schools!"
        },
        {
          question: "What's student loan interest?",
          options: ["Free money", "The cost of borrowing money for education", "A scholarship", "A penalty fee"],
          correct: 1,
          explanation: "Student loan interest is what you pay for borrowing money - it adds to the total amount you'll repay!"
        },
        {
          question: "What's loan consolidation?",
          options: ["Getting more loans", "Combining multiple loans into one", "Paying off loans early", "Canceling loans"],
          correct: 1,
          explanation: "Loan consolidation combines multiple student loans into one loan, often with a new interest rate!"
        },
        {
          question: "What happens if you can't pay back student loans?",
          options: ["Nothing", "Default can hurt your credit and finances", "You get more money", "Loans disappear"],
          correct: 1,
          explanation: "Defaulting on student loans can seriously damage your credit score and financial future!"
        },
        {
          question: "What's income-driven repayment?",
          options: ["Paying based on your income level", "Paying a fixed amount", "Not paying anything", "Paying extra each month"],
          correct: 0,
          explanation: "Income-driven repayment plans adjust your monthly payment based on your income and family size!"
        },
        {
          question: "What's loan forgiveness?",
          options: ["Forgiving someone for taking loans", "Having remaining loan balance canceled", "Getting more loans", "Paying loans faster"],
          correct: 1,
          explanation: "Loan forgiveness programs can cancel remaining loan balances after meeting certain requirements!"
        },
        {
          question: "What's a merit-based scholarship?",
          options: ["Money based on financial need", "Money based on achievements or abilities", "A type of loan", "Work-study money"],
          correct: 1,
          explanation: "Merit scholarships are awarded based on academic, athletic, or other achievements, not financial need!"
        },
        {
          question: "What's a need-based scholarship?",
          options: ["Money based on achievements", "Money based on financial circumstances", "A type of loan", "Work earnings"],
          correct: 1,
          explanation: "Need-based aid is awarded based on your family's financial situation and ability to pay for college!"
        },
        {
          question: "When should you apply for scholarships?",
          options: ["After graduation", "Only senior year", "Start early and apply continuously", "Never"],
          correct: 2,
          explanation: "Start looking for scholarships early and keep applying - there are opportunities for all grade levels!"
        },
        {
          question: "What's the CSS Profile?",
          options: ["A college entrance exam", "A financial aid form for private colleges", "A scholarship application", "A student loan"],
          correct: 1,
          explanation: "The CSS Profile is used by some private colleges to determine eligibility for non-federal aid!"
        },
        {
          question: "What are college application fees?",
          options: ["Fees to apply to colleges", "Tuition costs", "Scholarship money", "Financial aid"],
          correct: 0,
          explanation: "Most colleges charge application fees (often $50-$100) when you apply for admission!"
        },
        {
          question: "What's room and board?",
          options: ["College classes", "Housing and meal costs", "Application fees", "Books and supplies"],
          correct: 1,
          explanation: "Room and board covers dormitory housing and meal plan costs - a major part of college expenses!"
        },
        {
          question: "What are textbook costs like in college?",
          options: ["Free", "Very expensive - often $300-500+ per semester", "Always cheap", "Included in tuition"],
          correct: 1,
          explanation: "College textbooks are expensive! Look for used books, rentals, or digital versions to save money!"
        },
        {
          question: "What's a college savings calculator?",
          options: ["A math class", "A tool to estimate how much to save for college", "A scholarship application", "A loan calculator"],
          correct: 1,
          explanation: "College savings calculators help families estimate how much to save monthly to reach college cost goals!"
        },
        {
          question: "What's the benefit of starting college savings early?",
          options: ["No benefit", "Compound growth over time", "Lower college costs", "Guaranteed scholarships"],
          correct: 1,
          explanation: "Starting early lets your savings grow through compound interest over many years!"
        },
        {
          question: "What should you research before choosing a college?",
          options: ["Total costs", "Financial aid offerings", "Job prospects for graduates", "All of the above"],
          correct: 3,
          explanation: "Research all these factors to make an informed decision about college value and affordability!"
        }
      ]
    }
  };

  const startGame = (moduleId: string) => {
    // Check if game has questions
    if (!gameData[moduleId]) {
      alert('This game is coming soon! Try one of the other games.');
      return;
    }
    setActiveGame(moduleId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setGameComplete(false);
    
    // Scroll to top of page when game starts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setActiveGame(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setGameComplete(false);
    
    // Scroll to top when returning to main games menu
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowAnswer(true);
    const currentGame = gameData[activeGame!];
    if (selectedAnswer === currentGame.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const currentGame = gameData[activeGame!];
    if (currentQuestion < currentGame.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setGameComplete(false);
  };



  // Game render functions
  const renderGameComplete = () => {
    const currentGame = gameData[activeGame!];
    const scorePercentage = Math.round((score / currentGame.questions.length) * 100);

    return (
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4">
              🏆
            </div>
            <CardTitle className="text-3xl font-bold text-green-600">Congratulations!</CardTitle>
            <p className="text-gray-600 mt-2">You've completed {currentGame.title}!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{score}</p>
                <p className="text-sm text-gray-600">Correct Answers</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{scorePercentage}%</p>
                <p className="text-sm text-gray-600">Score</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{currentGame.questions.length}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleRestartGame}
                className="w-full sm:w-auto mr-2"
                size="lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button 
                variant="outline"
                onClick={closeGame}
                className="w-full sm:w-auto"
                size="lg"
              >
                Back to Games
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderGameInterface = () => {
    const currentGame = gameData[activeGame!];
    const currentQ = currentGame.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentGame.questions.length) * 100;

    return (
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <Helmet>
          <title>{currentGame.title} | DollarMento Kids</title>
          <meta name="description" content={currentGame.description} />
        </Helmet>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost"
              onClick={closeGame}
              className="mr-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <span className="text-3xl mr-3">{currentGame.icon}</span>
                {currentGame.title}
              </h1>
              <p className="text-gray-600">{currentGame.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Score: {score}/{currentQuestion + (showAnswer ? 1 : 0)}</p>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {currentGame.questions.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% Complete</p>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full text-left justify-start p-4 h-auto";
              
              if (showAnswer) {
                if (index === currentQ.correct) {
                  buttonClass += " bg-green-100 border-green-400 text-green-800";
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  buttonClass += " bg-orange-100 border-orange-400 text-orange-800";
                } else {
                  buttonClass += " opacity-60";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " bg-blue-100 border-blue-500";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswer}
                >
                  <div className="flex items-center w-full">
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showAnswer && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                    )}
                    {showAnswer && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-orange-600 ml-2" />
                    )}
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Answer Explanation */}
        {showAnswer && (
          <Card className={`mb-6 ${selectedAnswer === currentQ.correct ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3 mt-1 ${selectedAnswer === currentQ.correct ? 'bg-green-500' : 'bg-orange-500'}`}>
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <p className={`${selectedAnswer === currentQ.correct ? 'text-green-800' : 'text-orange-800'}`}>{currentQ.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          {!showAnswer ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              size="lg"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestion < currentGame.questions.length - 1 ? 'Next Question' : 'Finish Game'}
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Main component logic
  if (activeGame && gameComplete) {
    return renderGameComplete();
  }

  if (activeGame && !gameComplete) {
    return renderGameInterface();
  }

  return (
    <div className="px-4 py-3 max-w-4xl mx-auto">
      <Helmet>
        <title>DollarMento Kids - Fun Financial Education for American Children</title>
        <meta name="description" content="Interactive financial education for kids and teens. Learn about saving, spending, banking, investing, and entrepreneurship through fun games and activities designed for American youth." />
        <meta name="keywords" content="kids financial education, children money management, teen finance, allowance, saving for kids, youth entrepreneurship, college planning, financial literacy kids" />
      </Helmet>

      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="text-4xl mr-3">🌟</span>
            DollarMento Kids
          </h1>
          <p className="text-gray-600 mt-1">Fun financial education for young Americans</p>
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
              🎓
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900">Welcome to Your Financial Journey!</h2>
              <p className="text-blue-700 mt-1">
                Learn about money, saving, and smart spending through interactive games and activities. 
                Start building your financial future today!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <select 
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ageGroups.map(age => (
                  <option key={age} value={age}>
                    {age === 'all' ? 'All Ages' : `Ages ${age}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredModules.map(module => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center text-white`}>
                    {module.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Ages {module.ageGroup}
                      </Badge>
                      <Badge className={getDifficultyColor(module.difficulty) + " text-xs"}>
                        {module.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{module.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {module.duration}
                </span>
                <span className="flex items-center">
                  <Gamepad2 className="w-3 h-3 mr-1" />
                  Interactive
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-700">What you'll learn:</p>
                <div className="flex flex-wrap gap-1">
                  {module.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                size="sm"
                onClick={() => startGame(module.id)}
              >
                <Star className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Parent Resources */}
      <Card className="mb-6 bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-900 flex items-center">
            <Gift className="w-6 h-6 mr-2" />
            For Parents & Educators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-green-700">
            Help your children develop strong financial habits with our comprehensive resources and guides.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
              <BookOpen className="w-4 h-4 mr-2" />
              Parent Guide
            </Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
              <Calculator className="w-4 h-4 mr-2" />
              Progress Tracker
            </Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
              <Award className="w-4 h-4 mr-2" />
              Achievement System
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-purple-500 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to Become a Money Master?</h3>
          <p className="mb-4">
            Join thousands of kids learning smart money habits that will last a lifetime!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => router.push('/financial-calculators')}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Try Our Calculators
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => router.push('/goals')}
            >
              <Target className="w-5 h-5 mr-2" />
              Set Financial Goals
            </Button>
          </div>
        </CardContent>
      </Card>


    </div>
  );
};

export default DollarmentoKids;