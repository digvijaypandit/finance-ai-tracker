import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dark, setDark] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(systemPrefersDark);
  }, []);

  // Update html class when dark mode changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold shadow">
            AI
          </div>
          <div>
            <div className="font-semibold text-lg">Finance AI Tracker</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Smart finance, effortless entry
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4 items-center text-sm">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#how" className="hover:underline">How it works</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
          </nav>

          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
