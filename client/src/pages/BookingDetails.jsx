// client/src/pages/BookingDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookingAndQuotes();
    fetchInvoice();
  }, [id]);

  const fetchBookingAndQuotes = async () => {
    try {
      const bookingRes = await API.get(`/api/bookings/${id}`);
      setBooking(bookingRes.data);

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

  const fetchInvoice = async () => {
    try {
      const res = await API.get('/api/invoices');
      const found = res.data.find(inv => inv.booking?._id === id);
      setInvoice(found);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptQuote = async (quoteId) => {
    try {
      await API.put(`/api/quotes/${quoteId}/accept`);
      setMessage('Quote accepted! Booking confirmed.');
      fetchBookingAndQuotes();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to accept quote');
    }
  };

  const generateInvoice = async () => {
    const acceptedQuote = quotes.find(q => q.status === 'accepted');
    if (!acceptedQuote) {
      setMessage('No accepted quote found for this booking.');
      return;
    }
    const totalAmount = acceptedQuote.amount;
    const tax = totalAmount * 0.135; // 13.5% VAT
    const grandTotal = totalAmount + tax;
    try {
      await API.post('/api/invoices', {
        bookingId: id,
        totalAmount,
        tax,
        grandTotal
      });
      setMessage('Invoice generated successfully!');
      fetchInvoice(); // refresh invoice data
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to generate invoice');
    }
  };

  if (loading) return <div>Loading booking details...</div>;
  if (!booking) return <div className="error">Booking not found</div>;

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
      <p><strong>Delivery:</strong> {booking.deliveryLocation}</p>
      <p><strong>Weight:</strong> {booking.weightKg || 'N/A'} kg</p>
      <p><strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleString()}</p>
      <p><strong>Status:</strong> {booking.status}</p>

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
        <div>
          <p>This booking has been confirmed.</p>
          {!invoice ? (
            <button onClick={generateInvoice}>Generate Invoice</button>
          ) : (
            <p>Invoice already generated. <Link to="/invoices">View Invoices</Link></p>
          )}
        </div>
      )}

      <button onClick={() => navigate('/bookings')}>Back to My Bookings</button>
      {message && <p className="info-message">{message}</p>}
    </div>
  );
};

export default BookingDetails;