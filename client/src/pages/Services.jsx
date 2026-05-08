import React from 'react';
import { Container, Typography, Box, Card, CardContent, useTheme } from '@mui/material';
import {
  LocalShipping, Speed, SupportAgent, EmojiTransportation, Security, TrendingUp,
  Inventory, Route, Handshake, VerifiedUser, AccessTime, BarChart
} from '@mui/icons-material';

// Services page which showcases all the logistics services TruckFlow offers
// Uses a unique staggered layout: a big card followed by two smaller cards, repeated for 4 rows
// Icons and descriptions are stored in an array and mapped to reusable ServiceCard component
const Services = () => {
  const theme = useTheme(); // Access theme – could be used for conditional styling later

  // Array of 12 service objects, each has an icon, title, and description
  const services = [
    { icon: <LocalShipping />, title: 'Truck Booking', desc: 'Book trucks of all sizes for local or long-distance transport. Compare quotes from verified transporters.' },
    { icon: <SupportAgent />, title: '24/7 Customer Support', desc: 'Dedicated team available round the clock to assist with your logistics needs.' },
    { icon: <EmojiTransportation />, title: 'Fleet Management', desc: 'Manage your own fleet or access our network of vetted vehicles.' },
    { icon: <Speed />, title: 'Express Delivery', desc: 'Time-sensitive shipments handled with priority routing and tracking.' },
    { icon: <Security />, title: 'Cargo Insurance', desc: 'Optional insurance coverage for valuable or fragile goods.' },
    { icon: <TrendingUp />, title: 'Analytics Dashboard', desc: 'View shipment history, spending trends, and performance metrics.' },
    { icon: <Route />, title: 'Route Optimisation', desc: 'AI-powered route planning to reduce delivery times and fuel costs across your entire network.' },
    { icon: <Inventory />, title: 'Warehouse Storage', desc: 'Short and long-term storage solutions with real-time inventory tracking and easy dispatch.' },
    { icon: <Handshake />, title: 'Partner Network', desc: 'Access a curated network of trusted logistics partners for seamless last-mile delivery.' },
    { icon: <VerifiedUser />, title: 'Compliance & Documentation', desc: 'Automated generation of delivery notes, customs forms, and regulatory compliance documents.' },
    { icon: <AccessTime />, title: 'Scheduled Pickups', desc: 'Set recurring or one-time pickups at your convenience with real-time driver tracking.' },
    { icon: <BarChart />, title: 'Cost Reporting', desc: 'Detailed breakdowns of logistics spend with export options for your finance team.' },
  ];

  // Reusable component for each service card – takes a service object as a prop
  // Uses Card with elevation=1, and a flex row layout (icon on left, text on right)
  const ServiceCard = ({ service }) => (
    <Card elevation={1} sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <CardContent sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2.5,
        p: 4,
        '&:last-child': { pb: 4 }  // Overrides MUI's default last-child padding
      }}>
        <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>
          {service.icon}
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>
            {service.title}
          </Typography>
          <Typography variant="body2" lineHeight={1.7} sx={{ color: 'text.secondary' }}>
            {service.desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Create a staggered layout: each row has one full‑width card followed by two half‑width cards
  // Groups services into 4 rows of 3 services each (total 12)
  const rows = [
    { full: services[0],  pair: [services[1],  services[2]]  },
    { full: services[3],  pair: [services[4],  services[5]]  },
    { full: services[6],  pair: [services[7],  services[8]]  },
    { full: services[9],  pair: [services[10], services[11]] },
  ];

  return (
    // Container maxWidth="lg" (large = 1200px) – plenty of space for the cards
    <Container maxWidth="lg" sx={{ py: 10 }}>  {/* py:10 adds 80px vertical padding */}
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ color: 'text.primary' }}>
        Our Services
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 8, color: 'text.secondary' }}>
        Comprehensive logistics solutions tailored to your business
      </Typography>

      {/* Map over the rows array to create the staggered layout */}
      {rows.map((row, i) => (
        <Box key={i}>
          {/* Full‑width card (takes the whole width) */}
          <Box sx={{ mb: 3 }}>
            <ServiceCard service={row.full} />
          </Box>
          {/* Two half‑width cards side by side (stacked on mobile) */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 1 column on mobile, 2 on desktop
            gap: 3,
            mb: i < rows.length - 1 ? 3 : 0 // Add margin bottom except for the last row
          }}>
            <ServiceCard service={row.pair[0]} />
            <ServiceCard service={row.pair[1]} />
          </Box>
        </Box>
      ))}
    </Container>
  );
};

// MUI components used for this pagew:
// - Container: centres content with max width "lg"
// - Typography: headings (h4) and subheadings
// - Box: layout wrapper, used for grid and spacing
// - Card, CardContent: each service gets its own card
// - useTheme: accesses theme (for potential dark/light mode customisation)
// Icons used: 12 different MUI icons representing each service

export default Services;