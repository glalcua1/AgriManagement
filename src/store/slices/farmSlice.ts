import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Farm, Plot } from '@/types';

interface FarmState {
  farms: Farm[];
  selectedFarm: Farm | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    areaUnit: string;
    soilType: string;
    minArea: number | null;
    maxArea: number | null;
  };
}

const initialState: FarmState = {
  farms: [],
  selectedFarm: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    areaUnit: '',
    soilType: '',
    minArea: null,
    maxArea: null,
  },
};

// Async thunks for API calls (will be replaced with actual API calls)
export const fetchFarms = createAsyncThunk(
  'farms/fetchFarms',
  async (_, { rejectWithValue }) => {
    try {
      // Mock data for Bilari, Moradabad region - replace with actual API call
      const mockFarms: Farm[] = [
        {
          id: '1',
          name: 'North Bilari Farm',
          location: {
            address: 'Village Bilari, Moradabad, Uttar Pradesh',
            coordinates: { lat: 28.8386, lng: 78.7733 },
          },
          totalArea: 80,
          areaUnit: 'bighas',
          soilType: 'Alluvial Loam',
          waterSource: ['Tubewell', 'Canal'],
          qualityRating: 4,
          plots: [
            {
              id: 'p1',
              farmId: '1',
              plotNumber: 'NB-01',
              area: 35,
              currentCrop: 'sugarcane',
              soilQuality: 4,
              irrigationType: 'flood',
            },
            {
              id: 'p2',
              farmId: '1',
              plotNumber: 'NB-02',
              area: 25,
              currentCrop: 'wheat',
              soilQuality: 4,
              irrigationType: 'sprinkler',
            },
            {
              id: 'p3',
              farmId: '1',
              plotNumber: 'NB-03',
              area: 20,
              currentCrop: 'rice',
              soilQuality: 5,
              irrigationType: 'flood',
            },
          ],
          createdAt: new Date('2022-06-15'),
          updatedAt: new Date('2023-11-20'),
        },
        {
          id: '2',
          name: 'South Bilari Farm',
          location: {
            address: 'Village Bilari South, Moradabad, Uttar Pradesh',
            coordinates: { lat: 28.8286, lng: 78.7633 },
          },
          totalArea: 75,
          areaUnit: 'bighas',
          soilType: 'Clay Loam',
          waterSource: ['Tubewell', 'Rainwater Harvesting'],
          qualityRating: 5,
          plots: [
            {
              id: 'p4',
              farmId: '2',
              plotNumber: 'SB-01',
              area: 30,
              currentCrop: 'sugarcane',
              soilQuality: 5,
              irrigationType: 'drip',
            },
            {
              id: 'p5',
              farmId: '2',
              plotNumber: 'SB-02',
              area: 25,
              currentCrop: 'mangoes',
              soilQuality: 4,
              irrigationType: 'drip',
            },
            {
              id: 'p6',
              farmId: '2',
              plotNumber: 'SB-03',
              area: 20,
              currentCrop: 'wheat',
              soilQuality: 4,
              irrigationType: 'sprinkler',
            },
          ],
          createdAt: new Date('2022-08-10'),
          updatedAt: new Date('2023-11-18'),
        },
        {
          id: '3',
          name: 'East Bilari Farm',
          location: {
            address: 'Village East Bilari, Moradabad, Uttar Pradesh',
            coordinates: { lat: 28.8486, lng: 78.7833 },
          },
          totalArea: 45,
          areaUnit: 'bighas',
          soilType: 'Sandy Loam',
          waterSource: ['Borewell', 'Canal'],
          qualityRating: 3,
          plots: [
            {
              id: 'p7',
              farmId: '3',
              plotNumber: 'EB-01',
              area: 25,
              currentCrop: 'rice',
              soilQuality: 3,
              irrigationType: 'flood',
            },
            {
              id: 'p8',
              farmId: '3',
              plotNumber: 'EB-02',
              area: 20,
              currentCrop: 'wheat',
              soilQuality: 4,
              irrigationType: 'sprinkler',
            },
          ],
          createdAt: new Date('2023-01-20'),
          updatedAt: new Date('2023-11-15'),
        },
      ];
      
      return mockFarms;
    } catch (error) {
      return rejectWithValue('Failed to fetch farms');
    }
  }
);

export const addFarm = createAsyncThunk(
  'farms/addFarm',
  async (farmData: Omit<Farm, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual implementation
      const newFarm: Farm = {
        ...farmData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newFarm;
    } catch (error) {
      return rejectWithValue('Failed to add farm');
    }
  }
);

export const updateFarm = createAsyncThunk(
  'farms/updateFarm',
  async ({ id, farmData }: { id: string; farmData: Partial<Farm> }, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual implementation
      return { id, farmData: { ...farmData, updatedAt: new Date() } };
    } catch (error) {
      return rejectWithValue('Failed to update farm');
    }
  }
);

export const deleteFarm = createAsyncThunk(
  'farms/deleteFarm',
  async (farmId: string, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual implementation
      return farmId;
    } catch (error) {
      return rejectWithValue('Failed to delete farm');
    }
  }
);

export const addPlotToFarm = createAsyncThunk(
  'farms/addPlotToFarm',
  async ({ farmId, plotData }: { farmId: string; plotData: Omit<Plot, 'id' | 'farmId'> }, { rejectWithValue }) => {
    try {
      const newPlot: Plot = {
        ...plotData,
        id: Math.random().toString(36).substr(2, 9),
        farmId,
      };
      return { farmId, plot: newPlot };
    } catch (error) {
      return rejectWithValue('Failed to add plot');
    }
  }
);

export const updatePlot = createAsyncThunk(
  'farms/updatePlot',
  async ({ farmId, plotId, plotData }: { farmId: string; plotId: string; plotData: Partial<Plot> }, { rejectWithValue }) => {
    try {
      return { farmId, plotId, plotData };
    } catch (error) {
      return rejectWithValue('Failed to update plot');
    }
  }
);

export const deletePlot = createAsyncThunk(
  'farms/deletePlot',
  async ({ farmId, plotId }: { farmId: string; plotId: string }, { rejectWithValue }) => {
    try {
      return { farmId, plotId };
    } catch (error) {
      return rejectWithValue('Failed to delete plot');
    }
  }
);

const farmSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {
    setSelectedFarm: (state, action: PayloadAction<Farm | null>) => {
      state.selectedFarm = action.payload;
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
      // Fetch farms
      .addCase(fetchFarms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarms.fulfilled, (state, action) => {
        state.loading = false;
        state.farms = action.payload;
      })
      .addCase(fetchFarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add farm
      .addCase(addFarm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFarm.fulfilled, (state, action) => {
        state.loading = false;
        state.farms.push(action.payload);
      })
      .addCase(addFarm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update farm
      .addCase(updateFarm.fulfilled, (state, action) => {
        const { id, farmData } = action.payload;
        const farmIndex = state.farms.findIndex(farm => farm.id === id);
        if (farmIndex !== -1) {
          state.farms[farmIndex] = { ...state.farms[farmIndex], ...farmData };
        }
        if (state.selectedFarm?.id === id) {
          state.selectedFarm = { ...state.selectedFarm, ...farmData };
        }
      })
      // Delete farm
      .addCase(deleteFarm.fulfilled, (state, action) => {
        state.farms = state.farms.filter(farm => farm.id !== action.payload);
        if (state.selectedFarm?.id === action.payload) {
          state.selectedFarm = null;
        }
      })
      // Add plot to farm
      .addCase(addPlotToFarm.fulfilled, (state, action) => {
        const { farmId, plot } = action.payload;
        const farmIndex = state.farms.findIndex(farm => farm.id === farmId);
        if (farmIndex !== -1) {
          state.farms[farmIndex].plots.push(plot);
          state.farms[farmIndex].updatedAt = new Date();
        }
        if (state.selectedFarm?.id === farmId) {
          state.selectedFarm.plots.push(plot);
          state.selectedFarm.updatedAt = new Date();
        }
      })
      // Update plot
      .addCase(updatePlot.fulfilled, (state, action) => {
        const { farmId, plotId, plotData } = action.payload;
        const farmIndex = state.farms.findIndex(farm => farm.id === farmId);
        if (farmIndex !== -1) {
          const plotIndex = state.farms[farmIndex].plots.findIndex(plot => plot.id === plotId);
          if (plotIndex !== -1) {
            state.farms[farmIndex].plots[plotIndex] = { ...state.farms[farmIndex].plots[plotIndex], ...plotData };
            state.farms[farmIndex].updatedAt = new Date();
          }
        }
        if (state.selectedFarm?.id === farmId) {
          const plotIndex = state.selectedFarm.plots.findIndex(plot => plot.id === plotId);
          if (plotIndex !== -1) {
            state.selectedFarm.plots[plotIndex] = { ...state.selectedFarm.plots[plotIndex], ...plotData };
            state.selectedFarm.updatedAt = new Date();
          }
        }
      })
      // Delete plot
      .addCase(deletePlot.fulfilled, (state, action) => {
        const { farmId, plotId } = action.payload;
        const farmIndex = state.farms.findIndex(farm => farm.id === farmId);
        if (farmIndex !== -1) {
          state.farms[farmIndex].plots = state.farms[farmIndex].plots.filter(plot => plot.id !== plotId);
          state.farms[farmIndex].updatedAt = new Date();
        }
        if (state.selectedFarm?.id === farmId) {
          state.selectedFarm.plots = state.selectedFarm.plots.filter(plot => plot.id !== plotId);
          state.selectedFarm.updatedAt = new Date();
        }
      });
  },
});

export const { 
  setSelectedFarm, 
  setSearchQuery, 
  setFilters, 
  clearFilters, 
  clearError 
} = farmSlice.actions;

export default farmSlice.reducer; 