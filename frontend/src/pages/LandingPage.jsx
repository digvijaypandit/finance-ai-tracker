import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AIDemo from '../components/AIDemo';
import Benefits from '../components/Benefits';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      <Hero />
      <Features />
      <AIDemo />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}
