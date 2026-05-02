import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  FormControlLabel, Checkbox, Grid, Alert
} from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

const CreateBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '', deliveryLocation: '', cargoType: '', weightKg: '',
    dimensions: { length: '', width: '', height: '' },
    pickupDate: '', needLoadingAssistance: false, needUnloadingAssistance: false,
    specialInstructions: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup is required';
    if (!formData.deliveryLocation) newErrors.deliveryLocation = 'Delivery is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (formData.weightKg && (formData.weightKg <= 0 || formData.weightKg > 50000))
      newErrors.weightKg = 'Weight must be 1-50000 kg';
    if (formData.dimensions.length && (formData.dimensions.length <= 0 || formData.dimensions.length > 1000))
      newErrors.dimensions = 'Dimensions must be positive <=1000 cm';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      const payload = {
        ...formData,
        weightKg: formData.weightKg ? Number(formData.weightKg) : undefined,
        dimensions: {
          length: formData.dimensions.length ? Number(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? Number(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? Number(formData.dimensions.height) : undefined
        }
      };
      await API.post('/api/bookings', payload);
      navigate('/bookings');
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Create a New Booking</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Pickup Location *" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} error={!!errors.pickupLocation} helperText={errors.pickupLocation} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Delivery Location *" name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} error={!!errors.deliveryLocation} helperText={errors.deliveryLocation} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Cargo Type" name="cargoType" value={formData.cargoType} onChange={handleChange} placeholder="e.g., Palletized" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Weight (kg)" name="weightKg" type="number" value={formData.weightKg} onChange={handleChange} error={!!errors.weightKg} helperText={errors.weightKg} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Dimensions (cm)</Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}><TextField fullWidth label="Length" name="dimensions.length" value={formData.dimensions.length} onChange={handleChange} /></Grid>
                <Grid item xs={4}><TextField fullWidth label="Width" name="dimensions.width" value={formData.dimensions.width} onChange={handleChange} /></Grid>
                <Grid item xs={4}><TextField fullWidth label="Height" name="dimensions.height" value={formData.dimensions.height} onChange={handleChange} /></Grid>
              </Grid>
              {errors.dimensions && <Typography color="error">{errors.dimensions}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Pickup Date & Time *" name="pickupDate" type="datetime-local" InputLabelProps={{ shrink: true }} value={formData.pickupDate} onChange={handleChange} error={!!errors.pickupDate} helperText={errors.pickupDate} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox name="needLoadingAssistance" checked={formData.needLoadingAssistance} onChange={handleChange} />} label="Need loading assistance?" />
              <FormControlLabel control={<Checkbox name="needUnloadingAssistance" checked={formData.needUnloadingAssistance} onChange={handleChange} />} label="Need unloading assistance?" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Special Instructions" name="specialInstructions" multiline rows={3} value={formData.specialInstructions} onChange={handleChange} />
            </Grid>
          </Grid>
          {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>Submit Booking</Button>
          <BackButton />
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBooking;