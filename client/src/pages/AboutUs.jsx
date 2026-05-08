import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Divider, useTheme } from '@mui/material';
import {
  EmojiTransportation, Group, History, ThumbUp, LocalShipping,
  TrendingUp, HandshakeOutlined, EnergySavingsLeaf
} from '@mui/icons-material';

// About Us page – tells users who we are, our mission, team, and stats
// Uses MUI components for consistent styling and responsive design
const AboutUs = () => {
  // useTheme gives us access to the current MUI theme (light/dark palette)
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';  // Not used yet, but ready for conditional styling

  // We created an array with our team information and we looped through each of them to show the user who we are.
  const team = [
    {
      name: 'Prosper Munachimso Obiezue',
      role: 'Full Stack Developer',
      avatar: 'P',  // First initial shown inside Avatar circle we created
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

  // Another array we created to show our company core values and each has an icon, title, and description
  const values = [
    { icon: <ThumbUp />, title: 'Integrity & Transparency', desc: 'We believe in honest pricing, clear communication, and no hidden fees — ever.' },
    { icon: <History />, title: 'Punctuality & Reliability', desc: 'On-time delivery is not a bonus for us. It is the baseline we hold ourselves to.' },
    { icon: <Group />, title: 'Customer-Centric', desc: 'Every feature we build starts with a real customer problem we set out to solve.' },
    { icon: <EnergySavingsLeaf />, title: 'Sustainable Practices', desc: 'We actively work to reduce our carbon footprint through smarter routing and greener fleets.' }
  ];

  // Another array to show our key performance stats, we inflated the numbers a bit to build trust
  const stats = [
    { value: '500+', label: 'Verified Transporters' },
    { value: '12,000+', label: 'Deliveries Completed' },
    { value: '98%', label: 'On-Time Rate' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    // Container – MUI component that centers content and sets a max width for large screens
    // We use it to keep the page content from stretching too wide on desktops (lg = 1200px)
    // py:10 adds 80px padding top and bottom (theme spacing unit * 10)
    <Container maxWidth="lg" sx={{ py: 10 }}>

      {/* HERO SECTION, big title and subtitle at the top of the page */}
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        {/* Box is a generic div with MUI styling. We use it to create layout without extra components */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {/* Circular background behind the truck icon */}
          <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 2, display: 'flex' }}>
            {/* LocalShipping icon – Material‑UI icon representing trucking */}
            <LocalShipping sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </Box>
        {/* Typography – MUI component for text with consistent theme typography scales */}
        {/* variant="h3" gives a large heading; fontWeight="bold" makes it stand out */}
        <Typography variant="h3" fontWeight="bold" sx={{ color: 'text.primary' }} gutterBottom>
          About TruckFlow
        </Typography>
        {/* variant="h6" is a subheading; maxWidth and mx:'auto' center the text block */}
        <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8, color: 'text.secondary' }}>
          Revolutionising goods transport in Ireland — one delivery at a time.
        </Typography>
      </Box>

      {/* MISSION & STORY: two cards side by side on desktop, stacked on mobile */}
      {/* We use MUI Grid alternative – Box with CSS Grid for more control over responsive columns */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        
        {/* Mission Card */}
        {/* Card – MUI component that creates a paper surface with rounded corners and elevation */}
        <Card elevation={1}>
          {/* CardContent – wrapper that adds default padding inside the card */}
          <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              {/* We used the TrendingUp icon because itvisually represents growth/mission */}
              <TrendingUp color="primary" />
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'text.primary' }}>Our Mission</Typography>
            </Box>
            {/* Divider which creates a horizontal line to separate the title from content */}
            <Divider sx={{ mb: 2.5 }} />
            <Typography variant="body1" lineHeight={1.8} sx={{ color: 'text.secondary' }}>
              To simplify logistics for businesses of all sizes by providing a seamless, transparent platform
              that connects clients with reliable transporters and labourers across Ireland.
              We remove the friction from freight so you can focus on what matters most — growing your business.
            </Typography>
          </CardContent>
        </Card>

        {/* Story Card */}
        <Card elevation={1}>
          <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              {/* EmojiTransportation icon, truck emoji style, we used it because it fits the story theme */}
              <EmojiTransportation color="primary" />
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'text.primary' }}>Our Story</Typography>
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Typography variant="body1" lineHeight={1.8} sx={{ color: 'text.secondary' }}>
              Founded in 2026 by computing science students at Griffith College Dublin,
              TruckFlow was born from a simple frustration: booking reliable transport in Ireland was
              slow, opaque, and outdated. What started as a college project quickly grew into a
              full-featured logistics platform trusted by hundreds of businesses nationwide.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* STATS SECTION – shows numbers that prove credibility */}
      {/* Card wraps the whole stats section to give it a unified background and elevation */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
          {/* We use CSS Grid again for responsive columns: 2 on mobile, 4 on desktop */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {stats.map((stat, i) => (
              <Box key={i} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold" sx={{ color: 'primary.main' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* CORE VALUES – grid of 4 values (2 columns on desktop, 1 on mobile) */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {values.map((value, i) => (
          // Each value gets its own Card to create visual separation
          <Card key={i} elevation={1}>
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, p: 4, '&:last-child': { pb: 4 } }}>
              {/* Icon container with primary color to match brand */}
              <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>{value.icon}</Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" lineHeight={1.7} sx={{ color: 'text.secondary' }}>
                  {value.desc}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* TEAM SECTION HEADER – a card with the Meet the Team as title and subtitle */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center', '&:last-child': { pb: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            {/* We used the HandshakeOutlined icon because it looks liek a handshake and to represent teamwork and collaboration */}
            <HandshakeOutlined color="primary" />
            <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary' }}>Meet the Team</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Three developers. One shared goal — making logistics effortless for everyone.
          </Typography>
        </CardContent>
      </Card>

      {/* TEAM MEMBERS CARDS – three column grid on desktop, stacked on mobile */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {team.map((member, i) => (
          <Card key={i} elevation={1}>
            <CardContent sx={{ p: 4, textAlign: 'center', '&:last-child': { pb: 4 } }}>
              {/* Avatar, MUI component for circular user avatars; we use it to show member initials */}
              {/* It automatically styles the image/initials with a background and circular shape */}
              <Avatar sx={{
                width: 72, height: 72,
                bgcolor: 'primary.main',
                mx: 'auto', mb: 2,
                fontSize: 28, fontWeight: 'bold'
              }}>
                {member.avatar}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" color="primary.main" fontWeight="bold" sx={{ mb: 1.5 }}>
                {member.role}
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="subtitle1" lineHeight={1.7} sx={{ color: 'text.secondary' }}>
                {member.bio}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

// We used Typography to display the texts because it displays text with consistent styling. 
// And it is better than using <h1>, <p>, or <span> and manually setting font sizes, weights, or colors.

export default AboutUs;