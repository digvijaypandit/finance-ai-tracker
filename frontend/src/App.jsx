import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/LandingPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useEffect, useState } from "react";

function App() {
  const [dark, setDark] = useState(false);

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDark(savedTheme === "dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(systemPrefersDark);
    }
  }, []);

  // Apply theme and save to localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
