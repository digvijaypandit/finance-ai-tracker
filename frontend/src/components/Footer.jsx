import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 py-8">
      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} WarrantyMe group — Finance AI Tracker. Built for the full-stack assignment.
          </div>
          <div className="flex gap-4 text-sm">
            <a href="/docs" className="hover:underline">Docs</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="mailto:hello@example.com" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
