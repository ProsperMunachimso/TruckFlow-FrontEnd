import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} TruckFlow – All-in-one logistics platform.
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          <Link href="/privacy" color="inherit">Privacy Policy</Link> | 
          <Link href="/terms" color="inherit" sx={{ ml: 1 }}>Terms of Service</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;