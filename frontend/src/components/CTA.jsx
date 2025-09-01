import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CTA() {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Finances?</span>
        </h2>

        <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Join thousands of users who've already simplified their financial management
        </p>

        <button
          onClick={() => navigate('/login')}
          className="group px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
        >
          <span className="font-bold">Start Your Journey</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
}
