import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

// Create the authentication context object so any component can access user info
export const AuthContext = createContext();

// The AuthProvider component wraps our entire app and gives all children access to auth state
export const AuthProvider = ({ children }) => {
  // Store the logged‑in user object (or null if not logged in)
  const [user, setUser] = useState(null);
  
  // Track whether we’re still checking the user’s auth status on page load
  // We use this to avoid flickering UI (show a spinner while loading)
  const [loading, setLoading] = useState(true);

  // When the app first mounts, check if the user already has a valid session (e.g. from a cookie)
  useEffect(() => {
    // Define an async function inside useEffect because useEffect can’t be async directly
    const checkAuth = async () => {
      try {
        // Try to fetch the current user’s profile using our API service
        // This endpoint will return the user’s data if the session is still valid
        const res = await API.get('/api/users/profile');
        setUser(res.data);   // User is logged in, save their data
      } catch (err) {
        // If the request fails (401, 403, or any error), assume no user is logged in
        setUser(null);
      } finally {
        // Whether success or failure, stop the loading indicator
        setLoading(false);
      }
    };
    
    // Actually run the check when the component mounts
    checkAuth();
  }, []); // Empty dependency array means this runs only once, when the provider first loads
  
  // Login function: send email & password, then update state with the returned user data
  const login = async (email, password) => {
    try {
      // POST request to the login endpoint – session cookie is set automatically by the backend
      const res = await API.post('/api/users/login', { email, password });
      setUser(res.data);   // Save the user object so the whole app knows who’s logged in
      return res.data;     // Let the calling component use the user data if needed
    } catch (error) {
      // Log the error for debugging, then re‑throw so the login form can show an error message
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register a new account: send user data (name, email, password, role, etc.)
  const register = async (userData) => {
    // The backend returns the newly created user (optionally auto‑logged in)
    const res = await API.post('/api/users/register', userData);
    setUser(res.data);    // Immediately set the user as logged in after registration
    return res.data;
  };

  // Log out: tell the backend to destroy the cookie/session, then clear local user state
  const logout = async () => {
    // Call the logout endpoint (usually clears the HTTP‑only cookie)
    await API.post('/api/users/logout');
    setUser(null);        // No user anymore, we made the components to re‑render to show logged‑out UI
  };

  // Provide the auth state and methods to any child component that wants them
  // We also pass `setUser` so that advanced components can manually update user data if needed
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};