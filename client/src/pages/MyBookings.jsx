// client/src/pages/MyBookings.jsx
import React, { useState, useEffect } from 'react';
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
      // Update the booking in the local state
      setBookings(bookings.map(b => b._id === id ? res.data : b));
      cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet. <a href="/bookings/new">Create one</a>.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Weight (kg)</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                {editingId === booking._id ? (
                  <>
                    <td><input name="pickupLocation" value={editData.pickupLocation} onChange={handleEditChange} /></td>
                    <td><input name="deliveryLocation" value={editData.deliveryLocation} onChange={handleEditChange} /></td>
                    <td><input name="weightKg" type="number" value={editData.weightKg} onChange={handleEditChange} /></td>
                    <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button onClick={() => saveEdit(booking._id)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{booking.pickupLocation}</td>
                    <td>{booking.deliveryLocation}</td>
                    <td>{booking.weightKg || '—'}</td>
                    <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button onClick={() => startEdit(booking)} disabled={booking.status !== 'pending'}>Edit</button>
                      <button onClick={() => handleDelete(booking._id)} disabled={booking.status !== 'pending'}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;