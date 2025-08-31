import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    title: "Google OAuth Sign-in",
    desc: "Secure sign in with Google, per-user data isolation and smooth session handling.",
    icon: "🔒"
  },
  {
    title: "Natural Language Entry",
    desc: "Type 'Dinner $65 at Mario’s' and AI extracts amount, category & description.",
    icon: "📝"
  },
  {
    title: "Smart Categorization",
    desc: "Auto-categorize transactions with confidence scoring and quick corrections.",
    icon: "🤖"
  },
  {
    title: "Beautiful Dashboard",
    desc: "Interactive pie & line charts, summary cards and filters for monthly/weekly views.",
    icon: "📊"
  }
];

export default function LandingPage({ dark, setDark }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <Header dark={dark} setDark={setDark} />
      <main className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="pt-12 md:pt-20 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Finance tracking with <span className="text-primary-500">AI</span> — fast, beautiful, secure.
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl">
              Natural language transaction entry, Google sign-in, and intelligent insights. Save time,
              understand spending, and build better habits — all powered by modern AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href="/auth/google"
                className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-md shadow-md bg-primary-500 hover:bg-primary-700 text-white font-medium transition"
                aria-label="Sign in with Google"
              >
                <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.6h147.4c-6.3 34-25 62.9-53.6 82.3v68.3h86.6c50.7-46.7 82.1-115.7 82.1-195.8z"/>
                  <path fill="#34A853" d="M272 544.3c72.7 0 133.7-24.1 178.2-65.4l-86.6-68.3c-24.1 16.2-55.3 25.8-91.6 25.8-70.4 0-130-47.6-151.3-111.4H31.9v69.9C76.7 486 167.3 544.3 272 544.3z"/>
                  <path fill="#FBBC04" d="M120.7 327.1c-8.4-25.2-8.4-52.6 0-77.8V179.4H31.9c-33.3 66.5-33.3 144.7 0 211.2l88.8-63.5z"/>
                  <path fill="#EA4335" d="M272 107.7c38.4 0 73 13.2 100.2 39.1l75.1-75.1C405.7 24.5 344.7 0 272 0 167.3 0 76.7 58.3 31.9 147.4l88.8 69.9C142 155.3 201.6 107.7 272 107.7z"/>
                </svg>
                Sign in with Google
              </a>

              <a
                href="#features"
                className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:underline"
              >
                Explore features →
              </a>
            </div>

            <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-md">100% remote</div>
              <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-md">AI parsing</div>
              <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-md">Secure data</div>
            </div>
          </div>

          <div className="order-first md:order-last">
            {/* mock dashboard card */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden">
              <div className="absolute -left-20 -top-10 w-60 h-60 rounded-full bg-gradient-to-br from-primary-100 to-primary-500 opacity-20 blur-3xl"></div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Overview</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Last 30 days</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$2,540</div>
                  <div className="text-xs text-green-500">+8.2% vs last month</div>
                </div>
              </div>

              <div className="h-28 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-md p-4">
                {/* simplified chart placeholder */}
                <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none" className="block">
                  <polyline fill="none" stroke="#60A5FA" strokeWidth="3" points="0,45 20,38 40,30 60,20 80,24 100,18 120,22 140,12 160,24 180,16 200,10"></polyline>
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="text-center">
                  <div className="font-semibold">$3,100</div>
                  <div className="text-xs">Income</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">$420</div>
                  <div className="text-xs">Expenses</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">$2,680</div>
                  <div className="text-xs">Savings</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Core features</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mb-8">Everything you need to capture and analyze your finances with AI-powered convenience.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 md:py-20">
          <h3 className="text-xl font-semibold mb-4">How it works</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
              <div className="text-4xl mb-3">1️⃣</div>
              <h4 className="font-semibold">Sign in with Google</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Secure OAuth sign-in; your transactions belong to you.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
              <div className="text-4xl mb-3">2️⃣</div>
              <h4 className="font-semibold">Type naturally</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">e.g. "Coffee at Starbucks $6.50" — the AI extracts amount, category, vendor.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
              <div className="text-4xl mb-3">3️⃣</div>
              <h4 className="font-semibold">Confirm & visualize</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Accept parsed transaction, then see charts and insights update in real-time.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="rounded-2xl p-8 bg-gradient-to-r from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold">Ready to get clarity on your spending?</h4>
              <p className="text-slate-600 dark:text-slate-300">Sign in with Google to start tracking transactions in seconds.</p>
            </div>
            <div>
              <a
                href="/auth/google"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-primary-500 hover:bg-primary-700 text-white font-medium transition"
              >
                Get started — Sign in
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
