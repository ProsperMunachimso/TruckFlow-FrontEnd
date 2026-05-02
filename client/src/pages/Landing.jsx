import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import { LocalShipping, TrackChanges, Group } from '@mui/icons-material';

const Landing = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
      {/* Hero section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Paper elevation={0} sx={{ textAlign: 'center', p: 4, bgcolor: 'transparent' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            TruckFlow
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4, color: 'text.secondary' }}>
            Book trucks, track shipments, hire labour – all in one place.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Feature highlights */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <LocalShipping sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Book Trucks</Typography>
              <Typography variant="body2" color="text.secondary">
                Instantly find available trucks for your cargo. Compare quotes and book with confidence.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <TrackChanges sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Track Shipments</Typography>
              <Typography variant="body2" color="text.secondary">
                Real‑time tracking of your goods from pickup to delivery. Stay informed.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Group sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Hire Labour</Typography>
              <Typography variant="body2" color="text.secondary">
                Need help with loading or unloading? Connect with trusted labourers instantly.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;