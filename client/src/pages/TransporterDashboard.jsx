import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const TransporterDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const res = await API.get('/api/bookings'); // returns pending bookings for transporters
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

  if (loading) return <div>Loading available bookings...</div>;

  return (
    <div>
      <h2>Available Bookings (Pending Quotes)</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings at the moment.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Weight (kg)</th>
              <th>Pickup Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.pickupLocation}</td>
                <td>{booking.deliveryLocation}</td>
                <td>{booking.weightKg || '—'}</td>
                <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleQuote(booking._id)}>Submit Quote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransporterDashboard;