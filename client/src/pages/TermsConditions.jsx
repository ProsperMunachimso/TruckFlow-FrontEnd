import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, useTheme } from '@mui/material';
import {
  Gavel, AccountCircle, Payment, EventBusy,
  Shield, Lock, Edit, Email
} from '@mui/icons-material';

// Terms & Conditions page to show legal document outlining rules for using TruckFlow
// Features a sticky sidebar with table of contents that highlights the current section
// Uses Intersection Observer to track which section is visible and update sidebar highlight

// Array to store the terms and conditions
const sections = [
  {
    id: 'acceptance',
    icon: <Gavel />,
    title: '1. Acceptance of Terms',
    content: 'By accessing or using TruckFlow, you agree to be bound by these Terms and Conditions in full. If you do not agree with any part of these terms, you must not use our platform. Continued use of TruckFlow following any changes constitutes your acceptance of the revised terms.'
  },
  {
    id: 'accounts',
    icon: <AccountCircle />,
    title: '2. User Accounts',
    content: 'You must be at least 18 years old to register on TruckFlow. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Please notify us immediately if you suspect any unauthorised use of your account.'
  },
  {
    id: 'bookings',
    icon: <Payment />,
    title: '3. Bookings & Payments',
    content: 'All transport bookings are subject to acceptance by the relevant transporter. Invoices must be settled within the payment period specified at the time of booking. TruckFlow acts as a facilitator connecting clients with transporters and is not itself a carrier or logistics provider.'
  },
  {
    id: 'cancellations',
    icon: <EventBusy />,
    title: '4. Cancellations & Refunds',
    content: 'Cancellation policies vary by transporter and will be outlined at the time of booking. Clients may cancel pending bookings without penalty before confirmation. Once a booking is confirmed by a transporter, cancellation fees may apply. Refunds, where applicable, will be processed within 5–10 business days.'
  },
  {
    id: 'liability',
    icon: <Shield />,
    title: '5. Liability',
    content: 'TruckFlow is not liable for any direct, indirect, or consequential loss or damage arising from the use of our platform. We do not guarantee the availability, punctuality, or conduct of any transporter or labourer listed on our platform. Users engage with transporters at their own discretion.'
  },
  {
    id: 'privacy',
    icon: <Lock />,
    title: '6. Privacy',
    content: 'Your use of TruckFlow is governed by our Privacy Policy, which details how we collect, store, and use your personal data. We are committed to protecting your privacy and complying with applicable data protection legislation, including GDPR.'
  },
  {
    id: 'modifications',
    icon: <Edit />,
    title: '7. Modifications',
    content: 'We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Any changes will be posted on this page with an updated date. It is your responsibility to review these terms periodically. Continued use of the platform after changes are posted constitutes acceptance.'
  },
  {
    id: 'contact',
    icon: <Email />,
    title: '8. Contact Us',
    content: 'If you have any questions, concerns, or disputes regarding these Terms and Conditions, please do not hesitate to reach out to our team at obiezueprosper@gmail.com. We aim to respond to all enquiries within 2 business days.'
  },
];

const TermsConditions = () => {
  const theme = useTheme();
  const [activeId, setActiveId] = useState('acceptance'); // Currently visible section ID

  // Set up Intersection Observer to track which section is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' } // Adjusts when a section is considered "active"
    );
    // Observe each section element by its id
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Smooth scroll to a section when clicking sidebar link
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // - We made this page is publicly accessible. We added an intersection Observer API to track which section is currently visible in the viewport
  // - rootMargin: '-30% 0px -60% 0px' means a section is considered "active" when it's in the middle 10-70% of the screen
  // - Sections have scrollMarginTop to prevent the fixed navbar from covering the title when scrolling via hash or sidebar click
  // - Sidebar is sticky (position: sticky) and remains visible as you scroll
  // - The table of contents uses a hover effect that combines with the active highlight for better UI
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      {/* Two-column layout: sidebar (sticky) + main content */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: 5, alignItems: 'start' }}>

        {/* SIDEBAR – table of contents & quick links */}
        <Box sx={{ position: 'sticky', top: 90 }}>  {/* Stays in place while scrolling */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary"
                sx={{ letterSpacing: 1, mb: 2, textTransform: 'uppercase', fontSize: 11 }}>
                Table of Contents
              </Typography>
              {sections.map((section) => (
                <Box
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    py: 1, px: 1.5, mb: 0.5, borderRadius: 1,
                    cursor: 'pointer', transition: 'all 0.2s',
                    // Highlight active section with primary background and white text
                    bgcolor: activeId === section.id ? 'primary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: activeId === section.id ? 'primary.dark' : theme.palette.action.hover,
                    }
                  }}
                >
                  <Box sx={{
                    color: activeId === section.id ? 'white' : 'primary.main',
                    display: 'flex', flexShrink: 0,
                    '& svg': { fontSize: 16 }
                  }}>
                    {section.icon}
                  </Box>
                  <Typography variant="body2" sx={{
                    color: activeId === section.id ? 'white' : 'text.primary',
                    fontWeight: activeId === section.id ? 600 : 400,
                    fontSize: 13, lineHeight: 1.4
                  }}>
                    {section.title}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links card – navigation to other public pages */}
          <Card elevation={1}>
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary"
                sx={{ letterSpacing: 1, mb: 2, textTransform: 'uppercase', fontSize: 11 }}>
                Quick Links
              </Typography>
              {[
                { label: 'Home', href: '/' },
                { label: 'Contact Support', href: '/contact' },
                { label: 'About TruckFlow', href: '/about' },
                { label: 'Our Services', href: '/services' },
              ].map((link, i) => (
                <Box key={i}>
                  <Box
                    component="a"
                    href={link.href}
                    sx={{
                      display: 'block', py: 1, px: 1.5,
                      borderRadius: 1, fontSize: 13,
                      color: 'primary.main', textDecoration: 'none',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: theme.palette.action.hover, textDecoration: 'underline' }
                    }}
                  >
                    {link.label}
                  </Box>
                  {i < 3 && <Divider />}   {/* Add divider between links except last */}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>

        {/* MAIN CONTENT – actual terms and conditions */}
        <Box>
          {/* Header section with icon and last updated date */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{
              bgcolor: 'primary.main', borderRadius: '50%', p: 2,
              display: 'inline-flex', mb: 2
            }}>
              <Gavel sx={{ fontSize: 36, color: 'white' }} />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Terms & Conditions
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Last updated: May 2026
            </Typography>
            <Divider sx={{ mt: 4 }} />
          </Box>

          {/* Introductory card */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
              <Typography variant="body1" lineHeight={1.8} sx={{ color: 'text.secondary' }}>
                Please read these Terms and Conditions carefully before using TruckFlow. These terms govern
                your access to and use of our platform, including all services offered. By creating an account
                or making a booking, you confirm that you have read, understood, and agree to be bound by
                these terms.
              </Typography>
            </CardContent>
          </Card>

          {/* Render each section as a card with scroll margin top (so scrolling doesn't hide under navbar) */}
          {sections.map((section, i) => (
            <Card key={i} id={section.id} elevation={1} sx={{ mb: 3, scrollMarginTop: '80px' }}>
              <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>{section.icon}</Box>
                  <Typography variant="h6" fontWeight="bold">{section.title}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" lineHeight={1.8} sx={{ color: 'text.secondary' }}>
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

// MUI components used for this page:
// - Container: centres content with max width "lg"
// - Box: grid layout, flex, and spacing wrappers
// - Typography: headings, body text, captions
// - Card, CardContent: cards for each section, sidebar, and intro
// - Divider: horizontal lines between sections and sidebar links
// - useTheme: accesses theme for hover colour customization
// Icons: 8 different icons representing each section (Gavel, AccountCircle, Payment, EventBusy, Shield, Lock, Edit, Email)

export default TermsConditions;