import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configure your application preferences and account settings.
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
            <li>Manage user preferences</li>
            <li>Configure notification settings</li>
            <li>Set default currency and units</li>
            <li>Account and security settings</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings; 