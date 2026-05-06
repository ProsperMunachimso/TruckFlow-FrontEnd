// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0047AB' : '#4D90E8',
    },
    secondary: {
      main: '#FF8C42',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#0F1923',
      paper:   mode === 'light' ? '#ffffff'  : '#1A2636',
    },
    text: {
      primary:   mode === 'light' ? '#111111' : '#E8EDF2',
      secondary: mode === 'light' ? '#555555' : '#B0BEC5',
    },
    divider: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...(mode === 'dark' && {
            backgroundColor: '#1A2636',
            border: '1px solid rgba(255,255,255,0.08)',
          }),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#0047AB' : '#111E2B',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...(mode === 'dark' && {
            backgroundColor: '#1A2636',
          }),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          ...(mode === 'dark' && {
            borderColor: 'rgba(255,255,255,0.2)',
            color: '#E8EDF2',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.4)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            },
          }),
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          ...(mode === 'dark' && {
            borderColor: 'rgba(255,255,255,0.1)',
          }),
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          ...(mode === 'dark' && {
            '&.force-white': {
              color: '#E8EDF2',
            },
          }),
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default getTheme;