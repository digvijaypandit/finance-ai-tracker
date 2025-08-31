import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("Checking login...");

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/profile", { withCredentials: true })
      .then((res) => {
        setMessage(`Hello, ${res.data.name || "User"}`);
      })
      .catch(() => {
        setMessage("Not logged in");
      });
  }, []);

  return <h1>{message}</h1>;
}

export default Dashboard;
