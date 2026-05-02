import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  Rating, Alert, CircularProgress
} from '@mui/material';
import { Star } from '@mui/icons-material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const RateBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [transporterId, setTransporterId] = useState('');
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const res = await API.get(`/api/bookings/${bookingId}`);
      setBooking(res.data);
      if (res.data.selectedQuote?.transporter) {
        setTransporterId(res.data.selectedQuote.transporter);
      }
    } catch (err) {
      setMessage('Failed to load booking');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transporterId) {
      setMessage('No transporter found for this booking');
      return;
    }
    try {
      await API.post('/api/ratings', { bookingId, toUserId: transporterId, stars, comment });
      setMessage('Rating submitted!');
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Rating failed');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (!booking) return <Alert severity="error">Booking not found</Alert>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Rate the Transporter</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Booking: {booking.pickupLocation} → {booking.deliveryLocation}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="legend">Stars: </Typography>
            <Rating
              name="stars"
              value={stars}
              onChange={(e, newValue) => setStars(newValue)}
              icon={<Star fontSize="inherit" />}
              sx={{ ml: 2 }}
            />
          </Box>
          <TextField
            fullWidth
            label="Comment (optional)"
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Submit Rating
          </Button>
          <BackButton />
        </Box>
      </Paper>
    </Container>
  );
};

export default RateBooking;