import React, { useContext, useState, useEffect } from  'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Paper, Typography, TextField, Button, Box, Alert, Dialog, DialogTitle, DialogContent, DialogActions, useTheme } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const theme = useTheme();
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

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
      await API.put('/api/users/profile', formData);
      setMessage('Profile updated successfully');
      setUser({ ...user, ...formData });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Password is required');
      return;
    }
    try {
      await API.delete('/api/users/me', { data: { password: deletePassword } });
      await logout();
      navigate('/');
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Deletion failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>My Profile</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" margin="normal" value={formData.name} onChange={handleChange} />
          <TextField fullWidth label="Phone" name="phone" margin="normal" value={formData.phone} onChange={handleChange} />
          <TextField fullWidth label="Address" name="address" margin="normal" value={formData.address} onChange={handleChange} />
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>Update</Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete Account
          </Button>
          <BackButton />
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog with better dark mode visibility */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            color: 'text.primary',
          }
        }}
      >
        <DialogTitle sx={{ color: 'text.primary' }}>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            Are you sure? This action is permanent and cannot be undone.
          </Typography>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            margin="normal"
            InputLabelProps={{ sx: { color: 'text.secondary' } }}
          />
          {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError}</Alert>}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined" sx={{ color: 'text.primary', borderColor: 'divider' }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;