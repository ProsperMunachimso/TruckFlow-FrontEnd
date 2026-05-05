// client/src/pages/TransporterDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Chip,
  CircularProgress, Box, Divider
} from '@mui/material';
import { RequestQuote, CheckCircle, Pending, TrendingUp } from '@mui/icons-material';
import API from '../services/api';

const TransporterDashboard = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [myQuotes, setMyQuotes] = useState([]);
  const [metrics, setMetrics] = useState({
    totalQuotes: 0,
    acceptedQuotes: 0,
    pendingQuotes: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, quotesRes] = await Promise.all([
        API.get('/api/bookings'), // pending bookings for transporter
        API.get('/api/quotes')    // transporter's own quotes
      ]);
      setPendingBookings(bookingsRes.data);
      setMyQuotes(quotesRes.data);

      const myQuotesArr = quotesRes.data;
      const accepted = myQuotesArr.filter(q => q.status === 'accepted').length;
      const pending = myQuotesArr.filter(q => q.status === 'pending').length;
      setMetrics({
        totalQuotes: myQuotesArr.length,
        acceptedQuotes: accepted,
        pendingQuotes: pending
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuote = (bookingId) => {
    navigate(`/quotes/new/${bookingId}`);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Transporter Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back! Overview of your quoting activity.
      </Typography>

      {/* Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RequestQuote color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.totalQuotes}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Total Quotes Submitted</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.acceptedQuotes}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Accepted Quotes</Typography>
              <Typography variant="caption" color="success.main">+{metrics.acceptedQuotes > 0 ? metrics.acceptedQuotes : 0} total</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pending color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.pendingQuotes}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Pending Quotes</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom>Quick Actions</Typography>
      <Button
        variant="contained"
        startIcon={<TrendingUp />}
        onClick={() => navigate('/my-quotes')}
        sx={{ mb: 4 }}
      >
        View My Quotes
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* Pending Bookings (need quotes) */}
      <Typography variant="h5" gutterBottom>Pending Bookings (Need Quotes)</Typography>
      {pendingBookings.length === 0 ? (
        <Typography>No pending bookings at the moment.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pickup</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Weight (kg)</TableCell>
              <TableCell>Pickup Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingBookings.map(booking => (
              <TableRow key={booking._id}>
                <TableCell>{booking.pickupLocation}</TableCell>
                <TableCell>{booking.deliveryLocation}</TableCell>
                <TableCell>{booking.weightKg || '—'}</TableCell>
                <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={() => handleQuote(booking._id)}>
                    Submit Quote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Recent Quotes */}
      <Typography variant="h5" gutterBottom>Recent Quotes</Typography>
      {myQuotes.length === 0 ? (
        <Typography>You haven't submitted any quotes yet.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking (pickup → delivery)</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myQuotes.slice(0, 5).map(quote => (
              <TableRow key={quote._id}>
                <TableCell>{quote.booking?.pickupLocation} → {quote.booking?.deliveryLocation}</TableCell>
                <TableCell>€{quote.amount}</TableCell>
                <TableCell>
                  <Chip label={quote.status} color={quote.status === 'accepted' ? 'success' : (quote.status === 'pending' ? 'warning' : 'default')} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default TransporterDashboard;