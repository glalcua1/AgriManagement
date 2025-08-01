import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Lease, Lessee, PaymentSchedule } from '@/types';

interface LeaseState {
  leases: Lease[];
  lessees: Lessee[];
  selectedLease: Lease | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    status: string;
    cropType: string;
    farmId: string;
  };
}

const initialState: LeaseState = {
  leases: [],
  lessees: [],
  selectedLease: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    status: '',
    cropType: '',
    farmId: '',
  },
};

export const fetchLeases = createAsyncThunk(
  'leases/fetchLeases',
  async (_, { rejectWithValue }) => {
    try {
      // Mock lease data for Bilari farms
      const mockLeases: Lease[] = [
        {
          id: 'lease-1',
          farmId: '1',
          plotId: 'p1',
          lesseeId: 'lessee-1',
          cropType: 'sugarcane',
          ratePerUnit: 25000,
          rateUnit: 'per_bigha',
          leaseType: 'annual',
          startDate: new Date('2023-04-01'),
          endDate: new Date('2024-03-31'),
          securityDeposit: 100000,
          totalAmount: 875000, // 35 bighas * 25000
          status: 'active',
          paymentSchedule: [
            {
              id: 'pay-1',
              leaseId: 'lease-1',
              dueDate: new Date('2023-07-01'),
              amount: 437500,
              status: 'paid',
              paidAmount: 437500,
              paidDate: new Date('2023-06-28'),
              penaltyAmount: 0,
            },
            {
              id: 'pay-2',
              leaseId: 'lease-1',
              dueDate: new Date('2024-01-01'),
              amount: 437500,
              status: 'pending',
              paidAmount: 0,
              penaltyAmount: 0,
            },
          ],
          autoRenewal: true,
          terms: 'Standard lease agreement for sugarcane cultivation. Includes water rights and basic maintenance.',
          createdAt: new Date('2023-03-15'),
          updatedAt: new Date('2023-11-20'),
        },
        {
          id: 'lease-2',
          farmId: '2',
          plotId: 'p4',
          lesseeId: 'lessee-2',
          cropType: 'sugarcane',
          ratePerUnit: 28000,
          rateUnit: 'per_bigha',
          leaseType: 'annual',
          startDate: new Date('2023-06-01'),
          endDate: new Date('2024-05-31'),
          securityDeposit: 150000,
          totalAmount: 840000, // 30 bighas * 28000
          status: 'active',
          paymentSchedule: [
            {
              id: 'pay-3',
              leaseId: 'lease-2',
              dueDate: new Date('2023-09-01'),
              amount: 420000,
              status: 'paid',
              paidAmount: 420000,
              paidDate: new Date('2023-08-30'),
              penaltyAmount: 0,
            },
            {
              id: 'pay-4',
              leaseId: 'lease-2',
              dueDate: new Date('2024-02-01'),
              amount: 420000,
              status: 'overdue',
              paidAmount: 0,
              penaltyAmount: 5000,
              notes: 'Payment overdue by 15 days',
            },
          ],
          autoRenewal: false,
          terms: 'Premium lease with advanced irrigation systems. Higher rate due to superior soil quality.',
          createdAt: new Date('2023-05-10'),
          updatedAt: new Date('2023-11-18'),
        },
        {
          id: 'lease-3',
          farmId: '1',
          plotId: 'p2',
          lesseeId: 'lessee-3',
          cropType: 'wheat',
          ratePerUnit: 15000,
          rateUnit: 'per_bigha',
          leaseType: 'seasonal',
          startDate: new Date('2023-10-15'),
          endDate: new Date('2024-04-30'),
          securityDeposit: 50000,
          totalAmount: 375000, // 25 bighas * 15000
          status: 'active',
          paymentSchedule: [
            {
              id: 'pay-5',
              leaseId: 'lease-3',
              dueDate: new Date('2023-12-01'),
              amount: 187500,
              status: 'paid',
              paidAmount: 187500,
              paidDate: new Date('2023-11-28'),
              penaltyAmount: 0,
            },
            {
              id: 'pay-6',
              leaseId: 'lease-3',
              dueDate: new Date('2024-03-01'),
              amount: 187500,
              status: 'pending',
              paidAmount: 0,
              penaltyAmount: 0,
            },
          ],
          autoRenewal: true,
          terms: 'Seasonal wheat cultivation lease. Includes harvesting equipment access.',
          createdAt: new Date('2023-09-20'),
          updatedAt: new Date('2023-11-15'),
        },
        {
          id: 'lease-4',
          farmId: '2',
          plotId: 'p5',
          lesseeId: 'lessee-4',
          cropType: 'mangoes',
          ratePerUnit: 35000,
          rateUnit: 'per_bigha',
          leaseType: 'multi_year',
          startDate: new Date('2022-01-01'),
          endDate: new Date('2025-12-31'),
          securityDeposit: 200000,
          totalAmount: 3500000, // 25 bighas * 35000 * 4 years
          status: 'active',
          paymentSchedule: [
            {
              id: 'pay-7',
              leaseId: 'lease-4',
              dueDate: new Date('2023-01-01'),
              amount: 875000,
              status: 'paid',
              paidAmount: 875000,
              paidDate: new Date('2022-12-28'),
              penaltyAmount: 0,
            },
            {
              id: 'pay-8',
              leaseId: 'lease-4',
              dueDate: new Date('2024-01-01'),
              amount: 875000,
              status: 'pending',
              paidAmount: 0,
              penaltyAmount: 0,
            },
          ],
          autoRenewal: false,
          terms: 'Long-term mango orchard lease. Includes tree maintenance and irrigation infrastructure.',
          createdAt: new Date('2021-11-15'),
          updatedAt: new Date('2023-11-10'),
        },
      ];
      
      return mockLeases;
    } catch (error) {
      return rejectWithValue('Failed to fetch leases');
    }
  }
);

export const fetchLessees = createAsyncThunk(
  'leases/fetchLessees',
  async (_, { rejectWithValue }) => {
    try {
      // Mock lessee data
      const mockLessees: Lessee[] = [
        {
          id: 'lessee-1',
          name: 'Rajesh Kumar',
          contactInfo: {
            phone: '+91 9876543210',
            email: 'rajesh.kumar@email.com',
            address: 'Village Bilari, Moradabad, UP',
          },
          documents: [
            { type: 'Aadhaar', number: '1234 5678 9012', expiryDate: undefined },
            { type: 'PAN', number: 'ABCDE1234F', expiryDate: undefined },
          ],
          creditRating: 4,
          reliabilityScore: 5,
          previousLeases: ['lease-1'],
          createdAt: new Date('2023-01-10'),
          updatedAt: new Date('2023-11-20'),
        },
        {
          id: 'lessee-2',
          name: 'Suresh Agro Farms',
          contactInfo: {
            phone: '+91 9876543211',
            email: 'suresh.agro@email.com',
            address: 'Village Bilari South, Moradabad, UP',
          },
          documents: [
            { type: 'GST Certificate', number: 'GST123456789', expiryDate: new Date('2025-03-31') },
            { type: 'Trade License', number: 'TL789012', expiryDate: new Date('2024-12-31') },
          ],
          creditRating: 5,
          reliabilityScore: 3,
          previousLeases: ['lease-2'],
          createdAt: new Date('2023-02-15'),
          updatedAt: new Date('2023-11-18'),
        },
        {
          id: 'lessee-3',
          name: 'Amit Singh',
          contactInfo: {
            phone: '+91 9876543212',
            email: 'amit.singh@email.com',
            address: 'Moradabad, UP',
          },
          documents: [
            { type: 'Aadhaar', number: '2345 6789 0123', expiryDate: undefined },
            { type: 'Voter ID', number: 'VOT123456', expiryDate: undefined },
          ],
          creditRating: 4,
          reliabilityScore: 4,
          previousLeases: ['lease-3'],
          createdAt: new Date('2023-08-05'),
          updatedAt: new Date('2023-11-15'),
        },
        {
          id: 'lessee-4',
          name: 'Mango Orchards Ltd',
          contactInfo: {
            phone: '+91 9876543213',
            email: 'info@mangoorchards.com',
            address: 'Industrial Area, Moradabad, UP',
          },
          documents: [
            { type: 'Company Registration', number: 'CIN123456789', expiryDate: undefined },
            { type: 'GST Certificate', number: 'GST987654321', expiryDate: new Date('2025-03-31') },
          ],
          creditRating: 5,
          reliabilityScore: 5,
          previousLeases: ['lease-4'],
          createdAt: new Date('2021-10-01'),
          updatedAt: new Date('2023-11-10'),
        },
      ];
      
      return mockLessees;
    } catch (error) {
      return rejectWithValue('Failed to fetch lessees');
    }
  }
);

export const addLease = createAsyncThunk(
  'leases/addLease',
  async (leaseData: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const newLease: Lease = {
        ...leaseData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newLease;
    } catch (error) {
      return rejectWithValue('Failed to add lease');
    }
  }
);

export const updateLease = createAsyncThunk(
  'leases/updateLease',
  async ({ id, leaseData }: { id: string; leaseData: Partial<Lease> }, { rejectWithValue }) => {
    try {
      return { id, leaseData: { ...leaseData, updatedAt: new Date() } };
    } catch (error) {
      return rejectWithValue('Failed to update lease');
    }
  }
);

export const deleteLease = createAsyncThunk(
  'leases/deleteLease',
  async (leaseId: string, { rejectWithValue }) => {
    try {
      return leaseId;
    } catch (error) {
      return rejectWithValue('Failed to delete lease');
    }
  }
);

export const updatePaymentStatus = createAsyncThunk(
  'leases/updatePaymentStatus',
  async ({ 
    leaseId, 
    paymentId, 
    status, 
    paidAmount, 
    paidDate 
  }: { 
    leaseId: string; 
    paymentId: string; 
    status: PaymentSchedule['status'];
    paidAmount?: number;
    paidDate?: Date;
  }, { rejectWithValue }) => {
    try {
      return { leaseId, paymentId, status, paidAmount, paidDate };
    } catch (error) {
      return rejectWithValue('Failed to update payment status');
    }
  }
);

const leaseSlice = createSlice({
  name: 'leases',
  initialState,
  reducers: {
    setSelectedLease: (state, action: PayloadAction<Lease | null>) => {
      state.selectedLease = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch leases
      .addCase(fetchLeases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeases.fulfilled, (state, action) => {
        state.loading = false;
        state.leases = action.payload;
      })
      .addCase(fetchLeases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch lessees
      .addCase(fetchLessees.fulfilled, (state, action) => {
        state.lessees = action.payload;
      })
      // Add lease
      .addCase(addLease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLease.fulfilled, (state, action) => {
        state.loading = false;
        state.leases.push(action.payload);
      })
      .addCase(addLease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update lease
      .addCase(updateLease.fulfilled, (state, action) => {
        const { id, leaseData } = action.payload;
        const leaseIndex = state.leases.findIndex(lease => lease.id === id);
        if (leaseIndex !== -1) {
          state.leases[leaseIndex] = { ...state.leases[leaseIndex], ...leaseData };
        }
        if (state.selectedLease?.id === id) {
          state.selectedLease = { ...state.selectedLease, ...leaseData };
        }
      })
      // Delete lease
      .addCase(deleteLease.fulfilled, (state, action) => {
        state.leases = state.leases.filter(lease => lease.id !== action.payload);
        if (state.selectedLease?.id === action.payload) {
          state.selectedLease = null;
        }
      })
      // Update payment status
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const { leaseId, paymentId, status, paidAmount, paidDate } = action.payload;
        const leaseIndex = state.leases.findIndex(lease => lease.id === leaseId);
        if (leaseIndex !== -1) {
          const paymentIndex = state.leases[leaseIndex].paymentSchedule.findIndex(p => p.id === paymentId);
          if (paymentIndex !== -1) {
            state.leases[leaseIndex].paymentSchedule[paymentIndex].status = status;
            if (paidAmount !== undefined) {
              state.leases[leaseIndex].paymentSchedule[paymentIndex].paidAmount = paidAmount;
            }
            if (paidDate) {
              state.leases[leaseIndex].paymentSchedule[paymentIndex].paidDate = paidDate;
            }
          }
        }
      });
  },
});

export const { 
  setSelectedLease, 
  setSearchQuery, 
  setFilters, 
  clearFilters, 
  clearError 
} = leaseSlice.actions;

export default leaseSlice.reducer; 