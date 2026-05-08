import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

// CreateQuote page we made allows transporters to submit a price and duration for a specific booking
// The bookingId comes from the URL, after submission we made the transporter to be redirected to their list of quotes


// - We made this page only accessible to users with role transporter and is protected by backend
// - The backend checks that the booking exists and is still pending before creating the quote
// - After submitting, the transporter is redirected to /my-quotes
// - Amount is stored as a number (float), duration as integer, notes as string
const CreateQuote = () => {
  // useParams grabs the dynamic part of the URL which is the booking ID
  const { bookingId } = useParams();
  const navigate = useNavigate(); 

  // State for the three quote fields
  const [formData, setFormData] = useState({
    amount: '',
    estimatedDurationHours: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});      
  const [submitError, setSubmitError] = useState(''); // API error message

  // Validate form before sending to backend
  const validate = () => {
    const newErrors = {};
    // Amount is required and must be positive because there is no such thing as a negative money except loss. Haha
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (formData.amount <= 0) newErrors.amount = 'Amount must be positive';
    // Duration is optional, but if provided, must be positive hours
    if (formData.estimatedDurationHours && formData.estimatedDurationHours <= 0)
      newErrors.estimatedDurationHours = 'Duration must be positive';
    return newErrors;
  };

  // Simple change handler, all fields are top‑level 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the quote to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation, if errors exist, show them and stop
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitError(''); // Clear any previous error

    try {
      // POST /api/quotes with bookingId from URL and parsed numbers
      await API.post('/api/quotes', {
        bookingId,                                      // Which booking this quote is for
        amount: parseFloat(formData.amount),           // Converts string to number 
        estimatedDurationHours: formData.estimatedDurationHours
          ? parseInt(formData.estimatedDurationHours)  // Converts to integer hours
          : undefined,
        notes: formData.notes
      });
      // On success, go to the My Quotes page
      navigate('/my-quotes');
    } catch (err) {
      // Show error from backend or a fallback message
      setSubmitError(err.response?.data?.message || 'Failed to submit quote');
    }
  };

  return (
    // Container maxWidth="sm" (small = 600px) which keeps form narrow and readable
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>  
        <Typography variant="h4" gutterBottom>Submit a Quote</Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          {/* Amount field, required, number input */}
          <TextField
            fullWidth
            label="Amount (€) *"
            name="amount"
            type="number"           // Shows up/down arrows and numeric keyboard on mobile
            margin="normal"         // Adds consistent vertical spacing
            value={formData.amount}
            onChange={handleChange}
            error={!!errors.amount} // Turns border red if error exists
            helperText={errors.amount} // Displays error message below field
          />
          
          {/* Estimated Duration, optional, but if entered must be positive */}
          <TextField
            fullWidth
            label="Estimated Duration (hours)"
            name="estimatedDurationHours"
            type="number"
            margin="normal"
            value={formData.estimatedDurationHours}
            onChange={handleChange}
            error={!!errors.estimatedDurationHours}
            helperText={errors.estimatedDurationHours}
          />
          
          {/* Notes, optional, multi‑line text area */}
          <TextField
            fullWidth
            label="Notes (optional)"
            name="notes"
            multiline    // Renders a ftextarea instead of single-line input
            rows={3}     // Height of the textarea
            margin="normal"
            value={formData.notes}
            onChange={handleChange}
          />
          
          {/* Display API error if any */}
          {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
          
          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Submit Quote
          </Button>
          
          {/* Reusable back button which we made to go one page back in history */}
          <BackButton />
        </Box>
      </Paper>
    </Container>
  );
};

// We used several MUI components for this page:
// - Container: centres content and limits max width 
// - Paper: creates a card with elevation (shadow) and padding
// - Typography: heading (h4) for the page title
// - TextField: user input with built‑in labels, validation, and helper text
// - Box: generic wrapper for the form element
// - Alert: shows error messages from the backend (e.g., "Booking already quoted")
// - BackButton: custom component for easy navigation

export default CreateQuote;