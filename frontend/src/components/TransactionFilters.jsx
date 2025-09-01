import React, { useState } from "react";

const TransactionFilters = ({ onFilter }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ from, to, category, type, q });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow rounded flex flex-wrap gap-4">
      <div>
        <label className="block text-sm">From</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded p-1"/>
      </div>
      <div>
        <label className="block text-sm">To</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded p-1"/>
      </div>
      <div>
        <label className="block text-sm">Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-1"/>
      </div>
      <div>
        <label className="block text-sm">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded p-1">
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Search</label>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Description, merchant..." className="border rounded p-1"/>
      </div>
      <div className="flex items-end">
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
      </div>
    </form>
  );
};

export default TransactionFilters;
