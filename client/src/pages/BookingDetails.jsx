import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Button, Box, Grid,
  Card, CardContent, Alert, CircularProgress, Divider,
  Chip, Stack
} from '@mui/material';
import {
  LocationOn, MyLocation, Scale, CalendarToday,
  AssignmentTurnedIn, Receipt, LocalShipping, RateReview
} from '@mui/icons-material';
import API from '../services/api';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookingAndQuotes();
    fetchInvoice();
  }, [id]);

  const fetchBookingAndQuotes = async () => {
    try {
      const bookingRes = await API.get(`/api/bookings/${id}`);
      setBooking(bookingRes.data);
      const quotesRes = await API.get('/api/quotes');
      setQuotes(quotesRes.data.filter(q => q.booking?._id === id));
    } catch (err) {
      setMessage('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoice = async () => {
    try {
      const res = await API.get('/api/invoices');
      const found = res.data.find(inv => inv.booking?._id === id);
      setInvoice(found);
    } catch (err) {}
  };

  const acceptQuote = async (quoteId) => {
    try {
      await API.put(`/api/quotes/${quoteId}/accept`);
      setMessage('Quote accepted! Booking confirmed.');
      fetchBookingAndQuotes();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to accept quote');
    }
  };

  const generateInvoice = async () => {
    const acceptedQuote = quotes.find(q => q.status === 'accepted');
    if (!acceptedQuote) {
      setMessage('No accepted quote found.');
      return;
    }
    const totalAmount = acceptedQuote.amount;
    const tax = totalAmount * 0.135;
    const grandTotal = totalAmount + tax;
    try {
      await API.post('/api/invoices', { bookingId: id, totalAmount, tax, grandTotal });
      setMessage('Invoice generated!');
      fetchInvoice();
    } catch (err) {
      setMessage('Failed to generate invoice');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (!booking) return <Alert severity="error">Booking not found</Alert>;

  // Status colour mapping
  const statusColor = {
    pending: 'warning',
    quoted: 'info',
    confirmed: 'success',
    in_transit: 'primary',
    delivered: 'success',
    cancelled: 'error'
  }[booking.status] || 'default';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header with status chip */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Booking Details
          </Typography>
          <Chip
            label={booking.status.toUpperCase()}
            color={statusColor}
            sx={{ fontWeight: 'bold', px: 1 }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Two-column information grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" /> Route
                </Typography>
                <Box sx={{ pl: 4 }}>
                  <Typography variant="body1"><strong>Pickup:</strong> {booking.pickupLocation}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}><strong>Delivery:</strong> {booking.deliveryLocation}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Scale color="primary" /> Cargo Details
                </Typography>
                <Box sx={{ pl: 4 }}>
                  <Typography variant="body1"><strong>Weight:</strong> {booking.weightKg ? `${booking.weightKg} kg` : 'Not specified'}</Typography>
                  {booking.dimensions?.length && booking.dimensions?.width && booking.dimensions?.height && (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Dimensions:</strong> {booking.dimensions.length} x {booking.dimensions.width} x {booking.dimensions.height} cm
                    </Typography>
                  )}
                  {booking.cargoType && (
                    <Typography variant="body1" sx={{ mt: 1 }}><strong>Cargo Type:</strong> {booking.cargoType}</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday color="primary" /> Schedule
                </Typography>
                <Box sx={{ pl: 4 }}>
                  <Typography variant="body1">
                    <strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentTurnedIn color="primary" /> Assistance
                </Typography>
                <Box sx={{ pl: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      label={booking.needLoadingAssistance ? "Loading Needed" : "No Loading"}
                      color={booking.needLoadingAssistance ? "secondary" : "default"}
                      size="small"
                    />
                    <Chip
                      label={booking.needUnloadingAssistance ? "Unloading Needed" : "No Unloading"}
                      color={booking.needUnloadingAssistance ? "secondary" : "default"}
                      size="small"
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {booking.specialInstructions && (
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Special Instructions</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.specialInstructions}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Quotes section */}
        {booking.status === 'pending' && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShipping /> Quotes
            </Typography>
            {quotes.length === 0 ? (
              <Alert severity="info">No quotes yet. Check back later.</Alert>
            ) : (
              <Grid container spacing={2}>
                {quotes.map(quote => (
                  <Grid item xs={12} md={6} key={quote._id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1"><strong>Amount:</strong> €{quote.amount}</Typography>
                        <Typography><strong>Duration:</strong> {quote.estimatedDurationHours || '—'} hours</Typography>
                        {quote.notes && <Typography><strong>Notes:</strong> {quote.notes}</Typography>}
                        <Typography><strong>Status:</strong> {quote.status}</Typography>
                        {quote.status === 'pending' && (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => acceptQuote(quote._id)}
                          >
                            Accept Quote
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Invoice section */}
        {booking.status === 'confirmed' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Booking Confirmed ✅</Typography>
            {!invoice ? (
              <Button variant="contained" color="secondary" onClick={generateInvoice} startIcon={<Receipt />}>
                Generate Invoice
              </Button>
            ) : (
              <Button variant="outlined" component={Link} to="/invoices" startIcon={<Receipt />}>
                View Invoice
              </Button>
            )}
          </Box>
        )}

        {/* Action buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => navigate('/bookings')}>
            ← Back to My Bookings
          </Button>
          {booking.status === 'confirmed' && (
            <Button variant="contained" component={Link} to={`/rate-booking/${booking._id}`} startIcon={<RateReview />}>
              Rate Transporter
            </Button>
          )}
        </Box>

        {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>
    </Container>
  );
};

export default BookingDetails;