import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// We created this component to protect routes that require a logged‑in user.
// If the user is authenticated, it renders the child routes.
// Otherwise, it redirects to the login page.
const PrivateRoute = () => {
  // Get user and loading state from the authentication context
  // user = null if not logged in, loading = true while checking auth status
  const { user, loading } = useContext(AuthContext);

  // While we're still checking if the user is logged in, show a simple loading message to prevent a flash of the login screen
  if (loading) {
    return <div>Loading...</div>; // Thought about using a spinner component but we are going with this.
  }

  // If user exists (logged in), we rendered the nested routes using <Outlet /> because <Outlet /> is where child routes go (like Dashboard, Profile, etc.)
  // If no user, redirect to /login using React Router's Navigate component
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;