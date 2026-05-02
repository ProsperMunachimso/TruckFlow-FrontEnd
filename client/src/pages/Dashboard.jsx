import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Grid, Card, CardContent,
  Button, Box, Avatar, Divider, Chip
} from '@mui/material';
import {
  LocalShipping, RateReview, Assignment, Person,
  Inventory, Receipt, Build, Dashboard as DashboardIcon,
  Logout
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  // Role‑based quick actions
  const clientActions = [
    { title: 'Create a Booking', link: '/bookings/new', icon: <LocalShipping />, color: 'primary' },
    { title: 'My Bookings', link: '/bookings', icon: <Inventory />, color: 'secondary' },
    { title: 'My Invoices', link: '/invoices', icon: <Receipt />, color: 'info' },
    { title: 'Rate Transporter', link: '/bookings', icon: <RateReview />, color: 'warning' },
  ];

  const transporterActions = [
    { title: 'Find Bookings to Quote', link: '/transporter-dashboard', icon: <LocalShipping />, color: 'primary' },
    { title: 'My Quotes', link: '/my-quotes', icon: <Assignment />, color: 'secondary' },
    { title: 'My Invoices', link: '/invoices', icon: <Receipt />, color: 'info' },
  ];

  const labourerActions = [
    { title: 'Available Labour Requests', link: '/labourer-dashboard', icon: <Build />, color: 'primary' },
    { title: 'My Assignments', link: '/my-labour', icon: <Assignment />, color: 'secondary' },
  ];

  let actions = [];
  if (user?.role === 'client') actions = clientActions;
  if (user?.role === 'transporter') actions = transporterActions;
  if (user?.role === 'labourer') actions = labourerActions;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Welcome header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h4">Welcome, {user?.name}!</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* User info card */}
          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Account Information</Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip label={`Role: ${user?.role}`} color="primary" size="small" sx={{ mr: 1 }} />
                  <Chip label={`Email: ${user?.email}`} variant="outlined" size="small" />
                </Box>
                <Button
                  component={Link}
                  to="/profile"
                  variant="outlined"
                  startIcon={<Person />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick actions card */}
          <Grid item xs={12} md={7}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                <Grid container spacing={1}>
                  {actions.map((action, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Button
                        component={Link}
                        to={action.link}
                        variant="outlined"
                        startIcon={action.icon}
                        color={action.color}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', py: 1 }}
                      >
                        {action.title}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Logout button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ minWidth: 200 }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;