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
  const [availableRequests, setAvailableRequests] = useState([]);
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        // Available requests (pending, unassigned)
        const availableRes = await API.get('/api/labour?filter=available');
        setAvailableRequests(availableRes.data);

        // Assigned requests (to this labourer)
        const assignedRes = await API.get('/api/labour?filter=assigned');
        setAssignedRequests(assignedRes.data);
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
      fetchData(); // refresh both lists
    } catch (err) {
      setMessage(err.response?.data?.message || 'Assignment failed');
    }
  };

  // Calculate metrics
  const pendingCount = availableRequests.length;
  const assignedCount = assignedRequests.filter(req => req.status === 'assigned').length;
  const completedCount = assignedRequests.filter(req => req.status === 'completed').length;

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
                <Typography variant="h4">{pendingCount}</Typography>
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
                <Typography variant="h4">{assignedCount}</Typography>
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
                <Typography variant="h4">{completedCount}</Typography>
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
        component="a"
        href="/my-labour"
        sx={{ mb: 4 }}
      >
        View My Assignments
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* Available Requests */}
      <Typography variant="h5" gutterBottom>Available Requests</Typography>
      {availableRequests.length === 0 ? (
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
            {availableRequests.map(req => (
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
            {assignedRequests.slice(0, 5).map(req => (
              <TableRow key={req._id}>
                <TableCell>{req.booking?.pickupLocation} → {req.booking?.deliveryLocation}</TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>
                  <Chip label={req.status} color={req.status === 'assigned' ? 'primary' : 'success'} />
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