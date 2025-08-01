import React, { useEffect } from 'react';
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

  useTheme,
  useMediaQuery,
  Fab,
  Avatar,
  LinearProgress,

  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,

  Assignment as LeaseIcon,

  CheckCircle as PaidIcon,
  Warning as OverdueIcon,
  Pending as PendingIcon,

  LocationOn as LocationIcon,
  Agriculture as CropIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { 
  fetchLeases, 
  fetchLessees,
  setSearchQuery, 
  setFilters,
  setSelectedLease,
  updatePaymentStatus,
} from '@/store/slices/leaseSlice';
import { fetchFarms } from '@/store/slices/farmSlice';
import { openDialog, showAlert } from '@/store/slices/uiSlice';
import { Lease, CropType, PaymentSchedule } from '@/types';

const Leases: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { leases, lessees, loading, searchQuery, filters } = useSelector((state: RootState) => state.leases);
  const { farms } = useSelector((state: RootState) => state.farms);
  // const { dialogs } = useSelector((state: RootState) => state.ui);
  
  // const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  useEffect(() => {
    dispatch(fetchLeases());
    dispatch(fetchLessees());
    dispatch(fetchFarms());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleMarkAsPaid = (leaseId: string, paymentId: string, amount: number) => {
    dispatch(updatePaymentStatus({
      leaseId,
      paymentId,
      status: 'paid',
      paidAmount: amount,
      paidDate: new Date(),
    }));
    dispatch(showAlert({ type: 'success', message: 'Payment marked as paid' }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const getCropTypeColor = (crop: CropType) => {
    switch (crop) {
      case 'sugarcane': return theme.palette.success.main;
      case 'wheat': return theme.palette.warning.main;
      case 'rice': return theme.palette.info.main;
      case 'mangoes': return theme.palette.secondary.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status: Lease['status']) => {
    switch (status) {
      case 'active': return theme.palette.success.main;
      case 'expired': return theme.palette.error.main;
      case 'terminated': return theme.palette.error.main;
      case 'renewed': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getPaymentStatusIcon = (status: PaymentSchedule['status']) => {
    switch (status) {
      case 'paid': return <PaidIcon color="success" />;
      case 'overdue': return <OverdueIcon color="error" />;
      case 'pending': return <PendingIcon color="warning" />;
      case 'partially_paid': return <PaymentIcon color="info" />;
      default: return <PendingIcon color="disabled" />;
    }
  };

  const getLesseeName = (lesseeId: string) => {
    const lessee = lessees.find(l => l.id === lesseeId);
    return lessee?.name || 'Unknown';
  };

  const getFarmName = (farmId: string) => {
    const farm = farms.find(f => f.id === farmId);
    return farm?.name || 'Unknown Farm';
  };

  const getPlotNumber = (farmId: string, plotId: string) => {
    const farm = farms.find(f => f.id === farmId);
    const plot = farm?.plots.find(p => p.id === plotId);
    return plot?.plotNumber || 'Unknown Plot';
  };

  const filteredLeases = leases.filter(lease => {
    const matchesSearch = 
      getLesseeName(lease.lesseeId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getFarmName(lease.farmId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getPlotNumber(lease.farmId, lease.plotId).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !filters.status || lease.status === filters.status;
    const matchesCrop = !filters.cropType || lease.cropType === filters.cropType;
    const matchesFarm = !filters.farmId || lease.farmId === filters.farmId;

    return matchesSearch && matchesStatus && matchesCrop && matchesFarm;
  });

  const getOverduePayments = () => {
    return leases.reduce((count, lease) => {
      return count + lease.paymentSchedule.filter(p => p.status === 'overdue').length;
    }, 0);
  };

  const getTotalRevenue = () => {
    return leases.reduce((total, lease) => {
      return total + lease.paymentSchedule
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + p.paidAmount, 0);
    }, 0);
  };

  const getPendingPayments = () => {
    return leases.reduce((total, lease) => {
      return total + lease.paymentSchedule
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);
    }, 0);
  };

  const LeaseCard: React.FC<{ lease: Lease }> = ({ lease }) => {
    const nextPayment = lease.paymentSchedule.find(p => p.status === 'pending' || p.status === 'overdue');
    
    return (
      <Card 
        sx={{ 
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: getCropTypeColor(lease.cropType),
                  width: 40,
                  height: 40,
                }}
              >
                <CropIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {getLesseeName(lease.lesseeId)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Lease ID: {lease.id}
                </Typography>
              </Box>
            </Box>
            
            <Chip
              label={lease.status}
              size="small"
              sx={{
                backgroundColor: getStatusColor(lease.status) + '20',
                color: getStatusColor(lease.status),
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Farm and Plot Info */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocationIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {getFarmName(lease.farmId)} - {getPlotNumber(lease.farmId, lease.plotId)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CropIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {lease.cropType} cultivation
              </Typography>
              <Chip
                label={lease.leaseType}
                size="small"
                variant="outlined"
                sx={{ ml: 1, textTransform: 'capitalize' }}
              />
            </Box>
          </Box>

          {/* Financial Info */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Rate per {lease.rateUnit.replace('per_', '')}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {formatCurrency(lease.ratePerUnit)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {formatCurrency(lease.totalAmount)}
              </Typography>
            </Grid>
          </Grid>

          {/* Lease Period */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Lease Period
            </Typography>
            <Typography variant="body2">
              {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
            </Typography>
          </Box>

          {/* Next Payment */}
          {nextPayment && (
            <Box
              sx={{
                p: 2,
                backgroundColor: nextPayment.status === 'overdue' 
                  ? theme.palette.error.light + '10' 
                  : theme.palette.warning.light + '10',
                borderRadius: 2,
                border: `1px solid ${
                  nextPayment.status === 'overdue' 
                    ? theme.palette.error.light 
                    : theme.palette.warning.light
                }`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Next Payment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due: {formatDate(nextPayment.dueDate)}
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {formatCurrency(nextPayment.amount)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getPaymentStatusIcon(nextPayment.status)}
                  {nextPayment.status === 'pending' && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleMarkAsPaid(lease.id, nextPayment.id, nextPayment.amount)}
                    >
                      Mark Paid
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              size="small"
              startIcon={<ViewIcon />}
              onClick={() => dispatch(setSelectedLease(lease))}
            >
              View Details
            </Button>
            <Button
              size="small"
              startIcon={<EditIcon />}
              variant="outlined"
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

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
            Lease Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage lease agreements and track payments for your Bilari farms
          </Typography>
        </Box>
        
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => dispatch(openDialog('addLease'))}
            sx={{ minWidth: 150 }}
          >
            Create Lease
          </Button>
        )}
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="primary">
                {leases.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Leases
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="success.main">
                {formatCurrency(getTotalRevenue())}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revenue Collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                {formatCurrency(getPendingPayments())}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Payments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="error.main">
                {getOverduePayments()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overdue Payments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                placeholder="Search leases by lessee, farm, or plot..."
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                  <MenuItem value="terminated">Terminated</MenuItem>
                  <MenuItem value="renewed">Renewed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Crop Type</InputLabel>
                <Select
                  value={filters.cropType}
                  label="Crop Type"
                  onChange={(e) => handleFilterChange('cropType', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="sugarcane">Sugarcane</MenuItem>
                  <MenuItem value="wheat">Wheat</MenuItem>
                  <MenuItem value="rice">Rice</MenuItem>
                  <MenuItem value="mangoes">Mangoes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Farm</InputLabel>
                <Select
                  value={filters.farmId}
                  label="Farm"
                  onChange={(e) => handleFilterChange('farmId', e.target.value)}
                >
                  <MenuItem value="">All Farms</MenuItem>
                  {farms.map((farm) => (
                    <MenuItem key={farm.id} value={farm.id}>
                      {farm.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => dispatch(setFilters({ status: '', cropType: '', farmId: '' }))}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Leases Grid */}
      <Grid container spacing={3}>
        {filteredLeases.map((lease) => (
          <Grid item xs={12} md={6} lg={4} key={lease.id}>
            <LeaseCard lease={lease} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {!loading && filteredLeases.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          border: `1px dashed ${theme.palette.divider}`,
        }}>
          <LeaseIcon sx={{ fontSize: 64, color: theme.palette.text.disabled, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchQuery || filters.status || filters.cropType || filters.farmId 
              ? 'No leases found' 
              : 'No lease agreements yet'
            }
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {searchQuery || filters.status || filters.cropType || filters.farmId
              ? 'Try adjusting your search criteria or filters'
              : 'Start by creating your first lease agreement'
            }
          </Typography>
          {!(searchQuery || filters.status || filters.cropType || filters.farmId) && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => dispatch(openDialog('addLease'))}
              sx={{ mt: 2 }}
            >
              Create First Lease
            </Button>
          )}
        </Box>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="create lease"
          onClick={() => dispatch(openDialog('addLease'))}
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
    </Box>
  );
};

export default Leases; 