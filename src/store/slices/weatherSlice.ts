import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData } from '@/types';

interface WeatherState {
  currentWeather: WeatherData | null;
  weatherByFarm: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  weatherByFarm: {},
  loading: false,
  error: null,
};

export const fetchWeatherForFarm = createAsyncThunk(
  'weather/fetchWeatherForFarm',
  async ({ farmId, lat, lng }: { farmId: string; lat: number; lng: number }, { rejectWithValue }) => {
    try {
      // Mock weather data - replace with actual weather API call
      const mockWeather: WeatherData = {
        location: { lat, lng },
        current: {
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          windDirection: 180,
          pressure: 1013,
          condition: 'Partly Cloudy',
          icon: 'partly-cloudy',
          visibility: 10,
          uvIndex: 6,
        },
        forecast: [],
        alerts: [],
      };
      return { farmId, weather: mockWeather };
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForFarm.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherForFarm.fulfilled, (state, action) => {
        state.loading = false;
        const { farmId, weather } = action.payload;
        state.weatherByFarm[farmId] = weather;
      })
      .addCase(fetchWeatherForFarm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer; 