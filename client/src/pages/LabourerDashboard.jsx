import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Chip,
  CircularProgress, Box, Divider, Alert
} from '@mui/material';
import { Work, AssignmentTurnedIn, CheckCircle, PersonAdd } from '@mui/icons-material';
import API from '../services/api';

// LabourerDashboard which is the main landing page for logged‑in labourers
// Shows available labour requests 
// Also shows their assigned jobs and completed work.
// Allows labourers to claim pending requests with a single click.
const LabourerDashboard = () => {
  // State for two lists of labour requests
  const [availableRequests, setAvailableRequests] = useState([]); // Requests not yet assigned to anyone
  const [assignedRequests, setAssignedRequests] = useState([]);   // Requests assigned to this labourer
  const [loading, setLoading] = useState(true);                   // Show spinner while fetching
  const [message, setMessage] = useState('');                     // Success/error feedback

  // When the component mounts, fetch both lists from the backend
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  // Fetches available and assigned labour requests from the API
  const fetchData = async () => {
    try {
      // Available requests: those with status pending and no assigned labourer
      // The backend uses ?filter=available to return only those
      const availableRes = await API.get('/api/labour?filter=available');
      setAvailableRequests(availableRes.data);

      // Assigned requests: those assigned to this specific labourer
      const assignedRes = await API.get('/api/labour?filter=assigned');
      setAssignedRequests(assignedRes.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load data');
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  // Labourer assigns themselves to a pending request
  const assignSelf = async (requestId) => {
    try {
      await API.put(`/api/labour/${requestId}/assign`);
      setMessage('Assigned successfully!');
      fetchData(); // Refresh both lists to update UI immediately
    } catch (err) {
      setMessage(err.response?.data?.message || 'Assignment failed');
    }
  };

  // Calculate summary metrics for the top cards
  const pendingCount = availableRequests.length;                               // Unassigned requests
  const assignedCount = assignedRequests.filter(req => req.status === 'assigned').length; // Currently assigned
  const completedCount = assignedRequests.filter(req => req.status === 'completed').length; // Finished jobs

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    // - We made this page only accessible only to users with role labourer
    // - The API expects query parameters ?filter=available and ?filter=assigned
    // - Available requests are those with no assigned labourer yet
    // - When a labourer clicks Assign Me, the backend updates the request status to assigned and links it to the labourer's ID
    // - The dashboard auto‑refreshes after assignment to update both tables

    // Container maxWidth="lg" (large = 1200px) gives plenty of room for tables
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Labourer Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back! Track your labour assignments.
      </Typography>

      {/* Display success or error messages */}
      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      {/* METRIC CARDS, 3 cards to show counts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Available Requests Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Work color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{pendingCount}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Available Requests</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Assigned Jobs Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <AssignmentTurnedIn color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{assignedCount}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Assigned Jobs</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{completedCount}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* QUICK ACTIONS, button to view all assignments */}
      <Typography variant="h5" gutterBottom>Quick Actions</Typography>
      <Button
        variant="contained"
        startIcon={<PersonAdd />}
        component="a"       // Renders as an anchor tag 
        href="my-labour"   // Navigates to a dedicated page for labourer's assignments
        sx={{ mb: 4 }}
      >
        View My Assignments
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* AVAILABLE REQUESTS TABLE, labourers can claim these */}
      <Typography variant="h5" gutterBottom>Available Requests</Typography>
      {availableRequests.length === 0 ? (
        <Typography>No pending requests at the moment.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking Route</TableCell>   
              <TableCell>Type</TableCell>          
              <TableCell>Workers</TableCell>        {/* Number of labourers needed */}
              <TableCell>Hours</TableCell>          {/* Estimated hours */}
              <TableCell>Action</TableCell>         {/* Assign Me button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {availableRequests.map(req => (
              <TableRow key={req._id}>
                <TableCell>
                  {req.booking?.pickupLocation} → {req.booking?.deliveryLocation}
                </TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>{req.numberOfLabourers}</TableCell>
                <TableCell>{req.hours}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={() => assignSelf(req._id)}>
                    Assign Me
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Divider sx={{ my: 2 }} />

      {/* RECENT ASSIGNMENTS, shows up to 5 of the labourer's assigned requests */}
      <Typography variant="h5" gutterBottom>My Recent Assignments</Typography>
      {assignedRequests.length === 0 ? (
        <Typography>No assignments yet.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking Route</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedRequests.slice(0, 5).map(req => ( // Only the 5 most recent
              <TableRow key={req._id}>
                <TableCell>
                  {req.booking?.pickupLocation} → {req.booking?.deliveryLocation}
                </TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>
                  {/* We used this for the Chip colour: assigned = primary (blue), completed = success (green) */}
                  <Chip
                    label={req.status}
                    color={req.status === 'assigned' ? 'primary' : 'success'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

// MUI components used for thhis page:
// - Container: centres content with max width "lg"
// - Grid: responsive layout for metric cards
// - Card, CardContent: white cards with shadow
// - Typography: headings and text
// - Table, TableHead, TableBody, TableRow, TableCell: display structured data
// - Chip: status badges (assigned, completed)
// - CircularProgress: loading spinner
// - Box: simple layout wrapper for flex alignment inside cards
// - Divider: horizontal line to separate sections
// - Alert: temporary success/error messages
// - Icons (Work, AssignmentTurnedIn, CheckCircle, PersonAdd): visual cues

export default LabourerDashboard;