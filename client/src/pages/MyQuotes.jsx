import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await API.get('/api/quotes');
      setQuotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>My Submitted Quotes</Typography>
        {quotes.length === 0 ? (
          <Typography>You haven't submitted any quotes yet.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking (pickup → delivery)</TableCell>
                <TableCell>Amount (€)</TableCell>
                <TableCell>Est. Hours</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.map(quote => (
                <TableRow key={quote._id}>
                  <TableCell>{quote.booking?.pickupLocation} → {quote.booking?.deliveryLocation}</TableCell>
                  <TableCell>{quote.amount}</TableCell>
                  <TableCell>{quote.estimatedDurationHours || '—'}</TableCell>
                  <TableCell>{quote.status}</TableCell>
                  <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
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

export default MyQuotes;