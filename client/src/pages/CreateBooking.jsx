import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  FormControlLabel, Checkbox, Grid, Alert
} from '@mui/material';
import API from '../services/api';
import BackButton from '../components/BackButton';

// CreateBooking page which allows clients to submit a new transport booking, it collects pickup/delivery locations, cargo details, schedule, and special requests
// Sends data to backend and redirects to bookings list on success
const CreateBooking = () => {
  const navigate = useNavigate(); // To redirect after successful creation

  // Statesto hold all form fields
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    cargoType: '',
    weightKg: '',
    dimensions: { length: '', width: '', height: '' },
    pickupDate: '',
    needLoadingAssistance: false,
    needUnloadingAssistance: false,
    specialInstructions: ''
  });
  const [errors, setErrors] = useState({});      
  const [submitError, setSubmitError] = useState(''); 

  // This validates form before submission and returns an object of error messages if there is any
  const validate = () => {
    const newErrors = {};
    // Required fields
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup is required';
    if (!formData.deliveryLocation) newErrors.deliveryLocation = 'Delivery is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    
    // Weight validation: must be between 1 and 50,000 kg
    if (formData.weightKg && (formData.weightKg <= 0 || formData.weightKg > 50000))
      newErrors.weightKg = 'Weight must be 1-50000 kg';
    
    // We ensured that all dimensions entered must be positive and <= 1000 cm, we were being realistic
    if (formData.dimensions.length && (formData.dimensions.length <= 0 || formData.dimensions.length > 1000))
      newErrors.dimensions = 'Dimensions must be positive <=1000 cm';
    
    return newErrors;
  };

  // Handle changes to text inputs, checkboxes, and nested dimension fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // For checkboxes, use checked property instead of value
      setFormData({ ...formData, [name]: checked });
    } 
    else if (name.includes('.')) {
      // This handles nested fields like dimensions.length
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } 
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit the form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Run validation, if errors exist, show them and stop submission
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setSubmitError(''); 
    
    try {
      // Convert numeric strings to actual numbers or undefined if empty
      const payload = {
        ...formData,
        weightKg: formData.weightKg ? Number(formData.weightKg) : undefined,
        dimensions: {
          length: formData.dimensions.length ? Number(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? Number(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? Number(formData.dimensions.height) : undefined
        }
      };
      
      // POST request to create the booking
      await API.post('/api/bookings', payload);
      
      // On success, go to the bookings list page
      navigate('/bookings');
    } catch (err) {
      // Display error from backend or a generic message
      setSubmitError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    // Container maxWidth="md" (medium = 900px), wider than contact form for more fields
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Create a New Booking</Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>  {/* 12‑column responsive grid, 16px gap */}
            
            {/* Pickup & Delivery Locations, we made it to be side by side on tablet/desktop */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pickup Location *"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                error={!!errors.pickupLocation}      // Show red outline if error exists
                helperText={errors.pickupLocation}   // Display error message below field
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Delivery Location *"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                error={!!errors.deliveryLocation}
                helperText={errors.deliveryLocation}
              />
            </Grid>

            {/* Cargo Type is optional and Weight is optional but we validated it incase the user fills information*/}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cargo Type"
                name="cargoType"
                value={formData.cargoType}
                onChange={handleChange}
                placeholder="e.g., Palletized"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weightKg"
                type="number"          
                value={formData.weightKg}
                onChange={handleChange}
                error={!!errors.weightKg}
                helperText={errors.weightKg}
              />
            </Grid>

            {/* Dimensions for the cargo*/}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Dimensions (cm)</Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Length"
                    name="dimensions.length"  
                    value={formData.dimensions.length}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Width"
                    name="dimensions.width"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Height"
                    name="dimensions.height"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {/* Show dimensions validation error if any */}
              {errors.dimensions && <Typography color="error">{errors.dimensions}</Typography>}
            </Grid>

            {/* Pickup Date & Time, we used the datetime-local input for this, cause it is much easier and the user can understand better. */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pickup Date & Time *"
                name="pickupDate"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}  // Keeps label above the field even when empty
                value={formData.pickupDate}
                onChange={handleChange}
                error={!!errors.pickupDate}
                helperText={errors.pickupDate}
              />
            </Grid>

            {/* We used the block of code below to present the user withLoading / Unloading assistance checkboxes incase they need a labourer */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="needLoadingAssistance"
                    checked={formData.needLoadingAssistance}
                    onChange={handleChange}
                  />
                }
                label="Need loading assistance?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="needUnloadingAssistance"
                    checked={formData.needUnloadingAssistance}
                    onChange={handleChange}
                  />
                }
                label="Need unloading assistance?"
              />
            </Grid>

            {/* Special Instructions, we used multi‑line textarea for more space*/}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Instructions"
                name="specialInstructions"
                multiline
                rows={3}
                value={formData.specialInstructions}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Display API error if any */}
          {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}

          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
            Submit Booking
          </Button>
          
          {/* Reusable BackButton component (goes back one page) */}
          <BackButton />
        </Box>
      </Paper>
    </Container>
  );
};

// We used many MUI components for this page:
// - Container to limit max width for readability and also it centres content
// - Paper to give a white card with a shadow 
// - Typography to apply headings and labels with consistent styling
// - TextField forinput fields with built‑in labels, validation, and helper text
// - Grid forresponsive 12‑column layout that stacks on mobile
// - Checkbox + FormControlLabel: styled checkboxes with labels
// - Alert to show error messages from the backend
// - Box for a generic wrapper for the form element
// - BackButton for custom component for navigation
//
// The component handles:
// - Controlled form state with nested object 
// - Client‑side validation (required fields, weight/dimension limits)
// - Numeric conversion before sending to API
// - Error display and redirect on success
// - It does NOT handle quotes – that happens after a transporter responds.

export default CreateBooking;