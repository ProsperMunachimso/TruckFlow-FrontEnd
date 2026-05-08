import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';

// Login page which allows existing users to sign in we made it to use AuthContext to call the login function, which stores the user session
// After successful login, redirects to the dashboard that has role specific views
const Login = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Stores login error message

  // Get the login function from authentication context
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // For redirecting after login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      // Call the login function from context andsends email/password to backend
      await login(email, password);
      // On success, redirect to the dashboard role determines which dashboard loads
      navigate('/dashboard');
    } catch (err) {
      // Display error from backend or a generic message
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    // - We made this page publicly accessible and the login function from AuthContext sends a POST request to /api/users/login
    // - On success, the backend sets an HTTP‑only cookie
    // - The user state in AuthContext is updated, triggering a re‑render of protected routes
    // - After login, the user is redirected to /dashboard, which renders the role‑specific dashboard
    // - If login fails (wrong email/password), an error message appears but the user stays on the page


    // Container maxWidth="sm" (small = 600px) – keeps the form narrow and centered
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {/* Paper creates a card-like surface with elevation */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login to TruckFlow
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Email field, type=email enables email keyboard on mobile */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"   // Adds consistent vertical spacing
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required          
          />
          
          {/* Password field, type=password hides input */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {/* Show error message if login fails */}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          
          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
            Login
          </Button>
          
          {/* Link to registration page for new users */}
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

// MUI components usedfor this page incluses:
// - Container: centers the form with a max width of "sm" (600px)
// - Paper: creates a card with elevation (shadow) and padding
// - Typography: heading (h4) and helper text
// - TextField: input fields with built‑in labels, margin, and validation
// - Button: submit button with full width
// - Box: wrapper for the form element
// - Alert: displays error messages from failed login attempts
export default Login;