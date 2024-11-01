import axios from 'axios';

// API base URL from the backend
const API_URL = 'https://maswali.onrender.com/api/';


const api = axios.create({
  baseURL: API_URL,
});

// User Profile API Calls
export const getUserProfile = () => api.get('profile/');
export const updateUserProfile = (data) => api.put('profile/', data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Authentication API Calls
export const loginUser = (credentials) => api.post('auth/login/', credentials);
export const registerUser = (userData) => api.post('auth/register/', userData);
export const resetPassword = (data) => api.post('auth/password-reset/confirm/', data);
export const requestPasswordReset = (data) => api.post('auth/password-reset/', data);

// User Management API Calls
export const getUsers = () => api.get('users/');
export const getUser = (id) => api.get(`users/${id}/`);
export const updateUser = (id, data) => api.patch(`users/${id}/`, data);

// Function to set the JWT token for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  setAuthToken(null);
};

// Quiz API Calls
export const getQuizResult = (attemptId) => api.get(`quiz/attempts/${attemptId}/results/`);

// Axios response interceptor to handle token expiry
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await api.post('auth/refresh/', { refresh: refreshToken });
        const newAccessToken = data.access;
        localStorage.setItem('accessToken', newAccessToken);
        setAuthToken(newAccessToken);
        return api(originalRequest); // Retry the original request with the new token
        // eslint-disable-next-line no-unused-vars
      } catch (refreshError) {
        logoutUser(); // Logout if refresh fails
        window.location.href = '/login'; // Redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
