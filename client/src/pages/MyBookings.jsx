import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Container,
  Typography, Button, IconButton, Paper, TableContainer,
  CircularProgress, Alert, TextField, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import API from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

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
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await API.delete(`/api/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const startEdit = (booking) => {
    setEditingId(booking._id);
    setEditData({
      pickupLocation: booking.pickupLocation,
      deliveryLocation: booking.deliveryLocation,
      weightKg: booking.weightKg || '',
      specialInstructions: booking.specialInstructions || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      const res = await API.put(`/api/bookings/${id}`, editData);
      setBookings(bookings.map(b => b._id === id ? res.data : b));
      cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>
      {bookings.length === 0 ? (
        <Typography>You have no bookings yet. <Link to="/bookings/new">Create one</Link>.</Typography>
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
                  {editingId === booking._id ? (
                    // Edit row
                    <>
                      <TableCell>
                        <TextField
                          name="pickupLocation"
                          value={editData.pickupLocation}
                          onChange={handleEditChange}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="deliveryLocation"
                          value={editData.deliveryLocation}
                          onChange={handleEditChange}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="weightKg"
                          type="number"
                          value={editData.weightKg}
                          onChange={handleEditChange}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => saveEdit(booking._id)} color="primary" size="small">
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={cancelEdit} color="error" size="small">
                          <CancelIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    // Display row
                    <>
                      <TableCell>{booking.pickupLocation}</TableCell>
                      <TableCell>{booking.deliveryLocation}</TableCell>
                      <TableCell>{booking.weightKg || '—'}</TableCell>
                      <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        <IconButton
                          component={Link}
                          to={`/bookings/${booking._id}`}
                          color="primary"
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => startEdit(booking)}
                          disabled={booking.status !== 'pending'}
                          color="secondary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(booking._id)}
                          disabled={booking.status !== 'pending'}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
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