import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, logoutUser } from './api';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    if (token) {
      setAuthToken(token);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleTakeQuiz = () => {
    if (isAuthenticated) {
      navigate('/quizzes');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { isAuthenticated, handleTakeQuiz, handleLogout };
};

export default useAuth;
