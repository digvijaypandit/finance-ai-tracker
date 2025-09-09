import axios from "axios";

// Create Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  // No need for withCredentials when using header-based tokens
});

// Helper to get access token from localStorage (or wherever you store it)
const getAccessToken = () => localStorage.getItem('accessToken');

// Helper to store tokens after refresh
const storeAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Request interceptor to inject Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to refresh token
export const refreshToken = async () => {
  try {
    const response = await instance.get("/auth/refresh");
    const { accessToken } = response.data;

    if (accessToken) {
      storeAccessToken(accessToken);
      console.log("Access token refreshed");
    } else {
      console.warn("No access token returned during refresh");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Optionally: redirect to login page here
  }
};

// Auto-refresh every 10 minutes
setInterval(refreshToken, 10 * 60 * 1000);

// Response interceptor to handle expired tokens
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      alert("Your session token has expired. Please refresh your token 🔄");
      // Optionally: force logout here
    }
    return Promise.reject(error);
  }
);

export default instance;
