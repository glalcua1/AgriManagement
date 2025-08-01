import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Reports & Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Generate comprehensive reports and analyze your farm performance.
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
            <li>Generate financial statements</li>
            <li>Lease performance reports</li>
            <li>Crop productivity analysis</li>
            <li>Export reports to PDF/Excel</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports; 