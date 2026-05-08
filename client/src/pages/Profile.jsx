import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Paper, Typography, TextField, Button, Box, Alert, Dialog, DialogTitle, DialogContent, DialogActions, useTheme } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

// Profile page which allows logged‑in users to view and edit their profile information
// Also provides a Delete Account button that requires password confirmation
// Uses AuthContext to get current user data and update it after successful edit
const Profile = () => {
  const theme = useTheme(); // For accessing theme 
  const { user, setUser, logout } = useContext(AuthContext); // Auth state and functions
  const navigate = useNavigate(); // To redirect after account deletion

  // Form state for editable fields (name, phone, address)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [message, setMessage] = useState(''); // Success message
  const [error, setError] = useState('');     // Update error message
  const [phoneError, setPhoneError] = useState(''); // Phone validation error
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Controls delete confirmation dialog
  const [deletePassword, setDeletePassword] = useState(''); // Password for account deletion
  const [deleteError, setDeleteError] = useState(''); // Error during deletion

  // When user data loads (or changes), populate the form fields
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]); // Re-run whenever user changes

  // Validate phone number: optional, but if provided must be valid (Irish/International format)
  const validatePhone = (phone) => {
    if (!phone.trim()) return ''; // empty is allowed
    // Regex: allows Irish (08x xxx xxxx or +353 8x xxx xxxx) or international format (+ followed by digits, spaces, hyphens)
    const phoneRegex = /^(\+?[0-9]{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid phone number (e.g., 0871234567, +353871234567)';
    }
    return '';
  };

  // Handle changes to text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'phone') {
      setPhoneError(validatePhone(value));
    }
  };

  // Submit updated profile to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPhoneError('');
    
    // Validate phone before submission
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    
    try {
      await API.put('/api/users/profile', formData);
      setMessage('Profile updated successfully');
      // Update the user object in AuthContext so the whole app sees the changes
      setUser({ ...user, ...formData });
      // Auto-clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  // Delete the user's account after confirming password
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Password is required');
      return;
    }
    try {
      await API.delete('/api/users/me', { data: { password: deletePassword } });
      await logout();          // Clear local auth state and backend session
      navigate('/');          // Redirect to home page (landing)
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Deletion failed');
    }
  };

  // - We made this page accessible to all logged‑in users regardless of role 
  // - The backend endpoint PUT /api/users/profile allows the user to update their profile field
  // - We ensured then when deleting an account it requires password confirmation to avoid user mistakes
  // - After deletion, we call logout() to clear the session and redirect to the home page
  // - The form is populated with existing user data via useEffect that depends on user
  // - Success message auto‑clears after 3 seconds to avoid cluttering the UI
  // - The dialog uses custom PaperProps to ensure it respects dark mode (background colour)
  // - Error handling is done per action (update vs delete) and displayed separately
  return (
    // Container maxWidth="sm" (small = 600px) – keeps form narrow and readable
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>   {/* White card with shadow */}
        <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>My Profile</Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          {/* Editable fields */}
          <TextField 
            fullWidth 
            label="Name" 
            name="name" 
            margin="normal" 
            value={formData.name} 
            onChange={handleChange} 
          />
          <TextField 
            fullWidth 
            label="Phone" 
            name="phone" 
            margin="normal" 
            value={formData.phone} 
            onChange={handleChange} 
            error={!!phoneError}
            helperText={phoneError}
          />
          <TextField 
            fullWidth 
            label="Address" 
            name="address" 
            margin="normal" 
            value={formData.address} 
            onChange={handleChange} 
          />
          
          {/* Success / error alerts */}
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          
          {/* Update button */}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Update
          </Button>
          
          {/* Delete Account button – opens confirmation dialog */}
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

      {/* DELETE CONFIRMATION DIALOG, asks for password before deletion */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper', // Uses theme background for dark mode support
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
          <Button 
            onClick={() => setOpenDeleteDialog(false)} 
            variant="outlined" 
            sx={{ color: 'text.primary', borderColor: 'divider' }}
          >
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

// MUI components used:
// - Container: centres the form with a small max width
// - Paper: card with elevation and padding
// - Typography: page title and dialog text
// - TextField: input fields for name, phone, address, and password confirmation
// - Button: update, delete, cancel buttons
// - Box: wrapper for the form
// - Alert: success/error messages
// - Dialog, DialogTitle, DialogContent, DialogActions: modal confirmation for account deletion
// - useTheme: accesses theme for custom styling (dialog background)

export default Profile;