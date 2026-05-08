import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ClientDashboard from './ClientDashboard';
import TransporterDashboard from './TransporterDashboard';
import LabourerDashboard from './LabourerDashboard';
import { CircularProgress, Container } from '@mui/material';

// Dashboard, the main page after login that shows role‑specific views
// It reads the logged‑in user from AuthContext and renders the correct dashboard, based on whether the user is a client, transporter, or labourer.

// The component acts as a router within the dashboard
// - It doesn't fetch data itself – it delegates to role‑specific components
// - It relies completely on AuthContext to know who the user is
const Dashboard = () => {
  // Get user object and loading state from the authentication context
  // user = { _id, name, email, role, ... } or null if not logged in
  const { user, loading } = useContext(AuthContext);

  // While the app is checking if the user is logged in, show a loading spinner
  // This prevents a flash of Please log inbefore the check completes
  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  // If after loading there's no user, show a fallback message
  if (!user) {
    return <Container>Please log in.</Container>;
  }

  // Render a different dashboard component based on the user's role
  // Each dashboard has its own metrics, actions, and data
  switch (user.role) {
    case 'client':
      return <ClientDashboard />;        // Shows shipments, quotes, invoices
    case 'transporter':
      return <TransporterDashboard />;   // Shows available bookings, quotes submitted
    case 'labourer':
      return <LabourerDashboard />;      // Shows job requests, availability
    default:
      // If the role is something unexpected, show error
      return <Container>Unknown role.</Container>;
  }
};

// We used a few MUI components for this page:
// - CircularProgress: a spinning loader while auth state is being checked
// - Container: simple wrapper for the fallback messages

export default Dashboard;