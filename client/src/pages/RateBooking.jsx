import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  Rating, Alert, CircularProgress
} from '@mui/material';
import { Star } from '@mui/icons-material';
import API from '../services/api';
import BackButton from '../components/BackButton';

// RateBooking page which allows clients to rate a transporter after a booking is completed
const RateBooking = () => {
  const { bookingId } = useParams();   // Get the booking ID from URL
  const navigate = useNavigate();      // For redirect after successful rating

  // State for booking data, transporter ID, rating fields, and loading/error status
  const [booking, setBooking] = useState(null);       // Full booking object
  const [transporterId, setTransporterId] = useState(''); // ID of the transporter to rate
  const [stars, setStars] = useState(5);              // Rating value (default 5 stars)
  const [comment, setComment] = useState('');         // Optional comment
  const [message, setMessage] = useState('');         // Success/error message
  const [loading, setLoading] = useState(true);       // Show spinner while loading

  // When the component mounts or bookingId changes, fetch the booking details
  useEffect(() => {
    fetchBooking();
  }, [bookingId]); // Re-run if bookingId changes 

  // Fetch the specific booking to get the transporter ID 
  const fetchBooking = async () => {
    try {
      const res = await API.get(`/api/bookings/${bookingId}`);
      setBooking(res.data);
      // Extract the transporter ID from the selected quote (the accepted quote)
      // This assumes the booking's selectedQuote contains the transporter's ID
      if (res.data.selectedQuote?.transporter) {
        setTransporterId(res.data.selectedQuote.transporter);
      }
    } catch (err) {
      setMessage('Failed to load booking');
    } finally {
      setLoading(false);
    }
  };

  // Submit the rating to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Guard clause: make sure we have a transporter ID
    if (!transporterId) {
      setMessage('No transporter found for this booking');
      return;
    }
    try {
      // POST /api/ratings with bookingId, recipient (transporter), stars, and comment
      await API.post('/api/ratings', { 
        bookingId, 
        toUserId: transporterId, 
        stars, 
        comment 
      });
      setMessage('Rating submitted!');
      // After success, wait 2 seconds then redirect to the bookings list
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Rating failed');
    }
  };

  // Show loading spinner while fetching the booking
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  // If booking is null after loading, show error
  if (!booking) return <Alert severity="error">Booking not found</Alert>;


  // - We made this page accessible only to clients. We also ensured rhe booking must have a confirmed quote with a transporter (selectedQuote.transporter)
  // - The rating is submitted to the backend, which stores it in the database
  // - After submission, the user is redirected to the bookings list after a 2-second delay
  return (
    // Container maxWidth="sm" (small = 600px) – keeps form narrow and focused
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>   {/* White card with shadow */}
        <Typography variant="h4" gutterBottom>Rate the Transporter</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Booking: {booking.pickupLocation} → {booking.deliveryLocation}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Rating stars section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="legend">Stars: </Typography>
            <Rating
              name="stars"
              value={stars}
              onChange={(e, newValue) => setStars(newValue)} // newValue is the number of stars (1-5)
              icon={<Star fontSize="inherit" />}
              sx={{ ml: 2 }}
            />
          </Box>
          
          {/* Optional comment field – multiline text area */}
          <TextField
            fullWidth
            label="Comment (optional)"
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          
          {/* Display success/error message */}
          {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
          
          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Submit Rating
          </Button>
          
          <BackButton /> 
        </Box>
      </Paper>
    </Container>
  );
};

// MUI components used for this page:
// - Container: centres content with a small max width (sm = 600px)
// - Paper: card with elevation (shadow) and padding
// - Typography: headings and text
// - Rating: star rating input component (1-5 stars)
// - TextField: multiline input for optional comment
// - Button: submit rating button
// - Box: layout wrapper for form and star row
// - Alert: shows success/error messages
// - CircularProgress: loading spinner
// - BackButton: custom component for navigation
// Icons used: Star used inside Rating component to customise the icon



export default RateBooking;