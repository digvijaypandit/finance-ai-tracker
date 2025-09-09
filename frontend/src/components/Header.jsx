import React from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, TrendingUp, LogOut, RefreshCw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { logoutUser } from "../store/authSlice";
import apiInstance, { refreshToken } from "../api/axios";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await apiInstance.post("/auth/logout", null, {
          headers: { "x-refresh-token": refreshToken },
        });
      }

      // Clear frontend tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleRefreshToken = async () => {
    try {
      await refreshToken();
      alert("Access token refreshed successfully");
    } catch (error) {
      alert("Failed to refresh token. Please log in again.");
      console.log(error)
    }
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${isDark
        ? "bg-gray-900/80 border-gray-700"
        : "bg-white/80 border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/dashboard")}
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
            {/* Theme toggle - always visible */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDark
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Refresh Token Button */}
                <div className="relative group">
                  <button
                    onClick={handleRefreshToken}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDark
                      ? "bg-blue-800 hover:bg-blue-700 text-white"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-max px-3 py-1 rounded-md shadow-lg bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Refresh Access Token
                  </div>
                </div>

                {/* Profile Image */}
                {user && (
                  <div className="relative group">
                    <img
                      src={user.profile.picture || "/default-avatar.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                    />
                    <div className="absolute right-0 mt-2 w-max px-4 py-2 rounded-lg shadow-lg bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-semibold">{user.profile.name}</p>
                      <p className="text-gray-300">{user.profile.email}</p>
                    </div>
                  </div>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 cursor-pointer rounded-lg flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* Login button for non-authenticated users */
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
