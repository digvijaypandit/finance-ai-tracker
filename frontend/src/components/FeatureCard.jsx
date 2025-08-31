import React from "react";

export default function FeatureCard({ title, desc, icon }) {
  return (
    <article className="p-5 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{desc}</p>
        </div>
      </div>
    </article>
  );
}
