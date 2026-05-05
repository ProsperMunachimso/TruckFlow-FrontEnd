// client/src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ClientDashboard from './ClientDashboard';
import TransporterDashboard from './TransporterDashboard';
import LabourerDashboard from './LabourerDashboard';
import { CircularProgress, Container } from '@mui/material';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  if (!user) {
    return <Container>Please log in.</Container>;
  }

  switch (user.role) {
    case 'client':
      return <ClientDashboard />;
    case 'transporter':
      return <TransporterDashboard />;
    case 'labourer':
      return <LabourerDashboard />;
    default:
      return <Container>Unknown role.</Container>;
  }
};

export default Dashboard;