import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateBooking from './pages/CreateBooking';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import TransporterDashboard from './pages/TransporterDashboard';
import CreateQuote from './pages/CreateQuote';
import MyQuotes from './pages/MyQuotes';
import BookingDetails from './pages/BookingDetails';
import LabourerDashboard from './pages/LabourerDashboard';
import MyLabourAssignments from './pages/MyLabourAssignments';
import Invoices from './pages/Invoices';
import RateBooking from './pages/RateBooking';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsConditions from './pages/TermsConditions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as CustomThemeProvider, useThemeMode } from './context/ThemeContext';
import getTheme from './theme';

function AppContent() {
  // Get current theme mode ('light' or 'dark') from our custom ThemeContext
  const { mode } = useThemeMode();
  // Generate the MUI theme based on the mode (light/dark)
  const theme = getTheme(mode);

  return (
    // MuiThemeProvider applies the theme to all Material‑UI components
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline normalizes CSS and adds MUI's global styles (background, colours) */}
      <CssBaseline />
      
      {/* BrowserRouter enables client‑side routing (no page reloads) */}
      <BrowserRouter>
        {/* Flex column layout to push footer to bottom */}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Navbar appears on every page (once, at the top) */}
          <Navbar />
          
          {/* Main content area – flexGrow:1 pushes footer down when content is short */}
          <Box component="main" sx={{ flexGrow: 1, pb: 4 }}>
            <Routes>
              {/* PUBLIC ROUTES – anyone can access these, no login required */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsConditions />} />
              
              {/* PROTECTED ROUTES – require authentication (wrapped by PrivateRoute) */}
              {/* PrivateRoute checks if user is logged in; if not, redirects to /login */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookings/new" element={<CreateBooking />} />
                <Route path="/bookings/:id" element={<BookingDetails />} />
                <Route path="/bookings" element={<MyBookings />} />
                <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
                <Route path="/quotes/new/:bookingId" element={<CreateQuote />} />
                <Route path="/my-quotes" element={<MyQuotes />} />
                <Route path="/labourer-dashboard" element={<LabourerDashboard />} />
                <Route path="/my-labour" element={<MyLabourAssignments />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/rate-booking/:bookingId" element={<RateBooking />} />
              </Route>
            </Routes>
          </Box>
          
          {/* Footer appears on every page */}
          <Footer />
        </Box>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

// Main App component – wraps everything with context providers
function App() {
  return (
    // AuthProvider gives global authentication state (user, login, logout, loading)
    <AuthProvider>
      {/* CustomThemeProvider provides dark/light mode toggle and stores preference in localStorage */}
      <CustomThemeProvider>
        {/* AppContent contains all the routing and theme application */}
        <AppContent />
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;