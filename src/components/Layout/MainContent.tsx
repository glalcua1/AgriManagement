import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Dashboard from '@/pages/Dashboard';
import Farms from '@/pages/Farms';
import Leases from '@/pages/Leases';
import Lessees from '@/pages/Lessees';
import Revenue from '@/pages/Revenue';
import Expenses from '@/pages/Expenses';
import Weather from '@/pages/Weather';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';

const MainContent: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 1, sm: 2, md: 3 },
        backgroundColor: 'background.default',
        minHeight: 'calc(100vh - 64px)', // Account for header height
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          height: '100%',
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/leases" element={<Leases />} />
          <Route path="/lessees" element={<Lessees />} />
          <Route path="/financials/revenue" element={<Revenue />} />
          <Route path="/financials/expenses" element={<Expenses />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more routes as needed */}
        </Routes>
      </Container>
    </Box>
  );
};

export default MainContent; 