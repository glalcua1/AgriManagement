import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Agriculture as FarmIcon,
  LocationOn as LocationIcon,
  Water as WaterIcon,
  Landscape as SoilIcon,
  Add as AddIcon,
  GridView as PlotIcon,
  Info as InfoIcon,
  Star as StarIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeDialog } from '@/store/slices/uiSlice';
import { CropType, Plot } from '@/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`farm-tabpanel-${index}`}
    aria-labelledby={`farm-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const FarmDetailsDialog: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { dialogs } = useSelector((state: RootState) => state.ui);
  const { selectedFarm } = useSelector((state: RootState) => state.farms);
  
  const [tabValue, setTabValue] = useState(0);

  const handleClose = () => {
    dispatch(closeDialog('farmDetails'));
  };

  const getCropTypeColor = (crop?: CropType) => {
    switch (crop) {
      case 'sugarcane': return theme.palette.success.main;
      case 'wheat': return theme.palette.warning.main;
      case 'rice': return theme.palette.info.main;
      case 'mangoes': return theme.palette.secondary.main;
      default: return theme.palette.grey[500];
    }
  };

  const getSoilQualityColor = (rating: number) => {
    if (rating >= 4) return theme.palette.success.main;
    if (rating >= 3) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  if (!selectedFarm) return null;

  const totalPlotArea = selectedFarm.plots.reduce((sum, plot) => sum + plot.area, 0);
  const utilizationRate = (totalPlotArea / selectedFarm.totalArea) * 100;

  return (
    <Dialog
      open={dialogs.farmDetails}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: { height: isMobile ? '100%' : '90vh' }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48,
            }}
          >
            <FarmIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {selectedFarm.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Farm ID: {selectedFarm.id}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Overview Cards */}
        <Box sx={{ px: 3, pb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {selectedFarm.totalArea}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total {selectedFarm.areaUnit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="secondary">
                    {selectedFarm.plots.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Plots
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <Typography variant="h4" fontWeight={700} color="warning.main">
                      {selectedFarm.qualityRating}
                    </Typography>
                    <StarIcon color="warning" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Quality Rating
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {utilizationRate.toFixed(0)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Utilization
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Overview" />
            <Tab label="Plots" />
            <Tab label="Activity" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <Box sx={{ px: 3, height: 'calc(100% - 200px)', overflow: 'auto' }}>
          {/* Overview Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon color="primary" />
                      Basic Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <LocationIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Location"
                          secondary={selectedFarm.location.address}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SoilIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Soil Type"
                          secondary={selectedFarm.soilType}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <WaterIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Water Sources"
                          secondary={
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                              {selectedFarm.waterSource.map((source) => (
                                <Chip key={source} label={source} size="small" variant="outlined" />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Created"
                          secondary={formatDate(selectedFarm.createdAt)}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Quality Metrics */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUpIcon color="primary" />
                      Quality Metrics
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Overall Quality</Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {selectedFarm.qualityRating}/5
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(selectedFarm.qualityRating / 5) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getSoilQualityColor(selectedFarm.qualityRating),
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Land Utilization</Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {totalPlotArea}/{selectedFarm.totalArea} {selectedFarm.areaUnit}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={utilizationRate}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Last updated: {formatDate(selectedFarm.updatedAt)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Plots Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Plots ({selectedFarm.plots.length})
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />}>
                Add Plot
              </Button>
            </Box>

            {selectedFarm.plots.length > 0 ? (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plot Number</TableCell>
                      <TableCell>Area ({selectedFarm.areaUnit})</TableCell>
                      <TableCell>Current Crop</TableCell>
                      <TableCell>Soil Quality</TableCell>
                      <TableCell>Irrigation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedFarm.plots.map((plot) => (
                      <TableRow key={plot.id} hover>
                        <TableCell>
                          <Typography fontWeight={600}>
                            {plot.plotNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>{plot.area}</TableCell>
                        <TableCell>
                          {plot.currentCrop ? (
                            <Chip
                              label={plot.currentCrop}
                              size="small"
                              sx={{
                                backgroundColor: getCropTypeColor(plot.currentCrop) + '20',
                                color: getCropTypeColor(plot.currentCrop),
                                textTransform: 'capitalize',
                              }}
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No crop
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(plot.soilQuality / 5) * 100}
                              sx={{
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: theme.palette.grey[200],
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getSoilQualityColor(plot.soilQuality),
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography variant="body2">
                              {plot.soilQuality}/5
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={plot.irrigationType}
                            size="small"
                            variant="outlined"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `1px dashed ${theme.palette.divider}`,
              }}>
                <PlotIcon sx={{ fontSize: 64, color: theme.palette.text.disabled, mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No plots added yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Start by dividing this farm into plots for better management
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                  Add First Plot
                </Button>
              </Box>
            )}
          </TabPanel>

          {/* Activity Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              border: `1px dashed ${theme.palette.divider}`,
            }}>
              <CalendarIcon sx={{ fontSize: 64, color: theme.palette.text.disabled, mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No recent activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Farm activity and changes will appear here
              </Typography>
            </Box>
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FarmDetailsDialog; 