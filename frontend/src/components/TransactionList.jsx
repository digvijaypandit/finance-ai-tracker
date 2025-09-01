import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

const TransactionList = ({ transactions, onEdit, onDelete, pagination, setPage, setLimit }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const isDark = useSelector((state) => state.theme.isDark);

  const startEdit = (t) => {
    setEditingId(t._id);
    setFormData({ ...t });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveEdit = () => {
    onEdit(editingId, formData);
    setEditingId(null);
  };

  // Get unique categories
  const categories = useMemo(
    () => ["All", ...new Set(transactions.map((t) => t.category))],
    [transactions]
  );

  // Apply filters locally (for current page only)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.merchant.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || t.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, categoryFilter]);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by description, merchant, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
            isDark
              ? "bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
            isDark
              ? "bg-gray-700 text-gray-200 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filteredTransactions.length === 0 ? (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          No matching transactions.
        </p>
      ) : (
        <div
          className={`overflow-x-auto rounded-lg shadow transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <table className="min-w-full">
            <thead
              className={`text-sm uppercase transition-colors duration-300 ${
                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Merchant</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody className={isDark ? "text-gray-200" : "text-gray-700"}>
              {filteredTransactions.map((t) => (
                <tr
                  key={t._id}
                  className={`border-b transition-colors duration-300 ${
                    isDark
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    {editingId === t._id ? (
                      <input
                        type="date"
                        name="date"
                        value={formData.date?.substring(0, 10)}
                        onChange={handleChange}
                        className={`border p-1 rounded ${
                          isDark
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        }`}
                      />
                    ) : (
                      new Date(t.date).toLocaleDateString()
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === t._id ? (
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`border p-1 rounded ${
                          isDark
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        }`}
                      />
                    ) : (
                      t.description
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === t._id ? (
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`border p-1 rounded ${
                          isDark
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        }`}
                      />
                    ) : (
                      t.category
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === t._id ? (
                      <input
                        type="text"
                        name="merchant"
                        value={formData.merchant}
                        onChange={handleChange}
                        className={`border p-1 rounded ${
                          isDark
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        }`}
                      />
                    ) : (
                      t.merchant
                    )}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      t.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {editingId === t._id ? (
                      <input
                        type="number"
                        step="0.01"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className={`border p-1 rounded ${
                          isDark
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        }`}
                      />
                    ) : (
                      `$${t.amount.toFixed(2)}`
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {editingId === t._id ? (
                      <>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-400 hover:underline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => startEdit(t)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => onDelete(t._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
          <div>
            <label
              className={`text-sm mr-2 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Rows per page:
            </label>
            <select
              value={pagination.limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className={`border rounded px-2 py-1 text-sm transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              {[5, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 border rounded disabled:opacity-50 transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-gray-200 text-gray-900 border-gray-300"
              }`}
              disabled={pagination.page === 1}
              onClick={() => setPage(pagination.page - 1)}
            >
              Prev
            </button>
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              className={`px-3 py-1 border rounded disabled:opacity-50 transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-gray-200 text-gray-900 border-gray-300"
              }`}
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPage(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
