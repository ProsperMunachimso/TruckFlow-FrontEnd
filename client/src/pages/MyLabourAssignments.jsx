import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, CircularProgress, Chip, Box
} from '@mui/material';
import { AssignmentTurnedIn } from '@mui/icons-material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const MyLabourAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      // Assume backend returns assignments for labourer via /api/labour/my (or filter here)
      // If you have endpoint /api/labour/my, change to that; otherwise filter by labourer._id
      const res = await API.get('/api/labour');
      // Filter where logged-in labourer is the assignee (simplified)
      // For proper mapping, you'd need the user ID. We'll assume backend returns only assigned.
      const my = res.data.filter(req => req.status === 'assigned');
      setAssignments(my);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>My Labour Assignments</Typography>
        {assignments.length === 0 ? (
          <Typography>No assignments yet.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Workers</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map(req => (
                <TableRow key={req._id}>
                  <TableCell>{req.booking?.pickupLocation} → {req.booking?.deliveryLocation}</TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.numberOfLabourers}</TableCell>
                  <TableCell>{req.hours}</TableCell>
                  <TableCell>
                    <Chip label={req.status} color="primary" size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <BackButton />
      </Paper>
    </Container>
  );
};

export default MyLabourAssignments;