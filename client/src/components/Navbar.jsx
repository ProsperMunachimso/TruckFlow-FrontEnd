import * as React from 'react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, 
  Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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

  // MUI theme and breakpoint detection for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // true for screens smaller than 600px
  
  // State to control the mobile drawer (hamburger menu) open/close
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle logout: call the logout function from context, then redirect to home page
  const handleLogout = async () => {
    await logout();     // Clear auth state and backend session
    navigate('/');      // Send user back to the landing page
    setDrawerOpen(false); // Close drawer after logout
  };

  // Function to close drawer, used by navigation links
  const closeDrawer = () => setDrawerOpen(false);

  // Generate navigation items based on authentication status
  const navItems = user
    ? [
        { label: 'Dashboard', path: '/dashboard', onClick: () => navigate('/dashboard') },
        { label: 'Profile', path: '/profile', onClick: () => navigate('/profile') },
        { label: 'Logout', path: '', onClick: handleLogout },
      ]
    : [
        { label: 'Home', path: '/', onClick: () => navigate('/') },
        { label: 'Login', path: '/login', onClick: () => navigate('/login') },
        { label: 'Register', path: '/register', onClick: () => navigate('/register') },
      ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Theme toggle as a list item on mobile */}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemText primary={mode === 'light' ? 'Dark Mode' : 'Light Mode'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    // We used AppBar because it is Material‑UI's top bar component; position="sticky" keeps it at top while scrolling
    <AppBar position="sticky">
      <Toolbar>
        {/* Brand name / logo: clicking it takes you home */}
        {/* flexGrow: 1 pushes any following content to the right which we used to create space */}
        <Typography 
          variant="h6" 
          component={Link}        
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          TruckFlow
        </Typography>

        {/* For desktop: show buttons directly */}
        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button key={item.label} color="inherit" onClick={item.onClick}>
                {item.label}
              </Button>
            ))}
            {/* Theme Toggle Button – changes between light and dark mode */}
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
        ) : (
          // For mobile: show hamburger menu icon and theme toggle icon
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Drawer component for mobile navigation */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;