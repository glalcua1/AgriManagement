import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Agriculture as FarmIcon,
  LocationOn as LocationIcon,
  Water as WaterIcon,
  Landscape as SoilIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { 
  fetchFarms, 
  addFarm, 
  deleteFarm, 
  setSearchQuery, 
  setFilters,
  setSelectedFarm,
} from '@/store/slices/farmSlice';
import { openDialog, closeDialog, showAlert } from '@/store/slices/uiSlice';
import { Farm, CropType } from '@/types';
import AddFarmForm from '@/components/Farm/AddFarmForm';
import FarmDetailsDialog from '@/components/Farm/FarmDetailsDialog';

const Farms: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { farms, loading, searchQuery } = useSelector((state: RootState) => state.farms);
  const { dialogs } = useSelector((state: RootState) => state.ui);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    dispatch(fetchFarms());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleMenuOpen = (farmId: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({ ...anchorEl, [farmId]: event.currentTarget });
  };

  const handleMenuClose = (farmId: string) => {
    setAnchorEl({ ...anchorEl, [farmId]: null });
  };

  const handleDeleteFarm = (farmId: string) => {
    dispatch(deleteFarm(farmId));
    dispatch(showAlert({ type: 'success', message: 'Farm deleted successfully' }));
    handleMenuClose(farmId);
  };

  const handleViewFarmDetails = (farm: Farm) => {
    dispatch(setSelectedFarm(farm));
    dispatch(openDialog('farmDetails'));
  };

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const FarmCard: React.FC<{ farm: Farm }> = ({ farm }) => (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
      onClick={() => handleViewFarmDetails(farm)}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
              <Typography variant="h6" fontWeight={600}>
                {farm.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {farm.id}
              </Typography>
            </Box>
          </Box>
          
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuOpen(farm.id, e);
            }}
          >
            <MoreIcon />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl[farm.id]}
            open={Boolean(anchorEl[farm.id])}
            onClose={() => handleMenuClose(farm.id)}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={() => handleViewFarmDetails(farm)}>
              <ListItemIcon><ViewIcon fontSize="small" /></ListItemIcon>
              <ListItemText>View Details</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(farm.id)}>
              <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Edit Farm</ListItemText>
            </MenuItem>
            <MenuItem 
              onClick={() => handleDeleteFarm(farm.id)}
              sx={{ color: theme.palette.error.main }}
            >
              <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
              <ListItemText>Delete Farm</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocationIcon color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {farm.location.address}
          </Typography>
        </Box>

        {/* Area and Quality */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Area
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {farm.totalArea} {farm.areaUnit}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Quality Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(farm.qualityRating / 5) * 100}
                  sx={{
                    flexGrow: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getSoilQualityColor(farm.qualityRating),
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography variant="body2" fontWeight={600}>
                  {farm.qualityRating}/5
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Soil and Water */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SoilIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {farm.soilType}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WaterIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {farm.waterSource.join(', ')}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Plots */}
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Plots ({farm.plots.length})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {farm.plots.slice(0, 3).map((plot) => (
              <Chip
                key={plot.id}
                label={`${plot.plotNumber} - ${plot.currentCrop || 'No crop'}`}
                size="small"
                sx={{
                  backgroundColor: plot.currentCrop ? getCropTypeColor(plot.currentCrop) + '20' : theme.palette.grey[100],
                  color: plot.currentCrop ? getCropTypeColor(plot.currentCrop) : theme.palette.text.secondary,
                  fontSize: '0.75rem',
                }}
              />
            ))}
            {farm.plots.length > 3 && (
              <Chip
                label={`+${farm.plots.length - 3} more`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3 
      }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Farm Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your farms in Bilari, Moradabad region - Total: {farms.reduce((sum, farm) => sum + farm.totalArea, 0)} bighas
          </Typography>
        </Box>
        
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => dispatch(openDialog('addFarm'))}
            sx={{ minWidth: 150 }}
          >
            Add Farm
          </Button>
        )}
      </Box>

      {/* Search and Filters */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          placeholder="Search farms by name or location..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ minWidth: { xs: 'auto', sm: 100 } }}
          >
            {isMobile ? '' : 'Filter'}
          </Button>
          
          <IconButton
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              '&:hover': { borderColor: 'primary.main' }
            }}
          >
            {viewMode === 'grid' ? <ListViewIcon /> : <GridViewIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Farms Grid */}
      <Grid container spacing={3}>
        {filteredFarms.map((farm) => (
          <Grid item xs={12} sm={6} lg={4} key={farm.id}>
            <FarmCard farm={farm} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {!loading && filteredFarms.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          border: `1px dashed ${theme.palette.divider}`,
        }}>
          <FarmIcon sx={{ fontSize: 64, color: theme.palette.text.disabled, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchQuery ? 'No farms found' : 'No farms added yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {searchQuery 
              ? 'Try adjusting your search criteria'
              : 'Start by adding your first farm to manage your agricultural properties'
            }
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => dispatch(openDialog('addFarm'))}
              sx={{ mt: 2 }}
            >
              Add Your First Farm
            </Button>
          )}
        </Box>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add farm"
          onClick={() => dispatch(openDialog('addFarm'))}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Add Farm Dialog */}
      <Dialog
        open={dialogs.addFarm}
        onClose={() => dispatch(closeDialog('addFarm'))}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Add New Farm</DialogTitle>
        <DialogContent>
          <AddFarmForm onSuccess={() => dispatch(closeDialog('addFarm'))} />
        </DialogContent>
      </Dialog>

      {/* Farm Details Dialog */}
      <FarmDetailsDialog />
    </Box>
  );
};

export default Farms; 