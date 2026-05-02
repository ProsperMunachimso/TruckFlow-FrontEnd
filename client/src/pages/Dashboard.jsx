import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Grid, Card, CardContent,
  Button, Box, Avatar, Divider
} from '@mui/material';
import {
  LocalShipping, RateReview, Assignment, Person,
  Inventory, Receipt, Build, Dashboard as DashboardIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  // Role-based quick action cards
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h4">Welcome, {user?.name}!</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1"><strong>Role:</strong> {user?.role}</Typography>
                <Typography variant="subtitle1"><strong>Email:</strong> {user?.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
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
                        sx={{ justifyContent: 'flex-start', mb: 1 }}
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            component={Link}
            to="/profile"
            variant="contained"
            startIcon={<Person />}
            sx={{ mr: 2 }}
          >
            My Profile
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            startIcon={<Person />}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;