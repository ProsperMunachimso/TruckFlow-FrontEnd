import * as React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Navigation bar that appears at the top of every page
// We made it to show different buttons depending on whether a user is logged in or not.
// Also includes a dark/light mode toggle button
const Navbar = () => {
  // Get user data and logout function from the authentication context
  const { user, logout } = useContext(AuthContext);
  
  // Hook to programmatically change routes (e.g., after logout)
  const navigate = useNavigate();
  
  // Get current theme mode and the toggle function from the theme context
  // mode is either light or dark, we use it to choose which icon to show
  const { mode, toggleTheme } = useThemeMode();

  // Handle logout: call the logout function from context, then redirect to home page
  const handleLogout = async () => {
    await logout();     // Clear auth state and backend session
    navigate('/');      // Send user back to the landing page
  };

  return (
    // We used AppBar because it is Material‑UI's top bar component; position="sticky" keeps it at top while scrolling
    <AppBar position="sticky">
      {/* Toolbar adds proper spacing and alignment for content inside the AppBar */}
      <Toolbar>
        {/* Brand name / logo: clicking it takes you home */}
        {/* flexGrow: 1 pushes any following content to the right which we used to create space */}
        <Typography 
          variant="h6" 
          component={Link}        
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
        >
          TruckFlow
        </Typography>

        {/* Box acts as a flex container for the navigation buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* If user is logged in, show dashboard, profile, and logout buttons */}
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            /* If no user is logged in, show Home, Login, Register buttons */
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
          
          {/* Theme Toggle Button – changes between light and dark mode */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {/* If current mode is light, show the "dark mode" icon (moon) */}
            {/* If current mode is dark, show the "light mode" icon (sun) */}
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;