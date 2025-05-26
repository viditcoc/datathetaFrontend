// src/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-api-url.com/api', // 
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default API;
