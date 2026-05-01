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
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;