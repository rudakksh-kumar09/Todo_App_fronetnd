import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
  googleLogin: () => api.get('/auth/google'),
  verifyToken: () => api.get('/verify-token'),
  getCurrentUser: () => api.get('/me'),
};

// Todo API calls
export const todoAPI = {
  getTodos: (params) => api.get('/todos', { params }),
  createTodo: (todoData) => api.post('/todos', todoData),
  getTodo: (id) => api.get(`/todos/${id}`),
  updateTodo: (id, todoData) => api.put(`/todos/${id}`, todoData),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
  bulkUpdateTodos: (data) => api.put('/todos/bulk-update', data),
  getTodoStats: () => api.get('/todos/stats'),
};

export default api;
