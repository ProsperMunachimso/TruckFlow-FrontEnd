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
import BackButton from '../components/BackButton';

// MyBookings page which displays all bookings for the logged‑in client
// Allows viewing, editing, and deleting bookings 
// Inline editing mode: users can edit pickup/delivery locations, weight, and special instructions
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);      // Array of booking objects
  const [loading, setLoading] = useState(true);      // Show spinner while fetching
  const [error, setError] = useState('');            // Error message if fetch fails
  const [editingId, setEditingId] = useState(null);  // ID of booking currently being edited
  const [editData, setEditData] = useState({});      // Temporary data for the edit form

  // When the component mounts, fetch all bookings for this client
  useEffect(() => {
    fetchBookings();
  }, []); // Empty dependency array 

  // Fetch all bookings from the backend
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

  // Delete a booking after confirmation
  const handleDelete = async (id) => {
    // Use window.confirm native browser dialog we used this because it is simple but effective
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await API.delete(`/api/bookings/${id}`);
        // Remove deleted booking from state
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  // Start editing a booking, set editingId and copy relevant fields to editData
  const startEdit = (booking) => {
    setEditingId(booking._id);
    setEditData({
      pickupLocation: booking.pickupLocation,
      deliveryLocation: booking.deliveryLocation,
      weightKg: booking.weightKg || '',
      specialInstructions: booking.specialInstructions || ''
    });
  };

  // Cancel editing mode and clear temporary data
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // Update editData state when user types in any field
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save the edited booking to the backend
  const saveEdit = async (id) => {
    try {
      const res = await API.put(`/api/bookings/${id}`, editData);
      // Replace the updated booking in state with the response from backend
      setBookings(bookings.map(b => b._id === id ? res.data : b));
      cancelEdit(); // Exit edit mode
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  // Show loading spinner while fetching data
  if (loading) return <CircularProgress />;
  // Show error message if fetch failed
  if (error) return <Alert severity="error">{error}</Alert>;

  // - This page is accessible only to clients (role based)
  // - Edit and Delete buttons are disabled if booking.status is not 'pending'
  // - Inline editing only updates pickup, delivery, weight, and special instructions
  // - After editing, the entire booking state is refreshed with the updated object from backend
  // - Deleting a booking removes it from the state immediately
  // - The table uses inline edit mode for simplicity 
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>
      {bookings.length === 0 ? (
        // Empty state: encourage user to create first booking
        <Typography>You have no bookings yet. <Link to="/bookings/new">Create one</Link>.</Typography>
      ) : (
        // TableContainer adds scrolling for large tables and wraps with Paper
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
                    // EDIT MODE uses inline form with TextFields for editing
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
                          type="number"     // Shows numeric keyboard on mobile
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
                    // *DISPLAY MODE* – read‑only row with action buttons
                    <>
                      <TableCell>{booking.pickupLocation}</TableCell>
                      <TableCell>{booking.deliveryLocation}</TableCell>
                      <TableCell>{booking.weightKg || '—'}</TableCell>
                      <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        {/* View details button – always available */}
                        <IconButton
                          component={Link}
                          to={`/bookings/${booking._id}`}
                          color="primary"
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {/* Edit button – disabled unless status is 'pending' */}
                        <IconButton
                          onClick={() => startEdit(booking)}
                          disabled={booking.status !== 'pending'}
                          color="secondary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        {/* Delete button – disabled unless status is 'pending' */}
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
      <BackButton />
    </Container>
  );
};

// MUI components used for this page:
// - Container: centers content with max width "lg"
// - Typography: page title and empty state text
// - Table, TableContainer, TableHead, TableBody, TableRow, TableCell: display bookings in grid
// - Paper: wraps table with a white background and shadow
// - TextField: inline editing inputs (pickup, delivery, weight)
// - IconButton: buttons with icons (View, Edit, Delete, Save, Cancel)
// - CircularProgress: loading spinner
// - Alert: error message display
// - BackButton: custom component to go back
// Icons used: VisibilityIcon: view booking details
// - EditIcon: start editing
// - DeleteIcon: delete booking
// - SaveIcon: save edited booking
// - CancelIcon: cancel edit mode


export default MyBookings;