import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Chip,
  CircularProgress, Box, Divider
} from '@mui/material';
import { RequestQuote, CheckCircle, Pending, TrendingUp } from '@mui/icons-material';
import API from '../services/api';

// TransporterDashboard which is the main landing page for logged‑in transporters
// Shows metrics (total quotes, accepted, pending)
// Displays a list of pending bookings that need quotes
// Also shows a table of the transporter's recent quotes 
const TransporterDashboard = () => {
  const [pendingBookings, setPendingBookings] = useState([]); // Bookings that need quotes
  const [myQuotes, setMyQuotes] = useState([]);               // Quotes submitted by this transporter
  const [metrics, setMetrics] = useState({
    totalQuotes: 0,
    acceptedQuotes: 0,
    pendingQuotes: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // When the component mounts, fetch both bookings and quotes in parallel
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array 

  const fetchData = async () => {
    try {
      // We used Promise.all because it allows both API calls to run simultaneously, improving performance
      const [bookingsRes, quotesRes] = await Promise.all([
        API.get('/api/bookings'), // Returns bookings that are pending and not yet quoted? (backend filtering)
        API.get('/api/quotes')    // Returns all quotes for this transporter
      ]);
      setPendingBookings(bookingsRes.data);
      setMyQuotes(quotesRes.data);

      // Calculate metrics from the quotes array
      const myQuotesArr = quotesRes.data;
      const accepted = myQuotesArr.filter(q => q.status === 'accepted').length;
      const pending = myQuotesArr.filter(q => q.status === 'pending').length;
      setMetrics({
        totalQuotes: myQuotesArr.length,
        acceptedQuotes: accepted,
        pendingQuotes: pending
      });
    } catch (err) {
      console.error(err); // Log error silently
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the "Create Quote" page for a specific booking
  const handleQuote = (bookingId) => {
    navigate(`/quotes/new/${bookingId}`);
  };

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (

    // - We made thhis page accessible only to users with role 'transporter'
    // - The API endpoint /api/bookings returns only bookings that are 'pending' and not yet quoted? \
    // - We used Promise.all because it fires both requests in parallel, and improves load time
    // - Recent quotes are sliced to 5; the API might return them sorted by createdAt descending t
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Transporter Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back! Overview of your quoting activity.
      </Typography>

      {/* METRIC CARDS – 3 cards showing total quotes, accepted, pending */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Quotes Card */}
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

        {/* Accepted Quotes Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.acceptedQuotes}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Accepted Quotes</Typography>
              {/* A small caption showing total, though same as the number above, could be improved */}
              <Typography variant="caption" color="success.main">+{metrics.acceptedQuotes > 0 ? metrics.acceptedQuotes : 0} total</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Quotes Card */}
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

      {/* QUICK ACTIONS – button to view all quotes */}
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

      {/* PENDING BOOKINGS TABLE, bookings that need quotes */}
      <Typography variant="h5" gutterBottom>Pending Bookings (Need Quotes)</Typography>
      {pendingBookings.length === 0 ? (
        <Typography>No pending bookings at the moment.</Typography>
      ) : (
        // Wrap table with overflowX auto to allow horizontal scroll on small screens
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 600 }}>
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
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* RECENT QUOTES, shows the transporter's last 5 quotes */}
      <Typography variant="h5" gutterBottom>Recent Quotes</Typography>
      {myQuotes.length === 0 ? (
        <Typography>You haven't submitted any quotes yet.</Typography>
      ) : (
        // Wrap table with overflowX auto
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>Booking (pickup → delivery)</TableCell>
                <TableCell>Amount (€)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* .slice(0,5) limits to the 5 most recent – assumes API returns newest first */}
              {myQuotes.slice(0, 5).map(quote => (
                <TableRow key={quote._id}>
                  <TableCell>{quote.booking?.pickupLocation} → {quote.booking?.deliveryLocation}</TableCell>
                  <TableCell>€{quote.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={quote.status}
                      color={quote.status === 'accepted' ? 'success' : (quote.status === 'pending' ? 'warning' : 'default')}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

// MUI components used for this page:
// - Container: centres content with max width "lg"
// - Grid: responsive layout for metric cards
// - Card, CardContent: white cards with shadow
// - Typography: headings and text
// - Table, TableHead, TableBody, TableRow, TableCell: display pending bookings and quotes
// - Chip: status badge for quote status
// - CircularProgress: loading spinner
// - Box: flex layout inside cards
// - Divider: horizontal line to separate sections
// - Icons (RequestQuote, CheckCircle, Pending, TrendingUp): visual cues


export default TransporterDashboard;