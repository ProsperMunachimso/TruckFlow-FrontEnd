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
        {user?.role === 'client' && (
          <>
            <Link to="/bookings/new">Create a Booking</Link>
            <Link to="/bookings">My Bookings</Link>
          </>
        )}

        {user?.role === 'transporter' && (
          <>
            <Link to="/transporter-dashboard">Find Bookings to Quote</Link>
            <Link to="/my-quotes">My Quotes</Link>
            <Link to="/invoices">My Invoices</Link>
          </>
        )}
        {user?.role === 'labourer' && (
          <>
            <Link to="/labourer-dashboard">Available Labour Requests</Link>
            <Link to="/my-labour">My Assignments</Link>
          </>
        )}

        <Link to="/profile">My Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;