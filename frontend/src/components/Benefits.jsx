import React from 'react';
import { Check, PieChart } from 'lucide-react';
import { useSelector } from 'react-redux';

const benefits = [
  "Natural language transaction entry",
  "Automatic categorization with AI",
  "Beautiful interactive charts",
  "Secure Google OAuth login",
  "Real-time spending insights",
  "Multi-device synchronization"
];

export default function Benefits() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Everything You Need to
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Succeed</span>
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} shadow-2xl`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Monthly Overview</h3>
                <PieChart className="w-8 h-8 text-blue-500" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Income</span>
                  <span className="font-bold text-green-500">$4,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expenses</span>
                  <span className="font-bold text-red-500">$2,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Savings</span>
                  <span className="font-bold text-blue-500">$1,350</span>
                </div>

                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                  <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
