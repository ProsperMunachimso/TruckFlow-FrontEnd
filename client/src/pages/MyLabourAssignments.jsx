import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, CircularProgress, Chip, Box
} from '@mui/material';
import { AssignmentTurnedIn } from '@mui/icons-material';
import API from '../services/api';
import BackButton from '../components/BackButton';

// MyLabourAssignments page which is for labourers to view all jobs assigned to them
// It displays booking route, type of labour, number of workers, hours, and status
// Uses the same API endpoint as LabourerDashboard but shows all assignments, not just recent
const MyLabourAssignments = () => {
  const [assignments, setAssignments] = useState([]); // Array of labour requests assigned to this labourer
  const [loading, setLoading] = useState(true);       // Show spinner while fetching

  // When component mounts, fetch the labourer's assignments
  useEffect(() => {
    fetchAssignments();
  }, []); // Empty dependency array

  // Fetch assigned labour requests from the backend
  const fetchAssignments = async () => {
    try {
      // ?filter=assigned tells the backend to return only requests where this labourer is assigned
      // This endpoint returns all assignments 
      const res = await API.get('/api/labour?filter=assigned');
      setAssignments(res.data);
    } catch (err) {
      console.error(err); // Log error silently
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  
  // - We ade this page accessible only to users with role labourer
  // - The API endpoint /api/labour?filter=assigned returns all labour requests where the current labourer is the assigned person
  // - The same endpoint is used in LabourerDashboard, but there we slice to only5 recent assignments
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>My Labour Assignments</Typography>
        
        {assignments.length === 0 ? (
          // Empty state when there is no assignments yet
          <Typography>No assignments yet.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking</TableCell>      {/* Pickup/ Delivery route the user wants */}
                <TableCell>Type</TableCell>         {/* loading, unloading, or both if the user wants */}
                <TableCell>Workers</TableCell>      {/* Number of labourers needed */}
                <TableCell>Hours</TableCell>        {/* Estimated hours */}
                <TableCell>Status</TableCell>       {/* assigned, completed, etc. */}
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map(req => (
                <TableRow key={req._id}>
                  {/* Show route using optional chaining, in case booking is null */}
                  <TableCell>
                    {req.booking?.pickupLocation} → {req.booking?.deliveryLocation}
                  </TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.numberOfLabourers}</TableCell>
                  <TableCell>{req.hours}</TableCell>
                  <TableCell>
                    {/* Chip displays status with primary colour (blue) and could change based on status */}
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

// MUI components used for thiscpage:
// - Container: centres content with max width "lg"
// - Paper: card with elevation (shadow) and padding
// - Typography: page title and empty state text
// - Table, TableHead, TableBody, TableRow, TableCell: display assignments in a grid
// - Chip: status badge (coloured pill)
// - CircularProgress: loading spinner
// - BackButton: custom component to go back one page

export default MyLabourAssignments;