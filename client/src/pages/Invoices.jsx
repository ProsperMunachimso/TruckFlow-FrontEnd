import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, Alert } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

// Invoices page which shows all invoices for the logged‑in client
// Allows clients to pay pending invoices we made this a simulated api call but in future we will use google pay.
// Uses MUI Table to display invoice details in a clean grid
const Invoices = () => {
  const [invoices, setInvoices] = useState([]); // Array of invoice objects from backend
  const [loading, setLoading] = useState(true); // Show spinner while fetching

  // When component mounts, fetch invoices from the API
  useEffect(() => {
    fetchInvoices();
  }, []); // Empty dependency array 

  // Fetches all invoices for the current user
  const fetchInvoices = async () => {
    try {
      const res = await API.get('/api/invoices');
      setInvoices(res.data); // Store the invoices in state
    } catch (err) {
      console.error(err); // Log error but don't show to user 
    } finally {
      setLoading(false); 
    }
  };

  // Simulate paying an invoice by sending PUT request to mark as paid
  const payInvoice = async (id) => {
    try {
      await API.put(`/api/invoices/${id}/pay`);
      // Optimistically update the UI: change paymentStatus to 'paid' locally
      // This avoids re‑fetching all invoices from the server
      setInvoices(invoices.map(inv => 
        inv._id === id ? { ...inv, paymentStatus: 'paid' } : inv
      ));
    } catch (err) {
      alert('Payment failed'); // Simple error notification 
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    // Container maxWidth="lg" (large = 1200px), gives plenty of space for the table
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>   {/* White card with padding */}
        <Typography variant="h4" gutterBottom>My Invoices</Typography>
        
        {invoices.length === 0 ? (
          // Empty state – no invoices yet
          <Typography>No invoices yet.</Typography>
        ) : (
          // MUI Table for displaying invoice data
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking</TableCell>      {/* Route description */}
                <TableCell>Total</TableCell>        {/* Base amount (excluding tax) */}
                <TableCell>Tax</TableCell>          {/* Tax amount (e.g., 13.5% VAT) */}
                <TableCell>Grand Total</TableCell>  {/* Total + Tax */}
                <TableCell>Status</TableCell>       {/* paid / pending */}
                <TableCell>Action</TableCell>       {/* Pay Now button if pending */}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map(inv => (
                <TableRow key={inv._id}>
                  {/* Show pickup to delivery using the booking's locations */}
                  <TableCell>
                    {inv.booking?.pickupLocation} → {inv.booking?.deliveryLocation}
                  </TableCell>
                  <TableCell>€{inv.totalAmount}</TableCell>
                  <TableCell>€{inv.tax}</TableCell>
                  <TableCell>€{inv.grandTotal}</TableCell>
                  <TableCell>{inv.paymentStatus}</TableCell>
                  <TableCell>
                    {/* Only show Pay Now button if invoice is still pending to allow the user to pay */}
                    {inv.paymentStatus === 'pending' && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        onClick={() => payInvoice(inv._id)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <BackButton />
    </Container>
  );
};

// MUI components we used for this page:
// - Container: centres content with max width "lg"
// - Paper: card with shadow and padding
// - Typography: heading (h4) and text
// - Table, TableHead, TableBody, TableRow, TableCell: for structured data display
// - Button: Pay Now action
// - CircularProgress: loading spinner
// - Alert: not used here but imported (could replace alert('Payment failed'))

export default Invoices;