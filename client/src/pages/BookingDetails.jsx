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
import BackButton from '../components/BackButton';

// BookingDetails page which shows full details of a single booking
// Allows clients to view route, cargo, schedule, quotes, and invoice
// Also lets clients accept a quote and generate an invoice
const BookingDetails = () => {
  // useParams gives us the booking ID from the URL
  const { id } = useParams();
  const navigate = useNavigate(); // For programmatic navigation (going back to bookings list)
  
  // All the state we need to manage this page
  const [booking, setBooking] = useState(null);       // The booking object from backend
  const [quotes, setQuotes] = useState([]);          // All quotes for this booking
  const [invoice, setInvoice] = useState(null);      // Invoice if generated
  const [loading, setLoading] = useState(true);      // Show spinner while fetching
  const [message, setMessage] = useState('');        // Feedback messages (success/error)

  // When the component mounts or the ID changes, we made it to fetch data
  useEffect(() => {
    fetchBookingAndQuotes();
    fetchInvoice();
  }, [id]); // Dependency array and it re-runs if id changes

  // Fetches the booking details and all quotes then filters quotes for this booking
  const fetchBookingAndQuotes = async () => {
    try {
      // Get the specific booking from backend
      const bookingRes = await API.get(`/api/bookings/${id}`);
      setBooking(bookingRes.data);
      
      // Get ALL quotes (the endpoint returns quotes for the current user)
      // Then filter only those where the booking._id matches our current booking ID
      const quotesRes = await API.get('/api/quotes');
      setQuotes(quotesRes.data.filter(q => q.booking?._id === id));
    } catch (err) {
      setMessage('Failed to load booking details');
    } finally {
      setLoading(false); 
    }
  };

  // This block of code below fetches all invoices and finds the one belonging to this booking
  const fetchInvoice = async () => {
    try {
      const res = await API.get('/api/invoices'); // Get the invoices from the backend
      const found = res.data.find(inv => inv.booking?._id === id);
      setInvoice(found);
    } catch (err) {
      // Silent fail, invoice just stays null, which is fine
    }
  };

  // Client accepts a quote – sends PUT request to /api/quotes/:id/accept
  const acceptQuote = async (quoteId) => {
    try {
      await API.put(`/api/quotes/${quoteId}/accept`);
      setMessage('Quote accepted! Booking confirmed.');
      // Refresh both booking and quotes so the UI updates
      fetchBookingAndQuotes();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to accept quote');
    }
  };

  // Generate an invoice for a confirmed booking
  const generateInvoice = async () => {
    // Find the accepted quote
    const acceptedQuote = quotes.find(q => q.status === 'accepted');
    if (!acceptedQuote) {
      setMessage('No accepted quote found.');
      return;
    }
    // This calculates tax, we used the 13.5% Irish VAT rate for transport services.
    const totalAmount = acceptedQuote.amount;
    const tax = totalAmount * 0.135;
    const grandTotal = totalAmount + tax;
    try {
      await API.post('/api/invoices', { bookingId: id, totalAmount, tax, grandTotal });
      setMessage('Invoice generated!');
      fetchInvoice(); // Re-fetch so the View Invoice button appears, because after the invoice generates, you should be able to see it.
    } catch (err) {
      setMessage('Failed to generate invoice');
    }
  };

  // Show a loading spinner while data is being fetched, we used CircularProgress component for this.
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  // If booking is null after loading, display an error
  if (!booking) return <Alert severity="error">Booking not found</Alert>;

  // Map booking status to MUI chip colours
  // warning = yellow, info = light blue, success = green, primary = blue, error = red
  const statusColor = {
    pending: 'warning',
    quoted: 'info',
    confirmed: 'success',
    in_transit: 'primary',
    delivered: 'success',
    cancelled: 'error'
  }[booking.status] || 'default';

  return (
    // Container maxWidth="lg" keeps content from stretching too wide on large screens
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* We used the Paper component and made it a white/grey card with elevation shadow */}
      <Paper elevation={3} sx={{ p: 3 }}>
        
        {/* Header row: title + status chip */}
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

        {/* Two‑column grid for booking information */}
        <Grid container spacing={3}>
          
          {/* Route card: pickup and delivery locations */}
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

          {/* Cargo details card – weight, dimensions, cargo type */}
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

          {/* Schedule card – pickup date/time */}
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

          {/* Loading/unloading assistance chips */}
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

          {/* Special instructions – full width if present */}
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

        {/* QUOTES SECTION – only shown if booking is still pending */}
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
                        {/* Only show "Accept Quote" button if the quote is still pending */}
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

        {/* INVOICE SECTION – only shown after booking is confirmed */}
        {booking.status === 'confirmed' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Booking Confirmed </Typography>
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

        {/* Bottom action buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => navigate('/bookings')}>
            ← Back to My Bookings
          </Button>
          {/* Show "Rate Transporter" only if booking is confirmed */}
          {booking.status === 'confirmed' && (
            <Button variant="contained" component={Link} to={`/rate-booking/${booking._id}`} startIcon={<RateReview />}>
              Rate Transporter
            </Button>
          )}
        </Box>

        {/* Display feedback messages if any */}
        {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
        
        {/* Reusable BackButton component which we made to go one step back in history */}
        <BackButton />
      </Paper>
    </Container>
  );
};

// We used a lot of MUI components for this page: 
// Container because it centers content, we also used Paper becasue it is easier to make it an elevated surface, Grid for responsive layout, 
// We used Card because it organises info blocks, we used Chips becuase it allowed us to show status badges, and Alert for displaying messages, 
// and various icons, which we got easily due to Material UI (THANK YOU ELLEN) to make the UI intuitive. 
// The component handles all the logic for fetching data, accepting quotes, and generating invoices.

export default BookingDetails;