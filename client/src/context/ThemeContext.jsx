import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// This provider component wraps parts of the app that need access to theme mode
export const ThemeProvider = ({ children }) => {
  // We store the current theme ('light' or 'dark') in state
  // The initial value is set lazily using a function whichh runs only once
  // Purpose: check localStorage for a saved theme preference, otherwise default to light. This way, if the user previously chose dark mode, we remember it across page reloads
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });

  // Every time mode changes, save it to localStorage, which we did to ensure the user's preference is stored for the next visit
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]); // Only re-run when mode changes

  // Toggle between light and dark mode
  // By using the functional update (prevMode => ...), we avoid any issues with stale state
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Provide the current mode and the toggle function to all children components
  // When mode changes, every component using this context will re-render
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);