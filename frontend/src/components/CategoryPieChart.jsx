import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ categories }) => {
  const isDark = useSelector((state) => state.theme.isDark);

  const labels = categories.map((c) => c.category);
  const dataValues = categories.map((c) => c.total);
  const total = dataValues.reduce((a, b) => a + b, 0);

  // Extended color palette (15 colors, cycles if more categories)
  const colors = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
    "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#22C55E",
    "#EAB308", "#A855F7", "#D946EF", "#0EA5E9", "#475569",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Spending by Category",
        data: dataValues,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderWidth: 1,
        borderColor: isDark ? "#1F2937" : "#fff", // dark: gray bg, light: white
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,
          color: isDark ? "#D1D5DB" : "#374151", // gray-300 vs gray-700
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      className={`shadow-md rounded-lg p-4 mb-6 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
      style={{ height: "280px" }} // smaller chart size
    >
      <h3 className="font-semibold text-md mb-3">Spending by Category</h3>
      <div style={{ height: "200px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryPieChart;
