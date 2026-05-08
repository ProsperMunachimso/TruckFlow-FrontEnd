import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Card, CardContent, Divider, Stack, useTheme
} from '@mui/material';
import {
  LocalShipping, TrackChanges, Group, Assignment, Speed,
  SupportAgent, EmojiTransportation, CheckCircle
} from '@mui/icons-material';

// Landing page, the first thing users see when they visit our app(Truckflow).
// A marketing page that explains the service, shows features, stats, and a call to action.
// Uses MUI components for consistent branding and responsive design.
const Landing = () => {
  // useTheme gives us access to the current theme (light/dark mode)
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Array of steps for the How It Works section
  const steps = [
    { icon: <Assignment />, title: 'Register', desc: 'Create your account in minutes with no setup fees.' },
    { icon: <LocalShipping />, title: 'Book a Truck', desc: 'Select truck size, schedule pickup, and compare quotes.' },
    { icon: <TrackChanges />, title: 'Track Delivery', desc: 'Monitor your shipment in real-time from pickup to drop-off.' },
    { icon: <CheckCircle />, title: 'Receive Goods', desc: 'Get your goods delivered safely with proof of delivery.' },
  ];

  // Array of feature cards for the Why Choose Us? section
  const features = [
    { icon: <Speed />, title: 'Fast & Reliable', desc: 'Timely deliveries with real-time updates every step of the way.' },
    { icon: <SupportAgent />, title: '24/7 Support', desc: 'Our dedicated team is always ready to help, day or night.' },
    { icon: <EmojiTransportation />, title: 'Fleet Options', desc: 'From small vans to heavy-duty trucks — we have you covered.' },
    { icon: <Group />, title: 'Trusted by 500+ Businesses', desc: 'Join thousands of satisfied clients across Ireland.' },
  ];

  // Array for the Stats displayed in the stats bar we made it the same as the About Us page for consistency
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
        p: { xs: 2.5, sm: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 4 } }
      }}>
        <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>{item.icon}</Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom
            sx={{ color: 'text.primary' }}>
            {item.title}
          </Typography>
          <Typography variant="body2" lineHeight={1.7}
            sx={{ color: 'text.secondary' }}>
            {item.desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    // - We made this page publicly accessible 
    // - All buttons use React Router's Link component for client-side navigation
    // - The layout uses CSS Grid for responsive columns (no MUI Grid component)
    // - The ServiceCard component is defined inside Landing because it's only used here
    // - The stats bar has borders and dividers that adapt to dark mode
    // - The How It Works background changes colour based on dark/light mode using the isDark variable we created 

    // Main wrapper with background color from theme (light/dark)
    <Box sx={{ bgcolor: 'background.default' }}>

      {/* HERO SECTION, Blue background with title, subtitle, buttons, and a large truck emoji */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 6, md: 12 } }}>
        <Container maxWidth="lg">
          {/* Two-column layout: text left, emoji right – stacks on mobile */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 6 }, alignItems: 'center' }}>
            {/* Left column: hero text */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom
                sx={{ color: 'white', lineHeight: 1.2, fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' } }}>
                Transport Your Goods with Confidence
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'white', opacity: 0.85, lineHeight: 1.7 }}>
                Book trucks, track shipments in real-time, and request loading services — all in one platform built for Irish businesses.
              </Typography>
              {/* Call-to-action buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <Button component={Link} to="/register" variant="contained" size="large"
                  sx={{ bgcolor: 'white', color: 'primary.main', px: 4, py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: '#f0f0f0' } }}>
                  Get Started Free
                </Button>
                <Button component={Link} to="/login" variant="outlined" size="large"
                  sx={{ borderColor: 'white', color: 'white', px: 4, py: 1.5, '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  Sign In
                </Button>
              </Stack>
            </Box>
            {/* Right column: large emoji icon (truck) */}
            <Box sx={{ textAlign: 'center' }}>
              <EmojiTransportation sx={{ fontSize: { xs: 120, sm: 160, md: 220 }, opacity: 0.85, color: 'white' }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* WHY CHOOSE US SECTION – Background from theme default */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom
            sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' }, color: 'text.primary' }}>
            Why Choose TruckFlow?
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: { xs: 4, md: 8 }, color: 'text.secondary' }}>
            Comprehensive transportation solutions tailored to your business needs
          </Typography>
          {/* Staggered layout: full width, then two half-width, then full width – responsive */}
          <Box sx={{ mb: 3 }}>
            <ServiceCard item={features[0]} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
            <ServiceCard item={features[1]} />
            <ServiceCard item={features[2]} />
          </Box>
          <Box>
            <ServiceCard item={features[3]} />
          </Box>
        </Container>
      </Box>

      {/* STATS BAR – Light/dark background based on theme paper color, with top/bottom borders */}
      <Box sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        <Container maxWidth="lg">
          {/* Four columns stack on mobile into 2x2 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, py: { xs: 3, md: 5 } }}>
            {stats.map((stat, i) => (
              <Box key={i} sx={{
                textAlign: 'center',
                borderRight: { md: i < stats.length - 1 ? '1px solid' : 'none' },
                borderColor: 'divider',
                px: 2,
                py: { xs: 1, md: 0 }
              }}>
                <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', md: '3rem' }, color: 'primary.main' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* HOW IT WORKS SECTION, Background changes based on theme (dark mode = darker blue, light mode = grey.100) */}
      <Box sx={{ bgcolor: isDark ? '#111E2B' : 'grey.100', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom
            sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' }, color: 'text.primary' }}>
            How It Works
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: { xs: 4, md: 8 }, color: 'text.secondary' }}>
            Simple steps to get your goods moving
          </Typography>
          {/* Step cards: 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {steps.map((step, idx) => (
              <Card key={idx} elevation={1} sx={{ textAlign: 'center' }}>
                <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
                  {/* Circular background for step icon */}
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
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 0.5, fontSize: { xs: '1rem', md: '1.25rem' }, color: 'text.primary' }}>
                    {step.title}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" lineHeight={1.7} sx={{ color: 'text.secondary' }}>
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CALL TO ACTION SECTION, Blue background with two buttons */}
      <Box sx={{ bgcolor: 'primary.main', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' }, color: 'white', mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 5 }}>
            Join hundreds of businesses that trust TruckFlow for their logistics needs across Ireland.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={Link} to="/register" variant="contained" size="large"
              sx={{ bgcolor: 'white', color: 'primary.main', px: 5, py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: '#f0f0f0' } }}>
              Create Free Account
            </Button>
            <Button component={Link} to="/services" variant="outlined" size="large"
              sx={{ borderColor: 'white', color: 'white', px: 5, py: 1.5, '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' } }}>
              View Services
            </Button>
          </Stack>
        </Container>
      </Box>

    </Box>
  );
};

// MUI components used for this page:
// - Container: centers content with max width
// - Box: generic layout wrapper with background colours
// - Typography: headings, body text, captions
// - Button: call-to-action and navigation buttons
// - Card, CardContent: for feature and step cards
// - Divider: horizontal line inside step cards
// - Stack: horizontal layout for buttons
// - useTheme: accesses theme to change background based on dark mode
// Icons used: Assignment, LocalShipping, TrackChanges, CheckCircle 
// - Speed, SupportAgent, EmojiTransportation, Group (features)

export default Landing;