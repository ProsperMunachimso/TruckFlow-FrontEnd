// client/src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Card, CardContent, Divider, Stack
} from '@mui/material';
import {
  LocalShipping, TrackChanges, Group, Assignment, Speed,
  SupportAgent, EmojiTransportation, CheckCircle
} from '@mui/icons-material';

const Landing = () => {
  const steps = [
    { icon: <Assignment />, title: 'Register', desc: 'Create your account in minutes with no setup fees.' },
    { icon: <LocalShipping />, title: 'Book a Truck', desc: 'Select truck size, schedule pickup, and compare quotes.' },
    { icon: <TrackChanges />, title: 'Track Delivery', desc: 'Monitor your shipment in real-time from pickup to drop-off.' },
    { icon: <CheckCircle />, title: 'Receive Goods', desc: 'Get your goods delivered safely with proof of delivery.' },
  ];

  const features = [
    { icon: <Speed />, title: 'Fast & Reliable', desc: 'Timely deliveries with real-time updates every step of the way.' },
    { icon: <SupportAgent />, title: '24/7 Support', desc: 'Our dedicated team is always ready to help, day or night.' },
    { icon: <EmojiTransportation />, title: 'Fleet Options', desc: 'From small vans to heavy-duty trucks — we have you covered.' },
    { icon: <Group />, title: 'Trusted by 500+ Businesses', desc: 'Join thousands of satisfied clients across Ireland.' },
  ];

  const stats = [
    { value: '500+', label: 'Verified Transporters' },
    { value: '12,000+', label: 'Deliveries Completed' },
    { value: '98%', label: 'On-Time Rate' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const ServiceCard = ({ item }) => (
    <Card elevation={1} sx={{ height: '100%' }}>
      <CardContent sx={{
        display: 'flex', alignItems: 'flex-start', gap: 2.5,
        p: 4, '&:last-child': { pb: 4 }
      }}>
        <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>{item.icon}</Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{item.desc}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'background.default' }}>

      {/* Hero */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ color: 'white', lineHeight: 1.2 }}
              >
                Transport Your Goods with Confidence
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.85, lineHeight: 1.7 }}>
                Book trucks, track shipments in real-time, and request loading services — all in one platform built for Irish businesses.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white', color: 'primary.main', px: 4, py: 1.5, fontWeight: 'bold',
                    '&:hover': { bgcolor: '#f0f0f0' }
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white', color: 'white', px: 4, py: 1.5,
                    '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <EmojiTransportation sx={{ fontSize: 220, opacity: 0.85 }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Why Choose TruckFlow?
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Comprehensive transportation solutions tailored to your business needs
        </Typography>

        {/* Row 1: full width */}
        <Box sx={{ mb: 3 }}>
          <ServiceCard item={features[0]} />
        </Box>

        {/* Row 2: two halves */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
          <ServiceCard item={features[1]} />
          <ServiceCard item={features[2]} />
        </Box>

        {/* Row 3: full width */}
        <Box>
          <ServiceCard item={features[3]} />
        </Box>
      </Container>

      {/* Stats Bar */}
      <Box sx={{ bgcolor: 'white', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', py: 5 }}>
            {stats.map((stat, i) => (
              <Box key={i} sx={{
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider'
              }}>
                <Typography variant="h3" fontWeight="bold" color="primary.main">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ bgcolor: 'grey.100', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 8 }}>
            Simple steps to get your goods moving
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            {steps.map((step, idx) => (
              <Card key={idx} elevation={1} sx={{ textAlign: 'center' }}>
                <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
                  <Box sx={{
                    bgcolor: 'primary.main', color: 'white',
                    width: 52, height: 52, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 2
                  }}>
                    {step.icon}
                  </Box>
                  <Typography variant="caption" color="primary.main" fontWeight="bold" sx={{ letterSpacing: 1 }}>
                    STEP {idx + 1}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 0.5 }}>
                    {step.title}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ bgcolor: 'primary.main', py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 5 }}>
            Join hundreds of businesses that trust TruckFlow for their logistics needs across Ireland.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white', color: 'primary.main', px: 5, py: 1.5, fontWeight: 'bold',
                '&:hover': { bgcolor: '#f0f0f0' }
              }}
            >
              Create Free Account
            </Button>
            <Button
              component={Link}
              to="/services"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white', color: 'white', px: 5, py: 1.5,
                '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              View Services
            </Button>
          </Stack>
        </Container>
      </Box>

    </Box>
  );
};

export default Landing;