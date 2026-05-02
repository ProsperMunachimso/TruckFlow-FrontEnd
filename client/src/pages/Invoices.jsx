import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, Alert } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await API.get('/api/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const payInvoice = async (id) => {
    try {
      await API.put(`/api/invoices/${id}/pay`);
      setInvoices(invoices.map(inv => inv._id === id ? { ...inv, paymentStatus: 'paid' } : inv));
    } catch (err) {
      alert('Payment failed');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>My Invoices</Typography>
        {invoices.length === 0 ? (
          <Typography>No invoices yet.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Grand Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map(inv => (
                <TableRow key={inv._id}>
                  <TableCell>{inv.booking?.pickupLocation} → {inv.booking?.deliveryLocation}</TableCell>
                  <TableCell>€{inv.totalAmount}</TableCell>
                  <TableCell>€{inv.tax}</TableCell>
                  <TableCell>€{inv.grandTotal}</TableCell>
                  <TableCell>{inv.paymentStatus}</TableCell>
                  <TableCell>
                    {inv.paymentStatus === 'pending' && (
                      <Button variant="contained" size="small" onClick={() => payInvoice(inv._id)}>Pay Now</Button>
                    )}
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

export default Invoices;