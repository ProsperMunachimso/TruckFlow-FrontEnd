// client/src/pages/BookingDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookingAndQuotes();
  }, [id]);

  const fetchBookingAndQuotes = async () => {
    try {
      // Fetch the single booking
      const bookingRes = await API.get(`/api/bookings/${id}`);
      setBooking(bookingRes.data);

      // Fetch all quotes and filter those belonging to this booking
      const quotesRes = await API.get('/api/quotes');
      const filtered = quotesRes.data.filter(q => q.booking?._id === id);
      setQuotes(filtered);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const acceptQuote = async (quoteId) => {
    try {
      await API.put(`/api/quotes/${quoteId}/accept`);
      setMessage('Quote accepted! Booking confirmed.');
      // Refresh to update booking status and quote list
      fetchBookingAndQuotes();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to accept quote');
    }
  };

  if (loading) return <div className="loading">Loading booking details...</div>;
  if (!booking) return <div className="error">Booking not found</div>;

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
      <p><strong>Delivery:</strong> {booking.deliveryLocation}</p>
      <p><strong>Weight:</strong> {booking.weightKg || 'N/A'} kg</p>
      <p><strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleString()}</p>
      <p><strong>Status:</strong> <span className={`status-${booking.status}`}>{booking.status}</span></p>

      {booking.status === 'pending' && (
        <div className="quotes-section">
          <h3>Quotes</h3>
          {quotes.length === 0 ? (
            <p>No quotes yet. Check back later.</p>
          ) : (
            <ul className="quotes-list">
              {quotes.map(quote => (
                <li key={quote._id}>
                  <div>
                    <strong>Amount:</strong> €{quote.amount}<br />
                    <strong>Estimated Duration:</strong> {quote.estimatedDurationHours || '—'} hours<br />
                    <strong>Notes:</strong> {quote.notes || '—'}<br />
                    <strong>Status:</strong> {quote.status}
                  </div>
                  {quote.status === 'pending' && (
                    <button onClick={() => acceptQuote(quote._id)}>Accept Quote</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {booking.status === 'confirmed' && (
        <p className="confirmed-message">This booking has been confirmed. Thank you!</p>
      )}

      <button onClick={() => navigate('/bookings')} className="back-button">
        Back to My Bookings
      </button>

      {message && <p className="info-message">{message}</p>}
    </div>
  );
};

export default BookingDetails;