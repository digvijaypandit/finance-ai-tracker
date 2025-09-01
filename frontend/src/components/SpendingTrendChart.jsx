import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SpendingTrendChart = ({ trends }) => {
  const isDark = useSelector((state) => state.theme.isDark);

  const labels = trends.map((t) => t.period);
  const expenses = trends.map((t) => t.expenses);
  const income = trends.map((t) => t.income);
  const net = trends.map((t) => t.net);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: income,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: "Expenses",
        data: expenses,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: "Net Savings",
        data: net,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          padding: 15,
          color: isDark ? "#D1D5DB" : "#374151",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: isDark ? "#111827" : "#1F2937", // darker for dark mode
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: isDark ? "#374151" : "#E5E7EB",
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
        },
      },
      y: {
        grid: {
          color: isDark
            ? "rgba(75,85,99,0.2)"
            : "rgba(209,213,219,0.2)",
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
        },
      },
    },
  };

  return (
    <div
      className={`shadow-md rounded-lg p-4 mb-6 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
      style={{ height: "280px" }} // smaller height
    >
      <h3 className="font-semibold text-md mb-3">Financial Trends</h3>
      <div style={{ height: "200px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SpendingTrendChart;
