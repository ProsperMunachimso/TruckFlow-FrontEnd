// client/src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">TruckFlow</Typography>
            <Typography variant="body2" sx={{ color: '#ccc', opacity: 0.7 }}>
              Reliable transportation solutions for your business
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Stack>
              <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</Link>
              <Link to="/services" style={{ color: '#ccc', textDecoration: 'none' }}>Services</Link>
              <Link to="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</Link>
              <Link to="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</Link>
              <Link to="/terms" style={{ color: '#ccc', textDecoration: 'none' }}>Terms and Conditions</Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Contact</Typography>
            <Typography variant="body2" sx={{ color: '#ccc', opacity: 0.7 }}>Email: obiezueprosper@gmail.com</Typography>
            <Typography variant="body2" sx={{ color: '#ccc', opacity: 0.7 }}>Phone: +353 894222654</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ bgcolor: 'grey.700', my: 3 }} />
        <Typography variant="body2" align="center" sx={{ color: '#ccc', opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} TruckFlow. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;