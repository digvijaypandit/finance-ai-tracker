import React from 'react';
import { MessageSquare, Brain, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AIDemo() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Magic in Action
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Just type naturally and watch our AI parse your transactions instantly
          </p>
        </div>

        <div className={`max-w-4xl mx-auto rounded-3xl p-8 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} border-l-4 border-blue-500`}>
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <span className="font-semibold">You type:</span>
              </div>
              <p className="text-lg font-mono">"Bought coffee at Starbucks for $6.50"</p>
            </div>

            <div className="flex justify-center">
              <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>

            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} border-l-4 border-green-500`}>
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="w-6 h-6 text-green-500" />
                <span className="font-semibold">AI parses:</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Amount:</span> $6.50
                </div>
                <div>
                  <span className="font-semibold">Category:</span> Food & Drink
                </div>
                <div>
                  <span className="font-semibold">Merchant:</span> Starbucks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
