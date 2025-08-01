import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardMetrics, FinancialSummary } from '@/types';

interface DashboardState {
  metrics: DashboardMetrics | null;
  financialSummary: FinancialSummary | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const initialState: DashboardState = {
  metrics: null,
  financialSummary: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchDashboardMetrics = createAsyncThunk(
  'dashboard/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      // Mock dashboard metrics - replace with actual API call
      const mockMetrics: DashboardMetrics = {
        totalFarms: 3,
        totalPlots: 8,
        activeLeasesCount: 4,
        expiringLeasesCount: 1,
        totalRevenue: 2650000, // Updated to match lease data
        totalExpenses: 185000,
        netProfit: 2465000,
        leaseUtilization: 90,
        averageRatePerBigha: 25750, // Average of all lease rates
        topPerformingCrop: 'sugarcane',
        overduePayments: 1,
        weatherAlerts: 0,
      };
      return mockMetrics;
    } catch (error) {
      return rejectWithValue('Failed to fetch dashboard metrics');
    }
  }
);

export const fetchFinancialSummary = createAsyncThunk(
  'dashboard/fetchFinancialSummary',
  async (period: { startDate: Date; endDate: Date }, { rejectWithValue }) => {
    try {
      // Mock financial summary - replace with actual API call
      const mockSummary: FinancialSummary = {
        period,
        totalRevenue: 2650000,
        totalExpenses: 185000,
        netProfit: 2465000,
        roi: 93.0,
        leaseUtilization: 90,
        revenueBySource: {
          'Lease Payments': 2500000,
          'Security Deposits': 150000,
        },
        expensesByCategory: {
          'Maintenance': 85000,
          'Utilities': 40000,
          'Labor': 35000,
          'Equipment': 25000,
        },
        monthlyTrends: [
          { month: 'Jan', revenue: 875000, expenses: 25000, profit: 850000 },
          { month: 'Feb', revenue: 0, expenses: 20000, profit: -20000 },
          { month: 'Mar', revenue: 0, expenses: 22000, profit: -22000 },
          { month: 'Apr', revenue: 437500, expenses: 30000, profit: 407500 },
          { month: 'May', revenue: 0, expenses: 18000, profit: -18000 },
          { month: 'Jun', revenue: 420000, expenses: 25000, profit: 395000 },
          { month: 'Jul', revenue: 437500, expenses: 20000, profit: 417500 },
          { month: 'Aug', revenue: 420000, expenses: 25000, profit: 395000 },
          { month: 'Sep', revenue: 0, expenses: 15000, profit: -15000 },
          { month: 'Oct', revenue: 0, expenses: 18000, profit: -18000 },
          { month: 'Nov', revenue: 187500, expenses: 22000, profit: 165500 },
          { month: 'Dec', revenue: 0, expenses: 16000, profit: -16000 },
        ],
      };
      return mockSummary;
    } catch (error) {
      return rejectWithValue('Failed to fetch financial summary');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.metrics = null;
      state.financialSummary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch metrics
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
        state.lastUpdated = new Date();
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch financial summary
      .addCase(fetchFinancialSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinancialSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.financialSummary = action.payload;
        state.lastUpdated = new Date();
      })
      .addCase(fetchFinancialSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer; 