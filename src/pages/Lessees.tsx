import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Lessees: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Lessee Management
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your lessees, vendors, and tenant information.
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page is under development. It will allow you to:
          </Typography>
          <ul>
            <li>Add and manage lessee profiles</li>
            <li>Track credit ratings and reliability</li>
            <li>Store contact and document information</li>
            <li>Monitor lease performance history</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Lessees; 