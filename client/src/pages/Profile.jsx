import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.put('/api/users/profile', formData);
      setMessage('Profile updated successfully');
      setUser({ ...user, ...formData });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" margin="normal" value={formData.name} onChange={handleChange} />
          <TextField fullWidth label="Phone" name="phone" margin="normal" value={formData.phone} onChange={handleChange} />
          <TextField fullWidth label="Address" name="address" margin="normal" value={formData.address} onChange={handleChange} />
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>Update</Button>
          <BackButton />
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;