import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Lessee } from '@/types';

interface LesseeState {
  lessees: Lessee[];
  loading: boolean;
  error: string | null;
}

const initialState: LesseeState = {
  lessees: [],
  loading: false,
  error: null,
};

export const fetchLessees = createAsyncThunk(
  'lessees/fetchLessees',
  async (_, { rejectWithValue }) => {
    try {
      return [];
    } catch (error) {
      return rejectWithValue('Failed to fetch lessees');
    }
  }
);

const lesseeSlice = createSlice({
  name: 'lessees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessees.fulfilled, (state, action) => {
        state.loading = false;
        state.lessees = action.payload;
      })
      .addCase(fetchLessees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lesseeSlice.reducer; 