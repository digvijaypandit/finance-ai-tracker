import React from 'react';
import { Shield, Brain, BarChart3 } from 'lucide-react';
import { useSelector } from 'react-redux';

const features = [
  {
    icon: Shield,
    title: "Google OAuth Security",
    description: "Sign in securely with your Google account. Your financial data is private and protected with enterprise-grade security.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Brain,
    title: "AI Transaction Parsing",
    description: "Simply type 'Bought coffee for $6.50' and our AI automatically categorizes and parses your transactions.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Beautiful charts and insights help you understand your spending patterns and make better financial decisions.",
    color: "from-green-500 to-emerald-500"
  }
];

export default function Features() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FinanceAI</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Experience the future of personal finance management with cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isDark
                  ? 'bg-gray-900/50 hover:bg-gray-900/80 border border-gray-700'
                  : 'bg-white hover:bg-gray-50 border border-gray-200 hover:shadow-xl'
                }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
