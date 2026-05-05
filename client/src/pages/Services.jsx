// client/src/pages/Services.jsx
import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import {
  LocalShipping, Speed, SupportAgent, EmojiTransportation, Security, TrendingUp,
  Inventory, Route, Handshake, VerifiedUser, AccessTime, BarChart
} from '@mui/icons-material';

const Services = () => {
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

  const ServiceCard = ({ service }) => (
    <Card elevation={1} sx={{ height: '100%' }}>
      <CardContent sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2.5,
        p: 4,
        '&:last-child': { pb: 4 }
      }}>
        <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>
          {service.icon}
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {service.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
            {service.desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Layout pattern: full, half+half, full, half+half — repeating
  // Chunk services into groups of 3 (1 full + 2 half)
  const rows = [
    { full: services[0],  pair: [services[1],  services[2]]  },
    { full: services[3],  pair: [services[4],  services[5]]  },
    { full: services[6],  pair: [services[7],  services[8]]  },
    { full: services[9],  pair: [services[10], services[11]] },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Our Services
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 8 }}>
        Comprehensive logistics solutions tailored to your business
      </Typography>

      {rows.map((row, i) => (
        <Box key={i}>
          {/* Full width card */}
          <Box sx={{ mb: 3 }}>
            <ServiceCard service={row.full} />
          </Box>

          {/* Two half-width cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
            mb: i < rows.length - 1 ? 3 : 0
          }}>
            <ServiceCard service={row.pair[0]} />
            <ServiceCard service={row.pair[1]} />
          </Box>
        </Box>
      ))}

    </Container>
  );
};

export default Services;