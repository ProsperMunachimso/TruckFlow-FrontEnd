import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Paper, TextField, Button, Typography, Box,
  Select, MenuItem, FormControl, InputLabel, Alert
} from '@mui/material';

// Register page which allows new users to create an account
// Collects name, email, password, password confirmation, and role be it client, transporter, labourer
// After successful registration, automatically logs the user in and redirects to the appropriate dashboard
const Register = () => {
  // Form state for all fields, default role is 'client'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  const [errors, setErrors] = useState({}); // Validation and API errors
  const { register } = useContext(AuthContext); // Auth function from context
  const navigate = useNavigate(); // For redirect after successful registration

  // Client‑side validation before sending to backend
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    // Password length validation (minimum 6 characters for security)
    if (formData.password && formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  // Update formData when user types in any field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Run validation; if errors, display them and stop
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // Call the register function from AuthContext (sends data to backend)
      await register(formData);
      // On success, redirect to dashboard (role‑specific dashboard will load)
      navigate('/dashboard');
    } catch (err) {
      // Display backend error 
      setErrors({ api: err.response?.data?.message || 'Registration failed' });
    }
  };

  // - We made this page publicly accessible. It registers function from AuthContext sends a POST request to /api/users/register
  // - Passwords are sent as plain text over HTTPS 
  // - After successful registration, the backend sets an HTTP‑only cookie (session)
  // - The user state in AuthContext is updated, and the user is redirected to /dashboard
  return (
    // Container maxWidth="sm" (small = 600px) keeps form narrow and centered
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>   {/* Card with shadow */}
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          {/* Name field */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          
          {/* Email field – type="email" for email keyboard on mobile */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          
          {/* Password field – type="password" hides input */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          
          {/* Confirm Password – must match password */}
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          
          {/* Role selection dropdown – client, transporter, or labourer */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="transporter">Transporter</MenuItem>
              <MenuItem value="labourer">Labourer</MenuItem>
            </Select>
          </FormControl>
          
          {/* Display API error  */}
          {errors.api && <Alert severity="error" sx={{ mt: 2 }}>{errors.api}</Alert>}
          
          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
            Register
          </Button>
          
          {/* Link to login page for existing users */}
          <Typography variant ="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

// MUI components used:
// - Container: centres content with max width "sm"
// - Paper: card with elevation and padding
// - Typography: headings
// - TextField: input fields with built‑in labels, error display, and helper text
// - Button: submit button
// - Box: wrapper for the form
// - Select, MenuItem, FormControl, InputLabel: role dropdown
// - Alert: error messages

export default Register;