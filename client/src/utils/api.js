import axios from 'axios';

// Environment-based API URL configuration
const getApiBaseUrl = () => {
  // Production: https://api.oceanrenterprises.com/api
  // Development: http://localhost:5000/api
  if (import.meta.env.PROD) {
    return 'https://api.oceanrenterprises.com/api';
  } else {
    return 'http://localhost:5000/api';
  }
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

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

