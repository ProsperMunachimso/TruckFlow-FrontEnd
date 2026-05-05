// client/src/pages/LabourerDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Chip,
  CircularProgress, Box, Divider, Alert
} from '@mui/material';
import { Work, AssignmentTurnedIn, CheckCircle, PersonAdd } from '@mui/icons-material';
import API from '../services/api';

const LabourerDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [metrics, setMetrics] = useState({
    pending: 0,
    assigned: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pendingRes, assignedRes] = await Promise.all([
        API.get('/api/labour'), // returns pending (unassigned) requests for labourer? Wait, your backend returns pending: { status: 'pending', labourer: null }
        API.get('/api/labour/my')   // if you created endpoint for labourer's own assignments, otherwise reuse and filter
      ]);
      // For pending: we call /api/labour?filter=available (or simply pending). Adjust based on your backend.
      // Assuming /api/labour returns all pending (labourer sees available)
      let pending = [];
      try {
        const res = await API.get('/api/labour');
        pending = res.data.filter(req => req.status === 'pending' && !req.labourer);
      } catch(e) { console.error(e); }
      setPendingRequests(pending);

      // For assigned: you may have endpoint /api/labour/my (we created earlier). Use that or fallback.
      let assigned = [];
      try {
        const res2 = await API.get('/api/labour/my');
        assigned = res2.data;
      } catch(e) {
        // fallback: filter from all labour requests where labourer matches logged in user
        const all = await API.get('/api/labour');
        assigned = all.data.filter(req => req.labourer?._id === req.user?._id); // incomplete, better to have dedicated endpoint
      }
      setMyAssignments(assigned);

      const pendingCount = pending.length;
      const assignedCount = assigned.filter(a => a.status === 'assigned').length;
      const completedCount = assigned.filter(a => a.status === 'completed').length;
      setMetrics({
        pending: pendingCount,
        assigned: assignedCount,
        completed: completedCount
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const assignSelf = async (requestId) => {
    try {
      await API.put(`/api/labour/${requestId}/assign`);
      setMessage('Assigned successfully!');
      fetchData(); // refresh
    } catch (err) {
      setMessage(err.response?.data?.message || 'Assignment failed');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Labourer Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back! Track your labour assignments.
      </Typography>

      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      {/* Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Work color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.pending}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Available Requests</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <AssignmentTurnedIn color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.assigned}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Assigned Jobs</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{metrics.completed}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom>Quick Actions</Typography>
      <Button
        variant="contained"
        startIcon={<PersonAdd />}
        onClick={() => window.location.href = '/labourer-dashboard-available'} // or link to a dedicated page for available requests
        sx={{ mb: 4 }}
      >
        View Available Requests
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* Pending Labour Requests (Available) */}
      <Typography variant="h5" gutterBottom>Available Requests</Typography>
      {pendingRequests.length === 0 ? (
        <Typography>No pending requests at the moment.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking Route</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Workers</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingRequests.map(req => (
              <TableRow key={req._id}>
                <TableCell>{req.booking?.pickupLocation} → {req.booking?.deliveryLocation}</TableCell>
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

      {/* Recent Assignments */}
      <Typography variant="h5" gutterBottom>My Recent Assignments</Typography>
      {myAssignments.length === 0 ? (
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
            {myAssignments.slice(0, 5).map(req => (
              <TableRow key={req._id}>
                <TableCell>{req.booking?.pickupLocation} → {req.booking?.deliveryLocation}</TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>
                  <Chip label={req.status} color={req.status === 'assigned' ? 'primary' : (req.status === 'completed' ? 'success' : 'default')} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default LabourerDashboard;