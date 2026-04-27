import React, { useState, useEffect } from 'react';
import API from '../services/api';
import BackButton from '../components/BackButton';

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await API.get('/api/quotes');
      setQuotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading your quotes...</div>;

  return (
    <div>
      <h2>My Submitted Quotes</h2>
      {quotes.length === 0 ? (
        <p>You haven't submitted any quotes yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking (pickup → delivery)</th>
              <th>Amount (€)</th>
              <th>Est. Hours</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(quote => (
              <tr key={quote._id}>
                <td>{quote.booking?.pickupLocation} → {quote.booking?.deliveryLocation}</td>
                <td>{quote.amount}</td>
                <td>{quote.estimatedDurationHours || '—'}</td>
                <td>{quote.status}</td>
                <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <BackButton />
    </div>
  );
};

export default MyQuotes;