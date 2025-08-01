import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Agriculture as FarmIcon,
  Assignment as LeaseIcon,
  TrendingUp as RevenueIcon,
  TrendingDown as ExpenseIcon,
  AccountBalance as ProfitIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  WbSunny as WeatherIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { fetchDashboardMetrics, fetchFinancialSummary } from '@/store/slices/dashboardSlice';
import { fetchFarms } from '@/store/slices/farmSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
  loading = false,
}) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={500}>
              {title}
            </Typography>
            {loading ? (
              <LinearProgress sx={{ my: 2 }} />
            ) : (
              <Typography variant="h4" component="div" fontWeight={700} sx={{ mb: 1 }}>
                {value}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip
                  size="small"
                  label={`${trend.isPositive ? '+' : ''}${trend.value}%`}
                  color={trend.isPositive ? 'success' : 'error'}
                  sx={{ fontSize: '0.75rem', height: 20 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs last month
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              sx: { color: 'white', fontSize: 24 },
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { metrics, financialSummary, loading } = useSelector((state: RootState) => state.dashboard);
  const { farms } = useSelector((state: RootState) => state.farms);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
    dispatch(fetchFinancialSummary({
      startDate: new Date(new Date().getFullYear(), 0, 1), // Start of year
      endDate: new Date(), // Today
    }));
    dispatch(fetchFarms());
  }, [dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's what's happening with your farms today.
          </Typography>
        </Box>
        <IconButton 
          onClick={() => {
            dispatch(fetchDashboardMetrics());
            dispatch(fetchFinancialSummary({
              startDate: new Date(new Date().getFullYear(), 0, 1),
              endDate: new Date(),
            }));
          }}
          sx={{ 
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Farms"
            value={metrics?.totalFarms || 0}
            subtitle={`${metrics?.totalPlots || 0} plots total`}
            icon={<FarmIcon />}
            color={theme.palette.primary.main}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Leases"
            value={metrics?.activeLeasesCount || 0}
            subtitle={`${metrics?.expiringLeasesCount || 0} expiring soon`}
            icon={<LeaseIcon />}
            color={theme.palette.secondary.main}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(metrics?.totalRevenue || 0)}
            subtitle="This year"
            icon={<RevenueIcon />}
            color={theme.palette.success.main}
            trend={{ value: 12.5, isPositive: true }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Net Profit"
            value={formatCurrency(metrics?.netProfit || 0)}
            subtitle={`ROI: ${financialSummary?.roi?.toFixed(1) || 0}%`}
            icon={<ProfitIcon />}
            color={theme.palette.info.main}
            trend={{ value: 8.2, isPositive: true }}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Charts and Weather */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Trends */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: { xs: 300, md: 400 } }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Revenue & Expense Trends
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)', mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialSummary?.monthlyTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke={theme.palette.text.secondary}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), '']}
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: theme.shape.borderRadius,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={theme.palette.success.main}
                      strokeWidth={3}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke={theme.palette.error.main}
                      strokeWidth={3}
                      name="Expenses"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      name="Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Weather Card */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: { xs: 300, md: 400 } }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <WeatherIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Weather Overview
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h2" component="div" fontWeight={700} color="primary">
                  28°C
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Partly Cloudy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfect conditions for farming
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Humidity</Typography>
                  <Typography variant="body2" fontWeight={600}>65%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Wind Speed</Typography>
                  <Typography variant="body2" fontWeight={600}>12 km/h</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Rainfall Today</Typography>
                  <Typography variant="body2" fontWeight={600}>0 mm</Typography>
                </Box>

                {metrics?.weatherAlerts && metrics.weatherAlerts > 0 && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      backgroundColor: theme.palette.warning.light + '20',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <WarningIcon color="warning" fontSize="small" />
                    <Typography variant="body2" color="warning.main">
                      {metrics.weatherAlerts} weather alert(s)
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue by Source & Lease Utilization */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Revenue by Source
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)', mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(financialSummary?.revenueBySource || {}).map(([key, value]) => ({
                        name: key,
                        value,
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {Object.entries(financialSummary?.revenueBySource || {}).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Lease Utilization
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Land Leased</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {metrics?.leaseUtilization || 0}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metrics?.leaseUtilization || 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mb: 3,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                    },
                  }}
                />

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Top Performing Crop
                  </Typography>
                  <Chip
                    label={metrics?.topPerformingCrop || 'N/A'}
                    color="primary"
                    sx={{ mb: 2, textTransform: 'capitalize' }}
                  />
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Average rate: {formatCurrency(metrics?.averageRatePerBigha || 0)} per bigha
                  </Typography>

                  {metrics?.overduePayments === 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="All payments up to date" color="success" size="small" />
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WarningIcon color="warning" fontSize="small" />
                      <Typography variant="body2" color="warning.main">
                        {metrics?.overduePayments} overdue payments
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 