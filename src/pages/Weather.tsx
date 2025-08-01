import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Weather: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Weather Information
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Monitor weather conditions and forecasts for your farms.
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
            <li>View current weather for each farm</li>
            <li>7-day weather forecasts</li>
            <li>Weather alerts and warnings</li>
            <li>Agricultural weather insights</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Weather; 