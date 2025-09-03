import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Trophy, Zap, Clock, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  score: number;
  streak: number;
  dailyScore: number;
  completedPuzzles: string[];
  onGameSelect: (gameId: string) => void;
}

const InvestmentPuzzlesDashboard: React.FC<DashboardProps> = ({
  score,
  streak,
  dailyScore,
  completedPuzzles,
  onGameSelect
}) => {
  const gameCategories = [
    { 
      id: 'cryptic', 
      name: 'Cryptic Clues', 
      icon: '🔍', 
      color: 'from-purple-500 to-indigo-600', 
      bg: 'bg-purple-50', 
      border: 'border-purple-300',
      description: 'Decode financial hints and discover market secrets'
    },
    { 
      id: 'terms', 
      name: 'Market Terms', 
      icon: '📊', 
      color: 'from-green-500 to-emerald-600', 
      bg: 'bg-green-50', 
      border: 'border-green-300',
      description: 'Learn essential financial vocabulary'
    },
    { 
      id: 'wordsearch', 
      name: 'Word Search', 
      icon: '📝', 
      color: 'from-blue-500 to-cyan-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-300',
      description: 'Find hidden investment terms in puzzles'
    },
    { 
      id: 'matching', 
      name: 'Term Matching', 
      icon: '🔗', 
      color: 'from-red-500 to-pink-600', 
      bg: 'bg-red-50', 
      border: 'border-red-300',
      description: 'Connect financial concepts with definitions'
    },
    { 
      id: 'ratios', 
      name: 'Financial Ratios', 
      icon: '📈', 
      color: 'from-purple-500 to-pink-600', 
      bg: 'bg-pink-50', 
      border: 'border-pink-300',
      description: 'Master investment calculations and analysis'
    },
    { 
      id: 'maze', 
      name: 'Investment Maze', 
      icon: '🎯', 
      color: 'from-indigo-500 to-purple-600', 
      bg: 'bg-indigo-50', 
      border: 'border-indigo-300',
      description: 'Navigate through life\'s financial decisions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Financial Investment Puzzles</h1>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">Master American financial markets through interactive learning</p>
                  <span className="text-sm text-orange-600 font-medium">• Daily Challenge: Complete puzzles to earn bonus points!</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Score</span>
                </div>
                <div className="text-xl font-bold text-center text-blue-600">{score}</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-700">Streak</span>
                </div>
                <div className="text-xl font-bold text-center text-orange-600">{streak}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Game Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameCategories.map((game) => (
              <motion.div
                key={game.id}
                className={`${game.bg} border-2 ${game.border} rounded-xl p-4 group hover:shadow-lg transition-all cursor-pointer`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onGameSelect(game.id)}
              >
                <div className="text-center space-y-3">
                  <div className={`w-12 h-12 ${
                    game.id === 'cryptic' ? 'bg-purple-500' :
                    game.id === 'terms' ? 'bg-green-500' :
                    game.id === 'wordsearch' ? 'bg-blue-500' :
                    game.id === 'matching' ? 'bg-red-500' :
                    game.id === 'ratios' ? 'bg-pink-500' :
                    'bg-indigo-500'
                  } rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md`}>
                    <span className="text-xl text-white">{game.icon}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">{game.name}</h3>
                    <p className="text-xs text-gray-600">{game.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Learning Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Puzzles Completed</span>
                  <span className="font-medium">{completedPuzzles.length}/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(completedPuzzles.length / 6) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {completedPuzzles.length === 6 ? "All puzzles mastered!" : 
                   completedPuzzles.length > 3 ? "Great progress!" : 
                   "Keep learning!"}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Total Score</h4>
              <div className="text-4xl font-bold text-blue-600 mb-2">{score}</div>
              <p className="text-sm text-gray-600">points earned</p>
              <div className="mt-3 text-xs text-gray-500">
                {score > 1000 ? "Financial Expert! 🏆" :
                 score > 500 ? "Learning Fast! 📈" :
                 "Getting Started! 🌱"}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Current Streak</h4>
              <div className="text-4xl font-bold text-orange-500 mb-2">{streak}</div>
              <p className="text-sm text-gray-600">correct answers</p>
              <div className="mt-3 text-xs text-gray-500">
                {streak > 10 ? "On Fire! 🔥" :
                 streak > 5 ? "Great Job! ⭐" :
                 "Keep Going! 💪"}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">💡 Learning Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p>• Start with <strong>Cryptic Clues</strong> to learn basic terms</p>
                <p>• Practice <strong>Market Terms</strong> for vocabulary building</p>
                <p>• Try the <strong>Investment Maze</strong> for real-life scenarios</p>
              </div>
              <div className="space-y-2">
                <p>• Complete daily challenges for bonus points</p>
                <p>• Maintain streaks for higher scores</p>
                <p>• Each game teaches different financial skills</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentPuzzlesDashboard;