import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, TableHead, TableRow, TableCell, TableBody, Container, 
  Typography, Button, IconButton, Paper, TableContainer,
  CircularProgress, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import API from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/api/bookings');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this booking?')) {
      try {
        await API.delete(`/api/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>
      {bookings.length === 0 ? (
        <Typography>You have no bookings. <Link to="/bookings/new">Create one</Link>.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pickup</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Weight (kg)</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.pickupLocation}</TableCell>
                  <TableCell>{booking.deliveryLocation}</TableCell>
                  <TableCell>{booking.weightKg || '—'}</TableCell>
                  <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/bookings/${booking._id}`} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      disabled={booking.status !== 'pending'} 
                      onClick={() => {/* open edit modal or navigate */}}
                      color="secondary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      disabled={booking.status !== 'pending'} 
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default MyBookings;