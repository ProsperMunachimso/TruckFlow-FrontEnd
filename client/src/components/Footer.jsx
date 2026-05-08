import React from 'react';
import { Box, Container, Typography, Grid, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

// Footer component that appears at the bottom of every page we made it to give users quick links, company info, and contact details
const Footer = () => {
  return (
    // We went with with Box cause it is easier seeing as we are using MUI and it is a generic MUI component; here we use it as a <footer> element
    // bgcolor: dark grey background (grey.900), text white
    // py: 6 adds vertical padding (top and bottom)
    // mt: 'auto' pushes footer to the bottom of flex/grid layouts
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 'auto' }}>
      {/* Container limits the max width on large screens */}
      <Container maxWidth="lg">
        {/* Grid creates a responsive 12‑column layout; spacing adds gap between items */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              TruckFlow
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', opacity: 0.7 }}>
              Reliable transportation solutions for your business
            </Typography>
          </Grid>

          {/* Second column: quick links (navigation for users) */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {/* We used Stack becuase it arranges links vertically with spacing*/}
            <Stack>
              <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</Link>
              <Link to="/services" style={{ color: '#ccc', textDecoration: 'none' }}>Services</Link>
              <Link to="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</Link>
              <Link to="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</Link>
              <Link to="/terms" style={{ color: '#ccc', textDecoration: 'none' }}>Terms and Conditions</Link>
            </Stack>
          </Grid>

          {/* Third column: contact info – email and phone */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', opacity: 0.7 }}>
              Email: obiezueprosper@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', opacity: 0.7 }}>
              Phone: +353 894222654
            </Typography>
          </Grid>
        </Grid>

        {/* This is used as a horizontal line separator */}
        <Divider sx={{ bgcolor: 'grey.700', my: 3 }} />

        {/* Copyright line: dynamically inserts the current year so it never gets outdated. It is easier and faster that way */}
        <Typography variant="body2" align="center" sx={{ color: '#ccc', opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} TruckFlow. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;