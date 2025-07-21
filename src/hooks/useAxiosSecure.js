// src/hooks/useAxiosSecure.js (CREATE THIS NEW FILE)
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
});
const useAxiosSecure = () => {
  const { user, logout } = useContext(AuthProvider);
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor: Adds Firebase ID token to outgoing requests
    axiosSecure.interceptors.request.use(async (config) => {
      try {
        if (user) {
          const idToken = await user.getIdToken();
          config.headers.Authorization = `Bearer ${idToken}`; // Corrected header name
        }
      } catch (error) {
        console.error("Error getting ID token:", error);
        // If token acquisition fails, log out and redirect
        await logout();
        navigate("/login");
      }
      return config;
    });

    // Response Interceptor: Handles 401/403 errors
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // If unauthorized/forbidden, log out and redirect to login
          console.error(
            "Axios Secure Interceptor: Unauthorized or Forbidden. Logging out."
          );
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [user, logout, navigate]); // Dependencies for useEffect

  return axiosSecure;
};

export default useAxiosSecure;
