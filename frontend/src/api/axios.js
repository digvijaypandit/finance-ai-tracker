import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
});

// Function to refresh token (used by button & interval)
export const refreshToken = async () => {
  try {
    await instance.get("/auth/refresh");
    console.log("Access token refreshed");
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};

// Auto-refresh every 10 minutes
setInterval(refreshToken, 10 * 60 * 1000);

// Axios response interceptor to handle expired tokens
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      alert("Your session token has expired. Please refresh your token 🔄");
    }
    return Promise.reject(error);
  }
);

export default instance;
