// eslint-disable-next-line no-unused-vars
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      // Ensure we have a userId before making the request
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        // Log the URL we're trying to access
        const url = `/api/users/${userId}/`;
        console.log('Fetching profile from:', url);

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        console.log('Profile data received:', response.data);
        setFormData(response.data);
        setAvatarPreview(response.data.avatar);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(`Failed to load profile: ${err.message}`);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
        }
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
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setSubmitting(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== 'avatar') data.append(key, value);
    });
    if (formData.avatar instanceof File) {
      data.append('avatar', formData.avatar);
    }

    try {
      const url = `/api/users/${userId}/`;
      console.log('Updating profile at:', url);
      const response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update response:', response.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(`Failed to update profile: ${err.message}`);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
  };

  if (loading) return <p>Loading...</p>;

  const renderField = (label, value, name) => (
    <div className="mb-4">
      <label className="block text-gray-700">{label}:</label>
      {isEditing ? (
        <input
          type={name.includes('url') ? 'url' : 'text'}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
        />
      ) : (
        <p className="mt-2 text-gray-600">{value || 'Not provided'}</p>
      )}
    </div>
  );

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
          {renderField('Username', formData.username, 'username')}
          {renderField('Website URL', formData.website_url, 'website_url')}
          {renderField('Bio', formData.bio, 'bio')}
          {renderField('Twitter URL', formData.twitter_url, 'twitter_url')}
          {renderField('GitHub URL', formData.github_url, 'github_url')}
          {renderField('LinkedIn URL', formData.linkedin_url, 'linkedin_url')}

          {isEditing && (
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
            </div>
          )}

          {isEditing ? (
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="w-1/2 mr-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
              >
                {submitting ? 'Updating...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={toggleEdit}
                className="w-1/2 ml-2 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={toggleEdit}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;