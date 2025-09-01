import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
});

// Function to refresh token
const refreshToken = async () => {
  try {
    await instance.get("/auth/refresh"); 
    console.log("Access token refreshed");
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};

setInterval(refreshToken, 10 * 60 * 1000);

export default instance;
