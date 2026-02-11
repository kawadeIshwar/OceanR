import axios from 'axios';

// Use environment variable for API URL with proper fallbacks
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }
  
  // Fallback based on current environment
  if (import.meta.env.PROD) {
    // In production, use the current domain's API
    return `${window.location.protocol}//${window.location.host}/api`;
  }
  
  // Development fallback
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000, // 30 second timeout
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Only set Content-Type for non-FormData requests
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
