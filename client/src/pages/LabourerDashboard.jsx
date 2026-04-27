// client/src/pages/LabourerDashboard.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';
import BackButton from '../components/BackButton';

const LabourerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Fetch all labour requests – we'll filter to those not assigned or pending
      const res = await API.get('/api/labour');
      // For simplicity, show all pending requests (status 'pending' and no labourer assigned)
      const pending = res.data.filter(req => req.status === 'pending');
      setRequests(pending);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const assignSelf = async (requestId) => {
    try {
      await API.put(`/api/labour/${requestId}/assign`);
      setMessage('Assigned successfully!');
      fetchRequests(); // refresh
    } catch (err) {
      setMessage(err.response?.data?.message || 'Assignment failed');
    }
  };

  if (loading) return <div>Loading labour requests...</div>;

  return (
    <div>
      <h2>Available Labour Requests</h2>
      {message && <p>{message}</p>}
      {requests.length === 0 ? (
        <p>No pending labour requests.</p>
      ) : (
        <ul>
          {requests.map(req => (
            <li key={req._id}>
              <strong>Booking:</strong> {req.booking?.pickupLocation} → {req.booking?.deliveryLocation}<br />
              <strong>Type:</strong> {req.type} | <strong>Workers needed:</strong> {req.numberOfLabourers} | <strong>Hours:</strong> {req.hours}
              <button onClick={() => assignSelf(req._id)}>Assign Me</button>
            </li>
          ))}
        </ul>
      )}
      <BackButton />
    </div>
  );
};

export default LabourerDashboard;