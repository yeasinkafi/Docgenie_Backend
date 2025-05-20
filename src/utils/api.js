// utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // change to your backend URL (e.g., deployed server)
  withCredentials: true, // if using cookies
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
