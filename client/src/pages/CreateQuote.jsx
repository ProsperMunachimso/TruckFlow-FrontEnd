import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const CreateQuote = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ amount: '', estimatedDurationHours: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (formData.amount <= 0) newErrors.amount = 'Amount must be positive';
    if (formData.estimatedDurationHours && formData.estimatedDurationHours <= 0)
      newErrors.estimatedDurationHours = 'Duration must be positive';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitError('');
    try {
      await API.post('/api/quotes', {
        bookingId,
        amount: parseFloat(formData.amount),
        estimatedDurationHours: formData.estimatedDurationHours ? parseInt(formData.estimatedDurationHours) : undefined,
        notes: formData.notes
      });
      navigate('/my-quotes');
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit quote');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Submit a Quote</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Amount (€) *" name="amount" type="number" margin="normal" value={formData.amount} onChange={handleChange} error={!!errors.amount} helperText={errors.amount} />
          <TextField fullWidth label="Estimated Duration (hours)" name="estimatedDurationHours" type="number" margin="normal" value={formData.estimatedDurationHours} onChange={handleChange} error={!!errors.estimatedDurationHours} helperText={errors.estimatedDurationHours} />
          <TextField fullWidth label="Notes (optional)" name="notes" multiline rows={3} margin="normal" value={formData.notes} onChange={handleChange} />
          {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>Submit Quote</Button>
          <BackButton />
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateQuote;