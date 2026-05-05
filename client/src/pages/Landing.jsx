// client/src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Grid, Card, CardContent,
  Paper, Divider, Stack
} from '@mui/material';
import {
  LocalShipping, TrackChanges, Group, Assignment, Speed,
  SupportAgent, EmojiTransportation, CheckCircle
} from '@mui/icons-material';

const Landing = () => {
  const steps = [
    { icon: <Assignment fontSize="large" />, title: 'Register', desc: 'Create your account in minutes' },
    { icon: <LocalShipping fontSize="large" />, title: 'Book a Truck', desc: 'Select truck size and schedule pickup' },
    { icon: <TrackChanges fontSize="large" />, title: 'Track Delivery', desc: 'Monitor your shipment in real-time' },
    { icon: <CheckCircle fontSize="large" />, title: 'Receive Goods', desc: 'Get your goods delivered safely' },
  ];

  const features = [
    { icon: <Speed />, title: 'Fast & Reliable', desc: 'Timely deliveries with real-time updates' },
    { icon: <SupportAgent />, title: '24/7 Support', desc: 'Dedicated team always ready to help' },
    { icon: <EmojiTransportation />, title: 'Fleet Options', desc: 'From vans to heavy trucks' },
    { icon: <Group />, title: 'Trusted by 500+ Businesses', desc: 'Join thousands of satisfied clients' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Transport Your Goods with Confidence
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Book trucks, track shipments in real-time, and request loading services – all in one platform.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <EmojiTransportation sx={{ fontSize: 200, opacity: 0.8 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Why Choose TruckFlow?
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          We provide comprehensive transportation solutions tailored to your business needs
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            How It Works
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Simple steps to get your goods moving
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Box sx={{ bgcolor: 'primary.light', color: 'white', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Ready to Get Started?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of businesses that trust TruckFlow for their logistics needs
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.5 }}
        >
          Create Free Account
        </Button>
      </Container>
    </Box>
  );
};

export default Landing;