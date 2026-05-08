import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

// MyQuotes page which allows transporters to see all the quotes they have submitted
// Displays which booking each quote is for, the amount, estimated hours, status, and creation date
// Quotes are fetched from the backend and filtered automatically by the server to only the logged‑in transporter's quotes
const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]); // Array of quote objects from the backend
  const [loading, setLoading] = useState(true); // Show spinner while fetching

  // When the component mounts, fetch the transporter's quotes
  useEffect(() => {
    fetchQuotes();
  }, []); // Empty dependency array 

  // Fetch all quotes for the logged‑in transporter from the API
  const fetchQuotes = async () => {
    try {
      const res = await API.get('/api/quotes');
      // The backend already filters quotes by transporter ID (based on the logged‑in user)
      setQuotes(res.data);
    } catch (err) {
      console.error(err); // Log error silently – could add error state later
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  // Show a loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  // - Wee made this page accessible only to users with role transporter
  // - The API endpoint /api/quotes automatically returns only quotes created by the logged‑in transporter
  // - We use optional chaining quote.booking?.pickupLocation in case the booking was deleted and it prevents crashes
  // - The status field can be pending, accepted or rejected
  // - We fornatted created date with toLocaleDateString() to show a user‑friendly date without time
  return (
    // Container maxWidth="lg" (large = 1200px) – plenty of space for the table
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>   {/* White card with padding */}
        <Typography variant="h4" gutterBottom>My Submitted Quotes</Typography>
        
        {quotes.length === 0 ? (
          // Empty state – no quotes submitted yet
          <Typography>You haven't submitted any quotes yet.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking (pickup → delivery)</TableCell>   
                <TableCell>Amount (€)</TableCell>                   {/* Quote price */}
                <TableCell>Est. Hours</TableCell>                   {/* Estimated duration */}
                <TableCell>Status</TableCell>                       {/* pending, accepted, etc. */}
                <TableCell>Created</TableCell>                      {/* Date quote was submitted */}
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.map(quote => (
                <TableRow key={quote._id}>
                  {/* Show pickup and delivery locations from the associated booking */}
                  <TableCell>
                    {quote.booking?.pickupLocation} → {quote.booking?.deliveryLocation}
                  </TableCell>
                  <TableCell>{quote.amount}</TableCell>
                  <TableCell>{quote.estimatedDurationHours || '—'}</TableCell>  {/* Leave empty(-) if no time is inputed */}
                  <TableCell>{quote.status}</TableCell>
                  {/* Format the creation date to a readable string*/}
                  <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <BackButton />   {/* Reusable button to go back to previous page */}
      </Paper>
    </Container>
  );
};

// MUI components used for this page:
// - Container: centres content with max width "lg"
// - Paper: card with shadow and padding
// - Typography: heading (h4) and empty state text
// - Table, TableHead, TableBody, TableRow, TableCell: display quotes in a structured grid
// - CircularProgress: loading spinner while fetching data
// - BackButton: custom component for easy navigation
export default MyQuotes;