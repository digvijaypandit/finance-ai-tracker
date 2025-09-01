import React from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, TrendingUp, Plus, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { logoutUser } from "../store/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${isDark ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/add-transaction")}
                  className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Transaction</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transform transition-all duration-300"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
