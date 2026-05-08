import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Alert, Divider, Stack } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

// ContactUs page – allows users to see company contact info and send a message
// Uses MUI components for consistent styling and responsive layout
const ContactUs = () => {
  // State to store form input values (name, email, message)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // State to show success alert after form submission
  const [submitted, setSubmitted] = useState(false);

  // Update formData when user types in any field
  // Uses the input's 'name' attribute to dynamically update the correct field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission: prevent page reload, show success message, then clear form
  const handleSubmit = (e) => {
    e.preventDefault();               
    setSubmitted(true);               // Show the green success alert
    setTimeout(() => setSubmitted(false), 5000); 
    setFormData({ name: '', email: '', message: '' }); // Clear the form fields
  };

  return (
    // Container centers content and limits max width to "sm" (small = 600px)
    // py: 8 adds vertical padding (64px) to give breathing room
    <Container maxWidth="sm" sx={{ py: 8 }}>

      {/* CONTACT DETAILS CARD – shows email, phone, and address */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Contact Us
        </Typography>
        {/* We used Stack because it arranges children vertically with consistent spacing */}
        <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
          {/* Email row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Email color="primary" />           {/* Envelope icon */}
            <Typography variant="subtitle1">obiezueprosper@gmail.com</Typography>
          </Box>
          {/* Phone row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Phone color="primary" />            {/* Phone handset icon */}
            <Typography variant="subtitle1">+353 894222654</Typography>
          </Box>
          {/* Address row – uses LocationOn icon (map pin) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOn color="primary" />
            <Typography variant="subtitle1">
              Griffith College Dublin, South Circular Road, Dublin 8, Ireland
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* CONTACT FORM CARD – allows users to send a message */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Send us a Message
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* TextField – MUI's styled input component */}
          <TextField
            fullWidth          // Takes full width of the container
            label="Name"
            name="name"        // Matches the key in formData
            margin="normal"    // Adds consistent vertical spacing
            value={formData.name}
            onChange={handleChange}
            required          
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"       // Enables email validation on mobile/keyboard
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline          
            rows={4}           
            margin="normal"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
          {/* Show success alert only after submission – demo only, no actual API call */}
          {submitted && <Alert severity="success" sx={{ mt: 2 }}>Message sent! (demo)</Alert>}
        </form>
      </Paper>
    </Container>
  );
};

// We used several MUI components here:
// - Container: centers content with a small max width for readability
// - Paper: creates a card-like surface with elevation (shadow)
// - Typography: consistent text styling with variants (h4, subtitle1)
// - TextField: user input fields with built-in labels and validation
// - Button: MUI-styled button, contained variant = solid background
// - Alert: shows success message with proper accessibility colour
// - Box + Stack: simple layout components to arrange icons and text
// - Icons for Email, Phone, LocationOn: visual cues to make contact info scannable

export default ContactUs;