// client/src/pages/ClientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  CircularProgress, Box, Chip, Divider
} from '@mui/material';
import {
  LocalShipping, CheckCircle, PersonAdd, AttachMoney,
  AddCircle, TrackChanges, Assignment
} from '@mui/icons-material';
import API from '../services/api';

const ClientDashboard = () => {
  const [metrics, setMetrics] = useState({
    activeShipments: 0,
    completedDeliveries: 0,
    labourRequestsPending: 0,
    totalSpend: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all bookings for the client
      const bookingsRes = await API.get('/api/bookings');
      const bookings = bookingsRes.data;

      // Active shipments: status not 'delivered' or 'cancelled'
      const active = bookings.filter(b => !['delivered', 'cancelled'].includes(b.status));
      // Completed deliveries: status 'delivered'
      const completed = bookings.filter(b => b.status === 'delivered');

      // Fetch labour requests (returns requests for client's bookings)
      const labourRes = await API.get('/api/labour');
      const pendingLabour = labourRes.data.filter(l => l.status === 'pending');

      // Fetch invoices to calculate total spend (paid invoices only)
      const invoicesRes = await API.get('/api/invoices');
      const totalPaid = invoicesRes.data
        .filter(inv => inv.paymentStatus === 'paid')
        .reduce((sum, inv) => sum + inv.grandTotal, 0);

      setMetrics({
        activeShipments: active.length,
        completedDeliveries: completed.length,
        labourRequestsPending: pendingLabour.length,
        totalSpend: totalPaid
      });

      // Recent bookings: last 5 (by createdAt)
      const sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentBookings(sorted.slice(0, 5));

    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'in_transit': return 'primary';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back! Here's an overview of your operations.
      </Typography>

      {/* Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <LocalShipping color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.activeShipments}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Active Shipments</Typography>
              <Typography variant="caption" color="success.main">+3 from last week</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.completedDeliveries}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Completed Deliveries</Typography>
              <Typography variant="caption" color="success.main">+12 this month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <PersonAdd color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.labourRequestsPending}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Labour Requests</Typography>
              <Typography variant="caption" color="warning.main">4 pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <AttachMoney color="info" sx={{ fontSize: 40 }} />
                <Typography variant="h4">€{metrics.totalSpend.toLocaleString()}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Total Spend</Typography>
              <Typography variant="caption" color="text.secondary">This month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom>Quick Actions</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/bookings/new" variant="contained" fullWidth startIcon={<AddCircle />}>
            Book a Truck
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/bookings" variant="outlined" fullWidth startIcon={<TrackChanges />}>
            Track Shipment
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/bookings" variant="outlined" fullWidth startIcon={<Assignment />}>
            Request Labour
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Recent Bookings */}
      <Typography variant="h5" gutterBottom>Recent Bookings</Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Your latest shipment activities
      </Typography>
      {recentBookings.length === 0 ? (
        <Typography>No bookings yet. <Link to="/bookings/new">Create one</Link>.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pickup Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentBookings.map(booking => (
              <TableRow key={booking._id}>
                <TableCell>BK-{booking._id.slice(-6)}</TableCell>
                <TableCell>{booking.pickupLocation} → {booking.deliveryLocation}</TableCell>
                <TableCell>
                  <Chip label={booking.status} size="small" color={getStatusColor(booking.status)} />
                </TableCell>
                <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/bookings/${booking._id}`} size="small" variant="outlined">
                    Track
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button component={Link} to="/bookings">View All</Button>
      </Box>
    </Container>
  );
};

export default ClientDashboard;