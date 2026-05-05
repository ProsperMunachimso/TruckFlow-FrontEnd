// client/src/pages/ContactUs.jsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Box, Alert } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend endpoint.
    // For demo, just show success message.
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Contact Us
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Have questions? We’d love to hear from you.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>Get in Touch</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Email color="primary" sx={{ mr: 2 }} />
              <Typography>obiezuemunachi@gmail.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Phone color="primary" sx={{ mr: 2 }} />
              <Typography>+353 (1) 234 5678</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationOn color="primary" sx={{ mr: 2 }} />
              <Typography>Griffith College Dublin, South Circular Road, Dublin 8, Ireland</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Send us a Message</Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" margin="normal" value={formData.name} onChange={handleChange} required />
              <TextField fullWidth label="Email" name="email" type="email" margin="normal" value={formData.email} onChange={handleChange} required />
              <TextField fullWidth label="Message" name="message" multiline rows={4} margin="normal" value={formData.message} onChange={handleChange} required />
              <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>Send Message</Button>
              {submitted && <Alert severity="success" sx={{ mt: 2 }}>Message sent! (demo)</Alert>}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;