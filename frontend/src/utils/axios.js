import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3003";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    // Log the full URL and credentials setting
    console.log("Making request to:", `${config.baseURL}${config.url}`);
    console.log("With credentials:", config.withCredentials);
    console.log("Current cookies:", document.cookie);

    // Ensure credentials are included
    config.withCredentials = true;

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", {
      status: response.status,
      headers: response.headers,
      cookies: document.cookie,
      setCookie: response.headers["set-cookie"],
    });

    // Log if session cookie is present
    const hasSessionCookie = document.cookie.includes("scheduly.sid");
    console.log("Session cookie present:", hasSessionCookie);

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        cookies: document.cookie,
      });

      // Special handling for 401 errors
      if (error.response.status === 401) {
        console.log("Session might be expired, clearing local storage");
        localStorage.removeItem("user");
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
