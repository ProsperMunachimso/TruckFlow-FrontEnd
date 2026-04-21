import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    // logout function should redirect to login or home
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {user?.role}</p>
      <p>Email: {user?.email}</p>

      <div className="dashboard-links">
        <Link to="/bookings/new">Create a Booking</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/profile">My Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;