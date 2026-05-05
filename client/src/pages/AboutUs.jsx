// client/src/pages/AboutUs.jsx
import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Divider } from '@mui/material';
import {
  EmojiTransportation, Group, History, ThumbUp, LocalShipping,
  TrendingUp, HandshakeOutlined, EnergySavingsLeaf
} from '@mui/icons-material';

const AboutUs = () => {
  const team = [
    {
      name: 'Prosper Munachimso Obiezue',
      role: 'Full Stack Developer',
      avatar: 'P',
      bio: 'Leads end-to-end architecture and integration, ensuring a seamless experience across the entire platform.'
    },
    {
      name: 'Vitor Lopes',
      role: 'Backend & Database',
      avatar: 'V',
      bio: 'Designs and maintains the data infrastructure powering real-time bookings, analytics, and logistics flows.'
    },
    {
      name: 'Chibuike Nwoke',
      role: 'Frontend & UI',
      avatar: 'C',
      bio: 'Crafts intuitive, accessible interfaces that make complex logistics simple for every user.'
    }
  ];

  const values = [
    { icon: <ThumbUp />, title: 'Integrity & Transparency', desc: 'We believe in honest pricing, clear communication, and no hidden fees — ever.' },
    { icon: <History />, title: 'Punctuality & Reliability', desc: 'On-time delivery is not a bonus for us. It is the baseline we hold ourselves to.' },
    { icon: <Group />, title: 'Customer-Centric', desc: 'Every feature we build starts with a real customer problem we set out to solve.' },
    { icon: <EnergySavingsLeaf />, title: 'Sustainable Practices', desc: 'We actively work to reduce our carbon footprint through smarter routing and greener fleets.' }
  ];

  const stats = [
    { value: '500+', label: 'Verified Transporters' },
    { value: '12,000+', label: 'Deliveries Completed' },
    { value: '98%', label: 'On-Time Rate' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>

      {/* Hero */}
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 2, display: 'flex' }}>
            <LocalShipping sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </Box>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About TruckFlow
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
          Revolutionising goods transport in Ireland — one delivery at a time.
        </Typography>
      </Box>

      {/* Mission & Story */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        <Card elevation={1} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <TrendingUp color="primary" />
              <Typography variant="h5" fontWeight="bold">Our Mission</Typography>
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              To simplify logistics for businesses of all sizes by providing a seamless, transparent platform
              that connects clients with reliable transporters and labourers across Ireland.
              We remove the friction from freight so you can focus on what matters most — growing your business.
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={1} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <EmojiTransportation color="primary" />
              <Typography variant="h5" fontWeight="bold">Our Story</Typography>
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              Founded in 2026 by computing science students at Griffith College Dublin,
              TruckFlow was born from a simple frustration: booking reliable transport in Ireland was
              slow, opaque, and outdated. What started as a college project quickly grew into a
              full-featured logistics platform trusted by hundreds of businesses nationwide.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Stats — full width */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {stats.map((stat, i) => (
              <Box key={i} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold" color="primary.main">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Values — two halves */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        {values.map((value, i) => (
          <Card key={i} elevation={1}>
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, p: 4, '&:last-child': { pb: 4 } }}>
              <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>
                {value.icon}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {value.desc}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Team heading — full width */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center', '&:last-child': { pb: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            <HandshakeOutlined color="primary" />
            <Typography variant="h4" fontWeight="bold">Meet the Team</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Three developers. One shared goal — making logistics effortless for everyone.
          </Typography>
        </CardContent>
      </Card>

      {/* Team cards — three columns */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {team.map((member, i) => (
          <Card key={i} elevation={1}>
            <CardContent sx={{ p: 4, textAlign: 'center', '&:last-child': { pb: 4 } }}>
              <Avatar sx={{
                width: 72, height: 72,
                bgcolor: 'primary.main',
                mx: 'auto', mb: 2,
                fontSize: 28, fontWeight: 'bold'
              }}>
                {member.avatar}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="body2" color="primary.main" fontWeight="bold" sx={{ mb: 1.5 }}>
                {member.role}
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                {member.bio}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

    </Container>
  );
};

export default AboutUs;