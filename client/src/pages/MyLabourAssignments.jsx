// client/src/pages/MyLabourAssignments.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';

const MyLabourAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await API.get('/api/labour');
      const my = res.data.filter(req => req.labourer?._id === res.data[0]?.labourer?._id || req.status === 'assigned'); // simplified – you may need to filter by logged‑in user ID
      setAssignments(my);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Labour Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul>
          {assignments.map(req => (
            <li key={req._id}>
              {req.type} – {req.booking?.pickupLocation} → {req.booking?.deliveryLocation}<br />
              Status: {req.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyLabourAssignments;