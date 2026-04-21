
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in by fetching profile
    const checkAuth = async () => {
      try {
        const res = await API.get('/api/users/profile');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  
  const login = async (email, password) => {
  try {
    const res = await API.post('/api/users/login', { email, password });
    setUser(res.data);
    return res.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

  const register = async (userData) => {
    const res = await API.post('/api/users/register', userData);
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await API.post('/api/users/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
