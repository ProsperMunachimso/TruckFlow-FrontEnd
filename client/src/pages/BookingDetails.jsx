import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Button, Box, Grid,
  Card, CardContent, Alert, CircularProgress
} from '@mui/material';
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Booking Details</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}><Typography variant="subtitle1">Pickup:</Typography></Grid>
          <Grid item xs={6}><Typography>{booking.pickupLocation}</Typography></Grid>
          <Grid item xs={6}><Typography variant="subtitle1">Delivery:</Typography></Grid>
          <Grid item xs={6}><Typography>{booking.deliveryLocation}</Typography></Grid>
          <Grid item xs={6}><Typography variant="subtitle1">Weight:</Typography></Grid>
          <Grid item xs={6}><Typography>{booking.weightKg || 'N/A'} kg</Typography></Grid>
          <Grid item xs={6}><Typography variant="subtitle1">Pickup Date:</Typography></Grid>
          <Grid item xs={6}><Typography>{new Date(booking.pickupDate).toLocaleString()}</Typography></Grid>
          <Grid item xs={6}><Typography variant="subtitle1">Status:</Typography></Grid>
          <Grid item xs={6}><Typography>{booking.status}</Typography></Grid>
        </Grid>

        {booking.status === 'pending' && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">Quotes</Typography>
            {quotes.length === 0 ? (
              <Typography>No quotes yet.</Typography>
            ) : (
              quotes.map(quote => (
                <Card key={quote._id} sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography><strong>Amount:</strong> €{quote.amount}</Typography>
                    <Typography><strong>Duration:</strong> {quote.estimatedDurationHours || '—'} hrs</Typography>
                    <Typography><strong>Notes:</strong> {quote.notes || '—'}</Typography>
                    <Typography><strong>Status:</strong> {quote.status}</Typography>
                    {quote.status === 'pending' && (
                      <Button variant="contained" color="primary" onClick={() => acceptQuote(quote._id)} sx={{ mt: 1 }}>Accept Quote</Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        )}

        {booking.status === 'confirmed' && (
          <Box sx={{ mt: 3 }}>
            <Typography>This booking has been confirmed.</Typography>
            {!invoice ? (
              <Button variant="contained" color="secondary" onClick={generateInvoice} sx={{ mt: 2 }}>Generate Invoice</Button>
            ) : (
              <Typography>Invoice already generated. <Link to="/invoices">View Invoices</Link></Typography>
            )}
          </Box>
        )}

        <Button variant="outlined" onClick={() => navigate('/bookings')} sx={{ mt: 3 }}>Back to My Bookings</Button>
        {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>
    </Container>
  );
};

export default BookingDetails;