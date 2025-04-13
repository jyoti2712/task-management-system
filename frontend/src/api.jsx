import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API_URL:', API_URL); 

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getTasks = async (token) => {
  const response = await api.get('/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTask = async (task, token) => {
  const response = await api.post('/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const completeTask = async (taskId, token) => {
  const response = await api.put(`/tasks/${taskId}/complete`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (taskId, token) => {
  const response = await api.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
