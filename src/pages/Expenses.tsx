import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Expenses: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Expense Management
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track and categorize your farm expenses and costs.
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
            <li>Add and categorize expenses</li>
            <li>Track maintenance and operational costs</li>
            <li>Upload receipt images</li>
            <li>Generate expense reports</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Expenses; 