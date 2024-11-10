import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Add token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getTasks = () => API.get('/tasks/tasks');
export const addTask = (data) => API.post('/tasks/tasks', data);
export const updateTask = (data) => API.put('/tasks/tasks', data);
export const deleteTask = (data) => API.delete('/tasks/tasks', { data });
export const searchTasks = (query) => API.get(`/tasks/tasks/search?searchQuery=${query}`);
export const filterTasks = (status) => API.get(`/tasks/tasks/filter?status=${status}`);
