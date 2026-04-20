import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <h1>TruckFlow</h1>
      <p>Book trucks, track shipments, hire labour – all in one place.</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
};

export default Landing;