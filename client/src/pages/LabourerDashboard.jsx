import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Grid, Card, CardContent,
  Button, CircularProgress, Alert, Chip, Box
} from '@mui/material';
import { Assignment, PersonAdd, LocationOn } from '@mui/icons-material';
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
      const res = await API.get('/api/labour');
      const pending = res.data.filter(req => req.status === 'pending');
      setRequests(pending);
    } catch (err) {
      setMessage('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const assignSelf = async (requestId) => {
    try {
      await API.put(`/api/labour/${requestId}/assign`);
      setMessage('Assigned successfully!');
      fetchRequests();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Assignment failed');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Available Labour Requests</Typography>
        {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
        {requests.length === 0 ? (
          <Typography>No pending labour requests.</Typography>
        ) : (
          <Grid container spacing={2}>
            {requests.map(req => (
              <Grid item xs={12} md={6} key={req._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        {req.booking?.pickupLocation} → {req.booking?.deliveryLocation}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      <strong>Type:</strong> {req.type} &nbsp;|&nbsp;
                      <strong>Workers:</strong> {req.numberOfLabourers} &nbsp;|&nbsp;
                      <strong>Hours:</strong> {req.hours}
                    </Typography>
                    <Chip
                      label={req.status}
                      size="small"
                      color={req.status === 'pending' ? 'warning' : 'default'}
                      sx={{ mt: 1, mb: 1 }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<PersonAdd />}
                      onClick={() => assignSelf(req._id)}
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      Assign Me
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <BackButton />
      </Paper>
    </Container>
  );
};

export default LabourerDashboard;