import axios from "axios";

// Function to get the current token from localStorage
const getToken = () => localStorage.getItem("token");

// Axios instance configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
    "Access-Control-Allow-Origin": "*",
  },
});

// Interceptor to add the Authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error handling for requests
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Request error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
