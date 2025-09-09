import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <footer className={`py-12 border-t ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>

          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2025 FinanceAI. Simplifying finances with AI. Developed by Digvijay.
          </p>
        </div>
      </div>
    </footer>
  );
}
