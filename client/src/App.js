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

// Inner component that uses the theme mode
function AppContent() {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, pb: 4 }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsConditions />} />
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
          <Footer />
        </Box>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;