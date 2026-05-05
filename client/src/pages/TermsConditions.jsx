// client/src/pages/TermsConditions.jsx
import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const TermsConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
          Terms & Conditions
        </Typography>
        <Typography variant="subtitle2" align="center" gutterBottom>Last updated: May 2026</Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>1. Acceptance of Terms</Typography>
        <Typography paragraph>By accessing or using TruckFlow, you agree to be bound by these Terms and Conditions.</Typography>

        <Typography variant="h6" gutterBottom>2. User Accounts</Typography>
        <Typography paragraph>You must be at least 18 years old to register. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</Typography>

        <Typography variant="h6" gutterBottom>3. Bookings & Payments</Typography>
        <Typography paragraph>All transport bookings are subject to acceptance by transporters. Invoices must be paid within the specified period. TruckFlow facilitates connections but is not a carrier itself.</Typography>

        <Typography variant="h6" gutterBottom>4. Cancellations & Refunds</Typography>
        <Typography paragraph>Cancellation policies vary by transporter. Clients may cancel pending bookings without penalty. Once a booking is confirmed, cancellation fees may apply.</Typography>

        <Typography variant="h6" gutterBottom>5. Liability</Typography>
        <Typography paragraph>TruckFlow is not liable for any loss or damage arising from the use of our platform. We do not guarantee the availability of any transporter or labourer.</Typography>

        <Typography variant="h6" gutterBottom>6. Privacy</Typography>
        <Typography paragraph>Your use of TruckFlow is also governed by our Privacy Policy, which explains how we collect and use your information.</Typography>

        <Typography variant="h6" gutterBottom>7. Modifications</Typography>
        <Typography paragraph>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.</Typography>

        <Typography variant="h6" gutterBottom>8. Contact</Typography>
        <Typography paragraph>For any questions, please contact us at obiezueprosper@gmail.com.</Typography>
      </Paper>
    </Container>
  );
};

export default TermsConditions;