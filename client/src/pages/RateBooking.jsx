// client/src/pages/RateBooking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const RateBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [transporterId, setTransporterId] = useState('');
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const res = await API.get(`/api/bookings/${bookingId}`);
      setBooking(res.data);
      // Extract transporter ID from selectedQuote
      if (res.data.selectedQuote?.transporter) {
        setTransporterId(res.data.selectedQuote.transporter);
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to load booking');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transporterId) {
      setMessage('No transporter found for this booking');
      return;
    }
    try {
      await API.post('/api/ratings', {
        bookingId,
        toUserId: transporterId,
        stars,
        comment
      });
      setMessage('Rating submitted!');
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Rating failed');
    }
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div>
      <h2>Rate the Transporter</h2>
      <p>Booking: {booking.pickupLocation} → {booking.deliveryLocation}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stars (1-5)</label>
          <select value={stars} onChange={(e) => setStars(parseInt(e.target.value))}>
            {[1,2,3,4,5].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Comment (optional)</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="3" />
        </div>
        <button type="submit">Submit Rating</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default RateBooking;