import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    website_url: '',
    bio: '',
    twitter_url: '',
    github_url: '',
    linkedin_url: '',
    avatar: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/profile/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setFormData(response.data);
        setAvatarPreview(response.data.avatar);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setFormData({
        ...formData,
        avatar: e.target.files[0]
      });
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await axios.put('http://localhost:8000/api/profile/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-500 bg-opacity-50">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl">
        {avatarPreview && (
          <div className="flex justify-center mb-6">
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="website_url" className="block text-gray-700">Website URL:</label>
            <input
              id="website_url"
              type="url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="twitter_url" className="block text-gray-700">Twitter URL:</label>
            <input
              id="twitter_url"
              type="url"
              name="twitter_url"
              value={formData.twitter_url}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="github_url" className="block text-gray-700">GitHub URL:</label>
            <input
              id="github_url"
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="linkedin_url" className="block text-gray-700">LinkedIn URL:</label>
            <input
              id="linkedin_url"
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="avatar" className="block text-gray-700">Profile Picture:</label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="w-full mt-2"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-24 h-24 mt-4 rounded-full object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
          >
            {submitting ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;