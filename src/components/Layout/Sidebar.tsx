import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  useTheme,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Agriculture as FarmIcon,
  Assignment as LeaseIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  WbSunny as WeatherIcon,
  Analytics as ReportsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Receipt as ExpenseIcon,
  TrendingUp as RevenueIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCurrentPage } from '@/store/slices/uiSlice';

interface SidebarProps {
  open: boolean;
  width: number;
  isMobile: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/',
  },
  {
    id: 'farms',
    label: 'Farms',
    icon: <FarmIcon />,
    path: '/farms',
  },
  {
    id: 'leases',
    label: 'Leases',
    icon: <LeaseIcon />,
    path: '/leases',
  },
  {
    id: 'lessees',
    label: 'Lessees',
    icon: <PeopleIcon />,
    path: '/lessees',
  },
  {
    id: 'financials',
    label: 'Financials',
    icon: <MoneyIcon />,
    path: '/financials',
    children: [
      {
        id: 'revenue',
        label: 'Revenue',
        icon: <RevenueIcon />,
        path: '/financials/revenue',
      },
      {
        id: 'expenses',
        label: 'Expenses',
        icon: <ExpenseIcon />,
        path: '/financials/expenses',
      },
    ],
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: <WeatherIcon />,
    path: '/weather',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <ReportsIcon />,
    path: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, width, isMobile, onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.ui.currentPage);
  
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      const isExpanded = expandedItems.includes(item.id);
      setExpandedItems(prev => 
        isExpanded 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      navigate(item.path);
      dispatch(setCurrentPage(item.id));
      if (isMobile) {
        onClose();
      }
    }
  };

  const isSelected = (item: NavItem) => {
    return location.pathname === item.path || currentPage === item.id;
  };

  const renderNavItem = (item: NavItem, depth = 0) => (
    <React.Fragment key={item.id}>
      <ListItem disablePadding>
        <ListItemButton
          selected={isSelected(item)}
          onClick={() => handleItemClick(item)}
          sx={{
            borderRadius: 2,
            mx: 1,
            mb: 0.5,
            pl: depth > 0 ? 4 : 2,
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.contrastText,
              },
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: isSelected(item) ? 'inherit' : theme.palette.text.secondary,
              minWidth: 40,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.label}
            primaryTypographyProps={{
              fontSize: depth > 0 ? '0.875rem' : '1rem',
              fontWeight: isSelected(item) ? 600 : 400,
            }}
          />
          {item.children && (
            expandedItems.includes(item.id) ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItemButton>
      </ListItem>
      
      {item.children && (
        <Collapse in={expandedItems.includes(item.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map(child => renderNavItem(child, depth + 1))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Logo and Brand */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 40,
            height: 40,
          }}
        >
          <FarmIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" component="div" fontWeight={600}>
            Lal Farms
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Management System
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <List>
          {navigationItems.map(item => renderNavItem(item))}
        </List>
      </Box>

      {/* User Info */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.secondary.main,
              width: 36,
              height: 36,
            }}
          >
            GL
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Gaurav Lal
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Farm Owner
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: width,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            width: open ? width : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: width,
              boxSizing: 'border-box',
              transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              transform: open ? 'translateX(0)' : `translateX(-${width}px)`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar; 