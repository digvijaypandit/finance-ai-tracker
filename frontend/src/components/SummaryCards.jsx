import React from "react";
import { useSelector } from "react-redux";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const SummaryCards = ({ summary }) => {
  const isDark = useSelector((state) => state.theme.isDark);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const cards = [
    {
      title: "Income",
      value: summary.income,
      color: isDark ? "text-green-400" : "text-green-600",
      bg: isDark ? "bg-gray-800" : "bg-green-50",
      iconBg: isDark ? "bg-gray-700" : "bg-green-100",
      icon: (
        <ArrowUpCircleIcon
          className={`w-6 h-6 ${isDark ? "text-green-400" : "text-green-600"}`}
        />
      ),
    },
    {
      title: "Expenses",
      value: summary.expenses,
      color: isDark ? "text-red-400" : "text-red-600",
      bg: isDark ? "bg-gray-800" : "bg-red-50",
      iconBg: isDark ? "bg-gray-700" : "bg-red-100",
      icon: (
        <ArrowDownCircleIcon
          className={`w-6 h-6 ${isDark ? "text-red-400" : "text-red-600"}`}
        />
      ),
    },
    {
      title: "Savings",
      value: summary.savings,
      color: isDark ? "text-blue-400" : "text-blue-600",
      bg: isDark ? "bg-gray-800" : "bg-blue-50",
      iconBg: isDark ? "bg-gray-700" : "bg-blue-100",
      icon: (
        <BanknotesIcon
          className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}
        />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`flex items-center justify-between p-6 rounded-lg shadow hover:shadow-md transition ${card.bg}`}
        >
          <div>
            <h3
              className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {card.title}
            </h3>
            <p className={`text-2xl font-bold ${card.color}`}>
              {formatCurrency(card.value)}
            </p>
          </div>
          <div
            className={`p-3 rounded-full ${card.iconBg} flex items-center justify-center`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
