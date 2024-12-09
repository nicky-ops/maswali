// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser({ username, first_name: firstName, last_name: lastName, email, password });
      navigate('/login'); 
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Registration failed. Please try again.');
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
          <h3 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h3>
          <p className="text-center text-gray-600">Join us and start your journey</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300">Register</button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-green-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;