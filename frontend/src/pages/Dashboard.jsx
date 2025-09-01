import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { PieChart, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const isDark = useSelector((state) => state.theme.isDark);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("Checking login...");

  // Example overview data (replace with real API later)
  const overviewData = [
    { title: "Income", amount: "$4,200", color: "text-green-500" },
    { title: "Expenses", amount: "$2,850", color: "text-red-500" },
    { title: "Savings", amount: "$1,350", color: "text-blue-500" },
  ];

  // Example transactions (replace with real API later)
  const transactions = [
    { id: 1, description: "Bought coffee", category: "Food & Drink", amount: "-$6.50", date: "2025-08-30" },
    { id: 2, description: "Salary", category: "Income", amount: "+$4,200", date: "2025-08-28" },
    { id: 3, description: "Groceries", category: "Food & Drink", amount: "-$120.00", date: "2025-08-27" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/profile", { withCredentials: true })
      .then((res) => {
        setUserData(res.data.profile);
        setMessage(`Hello, ${res.data.profile.name || "User"}`);
      })
      .catch(() => {
        setMessage("Not logged in");
      });
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Header />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* User Profile */}
        {userData && (
          <div className={`flex items-center space-x-6 mb-12 p-6 rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <img src={userData.picture} alt={userData.picture} className="w-20 h-20 rounded-full" />
            <div>
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-gray-400">{userData.email}</p>
              <p className="text-sm text-gray-500">Joined: {new Date(userData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {overviewData.map((item, index) => (
            <div key={index} className={`p-6 rounded-2xl shadow-lg transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <TrendingUp className={`w-6 h-6 ${item.color}`} />
              </div>
              <p className={`text-2xl font-bold ${item.color}`}>{item.amount}</p>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className={`overflow-x-auto rounded-2xl shadow-lg mb-12 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4">{tx.description}</td>
                  <td className="px-6 py-4">{tx.category}</td>
                  <td className={`px-6 py-4 font-semibold ${tx.amount.startsWith("-") ? "text-red-500" : "text-green-500"}`}>{tx.amount}</td>
                  <td className="px-6 py-4">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analytics Section */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Spending by Category</h3>
            <PieChart className="w-6 h-6 text-blue-500" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Placeholder for chart */}
            <p>Chart will go here (use Chart.js or Recharts)</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
