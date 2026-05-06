// client/src/pages/ContactUs.jsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Alert, Divider, Stack } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>

        {/* Contact Details Card */}
        <Paper elevation={3} sx={{ p: 4, mb:3 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">Contact Us</Typography>
            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Email color="primary" />
                <Typography variant='subtitle1'>obiezueprosper@gmail.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Phone color="primary" />
                <Typography variant='subtitle1'>+353 894222654</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOn color="primary" />
                <Typography variant='subtitle1'>Griffith College Dublin, South Circular Road, Dublin 8, Ireland</Typography>
            </Box>
            </Stack>
        </Paper>

      {/* Form Card */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Send us a Message
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" margin="normal" value={formData.name} onChange={handleChange} required />
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth label="Message" name="message" multiline rows={4} margin="normal" value={formData.message} onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Send Message
          </Button>
          {submitted && <Alert severity="success" sx={{ mt: 2 }}>Message sent! (demo)</Alert>}
        </form>
      </Paper>

    </Container>
  );
};

export default ContactUs;