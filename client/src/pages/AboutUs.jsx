// client/src/pages/AboutUs.jsx
import React from 'react';
import { Container, Typography, Grid, Box, Paper, Avatar } from '@mui/material';
import { EmojiTransportation, Group, History, ThumbUp } from '@mui/icons-material';

const AboutUs = () => {
  const team = [
    { name: 'Prosper Munachimso Obiezue', role: 'Full Stack Developer', avatar: 'P' },
    { name: 'Vitor Lopes', role: 'Backend & Database', avatar: 'V' },
    { name: 'Chibuike Nwoke', role: 'Frontend & UI', avatar: 'C' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        About TruckFlow
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Revolutionising goods transport in Ireland
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>Our Mission</Typography>
            <Typography variant="body1" paragraph>
              To simplify logistics for businesses of all sizes by providing a seamless, transparent platform
              that connects clients with reliable transporters and labourers.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Our Story</Typography>
            <Typography variant="body1">
              Founded in 2026 by a team of computing science students at Griffith College Dublin,
              TruckFlow was born from the need to digitise the fragmented transport industry in Ireland.
              What started as a college project has grown into a full-featured logistics platform.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>Key Values</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ThumbUp color="primary" sx={{ mr: 2 }} />
              <Typography>Integrity & Transparency</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <History color="primary" sx={{ mr: 2 }} />
              <Typography>Punctuality & Reliability</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Group color="primary" sx={{ mr: 2 }} />
              <Typography>Customer-Centric Approach</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmojiTransportation color="primary" sx={{ mr: 2 }} />
              <Typography>Sustainable Practices</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" align="center" sx={{ mt: 8, mb: 4 }}>Meet the Team</Typography>
      <Grid container spacing={4} justifyContent="center">
        {team.map((member, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                {member.avatar}
              </Avatar>
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">{member.role}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;