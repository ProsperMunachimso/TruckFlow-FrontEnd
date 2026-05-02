import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, CircularProgress, Chip
} from '@mui/material';
import { RequestQuote } from '@mui/icons-material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const TransporterDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const res = await API.get('/api/bookings');
      setBookings(res.data);
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Available Bookings (Pending Quotes)</Typography>
        {bookings.length === 0 ? (
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
              {bookings.map(booking => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.pickupLocation}</TableCell>
                  <TableCell>{booking.deliveryLocation}</TableCell>
                  <TableCell>{booking.weightKg || '—'}</TableCell>
                  <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<RequestQuote />}
                      onClick={() => handleQuote(booking._id)}
                    >
                      Submit Quote
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <BackButton />
      </Paper>
    </Container>
  );
};

export default TransporterDashboard;