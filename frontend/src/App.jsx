import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./store/authSlice";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./features/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  // Fetch profile once when app mounts
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    console.log(
      "%cDIGVIJAY PANDIT",
      "color: white; background: blue; font-size: 24px; font-weight: bold; padding: 4px;"
    );
    console.warn(
      "%cThis app is for assessment purposes only. Not for commercial use.",
      "color: black; background: yellow; font-size: 14px; padding: 2px;"
    );

  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
