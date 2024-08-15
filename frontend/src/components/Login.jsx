import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, setAuthToken } from '../services/api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser({ email, password });
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAuthToken(access);
      setIsAuthenticated(true); // Update auth state
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-green-500 bg-opacity-50"
      style={{
        backgroundImage: 'url(/path/to/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl">
        <div className="flex flex-col items-center">
          <img src="/path/to/logo.png" alt="Logo" className="mb-6 h-16 w-auto" />
          <h3 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h3>
          <p className="text-center text-gray-600">Please login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300">Login</button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">Forgot Password?</Link>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;