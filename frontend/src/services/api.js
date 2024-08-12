import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; //  API URL from the backend 

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = (credentials) => api.post('login/', credentials);
export const registerUser = (userData) => api.post('auth/register/', userData);
export const getUsers = () => api.get('users/');
export const getUser = (id) => api.get(`users/${id}/`);
export const updateUser = (id, data) => api.patch(`users/${id}/`, data);

// function to set the JWT token for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;