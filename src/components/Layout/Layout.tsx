import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';

const Layout: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  // Auto-close sidebar on mobile when screen size changes
  React.useEffect(() => {
    if (isMobile && sidebarOpen) {
      dispatch(setSidebarOpen(false));
    }
  }, [isMobile, dispatch, sidebarOpen]);

  const sidebarWidth = 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        width={sidebarWidth} 
        isMobile={isMobile}
        onClose={() => dispatch(setSidebarOpen(false))}
      />
      
      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            lg: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
            xs: '100%'
          },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: {
            lg: sidebarOpen ? 0 : `-${sidebarWidth}px`,
            xs: 0
          },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <MainContent />
      </Box>
    </Box>
  );
};

export default Layout; 