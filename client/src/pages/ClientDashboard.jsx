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

// ClientDashboard, it shows the main landing page for logged‑in clients
// Shows key metrics like active shipments, completed deliveries, labour requests, total spend.
// Also displays quick action buttons and a table of recent bookings.

// We used many MUI components here:
// - Container: centers content with max width
// - Grid & Card: responsive layout for metrics
// - Typography: consistent text styling
// - Table: displays recent bookings in rows/columns
// - Chip: shows status with different colours
// - CircularProgress: loading spinner while fetching data
// - Divider: horizontal line to separate sections
// - Icons (LocalShipping, CheckCircle, etc.): visual cues for each metric and button
//
// The component fetches data from three endpoints (/bookings, /labour, /invoices)
// and calculates dashboard metrics. It also handles loading states and empty states.
const ClientDashboard = () => {
  // State to hold the four dashboard metrics
  const [metrics, setMetrics] = useState({
    activeShipments: 0,
    completedDeliveries: 0,
    labourRequestsPending: 0,
    totalSpend: 0
  });
  const [recentBookings, setRecentBookings] = useState([]); // Last 5 bookings
  const [loading, setLoading] = useState(true); // Show spinner while fetching

  // When the component mounts, fetch all dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []); // Empty dependency array

  // Fetches bookings, labour requests, invoices and calculates metrics
  const fetchDashboardData = async () => {
    try {
      // 1. Get all bookings for this client
      const bookingsRes = await API.get('/api/bookings');
      const bookings = bookingsRes.data;

      // Active shipments shows any status except delivered or cancelled
      // We use .filter() to exclude finished/cancelled ones
      const active = bookings.filter(b => !['delivered', 'cancelled'].includes(b.status));
      // Completed, sets the status exactly delivered
      const completed = bookings.filter(b => b.status === 'delivered');

      // 2. Get labour requests returns requests for client's bookings
      const labourRes = await API.get('/api/labour');
      const pendingLabour = labourRes.data.filter(l => l.status === 'pending');

      // 3. Get invoices and sum only the paid ones grandTotal
      const invoicesRes = await API.get('/api/invoices');
      const totalPaid = invoicesRes.data
        .filter(inv => inv.paymentStatus === 'paid')
        .reduce((sum, inv) => sum + inv.grandTotal, 0);

      // Update state with calculated values
      setMetrics({
        activeShipments: active.length,
        completedDeliveries: completed.length,
        labourRequestsPending: pendingLabour.length,
        totalSpend: totalPaid
      });

      // Recent bookings: take the 5 most recently created, we used createdAt for this, to accurately get the most recent 5
      const sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentBookings(sorted.slice(0, 5));

    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false); 
    }
  };

  // Helper function to map booking status to MUI chip colour
  // MUI chip colors: warning = yellow, info = light blue, primary = blue, success = green
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';   // Waiting for driver
      case 'confirmed': return 'info';    // Booked but not started
      case 'in_transit': return 'primary'; // On the way
      case 'delivered': return 'success';  // Completed
      default: return 'default';
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    // Container limits max width on large screens and adds margin top/bottom
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {user?.name}! Here's an overview of your operations. Here's an overview of your operations.
      </Typography>

      {/* METRIC CARDS – 4 cards in a responsive grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        
        {/* This shows the card for the active Shipments for the user logged i */}
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

        {/* This shows the card for the completed Deliveries for the user logged in */}
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

        {/* This shows the Card for the Labour Requests Pending for the user logged in */}
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

        {/* This shows the card for the total spend for th e user logged in */}
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

      {/* We added this section so the user can quickly navigate to essential actions */}
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

      {/* This shows a table for the recent bookings for the user logged in */}
      <Typography variant="h5" gutterBottom>Recent Bookings</Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Your latest shipment activities
      </Typography>
      {recentBookings.length === 0 ? (
        <Typography>No bookings yet. <Link to="/bookings/new">Create one</Link>.</Typography>
      ) : (
        // Wrap table with overflowX auto for horizontal scroll on small screens
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 600 }}>
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
                  {/* Display only the last 6 characters of the booking ID for brevity */}
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
        </Box>
      )}
      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button component={Link} to="/bookings">View All</Button>
      </Box>
    </Container>
  );
};

export default ClientDashboard;