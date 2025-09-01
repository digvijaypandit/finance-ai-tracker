// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import api from "../api/axios";
import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SummaryCards from "../components/SummaryCards";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingTrendChart from "../components/SpendingTrendChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, savings: 0 });
  const [categories, setCategories] = useState([]);
  const [trends, setTrends] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    type: "",
    category: "",
    sort: "-date",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const [parsingResult, setParsingResult] = useState(null);

  // Fetch transactions
  const fetchTransactions = async (page = 1, newFilters = filters) => {
    try {
      const res = await api.get("/api/transactions", {
        params: {
          page,
          limit: pagination.limit,
          ...newFilters,
        },
      });
      setTransactions(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, limit: 5, totalPages: 1 });
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Fetch summary
  const fetchSummary = async () => {
    try {
      const res = await api.get("/api/analytics/summary");
      setSummary(res.data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/analytics/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch trends
  const fetchTrends = async () => {
    try {
      const res = await api.get("/api/analytics/trends");
      setTrends(res.data.data || []);
    } catch (err) {
      console.error("Error fetching trends:", err);
    }
  };

  // Handle filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchTransactions(1, newFilters);
  };

  // Handle add transaction (parse first)
  const handleParseTransaction = async (text) => {
    try {
      const res = await api.post("/api/transactions/parse", { text });
      setParsingResult(res.data.parsed); // Show preview
    } catch (err) {
      console.error("Error parsing transaction:", err);
    }
  };

  // Confirm & save transaction
  const handleSaveTransaction = async () => {
    if (!parsingResult) return;
    try {
      await api.post("/api/transactions", parsingResult);
      setParsingResult(null); // clear preview
      fetchTransactions(1, filters);
      fetchSummary();
      fetchCategories();
      fetchTrends();
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  // Edit transaction
  const handleEditTransaction = async (id, updated) => {
    try {
      await api.put(`/api/transactions/${id}`, updated);
      fetchTransactions(pagination.page, filters);
    } catch (err) {
      console.error("Error editing transaction:", err);
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/api/transactions/${id}`);
      fetchTransactions(pagination.page, filters);
      fetchSummary();
      fetchCategories();
      fetchTrends();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
    fetchSummary();
    fetchCategories();
    fetchTrends();
  }, []);

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Toggle {isDark ? "Light" : "Dark"}
        </button>
      </div>

      {/* Summary */}
      <SummaryCards summary={summary} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <CategoryPieChart categories={categories} />
        <SpendingTrendChart trends={trends} />
      </div>

      {/* Transaction Form */}
      <div className="mt-10">
        <TransactionForm
          onSubmit={handleParseTransaction}
          parsingResult={parsingResult}
          onConfirm={handleSaveTransaction}
          onCancel={() => setParsingResult(null)}
        />
      </div>

      {/* Transaction List */}
      <div className="mt-8">
        <TransactionList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          disabled={pagination.page <= 1}
          onClick={() => fetchTransactions(pagination.page - 1)}
          className={`px-3 py-1 rounded disabled:opacity-50 transition-colors duration-300 ${
            isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900"
          }`}
        >
          Previous
        </button>

        <span>{`Page ${pagination.page} of ${pagination.totalPages}`}</span>

        <button
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => fetchTransactions(pagination.page + 1)}
          className={`px-3 py-1 rounded disabled:opacity-50 transition-colors duration-300 ${
            isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
