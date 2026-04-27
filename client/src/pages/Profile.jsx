import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import BackButton from '../components/BackButton';
const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put('/api/users/profile', formData);
      console.log('PUT response status:', res.status);
  console.log('PUT response data:', res.data);
  setMessage('Profile updated successfully');
  setUser({ ...user, ...formData });
} catch (err) {
  console.error('Error object:', err);
  console.error('Response status:', err.response?.status);
  console.error('Response data:', err.response?.data);
  setMessage('Update failed');
}
  };

  return (
    <div>
      <h2>My Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <button type="submit">Update</button>
        <BackButton />
      </form>
    </div>
  );
};

export default Profile;