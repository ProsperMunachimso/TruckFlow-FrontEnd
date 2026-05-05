// client/src/pages/Services.jsx
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Paper } from '@mui/material';
import { LocalShipping, Speed, SupportAgent, EmojiTransportation, Security, TrendingUp } from '@mui/icons-material';

const Services = () => {
  const servicesList = [
    { icon: <LocalShipping fontSize="large" />, title: 'Truck Booking', desc: 'Book trucks of all sizes for local or long-distance transport. Compare quotes from verified transporters.' },
    { icon: <Speed fontSize="large" />, title: 'Express Delivery', desc: 'Time-sensitive shipments handled with priority routing and tracking.' },
    { icon: <SupportAgent fontSize="large" />, title: '24/7 Customer Support', desc: 'Dedicated team available round the clock to assist with your logistics needs.' },
    { icon: <EmojiTransportation fontSize="large" />, title: 'Fleet Management', desc: 'Manage your own fleet or access our network of vetted vehicles.' },
    { icon: <Security fontSize="large" />, title: 'Cargo Insurance', desc: 'Optional insurance coverage for valuable or fragile goods.' },
    { icon: <TrendingUp fontSize="large" />, title: 'Analytics Dashboard', desc: 'View shipment history, spending trends, and performance metrics.' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Our Services
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Comprehensive logistics solutions tailored to your business
      </Typography>
      <Grid container spacing={4}>
        {servicesList.map((service, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>{service.icon}</Box>
              <Typography variant="h5" gutterBottom>{service.title}</Typography>
              <Typography variant="body2" color="text.secondary">{service.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;